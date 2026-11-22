elements.damage.onclick = () => {
  const damage = readAmount();
  change(() => {
    const absorbed = Math.min(damage, applicationState.temporaryHitPoints);
    applicationState.temporaryHitPoints -= absorbed;
    applicationState.currentHitPoints = Math.max(
      0,
      applicationState.currentHitPoints - damage + absorbed
    );
    if (!applicationState.currentHitPoints) clearAtZeroHP();
  }, () => {
    const notice = `Damage applied · ${applicationState.currentHitPoints}/${currentMaxHP()} HP · ${applicationState.temporaryHitPoints} temp HP`;
    if (!damage || !(applicationState.concentrationEffect || applicationState.pendingCast)) return notice;
    const dc = Math.min(30, Math.max(10, Math.floor(damage / 2)));
    const form = getFormRecord(applicationState.activeFormId);
    const [, base] = getFormSavingThrowRows(form).find(([ability]) => ability === "CON");
    const {value, result} = resolveRoll(base, "concentration", "CON");
    return `${notice}\nSave to maintain Concentration · DC ${dc} · CON ${value}${result ? " · " + result : ""}`;
  });
};
elements.heal.onclick = () =>
  change(() => {
    applicationState.currentHitPoints = Math.min(
      currentMaxHP(),
      applicationState.currentHitPoints + readAmount()
    );
    if (applicationState.currentHitPoints)
      applicationState.deathSaves = { successes: 0, failures: 0 };
  }, () => `Healed · ${applicationState.currentHitPoints}/${currentMaxHP()} HP`);
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
document.addEventListener("change", (e) => {
  if (e.target.id === "breathShape") {
    getElementById("useBreath").disabled = !Object.hasOwn(breathShapes, e.target.value) || !applicationState.breathWeaponUses || conditionModifiers().incapacitated;
  }
  if (e.target.id === "turnForm") {
    let b = document.querySelector('[data-form-info="current"]'),
      id = e.target.value;
    b.disabled = !id;
    b.hidden = !id;
    getElementById("shapeNow").hidden = !id;
    let label = id
      ? `${getFormRecord(id).name} details`
      : "Selected form details";
    b.setAttribute("aria-label", label);
    b.title = label;
  }
  if (/^(all|turn|bonus|reaction|companion)Self$/.test(e.target.id)) {
    let kind = e.target.id.replace("Self", ""),
      wrap = getElementById(kind + "HealingWrap");
    if (wrap) wrap.classList.toggle("hidden", !e.target.checked);
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
  if (t.id === "shapeNow") transform(getElementById("turnForm").value);
  if (t.id === "leaveNow")
    change(() => {
      applicationState.activeFormId = null;
      applicationState.radiantStrikeActive = false;
    }, "Left Wild Shape.");
  if (t.id === "useBreath") {
    const picker = getElementById("breathShape");
    if (!applicationState.breathWeaponUses || !Object.hasOwn(breathShapes, picker.value) || conditionModifiers().incapacitated) return;
    const shape = breathShapes[picker.value];
    picker.value = "";
    change(() => applicationState.breathWeaponUses--, `Cold Breath · ${shape}`);
  }
  if (t.id === "useFlight") {
    if (applicationState.draconicFlightState !== "ready")
      return showNotice("Draconic Flight is not ready.");
    change(() => (applicationState.draconicFlightState = "active"), "Draconic Flight active · 10 min");
  }
  if (t.id === "radiantToggle")
    change(
      () =>
        (applicationState.radiantStrikeActive =
          !applicationState.radiantStrikeActive)
    );
  if (t.dataset.manager) {
    document.querySelectorAll("[data-manager]").forEach((b) => {
      let active = b === t;
      getElementById(b.getAttribute("aria-controls")).classList.toggle("hidden", !active);
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", String(active));
      b.tabIndex = active ? 0 : -1;
    });
    renderSelections();
    renderInventory();
    renderFeats();
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
    const r = t.dataset.resource;
    const v = +t.dataset.value;
    const current = resourceValue(r);
    const next = v === current ? v - 1 : v;
    change(() => {
      if (r === "wild") applicationState.wildShapeUses = next;
      else if (r === "hitDice") applicationState.hitDiceRemaining = next;
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
    change(() => endEffect(t.dataset.end, t.dataset.effectOrder === undefined ? undefined : t.dataset.effectOrder === "legacy" ? null : Number(t.dataset.effectOrder)), `${t.dataset.end} ended.`);
});
const conditionForm = getElementById("conditionForm");
const levelControl = getElementById("exhaustionLevel");
for (let level = 1; level <= 6; level++)
  levelControl.add(new Option(level === 6 ? "6 · Death" : String(level), String(level)));
let selectedCondition = "";
const effectParameter = getElementById("effectParameter");
function selectCondition(name) {
  selectedCondition = name;
  for (const button of getElementById("conditionChoices").querySelectorAll("button"))
    button.setAttribute("aria-pressed", String(name === button.value));
  const custom = name === "Custom";
  const exhaustion = name === "Exhaustion";
  getElementById("customNameField").hidden = !custom;
  getElementById("customName").required = custom;
  getElementById("exhaustionField").hidden = !exhaustion;
  const parameter = statusByName.get(name)?.parameter;
  getElementById("effectParameterField").hidden = !parameter;
  getElementById("effectParameterLabel").textContent = parameter?.label || "";
  effectParameter.replaceChildren(...(parameter?.values || []).map(value =>
    new Option(typeof value === "string" ? value[0].toUpperCase() + value.slice(1) : "Level " + value, value)));
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
const groupLabels = {core: "Conditions", conditions: "Other statuses", "condition-immunities": "Condition immunities", "damage-resistances": "Damage resistances", "damage-vulnerabilities": "Damage vulnerabilities", "spell benefits": "Spell benefits", "spell effects": "Spell effects"};
const effectGroups = new Set(["core", ...[...statusById.values()].map(record => record.group)]);
for (const group of effectGroups) effectGroup.add(new Option(groupLabels[group] || group, group));
function renderEffectChoices() {
  const choices = getElementById("conditionChoices");
  choices.replaceChildren();
  const query = effectSearch.value.trim().toLowerCase();
  const records = [...statusById.values()].filter(record => query
    ? [record.name, ...(record.searchTerms || [])].some(term => term.toLowerCase().includes(query))
    : record.group === effectGroup.value);
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
  picker.querySelector(".dialogBody").scrollTop = 0;
  effectSearch.focus();
};
wireDialogDismissal(picker, getElementById("closeEffects"));
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
      const definition = statusByName.get(name);
      const entry = custom ? {name, custom, note} : {effectId: definition.id, name, custom, note};
      if (definition?.parameter && !custom) {
        const {field, values} = definition.parameter;
        const value = values.find(option => String(option) === effectParameter.value);
        if (value === undefined) return;
        entry[field] = value;
        entry.order = nextEffectOrder();
      }
      applicationState.conditions.push(entry);
    }

  }, exhaustion ? "Exhaustion set to " + level + "." : name + " applied.");
  conditionForm.reset();
  renderEffectChoices();
  if (picker.open) picker.close();
};
render();

const detailsPopup = getElementById("rollExplanation");
let detailsOpener;
window.addEventListener("resize", () => {
  if (detailsPopup.matches(":popover-open")) detailsPopup.hidePopover();
});
document.addEventListener("scroll", event => {
  if (event.target !== detailsPopup && detailsPopup.matches(":popover-open")) detailsPopup.hidePopover();
}, {capture: true, passive: true});
detailsPopup.addEventListener("toggle", event => {
  if (event.newState === "closed" && !detailsPopup.matches(":popover-open"))
    detailsOpener?.setAttribute("aria-expanded", "false");
});
document.addEventListener("click", event => {
  const button = event.target.closest("[data-roll-reason]");
  if (!button) return;
  const popup = detailsPopup;
  const alreadyOpen = popup.matches(":popover-open");
  if (alreadyOpen) popup.hidePopover();
  detailsOpener?.setAttribute("aria-expanded", "false");
  if (alreadyOpen && detailsOpener === button) return;
  detailsOpener = button;
  const host = button.closest("dialog") || document.body;
  if (popup.parentElement !== host) host.append(popup);
  const title = getElementById("popoverTitle");
  const heading = button.dataset.detailTitle || (button.classList.contains("spellProperty") ? button.getAttribute("aria-label") : "");
  title.textContent = heading || "Details";
  title.classList.toggle("srOnly", !heading);
  getElementById("popoverBody").textContent = button.dataset.rollReason;
  popup.showPopover({source: button});
  button.setAttribute("aria-expanded", "true");
  const rect = button.getBoundingClientRect();
  popup.style.left = Math.max(4, Math.min(rect.left, innerWidth - popup.offsetWidth - 4)) + "px";
  const below = rect.bottom + 4;
  const above = rect.top - popup.offsetHeight - 4;
  const limit = innerHeight - popup.offsetHeight - 4;
  popup.style.top = Math.max(4, below <= limit ? below : Math.min(above, limit)) + "px";
  popup.focus({preventScroll: true});
});

const combatTabs = [...document.querySelectorAll(".combatTabs [role=tab]")];
function selectCombatTab(selected) {
  for (const tab of combatTabs) {
    const active = tab === selected;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    getElementById(tab.getAttribute("aria-controls")).hidden = !active;
  }
}
combatTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectCombatTab(tab));
  tab.addEventListener("keydown", event => {
    const next = {ArrowLeft: 1 - index, ArrowRight: 1 - index, Home: 0, End: 1}[event.key];
    if (next === undefined) return;
    event.preventDefault();
    selectCombatTab(combatTabs[next]);
    combatTabs[next].focus();
  });
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
