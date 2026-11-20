function joinSpellCatalogs(sources, configuration) {
  const settingsByName = new Map();
  const ids = new Set();
  const settingFields = new Set(["id", "name", "availability", "cantripSelectionOrder", "preparationOrder", "selfTargetMode", "availableInWildShapeAsReaction", "quickText", "canUpcast"]);
  for (const settings of configuration) {
    if (settingsByName.has(settings.name) || ids.has(settings.id))
      throw new Error("Duplicate character spell: " + settings.name);
    for (const field of Object.keys(settings)) {
      if (!settingFields.has(field)) throw new Error("Unknown character spell field: " + field);
    }
    ids.add(settings.id);
    settingsByName.set(settings.name, settings);
  }
  const records = [];
  for (const source of sources) {
    const settings = settingsByName.get(source.name);
    if (!settings) throw new Error("Duplicate or unconfigured source spell: " + source.name);
    records.push({...settings, ...source, rulesEdition: "2024",
      requiresConcentration: source.concentration,
      castingControl: source.actionType === "bonusAction" ? "bonus" : "action"});
    settingsByName.delete(source.name);
  }
  if (settingsByName.size) throw new Error("Missing spell sources: " + [...settingsByName.keys()].join(", "));
  return records;
}
const SPELL_RECORDS = joinSpellCatalogs([...SRD_SPELL_RECORDS, ...PHB_SPELL_RECORDS], KINCAID_SPELL_CONFIGURATION);
