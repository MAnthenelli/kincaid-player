const initiateSpellRecords = MAGIC_INITIATE_SRD.map(record => ({
  ...record, id: "initiate-" + record.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  availability: "featSpell", requiresConcentration: record.concentration,
  rulesEdition: "2024", roles: [], selfTargetMode: "none"
}));
function getSpellRecord(nameOrId) {
  return (
    [...SPELL_RECORDS, ...initiateSpellRecords].find(
      (record) => record.name === nameOrId || record.id === nameOrId
    ) || null
  );
}
function getSpellRecords() {
  return SPELL_RECORDS.slice();
}
function validateSpellCatalog() {
  const issues = [],
    identifiers = new Set(),
    names = new Set();
  const availabilityValues = new Set([
    "selectableCantrip",
    "grantedCantrip",
    "preparedSpell",
    "circleSpell", "druidicSpell", "wildCompanion"
  ]);
  const selfTargetModes = new Set(["none", "only", "optional"]);
  const castingControls = new Set(["action", "bonus"]);
  for (const [index, record] of SPELL_RECORDS.entries()) {
    const path = `SPELL_RECORDS[${index}]`;
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      issues.push(`${path} must be an object.`);
      continue;
    }
    if (typeof record.id !== "string" || !record.id)
      issues.push(`${path}.id must be a nonempty string.`);
    else if (identifiers.has(record.id))
      issues.push(`${path}.id duplicates ${record.id}.`);
    else identifiers.add(record.id);
    if (typeof record.name !== "string" || !record.name)
      issues.push(`${path}.name must be a nonempty string.`);
    else if (names.has(record.name))
      issues.push(`${path}.name duplicates ${record.name}.`);
    else names.add(record.name);
    if (record.rulesEdition !== "2024" && record.rulesEdition !== "2014")
      issues.push(`${path}.rulesEdition must be 2024 or 2014.`);
    if (!Number.isInteger(record.level) || record.level < 0 || record.level > 9)
      issues.push(`${path}.level must be an integer from 0 through 9.`);
    if (typeof record.school !== "string" || !record.school)
      issues.push(`${path}.school must be a nonempty string.`);
    if (!availabilityValues.has(record.availability))
      issues.push(`${path}.availability is invalid.`);
    if (!Array.isArray(record.roles) || !record.roles.length ||
      new Set(record.roles).size !== record.roles.length ||
      record.roles.some(role => !SPELL_ROLES.includes(role)))
      issues.push(`${path}.roles must contain unique spell roles.`);
    if (typeof record.ritual !== "boolean")
      issues.push(`${path}.ritual must be boolean.`);
    if (typeof record.requiresConcentration !== "boolean")
      issues.push(`${path}.requiresConcentration must be boolean.`);
    if (typeof record.duration !== "string" || !record.duration)
      issues.push(`${path}.duration must be a nonempty string.`);
    if (!castingControls.has(record.castingControl))
      issues.push(`${path}.castingControl is invalid.`);
    if (!selfTargetModes.has(record.selfTargetMode))
      issues.push(`${path}.selfTargetMode is invalid.`);
    for (const field of ["canUpcast", "availableInWildShapeAsReaction"])
      if (typeof record[field] !== "boolean")
        issues.push(`${path}.${field} must be boolean.`);
    for (const field of ["cantripSelectionOrder", "preparationOrder"])
      if (
        record[field] !== null &&
        (!Number.isInteger(record[field]) || record[field] < 0)
      )
        issues.push(`${path}.${field} must be null or a nonnegative integer.`);
    for (const field of ["description", "quickText"])
      if (typeof record[field] !== "string" || !record[field].trim())
        issues.push(`${path}.${field} must be a nonempty string.`);
  }
  return issues;
}
const SPELL_CATALOG_ISSUES = validateSpellCatalog();
const CANTRIP_LIBRARY = SPELL_RECORDS.filter((record) =>
  Number.isInteger(record.cantripSelectionOrder)
)
  .sort(
    (first, second) =>
      first.cantripSelectionOrder - second.cantripSelectionOrder
  )
  .map((record) => record.name);
const CIRCLE_CANTRIPS = SPELL_RECORDS.filter(
  (record) => record.availability === "grantedCantrip"
).map((record) => record.name);
const CIRCLE_SPELLS = SPELL_RECORDS.filter(record => record.availability === "circleSpell").map(record => record.name);
const ALWAYS_PREPARED_SPELLS = SPELL_RECORDS.filter(record => ["circleSpell", "druidicSpell"].includes(record.availability)).map(record => record.name);
const PREPARED_SPELL_OPTIONS = SPELL_RECORDS.filter((record) =>
  Number.isInteger(record.preparationOrder)
)
  .sort((first, second) => first.preparationOrder - second.preparationOrder)
  .map((record) => record.name);
const SPELL_QUICK_TEXT = Object.fromEntries(
  SPELL_RECORDS.map((record) => [record.name, record.quickText])
);
const SPELL_METADATA = Object.fromEntries(
  [...SPELL_RECORDS, ...initiateSpellRecords].map((record) => [
    record.name,
    [record.level, record.requiresConcentration, record.duration]
  ])
);
const SPELL_SCHOOLS = Object.fromEntries(
  SPELL_RECORDS.map((record) => [record.name, record.school])
);
const SPELL_SELF_TARGET_MODES = Object.fromEntries(
  SPELL_RECORDS.filter((record) => record.selfTargetMode !== "none").map(
    (record) => [record.name, record.selfTargetMode]
  )
);
