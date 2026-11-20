const createFreshState = () => ({
  v: 71,
  currentHitPoints: MAX,
  temporaryHitPoints: 0,
  activeFormId: null,
  wildShapeUses: kincaid.maximumWildShapeUses,
  spellSlots: { ...kincaid.spellSlotMaximums },
  breathWeaponUses: proficiencyBonus,
  draconicFlightState: "ready",
  reverse: false,
  knownFormIds: [...kincaid.startingForms],
  knownCantripNames: [...kincaid.startingCantrips],
  preparedSpellNames: kincaid.startingPreparedSpells.filter(name => PREPARED_SPELL_OPTIONS.includes(name)).slice(0, kincaid.maximumPreparedSpells),
  activeEffects: [],
  conditions: [],
  concentrationEffect: null,
  size: null,
  long: false,
  radiantStrikeActive: false,
  deathSaves: { successes: 0, failures: 0 },
  lightThemeEnabled: false,
  noticeMessage: "",
  undoHistory: []
});
const intIn = (value, min, max, fallback) => {
  let n = Number(value);
  return Number.isFinite(n)
    ? Math.max(min, Math.min(max, Math.trunc(n)))
    : fallback;
};
const bool = (value, fallback = false) =>
  typeof value === "boolean" ? value : fallback;
const stableJson = (value) =>
  JSON.stringify(value, (key, item) =>
    item && typeof item === "object" && !Array.isArray(item)
      ? Object.keys(item)
          .sort()
          .reduce((out, k) => ((out[k] = item[k]), out), {})
      : item
  );
const uniqueValid = (value, valid, max, fallback = []) => {
  if (!Array.isArray(value)) return fallback.slice();
  let out = [];
  for (const item of value)
    if (
      typeof item === "string" &&
      valid.includes(item) &&
      !out.includes(item)
    ) {
      out.push(item);
      if (out.length === max) break;
    }
  return out;
};
function normalizeEffect(value) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    typeof value.n !== "string"
  )
    return null;
  return createEffectRecord(value.n, value.level, value.self, value.choice);
}
function normalizeConditions(raw) {
  const entries = [];
  let exhaustion;
  for (const item of Array.isArray(raw) ? raw : []) {
    if (!item || typeof item !== "object") continue;
    const storedName = typeof item.name === "string" ? item.name.trim() : "";
    const record = item.effectId ? statusById.get(item.effectId) : statusByName.get(storedName);
    const name = item.custom === true ? storedName : record?.name;
    const custom = item.custom === true;
    if (!name || (!custom && !record)) continue;
    const note = typeof item.note === "string" ? item.note :
      [item.source, item.reminder].filter(x => typeof x === "string" && x.trim()).join(" · ");
    if (custom || name !== "Exhaustion") {
      entries.push(custom ? {name, custom, note} : {effectId: record.id, name, custom, note});
      continue;
    }
    if (!exhaustion) {
      exhaustion = {effectId: record.id, name, custom: false, level: 0, note: ""};
      entries.push(exhaustion);
    }
    exhaustion.level = Math.min(6, exhaustion.level + intIn(item.level, 0, 6, 1));
    exhaustion.note = [exhaustion.note, note].filter(Boolean).join(" · ");
  }
  return entries.filter(entry => entry.level !== 0);
}
function normalizeState(raw) {
  let base = createFreshState(),
    repaired = false;
  if (!raw || typeof raw !== "object" || Array.isArray(raw))
    return { state: base, repaired: true };
  let known = uniqueValid(raw.knownFormIds, getFormIds(), kincaid.maximumKnownForms, base.knownFormIds),
    cantrips = uniqueValid(
      raw.knownCantripNames,
      CANTRIP_LIBRARY.filter((x) => !CIRCLE_CANTRIPS.includes(x)),
      MAX_CANTRIPS,
      base.knownCantripNames
    ),
    prep = uniqueValid(
      raw.preparedSpellNames,
      PREPARED_SPELL_OPTIONS,
      kincaid.maximumPreparedSpells,
      base.preparedSpellNames
    ),
    form =
      typeof raw.activeFormId === "string" && getFormRecord(raw.activeFormId)
        ? raw.activeFormId
        : null;
  if (form && !known.includes(form)) {
    if (known.length < kincaid.maximumKnownForms) known.push(form);
    else form = null;
    repaired = true;
  }
  let effects = [];
  if (Array.isArray(raw.activeEffects))
    for (const item of raw.activeEffects) {
      let effect = normalizeEffect(item);
      if (effect) {
        let prior = effects.findIndex((x) => x.n === effect.n);
        if (prior >= 0) effects.splice(prior, 1);
        effects.push(effect);
      } else repaired = true;
    }
  else if (raw.activeEffects !== undefined) repaired = true;
  let concentration = effects.filter((x) => SPELL_METADATA[x.n]?.[1]),
    conc =
      typeof raw.concentrationEffect === "string" &&
      concentration.some((x) => x.n === raw.concentrationEffect)
        ? raw.concentrationEffect
        : concentration[0]?.n || null;
  if (concentration.length > 1) {
    effects = effects.filter((x) => !SPELL_METADATA[x.n]?.[1] || x.n === conc);
    repaired = true;
  }
  let hp = intIn(raw.currentHitPoints, 0, MAX, base.currentHitPoints),
    flight = ["ready", "active", "spent"].includes(raw.draconicFlightState)
      ? raw.draconicFlightState
      : base.draconicFlightState,
    radiant = bool(raw.radiantStrikeActive);
  if (hp === 0) {
    form = null;
    radiant = false;
    if (flight === "active") flight = "spent";
    if (conc) {
      effects = effects.filter((x) => x.n !== conc);
      conc = null;
    }
    repaired = true;
  }
  if (!form) radiant = false;
  let state = {
    ...base,
    v: 71,
    currentHitPoints: hp,
    temporaryHitPoints: intIn(
      raw.temporaryHitPoints,
      0,
      999,
      base.temporaryHitPoints
    ),
    activeFormId: form,
    wildShapeUses: intIn(raw.wildShapeUses, 0, kincaid.maximumWildShapeUses, base.wildShapeUses),
    spellSlots: Object.fromEntries(spellSlotLevels.map(level => [level,
      intIn(raw.spellSlots?.[level], 0, kincaid.spellSlotMaximums[level], base.spellSlots[level])
    ])),
    breathWeaponUses: intIn(raw.breathWeaponUses, 0, proficiencyBonus, base.breathWeaponUses),
    draconicFlightState: flight,
    reverse: bool(raw.reverse),
    knownFormIds: known,
    knownCantripNames: cantrips,
    preparedSpellNames: prep,
    conditions: normalizeConditions(raw.conditions),
    activeEffects: effects,
    concentrationEffect: conc,
    size: null,
    long: false,
    radiantStrikeActive: radiant,
    deathSaves: {
      successes: intIn(raw.deathSaves?.successes, 0, 3, 0),
      failures: intIn(raw.deathSaves?.failures, 0, 3, 0)
    },
    lightThemeEnabled: bool(raw.lightThemeEnabled),
    noticeMessage:
      typeof raw.noticeMessage === "string"
        ? raw.noticeMessage.slice(0, 500)
        : "",
    undoHistory: []
  };
  let comparison = { ...state, undoHistory: [] };
  try {
    let candidate = {
      ...raw,
      conditions: state.conditions,
      v: 71,
      knownFormIds: known,
      knownCantripNames: cantrips,
      preparedSpellNames: prep,
      activeEffects: effects,
      concentrationEffect: conc,
      size: null,
      long: false,
      undoHistory: []
    };
    if (stableJson(candidate) !== stableJson(comparison)) repaired = true;
  } catch (_) {
    repaired = true;
  }
  return { state, repaired };
}
