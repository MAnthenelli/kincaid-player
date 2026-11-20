function spellRestriction(name, kind) {
  const mods = conditionModifiers();
  if (mods.incapacitated) return "Incapacitated";
  if (kind === "reaction" && mods.sources("blockReaction").length) return "Cannot take Reactions";
  if (mods.sources("blockVerbal").length && getSpellRecord(name)?.components.includes("v"))
    return "Verbal component unavailable";
  return "";
}
function canCastAsRitual(kind, name) {
  return kind === "turn" && RITUAL_SPELL_NAMES.has(name);
}

function castPart(name, level, spend, effectChoice, selfTarget, healing, ritual = false) {
  if (spellRestriction(name)) return false;
  let spellMetadata = SPELL_METADATA[name];
  if (!spellMetadata) return showNotice("Choose a spell.");
  if (spend && level && !applicationState.spellSlots[level])
    return showNotice(`No level ${level} slot remains.`);
  change(
    () => {
      if (spend && level) applicationState.spellSlots[level]--;
      if (ritual || spellMetadata[1]) endConc();
      if (
        ["Cure Wounds", "Healing Word"].includes(name) &&
        selfTarget &&
        healing
      ) {
        applicationState.currentHitPoints = Math.min(
          MAX,
          applicationState.currentHitPoints + healing
        );
        if (applicationState.currentHitPoints)
          applicationState.deathSaves = { successes: 0, failures: 0 };
      }
      let effectRecord = createEffectRecord(
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
        applicationState.activeEffects = applicationState.activeEffects.filter(
          (effect) => effect.n !== name
        );
        applicationState.activeEffects.push(effectRecord);
        if (getEffectDefinition(name).requiresConcentration)
          applicationState.concentrationEffect = name;
      }
      syncDerivedState();
    },
    () => castMessage(name, level, spend, selfTarget, healing, ritual)
  );
  return true;
}

function castFrom(kind, ritual = false) {
  let name = getElementById(kind + "Spell")?.value;
  if (!name) return showNotice("Choose a spell.");
  if (spellRestriction(name, kind)) return;
  if (ritual && !canCastAsRitual(kind, name)) return;
  const base = SPELL_METADATA[name][0];
  let level = ritual ? base : +(getElementById(kind + "Slot")?.value || base),
    self =
      SPELL_SELF_TARGET_MODES[name] === "only" ||
      !!getElementById(kind + "Self")?.checked,
    healing = +(getElementById(kind + "Healing")?.value || 0);
  if (self && ["Cure Wounds", "Healing Word"].includes(name) && !healing)
    return showNotice("Enter the healing rolled.");
  const cast = castPart(
    name,
    level,
    !ritual && level > 0,
    getElementById(kind + "Progressive")?.querySelector("[data-effect-choice]")?.value,
    self,
    healing,
    ritual
  );
  if (cast) {
    const picker = getElementById(kind + "Spell");
    picker.value = "";
    progressive(kind, "");
    picker.focus();
  }
}
