const featChoiceRules = {
  skilled: {training: true},
  "magic-initiate": {spells: true},
  "ability-score-improvement": {points: 2, cap: 20},
  grappler: {points: 1, cap: 20, abilities: ["strength", "dexterity"]},
  ...Object.fromEntries(FEAT_RECORDS.filter(feat => feat.category === "Epic Boon").map(feat =>
    [feat.id, {points: 1, cap: 30, abilities:
      feat.id === "boon-of-irresistible-offense" ? ["strength", "dexterity"] :
      feat.id === "boon-of-spell-recall" ? ["intelligence", "wisdom", "charisma"] : undefined}]))
};
const magicLists = ["cleric", "druid", "wizard"];
const magicAbilities = ["intelligence", "wisdom", "charisma"];
function featBlockReason(feat) {
  if (feat.category === "Epic Boon" && kincaid.druidLevel < 19) return "Requires level 19";
  if (feat.level > kincaid.druidLevel) return "Requires level " + feat.level;
  if (feat.requirements?.includes("Fighting Style Feature")) return "Requires the Fighting Style feature";
  if (feat.id === "grappler" && Math.max(abilityScore("strength"), abilityScore("dexterity")) < 13)
    return "Requires Strength or Dexterity 13";
  return "";
}
function toolChoices() {
  return [...new Set(ITEM_RECORDS.filter(item => item.category === "tool" && item.source.rules === "2024").map(item => item.name))].sort();
}
function trainingChoices() {
  return [...Object.keys(characterSkills).filter(name => !kincaid.skillProficiencies[name]), ...toolChoices()];
}
function magicListSpells(list, level) {
  return [...SPELL_RECORDS, ...initiateSpellRecords].filter(spell => spell.level === level && spell.availability !== "wildCompanion" && spell.classes?.includes(list));
}
function validFeatChoice(rule, value) {
  if (!value || typeof value !== "object") return null;
  if (rule.training) {
    const options = trainingChoices();
    return Array.isArray(value.training) && value.training.length === 3 &&
      new Set(value.training).size === 3 && value.training.every(name => options.includes(name))
      ? {training: value.training} : null;
  }
  if (rule.spells) {
    if (!magicLists.includes(value.list) || !magicAbilities.includes(value.ability) ||
        !Array.isArray(value.cantrips) || value.cantrips.length !== 2 || new Set(value.cantrips).size !== 2 ||
        !value.cantrips.every(name => magicListSpells(value.list, 0).some(spell => spell.name === name)) ||
        !magicListSpells(value.list, 1).some(spell => spell.name === value.spell)) return null;
    return {list: value.list, ability: value.ability, cantrips: value.cantrips, spell: value.spell, spent: value.spent === true};
  }
  const abilities = rule.abilities || Object.keys(kincaid.abilityScores);
  return Array.isArray(value.abilities) && value.abilities.length === rule.points &&
    value.abilities.every(ability => abilities.includes(ability)) ? {abilities: value.abilities} : null;
}
function normalizeFeatChoices(raw, feats) {
  const choices = {};
  const training = new Set();
  const lists = new Set();
  const bumps = {...kincaid.abilityScores};
  for (const [id, count] of Object.entries(feats)) {
    const rule = featChoiceRules[id];
    if (!rule || !Array.isArray(raw?.[id])) continue;
    const accepted = [];
    for (const value of raw[id].slice(0, count)) {
      const choice = validFeatChoice(rule, value);
      if (!choice || choice.training?.some(name => training.has(name)) || lists.has(choice.list)) continue;
      if (choice.abilities?.some(name => bumps[name] + choice.abilities.filter(value => value === name).length > rule.cap)) continue;
      for (const name of choice.abilities || []) bumps[name]++;
      choice.training?.forEach(name => training.add(name));
      if (choice.list) lists.add(choice.list);
      accepted.push(choice);
    }
    if (accepted.length) choices[id] = accepted;
  }
  return choices;
}
function skilledChoices() {
  return (applicationState.featChoices.skilled || []).flatMap(choice => choice.training);
}
function maximumBaseHP(choices) {
  return MAX + kincaid.druidLevel *
    (Math.floor((baseAbilityScore("constitution", choices) - 10) / 2) - Math.floor((kincaid.abilityScores.constitution - 10) / 2));
}
function baseAbilityScore(ability, choices) {
  let value = kincaid.abilityScores[ability];
  for (const copies of Object.values(choices || {}))
    for (const copy of copies) value += (copy.abilities || []).filter(name => name === ability).length;
  return value;
}
function abilityScore(ability) {
  const score = baseAbilityScore(ability, applicationState.featChoices);
  if (ability !== "strength") return score;
  return Math.max(score, ...activeConsumables().map(({effect}) => effect.strength || 0));
}
function initiateChoices(spell) {
  return (applicationState.featChoices["magic-initiate"] || []).filter(choice =>
    !spell || choice.spell === spell || choice.cantrips.includes(spell));
}
function openFeatChoices(id, trigger, acquire) {
  const feat = featById.get(id);
  const rule = featChoiceRules[id];
  const copies = applicationState.featChoices[id] || [];
  const owned = applicationState.feats[id] || 0;
  const {dialog, form, field, note, confirm} = collectionDialog(feat.name, trigger);
  const describe = choice => (choice.training || choice.abilities ||
    [choice.list, choice.ability, ...choice.cantrips, choice.spell]).join(", ");
  for (const [index, choice] of copies.entries()) note((index + 1) + ". " + describe(choice));
  if (!acquire && copies.length >= owned) {
    confirm.hidden = true;
    if (copies.length > 1) {
      const select = field("select", "Copy to remove");
      for (const [index, choice] of copies.entries()) select.add(new Option(describe(choice), index));
      confirm.hidden = false;
      confirm.textContent = "Remove copy";
      form.onsubmit = event => {
        event.preventDefault();
        if (!dialog.open) return;
        dialog.close();
        change(() => {
          applicationState.featChoices[id] = copies.filter((_, index) => index !== Number(select.value));
          applicationState.feats[id]--;
        }, feat.name + " copy removed.");
      };
    }
    dialog.showModal();
    return;
  }
  const options = (label, values) => {
    const select = field("select", label);
    select.add(new Option("Choose", ""));
    for (const value of values) select.add(new Option(value, value));
    select.required = true;
    return select;
  };
  let read;
  if (rule.training) {
    const choices = trainingChoices().filter(name => !skilledChoices().includes(name));
    const picks = [1, 2, 3].map(index => options("Proficiency " + index, choices));
    read = () => ({training: picks.map(pick => pick.value)});
  } else if (rule.spells) {
    const list = options("Spell list", magicLists.filter(name => !initiateChoices().some(choice => choice.list === name)));
    const ability = options("Spellcasting ability", magicAbilities);
    const picks = ["Cantrip 1", "Cantrip 2", "Level 1 spell"].map(label => options(label, []));
    list.onchange = () => {
      for (const [index, pick] of picks.entries()) {
        pick.length = 1;
        for (const spell of magicListSpells(list.value, index === 2 ? 1 : 0))
          pick.add(new Option(spell.name, spell.name));
      }
    };
    note("Choices are drawn from the bundled spell catalog.");
    read = () => ({list: list.value, ability: ability.value, cantrips: picks.slice(0, 2).map(pick => pick.value), spell: picks[2].value});
  } else {
    const abilities = rule.abilities || Object.keys(kincaid.abilityScores);
    const picks = Array.from({length: rule.points}, (_, index) => options("Ability point " + (index + 1), abilities));
    note("Choose how to allocate the increase. Any bonus already in Kincaid’s starting scores is part of the base.");
    read = () => ({abilities: picks.map(pick => pick.value)});
  }
  const status = note("");
  status.setAttribute("role", "status");
  form.onsubmit = event => {
    event.preventDefault();
    if (!dialog.open || !form.checkValidity()) return;
    const choice = validFeatChoice(rule, read());
    if (!choice || choice.abilities?.some(name =>
      baseAbilityScore(name, applicationState.featChoices) + choice.abilities.filter(x => x === name).length > rule.cap)) {
      status.textContent = "Check for duplicate choices or ability scores above the limit.";
      return;
    }
    dialog.close();
    change(() => {
      if (acquire) applicationState.feats[id] = owned + 1;
      applicationState.featChoices[id] = [...copies, choice];
    }, feat.name + (acquire ? " added." : " choices saved."));
    if (featCatalog.open) showFeatCatalogFeedback();
    (featCatalog.open ? featSearch : ownedFeatList.querySelector('[data-feat-choices="' + id + '"]'))?.focus();
  };
  dialog.showModal();
}
