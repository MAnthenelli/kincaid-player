function controlIdentity(el) {
  if (!el) return "";
  if (el.id) return "id:" + el.id;
  if (el.closest("[data-entry]")) return JSON.stringify([el.closest("[data-entry]").dataset.entry, el.tagName, el.getAttribute("aria-label"), el.textContent]);
  if (Object.keys(el.dataset).length) return JSON.stringify(el.dataset);
  return "";
}
function render() {
  const focused = document.activeElement;
  const focusKey = controlIdentity(focused);
  document.body.classList.toggle("light", applicationState.lightThemeEnabled);
  elements.theme.textContent = applicationState.lightThemeEnabled
    ? "Dark"
    : "Light";
  elements.notice.textContent = applicationState.noticeMessage;
  elements.hp.textContent = applicationState.currentHitPoints;
  elements.temp.textContent = applicationState.temporaryHitPoints;
  elements.hpbar.style.width =
    (applicationState.currentHitPoints / MAX) * 100 + "%";
  elements.tempbar.style.width =
    Math.min(100, (applicationState.temporaryHitPoints / MAX) * 100) + "%";
  const mods = conditionModifiers();
  elements.defense.innerHTML = defenseDisplay();
  elements.defense.classList.toggle("hidden", !elements.defense.textContent);
  if (elements.defense.textContent) elements.defense.prepend("Defenses · ");
  elements.death.classList.toggle(
    "hidden",
    applicationState.currentHitPoints > 0
  );
  elements.deathPips.innerHTML = conditionHint(mods.d20 ? rollDisplay(0, "death") + " to death saves" : "") + `<div class="resourceRow"><span>Successes</span>${pips("deathS", applicationState.deathSaves.successes, 3, "success")}<b>${applicationState.deathSaves.successes}/3</b></div><div class="resourceRow"><span>Failures</span>${pips("deathF", applicationState.deathSaves.failures, 3, "failure")}<b>${applicationState.deathSaves.failures}/3</b></div>`;
  renderForm();
  renderCombatSelections();
  getElementById("actionRestriction").textContent = mods.incapacitated
    ? "Unavailable while Incapacitated · Actions, Bonus Actions, and Reactions" : "";
  const expanded = new Set([...document.querySelectorAll("#activeStatus details[open]")].map(entry => entry.dataset.entry));
  renderEffects(expanded);
  renderConditions(expanded);
  renderResources();
  renderSaves();
  renderLibraries();
  const formName = applicationState.activeFormId ? getFormRecord(applicationState.activeFormId).name : "Dragonborn";
  const count = document.querySelectorAll("#activeStatus details").length;
  elements.stickyState.innerHTML = `<span class="stickyForm">${formName} · ${currentSize()}</span><b>HP ${applicationState.currentHitPoints}/${MAX}</b>${applicationState.temporaryHitPoints ? `<span>+${applicationState.temporaryHitPoints} temp</span>` : ""}<span>AC ${currentAC()}</span><a href="#activeStatus" aria-label="View ${count} active effects">Effects ${count}</a>`;
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
  const alertBonus = kincaid.alert ? proficiencyBonus : 0;
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
const skillAbilities = {perception:"WIS", stealth:"DEX", athletics:"STR", acrobatics:"DEX", survival:"WIS"};
function liveFormSkills(text) {
  return text.replace(/(passive perception )([0-9]+)|([a-z]+) ([+-]\d+)/gi, (_, passive, score, skill, bonus) => {
    if (passive) {
      return passive + rollDisplay(Number(score), "passive", "WIS", "perception");
    }
    return skill + " " + rollDisplay(Number(bonus), "check", skillAbilities[skill.toLowerCase()], skill.toLowerCase());
  });
}
function liveMovement() {
  return speedText() + conditionHint(conditionModifiers().movement);
}
function renderForm() {
  let formRecord = getFormRecord(applicationState.activeFormId);
  elements.currentFormInfo.hidden = !formRecord;
  elements.currentFormInfo.setAttribute(
    "aria-label",
    formRecord ? `${formRecord.name} information` : "No form selected"
  );
  elements.currentFormInfo.title = formRecord
    ? `${formRecord.name} information`
    : "No form selected";
  if (!formRecord) {
    elements.formTitle.textContent = "Dragonborn";
    elements.formRole.textContent = `Darkvision ${kincaid.darkvision} ft` + (conditionModifiers().has("sightFails") ? " · Sight-dependent checks fail" : "");
    elements.formData.innerHTML = `<div class="row wrap"><b>AC ${currentAC()}</b><b>${currentSize()}</b><b>Initiative ${initiativeText()}</b></div><div class="row wrap"><span>${liveMovement()}</span>${selfSenses() ? `<span>${selfSenses()}</span>` : ""}</div>`;
    return;
  }
  elements.formTitle.textContent = `${formRecord.name} · ${getFormRuleset(formRecord)}`;
  elements.formRole.textContent = formRecord.roleDescription;
  elements.formData.innerHTML = `<div class="row wrap"><b>AC ${currentAC()}</b><b>${currentSize()}</b><b>Initiative ${initiativeText()}</b></div><div class="row wrap"><span>${liveMovement()}</span>${selfSenses() ? `<span>${selfSenses()}</span>` : ""}${formRecord.sensesAndSkillsDescription ? `<span>${liveFormSkills(formRecord.sensesAndSkillsDescription)}</span>` : ""}<button id="radiantToggle" class="${applicationState.radiantStrikeActive ? "active" : ""}">${applicationState.radiantStrikeActive ? "Show attacks as Radiant: ON" : "Show attacks as Radiant: OFF"}</button></div>`;
}
function formActionText(name, detail) {
  if (!attackBonusPattern.test(detail)) return detail + (/saving throw|\bsave\b|escape DC/i.test(detail) ? harmfulTargetHint() : "");
  if (!applicationState.radiantStrikeActive || name === "Multiattack")
    return liveAttackText(detail);
  // Change the hit damage only. Secondary saves, conditions and immunities
  // retain their own rules text (for example the Giant Spider's poison).
  return liveAttackText(detail.replace(/(\d(?:\s*\))?\s+)(piercing|slashing|bludgeoning|poison)(?=\s+damage|[., ·]|$)/i, "$1radiant"));
}
function renderTurn() {
  let formRecord = getFormRecord(applicationState.activeFormId);
  if (formRecord) {
    elements.actions.innerHTML =
      formRecord.actions
        .map((action) =>
          choice(
            action.name + (action.opportunityAttack ? oaMarker() : ""),
            formActionText(action.name, action.description)
          )
        )
        .join("") +
      spellControl();
    elements.bonus.innerHTML =
      formRecord.bonusActions
        .map((action) =>
          choice(
            action.name + (action.opportunityAttack ? oaMarker() : ""),
            formActionText(action.name, action.description)
          )
        )
        .join("") + formControl();
  } else {
    elements.actions.innerHTML =
      spellControl() +
      `<label class="choice"><button id="useBreath">Cold Breath</button><small>${applicationState.breathWeaponUses}/${proficiencyBonus} uses · Replace one attack · 15-ft cone or 30-ft line · DC ${breathSaveDC} DEX · fail: 2d10 cold · success: half${harmfulTargetHint()}</small></label>`;
    elements.bonus.innerHTML =
      bonusSpellControl() +
      formControl() +
      `<label class="choice"><button id="useFlight">Draconic Flight</button><small>Bonus Action · once per Long Rest · lasts 10 minutes · Fly Speed equals Speed · ends if retracted or Incapacitated</small></label>`;
  }
  if (applicationState.concentrationEffect === "Moonbeam")
    elements.actions.insertAdjacentHTML("beforeend", choice("Move Moonbeam", "Magic action · move up to 60 ft" + harmfulTargetHint()));
  const restrictions = conditionModifiers();
  const reactionNote = restrictions.sources("blockReaction").length && !restrictions.incapacitated ? conditionHint("Cannot take Reactions") : "";
  elements.reaction.innerHTML = reactionNote + opportunityOptions() + reactionSpellControl();
  let flightButton = getElementById("useFlight");
  if (flightButton)
    flightButton.disabled = applicationState.draconicFlightState !== "ready";
}
