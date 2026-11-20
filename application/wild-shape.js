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
  if (!formRecord) return equippedArmorClass;
  const base = Math.max(circleFormArmorClass, formRecord.armorClass);
  return hasSelfEffect("Barkskin") ? Math.max(17, base) : base;
}
function currentAC() {
  return applicationState.activeFormId
    ? formAC(applicationState.activeFormId)
    : hasSelfEffect("Barkskin")
      ? Math.max(17, equippedArmorClass)
      : equippedArmorClass;
}
function selfSenses() {
  let x = [];
  if (hasSelfEffect("Darkvision")) x.push("Darkvision 150 ft");
  if (hasSelfEffect("Water Breathing")) x.push("Water Breathing");
  if (hasSelfEffect("Water Walk")) x.push("Water Walk");
  return x.join(" · ");
}
function speedObj() {
  const modifiers = liveModifiers();
  const adjust = speed => modifiers.stopMovement ? 0 : Math.max(0, speed + modifiers.speedDelta);
  if (!applicationState.activeFormId) {
    let speed = adjust(kincaid.walkingSpeed);
    return {
      Walk: speed,
      ...(applicationState.draconicFlightState === "active"
        ? { Fly: speed }
        : {})
    };
  }
  let speeds = {};
  for (const [speedName, speed] of Object.entries(
    getFormRecord(applicationState.activeFormId).speeds
  ))
    speeds[formatSpeedName(speedName)] = adjust(speed);
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
function endEffect(name) {
  applicationState.activeEffects = applicationState.activeEffects.filter(
    (x) => x.n !== name
  );
  if (applicationState.concentrationEffect === name)
    applicationState.concentrationEffect = null;
  syncDerivedState();
}
function endConc() {
  if (applicationState.concentrationEffect)
    endEffect(applicationState.concentrationEffect);
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
