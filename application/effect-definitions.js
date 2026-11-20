function getEffectDefinition(effectName) {
  return EFFECT_DEFINITIONS[effectName] || null;
}
function getEffectCategoryLabel(effectDefinition) {
  return EFFECT_CATEGORY_LABEL[effectDefinition.category];
}
function createEffectRecord(effectName, level, selfTarget, choice) {
  let effectDefinition = getEffectDefinition(effectName);
  if (!effectDefinition) return null;
  let normalizedChoice = effectDefinition.choice?.values.includes(choice)
    ? choice
    : null;
  return {
    n: effectName,
    d: effectDefinition.duration,
    level: intIn(
      level,
      effectDefinition.baseLevel,
      Math.max(...spellSlotLevels),
      effectDefinition.baseLevel
    ),
    self: !!selfTarget,
    choice: normalizedChoice,
    category: effectDefinition.category
  };
}
function isIndefiniteBattlefieldEffect(effect) {
  let effectDefinition = getEffectDefinition(effect.n);
  return Boolean(
    effectDefinition &&
    effectDefinition.category === "battlefield" &&
    effectDefinition.duration === "indefinite"
  );
}
function validateEffectDefinitions() {
  let issues = [];
  for (const [effectName, effectDefinition] of Object.entries(
    EFFECT_DEFINITIONS
  )) {
    for (const id of [...(effectDefinition.grants || []), ...Object.values(effectDefinition.choice?.grants || {}), ...(effectDefinition.endsOnCast || [])])
      if (!statusById.has(id)) throw new Error(effectName + " references unknown effect " + id);
    if (effectDefinition.name !== effectName)
      issues.push(`${effectName}: name does not match catalog key`);
    if (
      !Number.isInteger(effectDefinition.baseLevel) ||
      effectDefinition.baseLevel < 0 ||
      effectDefinition.baseLevel > 9
    )
      issues.push(`${effectName}: invalid baseLevel`);
    if (typeof effectDefinition.requiresConcentration !== "boolean")
      issues.push(`${effectName}: invalid requiresConcentration`);
    if (
      typeof effectDefinition.duration !== "string" ||
      !effectDefinition.duration
    )
      issues.push(`${effectName}: invalid duration`);
    if (!EFFECT_CATEGORY_LABEL[effectDefinition.category])
      issues.push(`${effectName}: invalid category`);
    if (
      effectDefinition.choice !== null &&
      (!Array.isArray(effectDefinition.choice?.values) ||
        !effectDefinition.choice.values.length)
    )
      issues.push(`${effectName}: invalid choice`);
  }
  if (issues.length)
    console.warn("Effect definition validation:", issues.join("; "));
  return issues;
}
const EFFECT_CATEGORY_LABEL = {
  character: "Character effect",
  transformation: "Transformative effect",
  battlefield: "Battlefield effect",
  summon: "Summon"
};
const EFFECT_DEFINITION_ISSUES = validateEffectDefinitions();

function liveModifiers() {
  const totals = { speedDelta: 0, sizeSteps: 0, stopMovement: false };
  for (const effect of applicationState.activeEffects) {
    if (!effect.self) continue;
    const definition = getEffectDefinition(effect.n);
    totals.speedDelta += definition.speedDelta || 0;
    totals.sizeSteps += definition.choice?.sizeSteps?.[effect.choice] || 0;
  }
  for (const record of conditionModifiers().records) {
    totals.speedDelta += (record.speedDelta || 0) * (record.cumulative ? exhaustionEntry()?.level || 0 : 1);
    if (record.stopMovement) totals.stopMovement = true;
  }
  return totals;
}

function conditionsAfterLongRest() {
  return applicationState.conditions.flatMap(item => {
    if (item.custom || item.name !== "Exhaustion") return [item];
    return item.level > 1 ? [{...item, level: item.level - 1}] : [];
  });
}
function exhaustionEntry() {
  return applicationState.conditions.find(item => !item.custom && item.name === "Exhaustion");
}
function conditionModifiers() {
  const form = getFormRecord(applicationState.activeFormId);
  const roots = new Set(form ? form.grants : kincaid.grants);
  for (const entry of applicationState.conditions)
    if (!entry.custom) roots.add(entry.effectId);
  for (const spell of applicationState.activeEffects) {
    if (!spell.self) continue;
    const definition = getEffectDefinition(spell.n);
    for (const id of definition?.grants || []) roots.add(id);
    const chosen = definition?.choice?.grants?.[spell.choice];
    if (chosen) roots.add(chosen);
  }
  const blocked = new Set();
  const records = [];
  for (const record of orderedStatuses) {
    if (!roots.has(record.id) || blocked.has(record.id)) continue;
    records.push(record);
    if (record.immunity) blocked.add(record.immunity);
    for (const id of record.grants || []) roots.add(id);
  }
  const names = new Set(records.map(r => r.name));
  const sources = field => records.filter(r => r[field]).map(r => r.name);
  return {
    records, names, sources, blocked,
    has: field => records.some(record => record[field]),
    d20: records.reduce((sum, r) => sum + (r.d20PerLevel || 0) * (exhaustionEntry()?.level || 0), 0),
    incapacitated: records.some(record => record.incapacitated),
    movement: records.map(r => r.movement).filter(Boolean).join(". ")
  };
}
function defenseDisplay() {
  const mods = conditionModifiers();
  const {has} = mods;
  const sources = mods.sources("incomingAdvantage");
  const lines = [];
  const prone = has("prone");
  const invisible = has("unseen");
  if (prone) {
    lines.push(sources.length ? "Incoming attacks: Advantage within 5 ft, Advantage and Disadvantage cancel farther away"
      : "Incoming attacks: Advantage within 5 ft, Disadvantage farther away");
  } else if (sources.length) lines.push("Incoming attacks have Advantage");
  if (invisible) {
    lines.push(sources.length || prone ? "If the attacker cannot see you, its Disadvantage cancels any Advantage" : "Attackers that cannot see you have Disadvantage");
    lines.push("Creatures that cannot see you cannot target you with effects requiring sight");
  }
  if (has("criticalNearby")) lines.push("Hits from within 5 ft are critical");
  for (const field of ["resistance", "vulnerability", "damageImmunity", "immunity"]) {
    const values = [...new Set(mods.records.map(r => r[field]).filter(Boolean))];
    if (field === "immunity" && values.length) lines.push("Immune to " + values.map(id => statusById.get(id).name).join(", "));
    if (field !== "immunity" && values.length)
      lines.push(({resistance:"Resistance to ", vulnerability:"Vulnerability to ", damageImmunity:"Damage immunity to "}[field]) + (values.includes("all") ? "all damage" : values.join(", ")));
  }
  lines.push(...mods.records.map(r => r.defenseNote).filter(Boolean));
  return explainedRoll(lines.join(" · "), [...sources, ...(prone ? ["Prone"] : []), ...(invisible ? ["Invisible"] : [])]);
}
function signedRoll(value) {
  return value >= 0 ? "+" + value : String(value);
}
function conditionHint(text) {
  return text ? `<small class="conditionHint">${text}</small>` : "";
}

// A modified value doubles as the control for its arithmetic and sources.
function explainedRoll(label, reasons) {
  if (!reasons.length) return label;
  return `<button type="button" class="rollValue" data-roll-reason="${reasons.join(". ").replaceAll("&", "&amp;").replaceAll('"', "&quot;")}" aria-controls="rollExplanation" aria-haspopup="dialog">${label}</button>`;
}
function rollDisplay(base, kind, ability = "", skill = "", suffix = "", afterRoll = "") {
  const {has, d20, sources, records} = conditionModifiers();
  const advantage = [], disadvantage = [], qualifiers = [], reasons = [];
  const passive = kind === "passive";
  const check = passive || kind === "check" || kind === "initiative";
  const attack = kind === "attack";
  const save = kind === "save";
  if (save && ["STR", "DEX"].includes(ability)) {
    const failures = sources("failPhysicalSaves");
    if (failures.length) return explainedRoll("Auto-fail", ["Automatic failure from " + failures.join(", ")]);
  }
  if (attack) {
    disadvantage.push(...sources("attackDisadvantage"));
    if (has("unseen")) qualifiers.push("Advantage if the target cannot see you");
    if (has("otherGrappler")) qualifiers.push("Disadvantage against targets other than the grappler");
  }
  if (check) disadvantage.push(...sources("checkDisadvantage"));
  if ((check || attack) && has("fearSource"))
    qualifiers.push("Disadvantage while the source is visible");
  if (kind === "initiative") {
    advantage.push(...sources("initiativeAdvantage"));
    disadvantage.push(...sources("initiativeDisadvantage"));
  }
  if (save && ability === "DEX") {
    disadvantage.push(...sources("dexSaveDisadvantage"));
    if (!has("incapacitated") && Object.values(speedObj()).some(speed => speed > 0))
      advantage.push(...sources("dodge"));
    qualifiers.push(...records.map(r => r.dexSaveNote).filter(Boolean));
  }
  for (const effect of applicationState.activeEffects.filter(item => item.self)) {
    if ((save || check) && ability === "STR" && effect.n === "Enlarge/Reduce")
      (effect.choice === "reduce" ? disadvantage : advantage).push(effect.n);
    if (check && effect.n === "Enhance Ability" && effect.choice?.slice(0, 3).toUpperCase() === ability)
      advantage.push(effect.n);
  }
  if (skill === "perception") {
    if (has("sightFails")) qualifiers.push("Sight-dependent checks fail");
    if (has("hearingFails")) qualifiers.push("Hearing-dependent checks fail");
  }
  const traits = (advantage.length || disadvantage.length || qualifiers.length) ? getFormRecord(applicationState.activeFormId)?.traits || [] : [];
  if (attack && traits.some(trait => trait.name === "Pack Tactics"))
    qualifiers.push("Advantage if a conscious ally is within 5 ft of the target");
  if (skill === "perception") {
    for (const trait of traits.filter(item => item.name.startsWith("Keen") && /advantage/i.test(item.description)))
      qualifiers.push(trait.description.replace(/\.$/, ""));
  }
  if (attack && has("protectCharmer")) qualifiers.push("Cannot attack the charmer");
  const result = advantage.length && disadvantage.length ? "Advantage and Disadvantage cancel" :
    advantage.length ? "Advantage" : disadvantage.length ? "Disadvantage" : "";
  if (d20) reasons.push(`${signedRoll(base)} − ${-d20} (Exhaustion ${exhaustionEntry().level}) = ${signedRoll(base + d20)}`);
  if (advantage.length) reasons.push("Advantage from " + advantage.join(", "));
  if (disadvantage.length) reasons.push("Disadvantage from " + disadvantage.join(", "));
  if (qualifiers.length) {
    for (const [name, fragment] of [["Frightened", "source is visible"], ["Grappled", "grappler"], ["Invisible", "target cannot see"], ["Charmed", "charmer"], ["Blinded", "Sight-dependent"], ["Deafened", "Hearing-dependent"]]) {
      const qualifier = qualifiers.find(text => text.includes(fragment));
      if (qualifier) reasons.push(name + ": " + qualifier);
    }
  }
  if ((advantage.length || qualifiers.some(x => x.startsWith("Advantage"))) &&
      (disadvantage.length || qualifiers.some(x => x.startsWith("Disadvantage"))))
    reasons.push("When both apply, roll one d20");
  const passiveDelta = passive ? 5 * (Number(Boolean(advantage.length)) - Number(Boolean(disadvantage.length))) : 0;
  if (passiveDelta) reasons.push("Passive Perception " + signedRoll(passiveDelta) + " from " + result);
  let skillBonus = 0;
  for (const record of records) {
    const bonus = record.skillBonus?.[skill];
    if (bonus) {
      skillBonus += bonus;
      reasons.push(record.name + ": " + signedRoll(bonus) + " " + skill);
    }
  }
  const total = base + d20 + skillBonus;
  const value = passive ? String(total + passiveDelta) : signedRoll(total);
  if (attack) {
    const rulings = [];
    const favorable = [];
    if (has("unseen")) favorable.push("the target cannot see you");
    if (traits.some(trait => trait.name === "Pack Tactics")) favorable.push("a conscious ally is within 5 ft of the target");
    const unfavorable = [];
    if (has("otherGrappler")) unfavorable.push("attacking anyone other than the grappler");
    if (has("fearSource")) unfavorable.push("the source is visible");
    if (disadvantage.length && favorable.length) {
      if (favorable.length === 1 && has("unseen")) {
        rulings.push("Target sees you: Disadvantage. Target cannot see you: normal roll.");
      } else rulings.push("Normal roll if " + favorable.join(" or ") + ". Otherwise: Disadvantage.");
    } else {
      if (disadvantage.length) rulings.push("Disadvantage");
      else if (unfavorable.length) rulings.push("Disadvantage if " + unfavorable.join(" or "));
      if (favorable.length) rulings.push("Advantage if " + favorable.join(" or "));
      if (favorable.length && unfavorable.length) rulings.push("Both apply: normal roll");
    }
    if (has("protectCharmer")) rulings.push("Cannot attack the charmer");
    if (favorable.some(rule => rule.includes("ally"))) reasons.push("Pack Tactics: Advantage with a conscious ally within 5 ft of the target");
    const ruling = rulings.length ? `<small class="attackRuling">${rulings.join(" · ")}</small>` : "";
    return explainedRoll(value + suffix, reasons) + afterRoll + ruling;
  }
  return explainedRoll([value + suffix, result, ...qualifiers].filter(Boolean).join(" · "), reasons);
}
function harmfulTargetHint() {
  return conditionModifiers().has("protectCharmer") ? conditionHint("Cannot harm the charmer") : "";
}
