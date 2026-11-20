// Keep older saved form IDs and Kincaid's notes while sharing a creature's rules record.
function buildWildShapeForms() {
  const forms = {};
  const importedIds = new Set();
  function addCreature(id, creatureId, settings = {}) {
    const creature = BEASTS_2014[creatureId];
    const movement = Object.keys(creature.speeds);
    const skills = Object.entries(creature.skills).map(([skill, bonus]) => skill + " " + (bonus >= 0 ? "+" : "") + bonus);
    const physical = ["strength", "dexterity", "constitution"];
    forms[id] = {
      ...creature, id, baseCreatureId: creatureId,
      grants: [...(creature.grants || []), ...(settings.grants || [])],
      abilityModifiers: Object.fromEntries(physical.map(ability => [ability, Math.floor((creature.abilityScores[ability.slice(0, 3)] - 10) / 2)])),
      savingThrowOverrides: {},
      searchTags: [...new Set([...(settings.searchTags || []), ...movement])],
      roleDescription: settings.roleDescription || movement.map(formatSpeedName).join(" · "),
      appearanceDescription: settings.appearanceDescription || creature.description,
      sensesAndSkillsDescription: [creature.senses, ...skills].join(" · ")
    };
    importedIds.add(creatureId);
  }
  for (const [id, form] of Object.entries(FORMS)) {
    if (BEASTS_2014[form.baseCreatureId]) addCreature(id, form.baseCreatureId, form);
    else forms[id] = form;
  }
  for (const id of Object.keys(BEASTS_2014)) {
    if (!importedIds.has(id)) addCreature(id, id);
  }
  return forms;
}
const WILD_SHAPE_FORMS = buildWildShapeForms();

function getFormRuleset(form) {
  if (form.rulesEdition === "2014") return "5e (2014)";
  if (["2024", "2025"].includes(form.rulesEdition)) return "5.5e (revised)";
  return "Unverified ruleset";
}
function getFormSource(form) {
  const beast = BASE_CREATURES[form.baseCreatureId];
  if (BEASTS_2014[form.baseCreatureId]) return "2014 VTT export · " + beast.sourceFile;
  if (beast?.sourceFile) return beast.sourceFile + (beast.sourcePage ? " · PDF p. " + beast.sourcePage : "");
  return "Earlier Kincaid sheet · source book unverified";
}
function getFormRecord(formId) {
  return WILD_SHAPE_FORMS[formId] || null;
}
function getFormRecords() {
  return Object.entries(WILD_SHAPE_FORMS);
}
function getFormIds() {
  return Object.keys(WILD_SHAPE_FORMS);
}
function formatSpeedName(speedName) {
  return speedName.charAt(0).toUpperCase() + speedName.slice(1);
}
function getMaximumFormSpeed(formRecord) {
  return Math.max(...Object.values(formRecord.speeds || {}));
}
function getChallengeRatingValue(challengeRating) {
  return challengeRating.includes("/")
    ? challengeRating
        .split("/")
        .reduce((numerator, denominator) => +numerator / +denominator)
    : +challengeRating;
}
function getFormSavingThrowRows(formRecord) {
  const creature = BASE_CREATURES[formRecord?.baseCreatureId];
  return Object.keys(kincaid.abilityScores).map(ability => {
    const shortName = ability.slice(0, 3);
    const physical = ["strength", "dexterity", "constitution"].includes(ability);
    const modifier = physical && formRecord ? formRecord.abilityModifiers[ability] : abilityModifier(ability);
    let save = modifier + (kincaid.savingThrowProficiencies.includes(ability) ? proficiencyBonus : 0);
    const beastScore = creature?.abilityScores?.[shortName];
    const beastSave = creature?.savingThrows?.[shortName] ?? formRecord?.savingThrowOverrides?.[ability]
      ?? (Number.isFinite(beastScore) ? Math.floor((beastScore - 10) / 2) : undefined);
    if (Number.isFinite(beastSave)) save = Math.max(save, beastSave);
    if (formRecord && ability === "constitution") save += abilityModifier("wisdom");
    return [shortName.toUpperCase(), save];
  });
}
function getFormOpportunityAttackActions(formRecord) {
  return formRecord.actions.filter((action) => action.opportunityAttack);
}
function buildFormSearchText(formRecord) {
  return [
    formRecord.name,
    getFormRuleset(formRecord),
    getFormSource(formRecord),
    formRecord.rulesEdition,
    formRecord.size,
    formRecord.roleDescription,
    formRecord.searchTags.join(" "),
    Object.keys(formRecord.speeds).join(" "),
    ...formRecord.actions.flatMap((action) => [
      action.name,
      action.description
    ]),
    ...formRecord.bonusActions.flatMap((action) => [
      action.name,
      action.description
    ]),
    ...formRecord.traits.flatMap((trait) => [trait.name, trait.description])
  ]
    .join(" ")
    .toLowerCase();
}
function validateFormCatalog() {
  let issues = [];
  for (const [formId, formRecord] of getFormRecords()) {
    if (formRecord.id !== formId)
      issues.push(`${formId}: id does not match catalog key`);
    for (const fieldName of [
      "name",
      "rulesEdition",
      "challengeRating",
      "size",
      "roleDescription"
    ])
      if (typeof formRecord[fieldName] !== "string" || !formRecord[fieldName])
        issues.push(`${formId}: invalid ${fieldName}`);
    if (!Number.isFinite(formRecord.armorClass))
      issues.push(`${formId}: invalid armorClass`);
    for (const abilityName of ["strength", "dexterity", "constitution"])
      if (!Number.isFinite(formRecord.abilityModifiers?.[abilityName]))
        issues.push(`${formId}: invalid ${abilityName} modifier`);
    if (
      !formRecord.speeds ||
      !Object.values(formRecord.speeds).length ||
      Object.values(formRecord.speeds).some(
        (speed) => !Number.isFinite(speed) || speed <= 0
      )
    )
      issues.push(`${formId}: invalid speeds`);
    for (const collectionName of [
      "searchTags",
      "traits",
      "actions",
      "bonusActions",
      "reactions"
    ])
      if (!Array.isArray(formRecord[collectionName]))
        issues.push(`${formId}: invalid ${collectionName}`);
    if (typeof formRecord.appearanceDescription !== "string")
      issues.push(`${formId}: missing appearanceDescription`);
    if (typeof formRecord.sensesAndSkillsDescription !== "string")
      issues.push(`${formId}: invalid sensesAndSkillsDescription`);
    for (const action of [
      ...formRecord.actions,
      ...formRecord.bonusActions,
      ...formRecord.reactions
    ]) {
      if (
        !action ||
        typeof action.name !== "string" ||
        !action.name ||
        typeof action.description !== "string"
      )
        issues.push(`${formId}: invalid action record`);
      if (
        action.opportunityAttack !== null &&
        action.opportunityAttack !== undefined &&
        typeof action.opportunityAttack.note !== "string"
      )
        issues.push(`${formId}: invalid opportunityAttack`);
    }
  }
  if (issues.length)
    console.warn("Form catalog validation:", issues.join("; "));
  return issues;
}
const FORM_CATALOG_ISSUES = validateFormCatalog();
