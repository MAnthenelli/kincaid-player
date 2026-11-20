elements.damage.onclick = () =>
  change(() => {
    let d = readAmount(),
      t = Math.min(d, applicationState.temporaryHitPoints);
    applicationState.temporaryHitPoints -= t;
    applicationState.currentHitPoints = Math.max(
      0,
      applicationState.currentHitPoints - d + t
    );
    if (!applicationState.currentHitPoints) {
      endConc();
      applicationState.activeFormId = null;
      applicationState.radiantStrikeActive = false;
      if (applicationState.draconicFlightState === "active")
        applicationState.draconicFlightState = "spent";
    }
  }, () => `Damage applied · ${applicationState.currentHitPoints}/${MAX} HP · ${applicationState.temporaryHitPoints} temp HP`);
elements.heal.onclick = () =>
  change(() => {
    applicationState.currentHitPoints = Math.min(
      MAX,
      applicationState.currentHitPoints + readAmount()
    );
    if (applicationState.currentHitPoints)
      applicationState.deathSaves = { successes: 0, failures: 0 };
  }, () => `Healed · ${applicationState.currentHitPoints}/${MAX} HP`);
elements.addTemp.onclick = () => {
  let amount = readAmount();
  if (amount <= applicationState.temporaryHitPoints)
    return showNotice(
      `Temporary HP remains ${applicationState.temporaryHitPoints}; the new ${amount} does not stack.`
    );
  change(
    () => (applicationState.temporaryHitPoints = amount),
    `Temporary HP: ${amount}.`
  );
};
elements.setTemp.onclick = () => {
  let amount = readAmount();
  change(
    () => (applicationState.temporaryHitPoints = amount),
    `Temporary HP corrected to ${amount}.`
  );
};
elements.clearTemp.onclick = () =>
  change(
    () => (applicationState.temporaryHitPoints = 0),
    "Temporary HP cleared."
  );
elements.undo.onclick = undo;
getElementById("feedbackUndo").onclick = undo;
getElementById("dismissFeedback").onclick = () => showNotice("");
elements.theme.onclick = () => {
  applicationState.lightThemeEnabled = !applicationState.lightThemeEnabled;
  save();
};
function slotToShape(l) {
  if (applicationState.wildShapeUses !== 0)
    return showNotice("Use this only at 0 Wild Shape uses.");
  if (!applicationState.spellSlots[l])
    return showNotice(`No level ${l} slot remains.`);
  change(() => {
    applicationState.spellSlots[l]--;
    applicationState.wildShapeUses = 1;
  }, `Level ${l} slot spent. Wild Shape: 1/${kincaid.maximumWildShapeUses}.`);
}
elements.shortRest.onclick = () =>
  confirm(`Take a short rest? Wild Shape uses: ${applicationState.wildShapeUses} → ${Math.min(kincaid.maximumWildShapeUses, applicationState.wildShapeUses + kincaid.shortRestWildShapeRecovery)}.`) &&
  change(
    () =>
      (applicationState.wildShapeUses = Math.min(
        kincaid.maximumWildShapeUses,
        applicationState.wildShapeUses + kincaid.shortRestWildShapeRecovery
      )), "Short rest complete."
  );
elements.longRest.onclick = () =>
  confirm(`Take a long rest? HP ${applicationState.currentHitPoints} → ${MAX}. Restore spell slots, Wild Shape, breath, and flight. Clear temp HP, leave your form, and end concentration and temporary spell effects. Exhaustion decreases by one level.`) &&
  change(
    () =>
      Object.assign(applicationState, {
        conditions: conditionsAfterLongRest(),
        currentHitPoints: MAX,
        wildShapeUses: kincaid.maximumWildShapeUses,
        spellSlots: { ...kincaid.spellSlotMaximums },
        breathWeaponUses: proficiencyBonus,
        draconicFlightState: "ready",
        reverse: false,
        activeFormId: null,
        temporaryHitPoints: 0,
        activeEffects: applicationState.activeEffects.filter(
          isIndefiniteBattlefieldEffect
        ),
        concentrationEffect: null,
        size: null,
        long: false,
        radiantStrikeActive: false,
        deathSaves: { successes: 0, failures: 0 }
      }),
    "Long Rest complete."
  );
document.addEventListener("input", (e) => {
  if (["spellSearch", "formSearch"].includes(e.target.id)) renderLibraries();
});
document.addEventListener("change", (e) => {
  if (
    [
      "spellLevel",
      "spellSchool",
      "spellSort",
      "formCR",
      "formRoleFilter", "formEdition", "swapForm",
      "formSort"
    ].includes(e.target.id)
  )
    renderLibraries();
  if (e.target.id === "turnForm") {
    let b = document.querySelector('[data-form-info="current"]'),
      id = e.target.value;
    b.disabled = !id;
    b.hidden = !id;
    getElementById("shapeNow").hidden = !id;
    let label = id
      ? `${getFormRecord(id).name} information`
      : "Selected form information";
    b.setAttribute("aria-label", label);
    b.title = label;
  }
  if (/^(turn|bonus|reaction)Spell$/.test(e.target.id))
    progressive(e.target.id.replace("Spell", ""), e.target.value);
  if (/^(turn|bonus|reaction)Slot$/.test(e.target.id)) {
    let kind = e.target.id.replace("Slot", ""),
      root = getElementById(kind + "Progressive"),
      meta = root?.querySelector(".spellMeta .levelPips"),
      label = root?.querySelector(".spellMeta .muted");
    if (meta) meta.textContent = "◇".repeat(+e.target.value);
    if (label)
      label.textContent = `Level ${e.target.value} ${SPELL_SCHOOLS[getElementById(kind + "Spell").value] || ""}`;
  }
  if (/^(turn|bonus|reaction)Self$/.test(e.target.id)) {
    let kind = e.target.id.replace("Self", ""),
      wrap = getElementById(kind + "HealingWrap");
    if (wrap) wrap.classList.toggle("hidden", !e.target.checked);
  }
});
elements.closeInfo.onclick = closeInfo;
elements.infoModal.onclick = (e) => {
  if (e.target === elements.infoModal) closeInfo();
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !elements.infoModal.classList.contains("hidden")) {
    const popup = getElementById("rollExplanation");
    if (popup.hidePopover && popup.matches(":popover-open")) return;
    e.preventDefault();
    closeInfo();
  }
  if (e.key === "Tab" && !elements.infoModal.classList.contains("hidden")) {
    let focusable = [
      ...elements.infoModal.querySelectorAll(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      )
    ].filter((x) => !x.disabled);
    if (!focusable.length) return;
    let first = focusable[0],
      last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
document.addEventListener("click", (e) => {
  let t = e.target;
  if (t.disabled) return;
  if (t.dataset.spellInfo) {
    let key = t.dataset.spellInfo,
      name = ["turn", "bonus", "reaction"].includes(key)
        ? getElementById(key + "Spell")?.value
        : key;
    openSpellInfo(name);
  }
  if (t.dataset.formInfo && !t.disabled)
    openFormInfo(
      t.dataset.formInfo === "current"
        ? getElementById("turnForm")?.value
        : t.dataset.formInfo
    );
  if (t.id === "currentFormInfo" && applicationState.activeFormId)
    openFormInfo(applicationState.activeFormId, true);
  if (t.dataset.endFlight)
    change(
      () => (applicationState.draconicFlightState = "spent"),
      "Draconic Flight ended."
    );
  if (t.dataset.cast) castFrom(t.dataset.cast, t.hasAttribute("data-ritual"));
  if (t.id === "shapeNow") transform(getElementById("turnForm").value);
  if (t.id === "leaveNow")
    change(() => {
      applicationState.activeFormId = null;
      applicationState.radiantStrikeActive = false;
    }, "Left Wild Shape.");
  if (t.id === "useBreath") {
    if (!applicationState.breathWeaponUses)
      return showNotice("No Breath Weapon uses.");
    change(() => applicationState.breathWeaponUses--, "Cold Breath used.");
  }
  if (t.id === "useFlight") {
    if (applicationState.draconicFlightState !== "ready")
      return showNotice("Draconic Flight is not ready.");
    change(() => (applicationState.draconicFlightState = "active"));
  }
  if (t.id === "radiantToggle")
    change(
      () =>
        (applicationState.radiantStrikeActive =
          !applicationState.radiantStrikeActive)
    );
  if (t.dataset.manager) {
    elements.spellManager.classList.toggle(
      "hidden",
      t.dataset.manager !== "spells"
    );
    elements.formManager.classList.toggle(
      "hidden",
      t.dataset.manager !== "forms"
    );
    document.querySelectorAll("[data-manager]").forEach((b) => {
      let active = b === t;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", String(active));
      b.tabIndex = active ? 0 : -1;
    });
  }
  if (t.id === "slotToShape")
    slotToShape(+getElementById("resurgenceLevel").value);
  if (t.id === "shapeToSlot") {
    if (
      applicationState.reverse ||
      !applicationState.wildShapeUses ||
      applicationState.spellSlots[1] >= kincaid.spellSlotMaximums[1]
    )
      return showNotice("Wild Resurgence is unavailable.");
    change(() => {
      applicationState.wildShapeUses--;
      applicationState.spellSlots[1]++;
      applicationState.reverse = true;
    }, "Wild Shape spent. One Level 1 slot restored.");
  }
  if (t.dataset.resource) {
    let r = t.dataset.resource,
      v = +t.dataset.value,
      current =
        r === "wild"
          ? applicationState.wildShapeUses
          : r === "breath"
            ? applicationState.breathWeaponUses
            : r === "deathS"
              ? applicationState.deathSaves.successes
              : r === "deathF"
                ? applicationState.deathSaves.failures
                : applicationState.spellSlots[+r.slice(4)],
      next = v === current ? v - 1 : v;
    change(() => {
      if (r === "wild") applicationState.wildShapeUses = next;
      else if (r === "breath") applicationState.breathWeaponUses = next;
      else if (r === "deathS") applicationState.deathSaves.successes = next;
      else if (r === "deathF") applicationState.deathSaves.failures = next;
      else if (r.startsWith("slot"))
        applicationState.spellSlots[+r.slice(4)] = next;
    }, resourceLabel(r) + " · " + current + " → " + next);
  }
  if (t.dataset.flightState)
    change(
      () => (applicationState.draconicFlightState = t.dataset.flightState)
    );
  if (t.dataset.end)
    change(() => endEffect(t.dataset.end), `${t.dataset.end} ended.`);
  if (t.dataset.form) {
    const id = t.dataset.form;
    const known = applicationState.knownFormIds;
    const outgoing = elements.swapForm.value;
    if (known.includes(id)) {
      if (applicationState.activeFormId === id) return showNotice("Leave this form before removing it from your known forms.");
      change(() => { applicationState.knownFormIds = known.filter(formId => formId !== id); });
    } else if (known.length < kincaid.maximumKnownForms) {
      change(() => known.push(id));
    } else if (outgoing && known.includes(outgoing)) {
      const label = formId => getFormRecord(formId).name + " (" + getFormRuleset(getFormRecord(formId)) + ")";
      change(() => { known[known.indexOf(outgoing)] = id; }, `Replaced ${label(outgoing)} with ${label(id)}.`);
    } else {
      showNotice("Choose a known form to replace.");
    }
  }
  if (t.dataset.cantrip) {
    let x = t.dataset.cantrip;
    if (
      !applicationState.knownCantripNames.includes(x) &&
      applicationState.knownCantripNames.length >= MAX_CANTRIPS
    )
      showNotice(
        `Kincaid already has ${MAX_CANTRIPS} selected cantrips. Remove one before selecting another.`
      );
    else
      change(
        () => {
          if (applicationState.knownCantripNames.includes(x))
            applicationState.knownCantripNames =
              applicationState.knownCantripNames.filter((y) => y !== x);
          else applicationState.knownCantripNames.push(x);
        },
        applicationState.knownCantripNames.includes(x)
          ? `${x} removed from selected cantrips.`
          : `${x} selected.`
      );
  }
  if (t.dataset.prep)
    change(() => {
      let x = t.dataset.prep;
      if (applicationState.preparedSpellNames.includes(x))
        applicationState.preparedSpellNames =
          applicationState.preparedSpellNames.filter((y) => y !== x);
      else if (applicationState.preparedSpellNames.length < kincaid.maximumPreparedSpells)
        applicationState.preparedSpellNames.push(x);
    });
});
const conditionForm = getElementById("conditionForm");
const levelControl = getElementById("exhaustionLevel");
for (let level = 1; level <= 6; level++)
  levelControl.add(new Option(level === 6 ? "6 · Death" : String(level), String(level)));
let selectedCondition = "";
function selectCondition(name) {
  selectedCondition = name;
  for (const button of getElementById("conditionChoices").querySelectorAll("button"))
    button.setAttribute("aria-pressed", String(name === button.value));
  const custom = name === "Custom";
  const exhaustion = name === "Exhaustion";
  getElementById("customNameField").hidden = !custom;
  getElementById("customName").required = custom;
  getElementById("exhaustionField").hidden = !exhaustion;
  const entry = exhaustionEntry();
  if (exhaustion) {
    levelControl.value = String(entry?.level || 1);
    getElementById("conditionNote").value = entry?.note || "";
  }
  getElementById("conditionPreview").textContent = exhaustion
    ? "Current level " + (entry?.level || 0) + ". " + effectReminder(statusByName.get(name))
    : effectReminder(statusByName.get(name));
  getElementById("applyCondition").disabled = !name || (custom && !getElementById("customName").value.trim());
}
getElementById("customName").oninput = () => {
  getElementById("applyCondition").disabled = !getElementById("customName").value.trim();
};
const effectGroup = getElementById("effectGroup");
const picker = getElementById("conditionEditor");
const effectSearch = getElementById("effectSearch");
const groupLabels = {core: "Conditions", conditions: "Other statuses", "condition-immunities": "Condition immunities", "damage-resistances": "Damage resistances", "damage-vulnerabilities": "Damage vulnerabilities", "spell benefits": "Spell benefits"};
const effectGroups = new Set(["core", ...[...statusById.values()].map(record => record.group)]);
for (const group of effectGroups) effectGroup.add(new Option(groupLabels[group] || group, group));
function renderEffectChoices() {
  const choices = getElementById("conditionChoices");
  choices.replaceChildren();
  const query = effectSearch.value.trim().toLowerCase();
  const records = [...statusById.values()].filter(record => query ? record.name.toLowerCase().includes(query) : record.group === effectGroup.value);
  const names = records.map(record => record.name).sort();
  if (!names.length) appendText(choices, "small", "No matching effects.");
  names.push("Custom");
  for (const name of names) {
    const button = appendText(choices, "button", name === "Custom" ? "Custom effect" : name);
    button.type = "button";
    button.value = name;
    button.onclick = () => {
      if (selectedCondition === "Exhaustion" && name !== selectedCondition) getElementById("conditionNote").value = "";
      selectCondition(name);
      if (name === "Custom") getElementById("customName").focus();
    };
  }
  selectCondition("");
}
effectGroup.onchange = () => { effectSearch.value = ""; renderEffectChoices(); };
effectSearch.oninput = renderEffectChoices;
getElementById("openEffects").onclick = () => {
  conditionForm.reset();
  renderEffectChoices();
  picker.showModal();
  if (window.matchMedia("(min-width: 701px)").matches) {
    const anchor = getElementById("openEffects").getBoundingClientRect();
    const left = Math.max(12, Math.min(anchor.left, innerWidth - picker.offsetWidth - 12));
    const top = Math.max(12, Math.min(anchor.bottom + 6, innerHeight - picker.offsetHeight - 12));
    picker.style.setProperty("--picker-left", left + "px");
    picker.style.setProperty("--picker-top", top + "px");
  }
  effectSearch.focus();
};
getElementById("closeEffects").onclick = () => picker.close();
picker.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    event.preventDefault();
    picker.close();
  }
});
picker.addEventListener("close", () => getElementById("openEffects").focus({preventScroll: true}));
renderEffectChoices();
conditionForm.onsubmit = event => {
  event.preventDefault();
  const custom = selectedCondition === "Custom";
  const name = custom ? getElementById("customName").value.trim() : selectedCondition;
  if (!name) return;
  const note = getElementById("conditionNote").value.trim();
  const exhaustion = !custom && name === "Exhaustion";
  const level = Number(levelControl.value);
  change(() => {
    if (exhaustion) {
      const previous = exhaustionEntry();
      applicationState.conditions = applicationState.conditions.filter(item => item !== previous);
      if (level) applicationState.conditions.push({effectId: "exhaustion", name, custom, level, note});
    } else {
      applicationState.conditions.push(custom ? {name, custom, note} : {effectId: statusByName.get(name).id, name, custom, note});
    }

  }, exhaustion ? "Exhaustion set to " + level + "." : name + " applied.");
  conditionForm.reset();
  renderEffectChoices();
  if (picker.open) picker.close();
};
render();

document.addEventListener("click", event => {
  const button = event.target.closest("[data-roll-reason]");
  if (!button) return;
  const popup = getElementById("rollExplanation");
  popup.textContent = button.dataset.rollReason;
  popup.showPopover();
  const rect = button.getBoundingClientRect();
  popup.style.left = Math.max(4, Math.min(rect.left, innerWidth - popup.offsetWidth - 4)) + "px";
  popup.style.top = (rect.bottom + popup.offsetHeight < innerHeight ? rect.bottom + 4 : Math.max(4, rect.top - popup.offsetHeight - 4)) + "px";
});

const managerTabs = [...document.querySelectorAll("[data-manager]")];
getElementById("info").querySelector("details").addEventListener("toggle", event => {
  if (event.target.open && !managerTabs.some(tab => tab.getAttribute("aria-selected") === "true"))
    managerTabs[0].click();
});
managerTabs.forEach((tab, index) => tab.addEventListener("keydown", event => {
  const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
  if (!keys.includes(event.key)) return;
  event.preventDefault();
  const next = event.key === "Home" ? 0 : event.key === "End" ? managerTabs.length - 1 :
    (index + (event.key === "ArrowLeft" ? -1 : 1) + managerTabs.length) % managerTabs.length;
  managerTabs[next].click();
  managerTabs[next].focus();
}));

const sectionLinks = [...document.querySelectorAll(".mobileNav a")];
function markSection() {
  const reachedEnd = window.scrollY > 0 && window.scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
  const current = reachedEnd ? sectionLinks.at(-1) : sectionLinks.filter(a => document.querySelector(a.hash).getBoundingClientRect().top <= 100).pop() || sectionLinks[0];
  sectionLinks.forEach(a => a === current ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current"));
}
window.addEventListener("scroll", markSection, {passive: true});
markSection();
