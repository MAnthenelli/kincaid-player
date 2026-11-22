function controlIdentity(el) {
  if (!el) return "";
  if (el.id) return "id:" + el.id;
  if (el.closest("[data-entry]")) return JSON.stringify([el.closest("[data-entry]").dataset.entry, el.tagName, el.getAttribute("aria-label"), el.textContent]);
  if (el.dataset.skill) return "skill:" + el.dataset.skill;
  if (el.parentElement?.hasAttribute("data-action-details"))
    return "action:" + (el.closest("[id]")?.id || "") + ":" + el.textContent;
  if (Object.keys(el.dataset).length) return JSON.stringify(el.dataset);
  return "";
}
function render() {
  const focused = document.activeElement;
  const focusKey = controlIdentity(focused);
  document.body.classList.toggle("light", applicationState.lightThemeEnabled);
  elements.theme.setAttribute("aria-checked", String(!applicationState.lightThemeEnabled));
  getElementById("themeState").textContent = applicationState.lightThemeEnabled ? "Off" : "On";
  elements.notice.textContent = applicationState.noticeMessage;
  const maxHP = currentMaxHP();
  const aid = aidApplication();
  elements.hp.textContent = applicationState.currentHitPoints;
  getElementById("maximumHP").innerHTML = explainedRoll(String(maxHP),
    aid ? [`${maximumBaseHP(applicationState.featChoices)} + ${aidBonus()} from ${aid.source} (level ${aid.value})`] : []);
  elements.temp.textContent = applicationState.temporaryHitPoints;
  elements.hpbar.style.width =
    (applicationState.currentHitPoints / maxHP) * 100 + "%";
  elements.tempbar.style.width =
    Math.min(100, (applicationState.temporaryHitPoints / maxHP) * 100) + "%";
  const mods = conditionModifiers();
  elements.defense.innerHTML = defenseDisplay(true);
  elements.defense.classList.toggle("hidden", !elements.defense.textContent);
  elements.death.classList.toggle(
    "hidden",
    applicationState.currentHitPoints > 0
  );
  elements.deathPips.innerHTML = conditionHint(mods.d20 ? rollDisplay(0, "death") + " to death saves" : "") + `<div class="resourceRow"><span>Successes</span>${pips("deathS", applicationState.deathSaves.successes, 3, "success")}<b>${applicationState.deathSaves.successes}/3</b></div><div class="resourceRow"><span>Failures</span>${pips("deathF", applicationState.deathSaves.failures, 3, "failure")}<b>${applicationState.deathSaves.failures}/3</b></div>`;
  renderForm();
  const openRules = new Set([...document.querySelectorAll("[data-action-details][open] > summary")].map(controlIdentity));
  renderCombatSelections();
  for (const title of document.querySelectorAll("[data-action-details] > summary")) {
    if (openRules.has(controlIdentity(title))) title.parentElement.open = true;
  }
  getElementById("actionRestriction").textContent = mods.incapacitated
    ? "Incapacitated. You can’t act or react."
    : mods.records.map(record => record.turnRestriction).filter(Boolean).join(" · ");
  const expanded = new Set([...document.querySelectorAll("#activeStatus details[open]")].map(entry => entry.dataset.entry));
  renderEffects(expanded);
  renderConditions(expanded);
  renderResources();
  renderSaves();
  renderSkills();
  renderSelections();
  renderInventory();
  renderFeats();
  const formName = applicationState.activeFormId ? getFormRecord(applicationState.activeFormId).name : "Dragonborn";
  const count = document.querySelectorAll("#activeStatus details").length;
  elements.stickyState.innerHTML = `<span class="stickyForm">${formName} · ${currentSize()}</span><b>HP ${applicationState.currentHitPoints}/${maxHP}</b>${applicationState.temporaryHitPoints ? `<span>+${applicationState.temporaryHitPoints} temp</span>` : ""}<span>AC ${currentAC()}</span><a href="#activeStatus" aria-label="View ${count} active effects">Effects ${count}</a>`;
  elements.undo.disabled = !applicationState.undoHistory.length;
  const lastChange = undoLabels.get(applicationState.undoHistory.at(-1));
  for (const button of [elements.undo, getElementById("feedbackUndo")]) {
    button.disabled = elements.undo.disabled;
    button.title = lastChange ? "Undo · " + lastChange : "Undo";
    button.setAttribute("aria-label", button.title);
  }
  getElementById("feedback").hidden = !applicationState.noticeMessage;
  document.querySelector(".tempLine").hidden = !applicationState.temporaryHitPoints;
  if (focusKey && !focused.isConnected) {
    const replacement = [...document.querySelectorAll("button, select, input, summary")].find(el => controlIdentity(el) === focusKey);
    replacement?.focus({preventScroll: true});
  }
}
function currentInitiative() {
  const alertBonus = hasFeat("alert") ? proficiencyBonus : 0;
  const form = getFormRecord(applicationState.activeFormId);
  if (!form) return abilityModifier("dexterity") + alertBonus;
  const creature = BASE_CREATURES[form.baseCreatureId];
  const base = creature?.initiative ? Number.parseInt(creature.initiative, 10) : form.abilityModifiers.dexterity;
  // Retain Alert; a printed initiative already including proficiency does not add it twice.
  return Math.max(base, form.abilityModifiers.dexterity + alertBonus);
}
function initiativeText() {
  return rollDisplay(currentInitiative(), "initiative", "DEX");
}
function liveFormSkills(text, form) {
  return text.replace(printedSkillPattern, (_, passive, score, skill, bonus) => {
    if (passive) return passive + rollDisplay(Number(score), "passive", "WIS", "perception");
    const key = skill.toLowerCase();
    const name = skillByName.get(key);
    const base = skillBase(name, form, Number(bonus));
    return skill + " " + rollDisplay(base, "check", characterSkills[name], key);
  });
}
function additionalSkills(form, printed = "") {
  const names = new Set();
  const guidance = effectApplications("guidance")[0];
  if (guidance) names.add(guidance.value);
  if (conditionModifiers().records.some(record => record.skillBonus?.stealth)) names.add("Stealth");
  const existing = new Set([...printed.matchAll(printedSkillPattern)].map(match => match[3]?.toLowerCase()));
  return [...names].filter(name => !existing.has(name.toLowerCase())).map(name =>
    `<span>${name} ${rollDisplay(skillBase(name, form), "check", characterSkills[name], name.toLowerCase())}</span>`
  ).join("");
}
function liveAC() {
  const equipment = applicationState.activeFormId ? [] : protectionGear().map(id => "+1 AC from " + itemById.get(id).name);
  return explainedRoll(String(currentAC()), [...liveModifiers().armorSources, ...equipment]);
}
function liveMovement() {
  return explainedRoll(speedText(), liveModifiers().speedSources) + conditionHint(conditionModifiers().movement);
}
function liveSize() {
  return explainedRoll(currentSize(), liveModifiers().sizeSources);
}
function liveStrengthCheck(form) {
  if (!liveModifiers().sizeSources.length) return "";
  const strength = form?.abilityModifiers.strength ?? abilityModifier("strength");
  return `<span>STR checks ${rollDisplay(strength, "check", "STR")}</span>`;
}
function renderForm() {
  let formRecord = getFormRecord(applicationState.activeFormId);
  elements.currentFormInfo.hidden = !formRecord;
  elements.currentFormInfo.setAttribute(
    "aria-label",
    formRecord ? `${formRecord.name} details` : "No form selected"
  );
  elements.currentFormInfo.title = formRecord
    ? `${formRecord.name} details`
    : "No form selected";
  elements.formTitle.textContent = formRecord ? formDisplayName(formRecord, applicationState.knownFormIds.map(getFormRecord)) : "Dragonborn";
  elements.formRole.textContent = formRecord?.roleDescription || `Darkvision ${kincaid.darkvision} ft`;
  const skills = formRecord?.sensesAndSkillsDescription || "";
  const extras = [
    conditionModifiers().has("sightFails") ? "<span>Sight-dependent checks fail</span>" : "",
    selfSenses() ? `<span>${selfSenses()}</span>` : "",
    liveStrengthCheck(formRecord),
    skills ? `<span>${liveFormSkills(skills, formRecord)}</span>` : "",
    additionalSkills(formRecord, skills)
  ].filter(Boolean).join("");
  elements.formData.innerHTML = `
    <dl class="formStats">
      <div><dt>AC</dt> <dd>${liveAC()}</dd></div>
      <div><dt>Speed</dt> <dd>${liveMovement()}</dd></div>
      <div><dt>Initiative</dt> <dd>${initiativeText()}</dd></div>
      <div><dt>Size</dt> <dd>${liveSize()}</dd></div>
    </dl>
    ${extras ? `<div class="row wrap formExtras">${extras}</div>` : ""}
    ${formRecord ? `<button id="radiantToggle" aria-pressed="${applicationState.radiantStrikeActive}">Radiant attacks</button>` : ""}`;
}

const breathShapes = {"cone": "15-ft cone", "line": "30-ft line"};
function breathControl() {
  const uses = applicationState.breathWeaponUses;
  return `<div class="choice turnFeature">
    <div class="featureHead"><b>Cold Breath</b>${detailButton("ⓘ", "The line is 5 ft wide. A successful save takes half damage.", "inlineHelp", "Cold Breath rules")}</div>
    <p class="rollFacts">DEX DC ${breathSaveDC()} · 2d10 cold</p>
    <p class="featureRule">Replaces one attack</p>
    ${harmfulTargetHint()}
    <div class="row wrap featureControls">
      <select id="breathShape" aria-label="Cold Breath shape" ${uses ? "" : "disabled"}><option value="">Choose shape</option>${Object.entries(breathShapes).map(([id,label]) => `<option value="${id}">${label}</option>`).join("")}</select>
      <button id="useBreath" disabled>Use breath</button>
    </div>
    <small>${uses ? "Costs 1 use" : "No uses left"}</small>
  </div>`;
}

function flightControl() {
  const state = applicationState.draconicFlightState;
  return `<div class="choice turnFeature">
    <div class="featureHead"><b>Draconic Flight</b>${detailButton("ⓘ", "Fly Speed equals your Speed for 10 minutes. Ends if you retract your wings or become Incapacitated.", "inlineHelp", "Draconic Flight rules")}</div>
    <div class="row wrap featureControls"><button id="useFlight" ${state === "ready" ? "" : "disabled"}>Take flight</button><small>${state === "ready" ? "1 use per long rest" : flightLabels[state]}</small></div>
  </div>`;
}

function formActionText(name, detail) {
  if (!attackBonusPattern.test(detail)) return detail + (/saving throw|\bsave\b|escape DC/i.test(detail) ? harmfulTargetHint() : "");
  return liveAttackText(formDamageText(name, detail));
}
function formDamageText(name, detail) {
  if (!applicationState.radiantStrikeActive || name === "Multiattack") return detail;
  // Change the hit damage only. Secondary saves, conditions and immunities
  // retain their own rules text (for example the Giant Spider's poison).
  return detail.replace(/(\d(?:\s*\))?\s+)(piercing|slashing|bludgeoning|poison)(?=\s+damage|[., ·]|$)/i, "$1radiant");
}
function formChoice(action) {
  const label = action.name + (action.opportunityAttack ? oaMarker() : "");
  const detail = attackBonusPattern.test(action.description)
    ? formDamageText(action.name, action.description) : action.description;
  return choice(label, formActionText(action.name, action.description), compactAttack(detail));
}
function renderTurn() {
  if (isGaseous()) {
    elements.actions.textContent = "Gaseous Form · No attacks or spells";
    elements.reaction.textContent = "";
    elements.bonus.replaceChildren();
    renderInventoryActions();
    return;
  }
  let formRecord = getFormRecord(applicationState.activeFormId);
  if (formRecord) {
    elements.actions.innerHTML =
      formRecord.actions
        .map(formChoice)
        .join("") +
      spellControl();
    elements.bonus.innerHTML =
      formRecord.bonusActions
        .map(formChoice)
        .join("") + bonusSpellControl() + formControl();
  } else {
    elements.actions.innerHTML = equippedWeaponChoices() + spellControl() + breathControl();
    if (hasFeat("grappler")) elements.actions.insertAdjacentHTML("beforeend",
      choice("Punch and Grab", "Once per turn when your Unarmed Strike hits as part of the Attack action, choose both damage and grapple. Moving a creature your size or smaller that you grapple costs no extra movement."));
    if (activeConsumables().some(({effect}) => effect.haste)) elements.actions.insertAdjacentHTML("beforeend",
      choice("Haste action", "Use for one weapon attack, Dash, Disengage, Hide, or Use an Object."));
    elements.bonus.innerHTML = bonusSpellControl() + formControl() + flightControl();
  }
  if (applicationState.concentrationEffect === "Moonbeam")
    elements.actions.insertAdjacentHTML("beforeend", choice("Move Moonbeam", "Magic action · move up to 60 ft", "60 ft" + harmfulTargetHint()));
  const restrictions = conditionModifiers();
  const reactionSources = restrictions.sources("blockReaction");
  elements.reaction.innerHTML = reactionSources.length && !restrictions.incapacitated
    ? explainedRoll("Cannot take Reactions", reactionSources)
    : opportunityOptions() + reactionSpellControl();
  renderInventoryActions();
}
