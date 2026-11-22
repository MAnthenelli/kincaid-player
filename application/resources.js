function resourceLabel(resource) {
  if (resource.startsWith("slot")) return "Level " + resource.slice(4) + " spell slots";
  return {wild: "Wild Shape uses", hitDice: "available Hit Dice", breath: "Cold Breath uses", deathS: "Death save successes", deathF: "Death save failures"}[resource];
}
function resourceValue(resource) {
  if (resource.startsWith("slot")) return applicationState.spellSlots[+resource.slice(4)];
  return {
    wild: applicationState.wildShapeUses,
    hitDice: applicationState.hitDiceRemaining,
    breath: applicationState.breathWeaponUses,
    deathS: applicationState.deathSaves.successes,
    deathF: applicationState.deathSaves.failures
  }[resource];
}
function pips(resource, value, max, cls = "") {
  return `<div class="pips">${Array.from({ length: max }, (_, i) => `<button class="pip ${i < value ? "on" : ""} ${cls}" data-resource="${resource}" data-value="${i + 1}" title="${i < value ? "Available" : "Spent"}; click to set ${i + 1 === value ? i : i + 1} of ${max}" aria-label="Set ${resourceLabel(resource)} to ${i + 1 === value ? i : i + 1} of ${max}"></button>`).join("")}</div>`;
}
const flightLabels = {ready: "Ready", active: "Flying", spent: "Spent"};

function resourceRow(label, id, count, maximum) {
  return `<div class="resourceRow"><span class="resourceName">${label}</span>${pips(id, count, maximum)}<b class="resourceCount">${count}/${maximum}</b></div>`;
}

function renderResources() {
  const state = applicationState;
  elements.wildResource.innerHTML = resourceRow("Wild Shape", "wild", state.wildShapeUses, kincaid.maximumWildShapeUses);
  elements.breathResource.innerHTML = resourceRow("Cold Breath", "breath", state.breathWeaponUses, proficiencyBonus);
  elements.slots.innerHTML = spellSlotLevels.map(level =>
    resourceRow(`<button type="button" data-open-cast="all" data-cast-slot="${level}" aria-haspopup="dialog" aria-label="Cast using a level ${level} slot">${level}</button>`, "slot" + level, state.spellSlots[level], kincaid.spellSlotMaximums[level])
  ).join("");
  const flightStatus = state.activeFormId && state.draconicFlightState === "active"
    ? "Suspended" : flightLabels[state.draconicFlightState];
  elements.flightStates.innerHTML = `<div class="flightResource"><span class="flightStatus">${flightStatus}</span><details class="flightCorrection"><summary>Correct state</summary><div class="segmented">${Object.entries(flightLabels).map(([value,label]) => `<button data-flight-state="${value}" aria-pressed="${state.draconicFlightState === value}">${label}</button>`).join("")}</div></details></div>`;
  let canSlotToShape =
      applicationState.wildShapeUses === 0 &&
      spellSlotLevels.some((l) => applicationState.spellSlots[l] > 0),
    canShapeToSlot =
      !applicationState.reverse &&
      applicationState.wildShapeUses > 0 &&
      applicationState.spellSlots[1] < kincaid.spellSlotMaximums[1];
  if (canSlotToShape) {
    let levels = spellSlotLevels.filter((l) => applicationState.spellSlots[l] > 0);
    elements.resurgence.innerHTML = `<div class="resurgenceCard"><b>Wild Resurgence</b><small class="support">Spend a slot for 1 Wild Shape use.</small><div class="row wrap"><select id="resurgenceLevel" aria-label="Slot to spend">${levels.map((l) => `<option value="${l}">Level ${l} slot</option>`).join("")}</select><button id="slotToShape">Restore Wild Shape</button></div></div>`;
  } else if (canShapeToSlot) {
    elements.resurgence.innerHTML = `<div class="resurgenceCard"><b>Wild Resurgence</b><small class="support">Trade 1 Wild Shape use for a level 1 slot. Once per long rest.</small><div class="row"><button id="shapeToSlot">Restore Level 1 Slot</button></div></div>`;
  } else elements.resurgence.innerHTML = "";
}
function savingThrowDisplay(ability, value) {
  return rollDisplay(value, "save", ability);
}
function renderSaves() {
  const values = getFormSavingThrowRows(getFormRecord(applicationState.activeFormId));
  elements.saves.innerHTML = values.map(([ability, value]) =>
    `<div class="stat"><b>${ability} ${savingThrowDisplay(ability, value)}</b></div>`
  ).join("");
}
