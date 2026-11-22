function spellRestriction(name, kind) {
  const mods = conditionModifiers();
  if (mods.incapacitated) return "Incapacitated";
  if (isGaseous()) return "Gaseous Form prevents spellcasting";
  const armor = untrainedArmor();
  if (armor) return "Spellcasting requires training in " + armor.name;
  if (kind === "reaction" && mods.sources("blockReaction").length) return "Cannot take Reactions";
  if (mods.sources("blockVerbal").length && getSpellRecord(name)?.components.includes("v"))
    return "Verbal component unavailable";
  return "";
}
const reactiveSpells = new Set([
  "Animal Friendship", "Beast Sense", "Charm Person", "Cure Wounds", "Darkvision",
  "Dispel Magic", "Enhance Ability", "Enlarge/Reduce", "Guidance", "Hold Person",
  "Longstrider", "Message", "Poison Spray", "Protection from Energy",
  "Protection from Evil and Good", "Protection from Poison", "Resistance",
  "Spare the Dying", "Starry Wisp", "Thorn Whip"
]);

function spellKnown(record) {
  return hasPotionSpell(record.name) || initiateChoices(record.name).length > 0 || classSpellKnown(record);
}

function classSpellKnown(record) {
  if (record.availability === "wildCompanion") return kincaid.druidLevel >= 2;
  if (["circleSpell", "grantedCantrip"].includes(record.availability))
    return kincaid.druidLevel >= ({2: 3, 3: 5}[record.level] || 3);
  return record.availability === "druidicSpell" ||
    applicationState.knownCantripNames.includes(record.name) ||
    applicationState.preparedSpellNames.includes(record.name);
}

function ritualTime(record) {
  const minutes = /^(\d+) minutes?$/.exec(record.castingTime || "");
  return minutes ? (Number(minutes[1]) + 10) + " min total" :
    record.castingTime ? record.castingTime + " + 10 min" : "+10 min";
}

function castMethods(record, kind, slot = 0) {
  if (!record || !spellKnown(record) || spellRestriction(record.name, kind)) return [];
  const companion = record.availability === "wildCompanion";
  if (companion !== (kind === "companion")) return [];
  if (applicationState.activeFormId && !["circleSpell", "grantedCantrip"].includes(record.availability)) return [];
  const action = record.actionType === "action" && (!record.castingTime || record.name === "Plant Growth");
  if (kind === "turn" && !action) return [];
  if (kind === "bonus" && record.actionType !== "bonusAction") return [];
  if (kind === "reaction" && record.actionType !== "reaction" &&
      (!action || !hasFeat("war-caster") || !reactiveSpells.has(record.name))) return [];
  const methods = [];
  if (!slot && kind !== "reaction" && hasPotionSpell(record.name))
    methods.push({id: "potion-friendship", level: 1, potion: true, label: "Cast from potion · DC 13"});
  const independentlyKnown = classSpellKnown(record) || initiateChoices(record.name).length > 0;
  if (!independentlyKnown) return methods;
  const longerCasting = Boolean(record.castingTime && record.name !== "Plant Growth");
  if (!record.level && !slot)
    methods.push({id: "cantrip", level: 0, label: longerCasting ? "Complete cast · " + record.castingTime : "Cast", long: longerCasting});
  if (record.level) {
    if (!slot && (kind !== "reaction" || record.actionType === "reaction")) {
      for (const choice of initiateChoices(record.name).filter(choice => choice.spell === record.name && !choice.spent))
        methods.push({id: "initiate-" + choice.list, level: 1, initiate: choice.list,
          label: "Magic Initiate · " + choice.list + " · 1 free cast", long: longerCasting});
    }
    for (const level of spellSlotLevels) {
      if (level < record.level || (slot && slot !== level) || !applicationState.spellSlots[level]) continue;
      const label = (longerCasting ? "Complete cast · " : "Cast · ") + "Level " + level;
      methods.push({id: "slot" + level, level, spend: true, label: label + " (" + applicationState.spellSlots[level] + " left)", long: longerCasting});
      if (kind === "all" && record.name === "Plant Growth")
        methods.push({id: "enrich" + level, level, spend: true, long: true, label: "Complete enrichment · 8 hours · Level " + level});
    }
  }
  if (kind === "all" && !slot && record.ritual)
    methods.push({id: "ritual", level: record.level, ritual: true, long: true, label: "Cast as ritual · " + ritualTime(record) + " · no slot"});
  if (companion && applicationState.wildShapeUses)
    methods.push({id: "wild", level: record.level, wild: true, label: "Cast · 1 Wild Shape use"});
  return methods;
}

function castPart(name, level, spend, effectChoice, selfTarget, healing, ritual = false, method = {}) {
  if (spellRestriction(name)) return false;
  if (applicationState.pendingCast && !method.pending) return false;
  const grant = method.abilitySource && initiateChoices(name).find(choice => choice.list === method.abilitySource);
  const record = getSpellRecord(name);
  const spellMetadata = SPELL_METADATA[name] ||
    (record?.availability === "featSpell" && [record.level, record.concentration, record.duration]);
  if (!spellMetadata) return showNotice("Choose a spell.");
  if (spend && level && !applicationState.spellSlots[level])
    return showNotice(`No level ${level} slot remains.`);
  change(
    () => {
      if (spend && level) applicationState.spellSlots[level]--;
      if (method.initiate) initiateChoices(name).find(choice => choice.list === method.initiate).spent = true;
      applicationState.consumableEffects = applicationState.consumableEffects.filter(id => id !== "rTn4p9nJr4Aq2GPB");
      if (method.wild) applicationState.wildShapeUses--;
      if (name === "Goodberry") {
        const batches = applicationState.goodberryBatches;
        let id = (batches.at(-1)?.id ?? 0) + 1;
        if (!Number.isSafeInteger(id) || batches.some(batch => batch.id === id)) {
          id = 1;
          while (batches.some(batch => batch.id === id)) id++;
        }
        batches.push({id, remaining: 10});
      }
      if (ritual || method.long || spellMetadata[1]) endConc();
      if (
        ["Cure Wounds", "Healing Word"].includes(name) &&
        selfTarget &&
        healing
      ) {
        applicationState.currentHitPoints = Math.min(
          currentMaxHP(),
          applicationState.currentHitPoints + healing
        );
        if (applicationState.currentHitPoints)
          applicationState.deathSaves = { successes: 0, failures: 0 };
      }
      let effectRecord = method.id?.startsWith("enrich") ? null : createEffectRecord(
        name,
        level,
        selfTarget,
        effectChoice
      );
      if (selfTarget && getEffectDefinition(name)?.endsOnCast) {
        const ended = getEffectDefinition(name).endsOnCast;
        applicationState.conditions = applicationState.conditions.filter(entry => entry.custom || !ended.includes(entry.effectId));
      }
      if (effectRecord) {
        if (getEffectDefinition(name).grants?.some(id => statusById.get(id).parameter))
          effectRecord.order = nextEffectOrder();
        if (name !== "Aid")
          applicationState.activeEffects = applicationState.activeEffects.filter(effect => effect.n !== name);
        applicationState.activeEffects.push(effectRecord);
        if (getEffectDefinition(name).requiresConcentration)
          applicationState.concentrationEffect = name;
      }
      syncDerivedState();
    },
    () => messageLines(castMessage(name, level, spend, selfTarget, healing, ritual),
      record?.availability === "featSpell" && name !== "Shield" ? "Resolve target-specific spell effects at the table." : "",
      method.potion ? "Potion of Animal Friendship · DC 13 Wisdom save." : "",
      grant ? "Magic Initiate · " + grant.ability.toUpperCase() + "." : "",
      method.wild ? "Wild Shape uses remaining: " + applicationState.wildShapeUses + "." : "")
  );
  return true;
}

