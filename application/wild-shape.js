function hasSelfEffect(name) {
  return applicationState.activeEffects.some((x) => x.n === name && x.self);
}
function syncDerivedState() {
  applicationState.long = hasSelfEffect("Longstrider");
  // Mirror the v71 save field for compatibility. Live size uses the catalog.
  const steps = liveModifiers().sizeSteps;
  applicationState.size = steps > 0 ? "enlarge" : steps < 0 ? "reduce" : null;
}
function formAC(formId) {
  let formRecord = getFormRecord(formId);
  if (!formRecord) return equippedArmorClass();
  const base = Math.max(circleFormArmorClass(), formRecord.armorClass);
  return hasSelfEffect("Barkskin") ? Math.max(17, base) : base;
}
function currentAC() {
  const base = applicationState.activeFormId
    ? formAC(applicationState.activeFormId)
    : hasSelfEffect("Barkskin")
      ? Math.max(17, equippedArmorClass())
      : equippedArmorClass();
  return base + liveModifiers().armorClassDelta;
}
function selfSenses() {
  let x = [];
  if (hasFeat("boon-of-truesight")) x.push("Truesight 60 ft");
  const goggles = gearActive(gogglesOfNight);
  if (hasSelfEffect("Darkvision") || goggles)
    x.push(`Darkvision ${(hasSelfEffect("Darkvision") ? 150 : kincaid.darkvision) + (goggles ? 60 : 0)} ft`);
  if (activeConsumables().some(({effect}) => effect.water) || hasSelfEffect("Water Breathing")) x.push("Water Breathing");
  if (gearActive(ringOfWaterWalking) || hasSelfEffect("Water Walk")) x.push("Water Walk");
  return x.join(" · ");
}
function speedObj() {
  const modifiers = liveModifiers();
  const adjust = speed => modifiers.stopMovement ? 0 : Math.max(0, Math.floor((speed + modifiers.speedDelta) * modifiers.speedMultiplier));
  if (isGaseous()) return {Fly: adjust(10)};
  if (!applicationState.activeFormId) {
    let speed = adjust(kincaid.walkingSpeed);
    return {
      Walk: speed,
      ...(gearActive(ringOfSwimming) ? {Swim: adjust(40)} : {}),
      ...(activeConsumables().some(({effect}) => effect.climb) ? {Climb: speed} : {}),
      ...((applicationState.draconicFlightState === "active" || activeConsumables().some(({effect}) => effect.fly))
        ? { Fly: speed }
        : {})
    };
  }
  let speeds = {};
  for (const [speedName, speed] of Object.entries(
    getFormRecord(applicationState.activeFormId).speeds
  ))
    speeds[formatSpeedName(speedName)] = adjust(speed);
  const effects = activeConsumables();
  if (effects.some(({effect}) => effect.climb) && speeds.Walk) speeds.Climb = Math.max(speeds.Climb || 0, speeds.Walk);
  if (effects.some(({effect}) => effect.fly) && speeds.Walk) speeds.Fly = Math.max(speeds.Fly || 0, speeds.Walk);
  return speeds;
}
function speedText() {
  return Object.entries(speedObj())
    .map(([k, v]) => `${k} ${v} ft`)
    .join(" · ");
}
function currentSize() {
  let sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"],
    base = applicationState.activeFormId
      ? getFormRecord(applicationState.activeFormId).size
      : kincaid.size,
    index =
      sizes.indexOf(base) +
      liveModifiers().sizeSteps;
  return sizes[Math.max(0, Math.min(5, index))];
}
function endEffect(name, order) {
  applicationState.activeEffects = applicationState.activeEffects.filter(
    (effect) => effect.n !== name || (order !== undefined && (effect.order ?? null) !== order)
  );
  if (applicationState.concentrationEffect === name)
    applicationState.concentrationEffect = null;
  syncDerivedState();
}
function endConc() {
  applicationState.pendingCast = null;
  if (applicationState.concentrationEffect)
    endEffect(applicationState.concentrationEffect);
}
function clearAtZeroHP() {
  endConc();
  applicationState.consumableEffects = applicationState.consumableEffects.filter(id => id !== gaseousPotion);
  applicationState.activeFormId = null;
  applicationState.radiantStrikeActive = false;
  if (applicationState.draconicFlightState === "active") applicationState.draconicFlightState = "spent";
}
function enterForm(formId) {
  applicationState.wildShapeUses--;
  applicationState.activeFormId = formId;
  applicationState.radiantStrikeActive = false;
  applicationState.temporaryHitPoints = Math.max(
    circleFormTemporaryHP,
    applicationState.temporaryHitPoints
  );
}
function leaveForm() {
  applicationState.activeFormId = null;
  applicationState.radiantStrikeActive = false;
}
function transform(formId) {
  let formRecord = getFormRecord(formId);
  if (!formRecord) return;
  if (!applicationState.wildShapeUses) return showNotice("No Wild Shape uses.");
  change(() => enterForm(formId), `Wild Shape: ${formRecord.name}.`);
}
