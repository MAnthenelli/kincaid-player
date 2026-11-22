const skillNames = Object.keys(characterSkills);
const skillByName = new Map(skillNames.map(name => [name.toLowerCase(), name]));
const printedSkillPattern = new RegExp(`(passive perception )(\\d+)|(${skillNames.join("|")}) ([+-]\\d+)`, "gi");
const skillAbilityNames = Object.fromEntries(
  Object.keys(kincaid.abilityScores).map(name => [name.slice(0, 3).toUpperCase(), name])
);
const skillSearch = getElementById("skillSearch");
const skillSort = getElementById("skillSort");
const skillList = getElementById("skillList");

function skillBasis(name, form, printedBonus) {
  const ability = skillAbilityNames[characterSkills[name]];
  const modifier = form?.abilityModifiers[ability] ?? abilityModifier(ability);
  const ranks = kincaid.skillProficiencies[name] || Number(skilledChoices().includes(name));
  const training = ranks * proficiencyBonus;
  const magician = kincaid.primalOrder === "Magician" && (name === "Arcana" || name === "Nature")
    ? Math.max(1, abilityModifier("wisdom")) : 0;
  const retained = modifier + training + magician;
  const usesBeastBonus = Number.isFinite(printedBonus) && printedBonus > retained;
  return {name, base: usesBeastBonus ? printedBonus : retained, modifier, ranks, training, magician, retained, usesBeastBonus};
}

function skillBase(name, form, printedBonus) {
  return skillBasis(name, form, printedBonus).base;
}

function printedSkillBonuses(form) {
  const matches = (form?.sensesAndSkillsDescription || "").matchAll(printedSkillPattern);
  return new Map([...matches].filter(match => match[3]).map(match => [
    skillByName.get(match[3].toLowerCase()), Number(match[4])
  ]));
}

function skillButton(name, form, printedBonus, showAbility) {
  const ability = characterSkills[name];
  const basis = skillBasis(name, form, printedBonus);
  const {value, skillDie, result, qualifiers, reasons} = resolveRoll(basis.base, "check", ability, name.toLowerCase());
  const row = document.createElement("button");
  row.type = "button";
  row.className = "skillCell";
  row.dataset.skill = name;
  row.setAttribute("aria-haspopup", "dialog");
  const label = appendText(row, "span", name);
  if (showAbility) appendText(label, "small", ability).className = "skillAbility";
  if (basis.ranks) {
    const expertise = basis.ranks === 2;
    const mark = appendText(label, "small", expertise ? "E" : "P");
    mark.className = "skillTraining";
    mark.setAttribute("aria-hidden", "true");
    appendText(label, "span", expertise ? " · Expertise" : " · Proficient").className = "srOnly";
  }
  const roll = appendText(row, "b", value + (skillDie ? " + " + skillDie : ""));
  const badge = rollBadge(rollMode(result, qualifiers));
  roll.insertAdjacentHTML("beforeend", badge);
  for (const [prefix, short] of [["Sight-dependent", "Sight checks fail"], ["Hearing-dependent", "Hearing checks fail"], ["Disadvantage while the source is visible", "Disadvantage if source visible"]]) {
    if (qualifiers.some(rule => rule.startsWith(prefix))) appendText(label, "small", short).className = "skillQualifier";
  }

  row.setAttribute("aria-controls", "rollExplanation");
  row.setAttribute("aria-expanded", "false");
  row.dataset.detailTitle = name;
  row.dataset.rollReason = skillBreakdown(basis, ability, form, result, reasons, qualifiers);
  return row;
}

function skillBreakdown(basis, ability, form, result, reasons, qualifiers) {
  const attribute = skillAbilityNames[ability];
  const terms = [attribute[0].toUpperCase() + attribute.slice(1) + " " + signedRoll(basis.modifier)];
  if (basis.ranks) terms.push(((kincaid.skillProficiencySources[basis.name] || (skilledChoices().includes(basis.name) ? "Skilled" : "")) || (basis.ranks === 2 ? "Expertise" : "Proficiency")) + " " + signedRoll(basis.training));
  if (basis.magician) terms.push("Primal Order (Magician) " + signedRoll(basis.magician));
  const formula = terms.length > 1 ? terms.join(" · ") + " = " + signedRoll(basis.retained) : terms[0];
  const lines = [formula];
  if (basis.usesBeastBonus) lines.push(`Using ${form.name}’s higher stat block modifier (${signedRoll(basis.base)}).`);
  if (result === "Advantage and Disadvantage cancel") lines.push("Advantage and Disadvantage cancel.");
  lines.push(...reasons.filter(reason => reason !== "When both apply, roll one d20" || result !== "Advantage and Disadvantage cancel"));
  lines.push(...qualifiers.filter(rule => !reasons.some(reason => reason.includes(rule))));
  return lines.join("\n");
}

function renderSkills() {
  const form = getFormRecord(applicationState.activeFormId);
  const printed = printedSkillBonuses(form);
  const byAbility = skillSort.value === "ability";
  const terms = skillSearch.value.toLowerCase().trim().split(/\s+/);
  const names = skillNames.filter(name => {
    const ability = characterSkills[name];
    const searchText = `${name} ${ability} ${skillAbilityNames[ability]}`.toLowerCase();
    return terms.every(term => searchText.includes(term));
  }).sort((a, b) => a.localeCompare(b));
  skillList.replaceChildren();
  if (!names.length) {
    appendText(skillList, "p", "No matching skills.").className = "muted";
    return;
  }
  if (byAbility) {
    for (const [ability, label] of Object.entries(skillAbilityNames)) {
      const groupNames = names.filter(name => characterSkills[name] === ability);
      if (!groupNames.length) continue;
      const group = appendText(skillList, "div", "");
      group.className = "skillGroup";
      appendText(group, "h3", label[0].toUpperCase() + label.slice(1));
      const grid = appendText(group, "div", "");
      grid.className = "skillGrid";
      for (const name of groupNames) grid.append(skillButton(name, form, printed.get(name), false));
    }
  } else {
    const grid = appendText(skillList, "div", "");
    grid.className = "skillGrid";
    for (const name of names) grid.append(skillButton(name, form, printed.get(name), true));
  }
}

skillSearch.addEventListener("input", renderSkills);
skillSort.addEventListener("change", renderSkills);
