const restDialog = getElementById("restDialog");
const takeRestButton = getElementById("takeRest");
const physicalHitDie = getElementById("physicalHitDie");
const rollHitDie = getElementById("rollHitDie");
const spendHitDie = getElementById("spendHitDie");
let restDraft = null;

for (let value = 1; value <= kincaid.hitDieSize; value++) physicalHitDie.add(new Option(value, value));
rollHitDie.textContent = `Roll d${kincaid.hitDieSize}`;

function shortRestRecovery() {
  return Math.min(kincaid.maximumWildShapeUses, applicationState.wildShapeUses + kincaid.shortRestWildShapeRecovery);
}

function longRestRecovery() {
  return {
    conditions: conditionsAfterLongRest(),
    hitDiceRemaining: kincaid.druidLevel,
    wildShapeUses: kincaid.maximumWildShapeUses,
    spellSlots: {...kincaid.spellSlotMaximums},
    breathWeaponUses: proficiencyBonus,
    draconicFlightState: "ready",
    reverse: false,
    activeFormId: null,
    temporaryHitPoints: 0,
    consumableEffects: [],
    oiledWeaponId: null,
    venomDagger: applicationState.venomDagger === "coated" ? "spent" : applicationState.venomDagger,
    featChoices: {...applicationState.featChoices, ...(initiateChoices().length ? {"magic-initiate": initiateChoices().map(choice => ({...choice, spent: false}))} : {})},
    activeEffects: applicationState.activeEffects.filter(isIndefiniteBattlefieldEffect),
    concentrationEffect: null,
    pendingCast: null,
    size: null,
    long: false,
    radiantStrikeActive: false,
    deathSaves: {successes: 0, failures: 0}
  };
}

function renderRestSummary() {
  const summary = getElementById("restSummary");
  summary.replaceChildren();
  const current = applicationState;
  const add = message => appendText(summary, "li", message);
  const compare = (label, before, after) => {
    if (before !== after) add(`${label} ${before} → ${after}`);
  };
  if (restDraft.kind === "long") {
    const recovery = longRestRecovery();
    const maximum = maximumBaseHP(applicationState.featChoices) + aidBonus(recovery);
    compare("HP", current.currentHitPoints, maximum);
    compare("Hit Dice", current.hitDiceRemaining, recovery.hitDiceRemaining);
    compare("Wild Shape uses", current.wildShapeUses, recovery.wildShapeUses);
    for (const level of spellSlotLevels)
      compare(`Level ${level} spell slots`, current.spellSlots[level], recovery.spellSlots[level]);
    compare("Cold Breath uses", current.breathWeaponUses, recovery.breathWeaponUses);
    if (current.draconicFlightState !== "ready") add("Ready Draconic Flight");
    if (current.reverse) add("Ready Wild Resurgence’s slot recovery");
    if (current.temporaryHitPoints) add(`Clear ${current.temporaryHitPoints} temporary HP`);
    if (current.activeFormId) add(`Leave ${getFormRecord(current.activeFormId).name} form`);
    if (current.pendingCast) add(`Interrupt ${current.pendingCast.spell}`);
    if (current.concentrationEffect) add(`End concentration on ${current.concentrationEffect}`);
    if (current.activeEffects.some(effect =>
      effect.n !== current.concentrationEffect && !isIndefiniteBattlefieldEffect(effect)) ||
      current.conditions.some(entry => !entry.custom && statusById.get(entry.effectId)?.expiresOnRest)) {
      add("Clear effects that expire at rest");
    }
    const exhaustion = exhaustionEntry()?.level ?? 0;
    if (exhaustion) compare("Exhaustion", exhaustion, exhaustion - 1);
    if (current.deathSaves.successes || current.deathSaves.failures) add("Reset death saves");
  } else {
    compare("Wild Shape uses", current.wildShapeUses, shortRestRecovery());
  }
  summary.hidden = !summary.childElementCount;
  const empty = getElementById("restNoRecovery");
  empty.textContent = restDraft.kind === "short" ? "Wild Shape uses are already full." : "Resources are full and no effects will change.";
  empty.hidden = !summary.hidden;
}

function shortRestHealing() {
  const hitPoints = applicationState.currentHitPoints;
  const maximum = currentMaxHP();
  const form = getFormRecord(applicationState.activeFormId);
  const modifier = form?.abilityModifiers.constitution ?? abilityModifier("constitution");
  let projected = hitPoints;
  const rolls = restDraft.rolls.map(roll => {
    const gained = Math.min(maximum - projected, Math.max(1, roll + modifier));
    projected += gained;
    return {roll, gained};
  });
  return {
    hitPoints, maximum, modifier, projected, rolls,
    remaining: applicationState.hitDiceRemaining - rolls.length
  };
}

function renderShortRestHealing() {
  const healing = shortRestHealing();
  const {hitPoints, maximum, modifier, projected, rolls, remaining} = healing;
  getElementById("hitDiceTitle").hidden = hitPoints === maximum && !rolls.length;
  getElementById("restDiceRemaining").hidden = hitPoints === maximum && !rolls.length;
  getElementById("restDiceRemaining").textContent = `${remaining}/${kincaid.druidLevel} d${kincaid.hitDieSize} remaining`;
  let preview = `HP ${hitPoints}/${maximum}`;
  if (rolls.length) preview = `HP ${hitPoints} → ${projected} / ${maximum} · +${projected - hitPoints} HP`;
  if (projected === maximum) preview += " · Full HP";
  else if (remaining === 0) preview += " · No Hit Dice left";
  getElementById("restHealingPreview").textContent = preview;
  const list = getElementById("restHitDieRolls");
  list.replaceChildren();
  for (const {roll, gained} of rolls) {
    const calculation = `${roll} ${modifier < 0 ? "−" : "+"} ${Math.abs(modifier)} CON`;
    appendText(list, "li", `${calculation} · ${gained} HP regained`);
  }
  list.hidden = !rolls.length;
  getElementById("removeRestHitDie").hidden = !rolls.length;
  const canSpend = remaining > 0 && projected < maximum;
  getElementById("hitDiceControls").hidden = !canSpend;
  rollHitDie.textContent = "Roll d" + kincaid.hitDieSize + (modifier < 0 ? " − " : " + ") + Math.abs(modifier);
  rollHitDie.disabled = !canSpend;
  physicalHitDie.disabled = !canSpend;
  spendHitDie.disabled = !canSpend || !physicalHitDie.value;
}

function renderLongRestChoices() {
  const prepared = applicationState.preparedSpellNames;
  const preview = getElementById("restSpellPreview");
  preview.replaceChildren();
  for (const [label, first, second] of [
    ["Prepare", restDraft.preparedSpells, prepared],
    ["Unprepare", prepared, restDraft.preparedSpells]
  ]) {
    const names = first.filter(name => !second.includes(name)).sort((a, b) => a.localeCompare(b));
    if (names.length) appendText(preview, "li", `${label} ${names.join(", ")}`);
  }
  preview.hidden = !preview.childElementCount;
  const swap = restDraft.formSwap;
  const formPreview = getElementById("restFormPreview");
  formPreview.textContent = swap ? `${selectionLabel("form", swap.outgoing)} → ${selectionLabel("form", swap.incoming)}` : "";
  formPreview.hidden = !swap;
  getElementById("removeRestFormSwap").hidden = !swap;
  const replace = getElementById("restReplaceForm");
  replace.textContent = swap ? "Change form swap" : "Replace one known form";
  replace.disabled = !applicationState.knownFormIds.length;
}

function openRest(kind, trigger) {
  restDraft = {kind, trigger, rolls: [], preparedSpells: [...applicationState.preparedSpellNames], formSwap: null};
  const long = kind === "long";
  const title = getElementById("restTitle");
  title.textContent = long ? "Long rest" : "Short rest";
  takeRestButton.textContent = long ? "Take long rest" : "Take short rest";
  getElementById("shortRestHealing").hidden = long;
  getElementById("longRestChoices").hidden = !long;
  physicalHitDie.value = "";
  renderRestSummary();
  if (long) renderLongRestChoices();
  else renderShortRestHealing();
  trigger.focus({preventScroll: true});
  restDialog.showModal();
  title.focus({preventScroll: true});
}

function recordRestHitDie(roll) {
  if (!restDialog.open || restDraft?.kind !== "short") return;
  const {remaining, projected, maximum} = shortRestHealing();
  if (!Number.isInteger(roll) || roll < 1 || roll > kincaid.hitDieSize || remaining <= 0 || projected >= maximum) return;
  restDraft.rolls.push(roll);
  physicalHitDie.value = "";
  renderShortRestHealing();
  if (rollHitDie.disabled) takeRestButton.focus({preventScroll: true});
  else if (document.activeElement === spendHitDie) physicalHitDie.focus({preventScroll: true});
}

elements.shortRest.onclick = event => openRest("short", event.currentTarget);
elements.longRest.onclick = event => openRest("long", event.currentTarget);
getElementById("cancelRest").onclick = () => restDialog.close();
restDialog.addEventListener("close", () => {
  if (restDialog.open) return;
  restDraft?.trigger.focus({preventScroll: true});
  restDraft = null;
});

rollHitDie.onclick = () => recordRestHitDie(1 + Math.floor(Math.random() * kincaid.hitDieSize));
physicalHitDie.onchange = renderShortRestHealing;
spendHitDie.onclick = () => recordRestHitDie(Number(physicalHitDie.value));
getElementById("removeRestHitDie").onclick = event => {
  restDraft.rolls.pop();
  renderShortRestHealing();
  if (event.currentTarget.hidden) rollHitDie.focus({preventScroll: true});
};

getElementById("restPrepareSpells").onclick = event => openSelectionCatalog(event.currentTarget, "spell", "rest");
getElementById("restReplaceForm").onclick = event => openSelectionCatalog(event.currentTarget, "form", "rest");
getElementById("removeRestFormSwap").onclick = () => {
  restDraft.formSwap = null;
  renderLongRestChoices();
  getElementById("restReplaceForm").focus({preventScroll: true});
};

takeRestButton.onclick = () => {
  if (!restDraft || !restDialog.open || selectionCatalog.open) return;
  if (restDraft.kind === "short") {
    const {remaining, projected, hitPoints, rolls} = shortRestHealing();
    const recovery = shortRestRecovery();
    const healed = projected - hitPoints;
    change(() => {
      applicationState.hitDiceRemaining = remaining;
      applicationState.currentHitPoints = projected;
      applicationState.wildShapeUses = recovery;
      if (!hitPoints && projected) applicationState.deathSaves = {successes: 0, failures: 0};
    }, messageLines("Short rest complete.", rolls.length ? `Regained ${healed} HP · ${remaining}/${kincaid.druidLevel} Hit Dice remaining.` : ""));
  } else {
    const recovery = longRestRecovery();
    const swap = restDraft.formSwap;
    const restoredDice = recovery.hitDiceRemaining - applicationState.hitDiceRemaining;
    change(() => {
      // change() reconciles a change in Aid after the recovery is applied.
      const currentMaximum = currentMaxHP();
      Object.assign(applicationState, recovery, {
        currentHitPoints: currentMaximum,
        preparedSpellNames: restDraft.preparedSpells
      });
      if (swap) applicationState.knownFormIds = applicationState.knownFormIds.map(id =>
        id === swap.outgoing ? swap.incoming : id);
    }, messageLines("Long Rest complete.", restoredDice ? `Restored ${restoredDice} Hit ${restoredDice === 1 ? "Die" : "Dice"}.` : ""));
  }
  restDialog.close();
};
