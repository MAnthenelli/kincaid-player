const attackBonusPattern = /(attack(?: roll)?[: ]+)([+-]\d+)|([+-]\d+)(?= to hit)/i;
function liveAttackText(detail) {
  const match = detail.match(attackBonusPattern);
  if (!match) return detail;
  const tail = detail.slice(match.index + match[0].length);
  const suffix = tail.startsWith(" to hit") ? " to hit" : "";
  return detail.slice(0, match.index) + (match[1] || "") +
    rollDisplay(Number(match[2] || match[3]), "attack", "", "", suffix, tail.slice(suffix.length));
}
function choice(label, detail = "") {
  return `<div class="combatOption"><b>${label}</b>${detail ? `<small>${detail}</small>` : ""}</div>`;
}
function oaEligible(formId, actionName) {
  let formRecord = getFormRecord(formId);
  return Boolean(
    formRecord &&
    formRecord.actions.some(
      (action) => action.name === actionName && action.opportunityAttack
    )
  );
}
function oaMarker() {
  return '<span class="oaMark" title="Available for an Opportunity Attack">OA</span>';
}
function opportunityRoll(action) {
  const note = action.opportunityAttack.note;
  if (attackBonusPattern.test(note)) return liveAttackText(note);
  const match = action.description.match(attackBonusPattern);
  return match ? rollDisplay(Number(match[2] || match[3]), "attack", "", "", " to hit", " · " + note) : note;
}
function opportunityOptions() {
  const notes = conditionModifiers().records.map(record => record.opportunityNote).filter(Boolean);
  if (notes.length) return choice("Opportunity Attack", notes.join(" · "));
  if (!applicationState.activeFormId)
    return choice(
      "Opportunity Attack",
      `Unarmed Strike · Damage: ${rollDisplay(abilityModifier("strength") + proficiencyBonus, "attack", "", "", " to hit")} · Grapple or Shove${harmfulTargetHint()}`
    );
  let options = getFormOpportunityAttackActions(
    getFormRecord(applicationState.activeFormId)
  )
    .map(
      (action) =>
        `<div class="oaLine"><b>${action.name}</b><span>${opportunityRoll(action)}</span></div>`
    )
    .join("");
  options += `<div class="oaLine"><b>Unarmed Strike</b><span>Shove${harmfulTargetHint()}</span></div>`;
  return choice("Opportunity Attack", `<div class="oaList">${options}</div>`);
}
function castLevels(name) {
  let base = SPELL_METADATA[name][0];
  if (!base) return [];
  if (!SPELL_UPCAST_RULES.includes(name)) return [base];
  return spellSlotLevels.filter((x) => x >= base);
}
function levelPips(level) {
  return level
    ? `<span class="levelPips">${"◇".repeat(level)}</span>`
    : '<span class="levelPips">◆</span>';
}
function spellOptions(list) {
  return `<option value="">Choose spell</option>${list
    .filter((x) => SPELL_METADATA[x])
    .map((x) => `<option>${x}</option>`)
    .join("")}`;
}
function caster(kind, list) {
  return `<div class="inline casterControls"><select aria-label="${kind === "turn" ? "Action" : kind} spell" id="${kind}Spell">${spellOptions(list)}</select><div id="${kind}Progressive"></div></div>`;
}
function spellControl() {
  let list = (
    applicationState.activeFormId
      ? [...CIRCLE_CANTRIPS, ...CIRCLE_SPELLS]
      : [
          ...new Set([
            ...applicationState.knownCantripNames,
            ...CIRCLE_CANTRIPS,
            ...applicationState.preparedSpellNames,
            ...ALWAYS_PREPARED_SPELLS
          ])
        ]
  ).filter((x) => SPELL_CASTING_RULES[x] !== "bonus");
  return caster("turn", list);
}
function bonusSpellControl() {
  if (applicationState.activeFormId) return "";
  let list = [...applicationState.knownCantripNames, ...applicationState.preparedSpellNames].filter(
    (x) => SPELL_CASTING_RULES[x] === "bonus"
  );
  return list.length ? caster("bonus", list) : "";
}
function reactionSpellControl() {
  if (!kincaid.warCaster) return "";
  let list = (
    applicationState.activeFormId
      ? [...CIRCLE_CANTRIPS, ...CIRCLE_SPELLS]
      : [
          ...new Set([
            ...applicationState.knownCantripNames,
            ...CIRCLE_CANTRIPS,
            ...applicationState.preparedSpellNames,
            ...ALWAYS_PREPARED_SPELLS
          ])
        ]
  ).filter((x) => REACTION_SPELLS.includes(x));
  return `<div>${caster("reaction", list)}<small class="warCasterNote">War Caster · Reaction when a creature leaves your reach · spell must target only that creature</small></div>`;
}
const spellAttacks = new Set(["Starry Wisp", "Ice Knife", "Poison Spray", "Thorn Whip", "Flame Blade", "Produce Flame"]);
const targetSaveSpells = new Set(["Animal Friendship", "Call Lightning", "Charm Person", "Conjure Animals", "Enlarge/Reduce", "Entangle", "Faerie Fire", "Flaming Sphere", "Gust of Wind", "Heat Metal", "Hold Person", "Ice Knife", "Moonbeam", "Sleet Storm", "Thunderclap", "Thunderwave", "Wind Wall"]);
function spellResolution(name) {
  const lines = [];
  if (spellAttacks.has(name)) {
    const label = ["Flame Blade", "Produce Flame"].includes(name) ? "When attacking" : "Spell Attack";
    lines.push(label + " " + rollDisplay(spellAttackBonus, "attack"));
  }
  if (targetSaveSpells.has(name)) lines.push("Spell Save DC " + spellSaveDC + (spellAttacks.has(name) ? "" : harmfulTargetHint()));
  if (name === "Spike Growth") lines.push(harmfulTargetHint());
  if (name === "Dispel Magic") lines.push("Higher-level spell · WIS check " + rollDisplay(abilityModifier("wisdom"), "check", "WIS"));
  return lines.filter(Boolean).map(line => `<div class="spellResolution"><span>${line}</span></div>`).join("");
}
function progressive(kind, name) {
  let box = getElementById(kind + "Progressive");
  if (!box) return;
  if (!name) {
    box.innerHTML = "";
    return;
  }
  let base = SPELL_METADATA[name][0],
    levels = castLevels(name),
    self = SPELL_SELF_TARGET_MODES[name],
    html = `<div class="selectedSpellCard"><div class="spellMeta">${levelPips(base)} <b>${name}</b><span class="muted">${base ? "Level " + base : "Cantrip"} · ${SPELL_SCHOOLS[name] || ""}</span></div>${spellResolution(name)}<small class="support">${(SPELL_QUICK_TEXT[name] || "").replace(/(spell attack) [+-]\d+/i, "$1")}</small>`;
  if (levels.length > 1)
    html += `<select aria-label="Spell slot level" id="${kind}Slot">${levels.map((x) => `<option value="${x}">Level ${x} · ${applicationState.spellSlots[x]}/${kincaid.spellSlotMaximums[x]} slots</option>`).join("")}</select>`;
  else if (base)
    html += `<input type="hidden" id="${kind}Slot" value="${base}">`;
  const choiceField = getEffectDefinition(name)?.choice;
  if (choiceField) {
    html += `<label class="spellField">${choiceField.label} <select data-effect-choice id="${kind}${choiceField.field}">${choiceField.values.map(value => `<option value="${value}">${value[0].toUpperCase() + value.slice(1)}</option>`).join("")}</select></label>`;
  }
  if (self === "optional")
    html += `<label class="spellField"><input type="checkbox" id="${kind}Self"> <span>Target Kincaid</span></label>`;
  if (self === "only")
    html += `<small class="spellField">Target: Kincaid</small>`;
  if (["Cure Wounds", "Healing Word"].includes(name))
    html += `<label id="${kind}HealingWrap" class="spellField hidden"><span>Healing rolled</span><input type="number" id="${kind}Healing" min="0" inputmode="numeric" aria-label="Healing rolled in Hit Points"><span>HP</span></label>`;
  const restriction = spellRestriction(name, kind);
  if (restriction === "Verbal component unavailable") html += conditionHint(restriction);
  if (getSpellRecord(name)?.components.includes("s")) {
    for (const record of conditionModifiers().records)
      if (record.somaticReminder) html += conditionHint(record.somaticReminder);
  }
  const disabled = restriction ? "disabled" : "";
  html += `<div class="row wrap"><button class="infoBtn" data-spell-info="${kind}" aria-label="${name} information" title="${name} information">ⓘ</button><button data-cast="${kind}" ${disabled}>Cast</button>${base && levels.length === 1 ? `<small>${applicationState.spellSlots[base]}/${kincaid.spellSlotMaximums[base]} level ${base} slots</small>` : ""}`;
  if (canCastAsRitual(kind, name)) {
    html += `<span class="row"><button data-cast="${kind}" data-ritual aria-describedby="ritualCost" ${disabled}>Cast as ritual</button><small id="ritualCost">+10 min · No slot</small></span>`;
  }
  html += "</div></div>";
  box.innerHTML = html;
}
function formControl() {
  return `<div class="inline"><div class="row wrap"><select aria-label="Wild Shape form" id="turnForm"><option value="">Choose form</option>${applicationState.knownFormIds.map((formId) => `<option value="${formId}">${getFormRecord(formId).name} · ${getFormRuleset(getFormRecord(formId))}</option>`).join("")}</select><button class="infoBtn" data-form-info="current" aria-label="Selected form information" title="Selected form information" hidden disabled>ⓘ</button><button id="shapeNow" hidden>${applicationState.activeFormId ? "Change form" : "Wild Shape"}</button>${applicationState.activeFormId ? '<button id="leaveNow">Return to Dragonborn</button>' : ""}</div><small>${applicationState.activeFormId ? "Change form · 1 use" : "1 use"} · ${applicationState.wildShapeUses}/${kincaid.maximumWildShapeUses} available</small></div>`;
}

let renderedFormId;
// The draft belongs to its picker. Restore it only while that spell is available.
function renderCombatSelections() {
  const selectors = [".casterControls select", ".casterControls input"];
  if (renderedFormId === applicationState.activeFormId) selectors.push("#turnForm");
  renderedFormId = applicationState.activeFormId;
  const fields = [...document.querySelectorAll(selectors.join(", "))]
    .filter(field => field.id && field.value)
    .map(field => ({id: field.id, value: field.value, checked: field.checked}));
  renderTurn();
  if (conditionModifiers().incapacitated) {
    for (const button of document.querySelectorAll("#shapeNow, #leaveNow, #useFlight, #useBreath"))
      button.disabled = true;
  }
  for (const field of fields) {
    const control = getElementById(field.id);
    if (!control || (control.options && ![...control.options].some(option => option.value === field.value))) continue;
    control.value = field.value;
    if (control.type === "checkbox") control.checked = field.checked;
    control.dispatchEvent(new Event("change", {bubbles: true}));
  }
}
