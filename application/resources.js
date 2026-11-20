function resourceLabel(resource) {
  if (resource.startsWith("slot")) return "Level " + resource.slice(4) + " spell slots";
  return {wild: "Wild Shape uses", breath: "Cold Breath uses", deathS: "Death save successes", deathF: "Death save failures"}[resource];
}
function pips(resource, value, max, cls = "") {
  return `<div class="pips">${Array.from({ length: max }, (_, i) => `<button class="pip ${i < value ? "on" : ""} ${cls}" data-resource="${resource}" data-value="${i + 1}" title="${i < value ? "Available" : "Spent"}; click to set ${i + 1 === value ? i : i + 1} of ${max}" aria-label="Set ${resourceLabel(resource)} to ${i + 1 === value ? i : i + 1} of ${max}"></button>`).join("")}</div>`;
}
function renderResources() {
  elements.wildResource.innerHTML = `<div class="resourceRow"><b>Wild Shape</b>${pips("wild", applicationState.wildShapeUses, kincaid.maximumWildShapeUses)}<b>${applicationState.wildShapeUses}/${kincaid.maximumWildShapeUses}</b></div>`;
  elements.breathResource.innerHTML = `<div class="resourceRow"><b>Cold Breath</b>${pips("breath", applicationState.breathWeaponUses, proficiencyBonus)}<b>${applicationState.breathWeaponUses}/${proficiencyBonus}</b></div>`;
  elements.slots.innerHTML = spellSlotLevels
    .map(
      (l) =>
        `<div class="resourceRow"><span>Level ${l}</span>${pips("slot" + l, applicationState.spellSlots[l], kincaid.spellSlotMaximums[l])}<b>${applicationState.spellSlots[l]}/${kincaid.spellSlotMaximums[l]}</b></div>`
    )
    .join("");
  elements.flightStates.innerHTML = `<div class="flightResource"><span class="flightStatus">${applicationState.draconicFlightState[0].toUpperCase() + applicationState.draconicFlightState.slice(1)}</span><details class="flightCorrection"><summary>Correct state</summary><div class="segmented">${["ready", "active", "spent"].map((x) => `<button data-flight-state="${x}" class="${applicationState.draconicFlightState === x ? "active" : ""}">${x[0].toUpperCase() + x.slice(1)}</button>`).join("")}</div></details></div>`;
  let canSlotToShape =
      applicationState.wildShapeUses === 0 &&
      spellSlotLevels.some((l) => applicationState.spellSlots[l] > 0),
    canShapeToSlot =
      !applicationState.reverse &&
      applicationState.wildShapeUses > 0 &&
      applicationState.spellSlots[1] < kincaid.spellSlotMaximums[1];
  if (canSlotToShape) {
    let levels = spellSlotLevels.filter((l) => applicationState.spellSlots[l] > 0);
    elements.resurgence.innerHTML = `<div class="resurgenceCard"><b>Wild Resurgence</b><small class="support">You have no Wild Shape uses. Spend one spell slot to restore 1 use.</small><div class="row"><select id="resurgenceLevel">${levels.map((l) => `<option value="${l}">Level ${l} slot</option>`).join("")}</select><button id="slotToShape">Restore Wild Shape</button></div></div>`;
  } else if (canShapeToSlot) {
    elements.resurgence.innerHTML = `<div class="resurgenceCard"><b>Wild Resurgence</b><small class="support">Once per Long Rest, spend 1 Wild Shape use to restore one expended Level 1 spell slot.</small><div class="row"><button id="shapeToSlot">Restore Level 1 Slot</button></div></div>`;
  } else elements.resurgence.innerHTML = "";
}
function savingThrowDisplay(ability, value, mods) {
  return rollDisplay(value, "save", ability);
}
function renderSaves() {
  const values = getFormSavingThrowRows(getFormRecord(applicationState.activeFormId));
  const mods = conditionModifiers();
  elements.saves.innerHTML = values.map(([ability, value]) => {
    const concentration = ability === "CON" && kincaid.warCaster && !mods.incapacitated ? "<small>Concentration: Advantage</small>" : "";
    return `<div class="stat"><b>${ability} ${savingThrowDisplay(ability, value, mods)}</b>${concentration}</div>`;
  }).join("");
}
