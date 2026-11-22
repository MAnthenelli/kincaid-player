const castDialog = getElementById("castDialog");
const castTitle = getElementById("castTitle");
const castBody = getElementById("castBody");
const castBack = getElementById("castBack");
const castClose = getElementById("castClose");
const castingContexts = {
  all: "Cast a spell", turn: "Action spells", bonus: "Bonus action spells",
  reaction: "War Caster", companion: "Wild Companion"
};
const roleIcons = {Damage: "✦", Control: "⊞", Utility: "◇", Mobility: "↗", Healing: "+"};
let castDraft;

function castChooserButton(parent, label, action, value) {
  return collectionButton(parent, label, label, action, String(value));
}

function openCastChooser(trigger) {
  if (castDialog.open) return;
  if (applicationState.pendingCast) {
    if (elements.infoModal.open) elements.infoModal.close();
    const complete = getElementById("pendingCastComplete");
    (complete?.disabled ? getElementById("pendingCastInterrupt") : complete)?.focus();
    return;
  }
  const kind = trigger.dataset.openCast;
  const spell = trigger.dataset.castName;
  castDraft = {trigger, kind, slot: Number(trigger.dataset.castSlot) || 0,
    role: "", spell, stage: spell ? "options" : "roles", positions: {}};
  castDialog.showModal();
  renderCastChooser();
}

function castEntries(draft) {
  return [...getSpellRecords(), ...initiateSpellRecords.filter(record => initiateChoices(record.name).length)]
    .filter(record => castMethods(record, draft.kind, draft.slot).length)
    .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
}

function renderCastChooser(restore = false) {
  const {kind, slot, role, spell, stage, positions} = castDraft;
  castBack.hidden = stage === "roles" || (stage === "options" && !role);
  castTitle.textContent = stage === "options" ? spell :
    stage === "list" ? role : slot ? "Level " + slot + " spells" : castingContexts[kind];
  castDialog.dataset.stage = stage;
  castBody.replaceChildren();
  if (stage === "roles") {
    const records = castEntries(castDraft);
    if (kind === "reaction") appendText(castBody, "p",
      "When a creature leaves your reach and provokes an opportunity attack, cast at that creature only.");
    const list = appendText(castBody, "div", "");
    list.className = "castRoleGrid";
    for (const role of [...SPELL_ROLES, "All spells"]) {
      const count = records.filter(record => role === "All spells" || record.roles.includes(role)).length;
      const label = count ? role : `No available ${role === "All spells" ? "spells" : role.toLowerCase() + " spells"} in ${castingContexts[kind]}`;
      const button = collectionButton(list, "", label, "castRole", role);
      if (roleIcons[role]) appendText(button, "span", roleIcons[role]).setAttribute("aria-hidden", "true");
      appendText(button, "span", role);
      appendText(button, "small", String(count));
      button.disabled = !count;
    }
    if (!records.length) appendText(castBody, "p", "No spells can be cast in this context.");
  } else if (stage === "list") {
    const list = appendText(castBody, "div", "");
    list.className = "castSpellList";
    const records = castEntries(castDraft).filter(record =>
      role === "All spells" || record.roles.includes(role));
    const entries = records.map(record => ({
      record,
      timing: kind === "reaction" ? "Reaction" : record.castingTime ||
        {action: "Action", bonusAction: "Bonus action", reaction: "Reaction"}[record.actionType],
      ritual: castMethods(record, kind, slot).some(method => method.ritual)
    }));
    const mixedTiming = new Set(entries.map(entry => entry.timing)).size > 1;
    let level = -1;
    for (const {record, timing, ritual} of entries) {
      if (record.level !== level) {
        level = record.level;
        appendText(list, "h3", level ? "Level " + level : "Cantrips");
      }
      const row = castChooserButton(list, record.name, "castChoose", record.name);
      row.className = "castSpellRow";
      row.replaceChildren();
      appendText(row, "span", record.name);
      for (const [visible, letter, description] of [
        [ritual, "R", "Ritual"], [record.requiresConcentration, "C", "Concentration"]
      ]) {
        if (!visible) continue;
        const mark = appendText(row, "span", letter);
        mark.className = "spellProperty castMark";
        mark.title = description;
        mark.setAttribute("aria-hidden", "true");
        row.setAttribute("aria-label", row.getAttribute("aria-label") + ", " + description);
      }
      if (timing && mixedTiming) {
        appendText(row, "small", timing);
        row.setAttribute("aria-label", row.getAttribute("aria-label") + ", " + timing);
      }
    }
  } else {
    const box = appendText(castBody, "div", "");
    box.id = kind + "Progressive";
    progressive(kind, spell, castMethods(getSpellRecord(spell), kind, slot));
    const error = appendText(castBody, "p", "");
    error.id = "castError";
    error.setAttribute("role", "status");
  }
  const previous = restore && positions[stage];
  const focus = previous && [...castBody.querySelectorAll("button")].find(button =>
    button.dataset.castRole === previous.value || button.dataset.castChoose === previous.value);
  (focus || castTitle).focus();
  castBody.scrollTop = previous?.scroll || 0;
}

wireDialogDismissal(castDialog, castClose);
castDialog.addEventListener("close", () => {
  if (castDialog.open || !castDraft) return;
  const {trigger} = castDraft;
  castDraft = null;
  const fallback = getElementById(trigger.id) ||
    [...document.querySelectorAll("[data-open-cast]")].find(button =>
      button.dataset.openCast === trigger.dataset.openCast &&
      button.dataset.castSlot === trigger.dataset.castSlot &&
      button.dataset.castName === trigger.dataset.castName);
  if (applicationState.pendingCast) {
    (getElementById("pendingCastComplete") || getElementById("pendingCastInterrupt"))?.focus();
    return;
  }
  (trigger.isConnected ? trigger : fallback || getElementById("openSpellManagerCast"))?.focus({preventScroll: true});
});
castBack.addEventListener("click", () => {
  if (!castDraft) return;
  castDraft.stage = castDraft.stage === "options" ? "list" : "roles";
  renderCastChooser(true);
});

document.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  if (button.dataset.openCast) openCastChooser(button);
  if (!castDraft || !castDialog.open) return;
  const {castRole, castChoose, castMethod} = button.dataset;
  if (castRole || castChoose) {
    castDraft.positions[castDraft.stage] = {value: castRole || castChoose, scroll: castBody.scrollTop};
    if (castRole) Object.assign(castDraft, {role: castRole, stage: "list"});
    else Object.assign(castDraft, {spell: castChoose, stage: "options"});
    renderCastChooser();
  }
  if (castMethod) commitChooserCast(button);
});

function commitChooserCast(button) {
  const {kind, slot, spell} = castDraft;
  const method = castMethods(getSpellRecord(spell), kind, slot).find(option => option.id === button.dataset.castMethod);
  const error = getElementById("castError");
  if (!method) {
    error.textContent = spellRestriction(spell, kind) || "That casting option is no longer available.";
    return;
  }
  const chosenGrant = getElementById("castAbilitySource")?.value;
  if (chosenGrant && !method.initiate) method.abilitySource = chosenGrant;
  if (method.initiate) method.abilitySource = method.initiate;
  const self = spell === "Shield" || kind !== "reaction" && (SPELL_SELF_TARGET_MODES[spell] === "only" || Boolean(getElementById(kind + "Self")?.checked));
  const healing = self ? Number(getElementById(kind + "Healing")?.value || 0) : 0;
  if (self && ["Cure Wounds", "Healing Word"].includes(spell) && (!Number.isInteger(healing) || healing < 1)) {
    error.textContent = "Enter the healing rolled.";
    getElementById(kind + "Healing")?.focus();
    return;
  }
  const choice = getElementById(kind + "Progressive").querySelector("[data-effect-choice]")?.value ?? null;
  if (method.long) {
    change(() => {
      endConc();
      applicationState.pendingCast = {spell, kind, slot, methodId: method.id, choice, self, healing, abilitySource: method.abilitySource};
    }, "Casting " + spell + ".");
    if (elements.infoModal.open) elements.infoModal.close();
    castDialog.close();
    return;
  }
  button.disabled = true;
  if (castPart(spell, method.level, method.spend, choice, self, healing, method.ritual, method)) castDialog.close();
  else button.disabled = false;
}

function renderPendingCast(parent) {
  const pending = applicationState.pendingCast;
  if (!pending) return;
  const {spell, kind, slot, methodId, choice, self, healing, abilitySource} = pending;
  const record = getSpellRecord(spell);
  const method = castMethods(record, kind, slot).find(candidate => candidate.long && candidate.id === methodId);
  const entry = appendText(parent, "section", "");
  entry.className = "pendingCast";
  appendText(entry, "strong", "Casting " + spell);
  appendText(entry, "small", methodId === "ritual" ? ritualTime(record) + " · no slot" :
    methodId.startsWith("enrich") ? "8 hours" : record.castingTime);
  appendText(entry, "p", method ? "Maintain Concentration and take the Magic action each turn." :
    "This cast can no longer be completed.");
  const controls = appendText(entry, "div", "");
  controls.className = "row wrap";
  const complete = appendText(controls, "button", "Complete");
  complete.id = "pendingCastComplete";
  complete.type = "button";
  complete.disabled = !method;
  complete.onclick = () => {
    if (applicationState.pendingCast !== pending) return;
    const current = castMethods(record, kind, slot).find(candidate => candidate.long && candidate.id === methodId);
    if (current) castPart(spell, current.level, current.spend, choice, self, healing, current.ritual, {...current, abilitySource, pending: true});
  };
  const interrupt = appendText(controls, "button", "Interrupt casting");
  interrupt.id = "pendingCastInterrupt";
  interrupt.type = "button";
  interrupt.onclick = () => {
    if (applicationState.pendingCast === pending)
      change(endConc, "Interrupted " + spell + ".");
  };
}
