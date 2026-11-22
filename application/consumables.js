const consumableRules = new Map();
const gaseousPotion = "bqZ6NTLDCUB98YjV";
const animalFriendshipPotion = "nXWevqtV6p484N59";
function hasPotionSpell(name) {
  return name === "Animal Friendship" && applicationState.consumableEffects.includes(animalFriendshipPotion);
}
const sharpnessOil = "C0MNXWA81ufzGlp5";
function isGaseous() {
  return applicationState.consumableEffects.includes(gaseousPotion);
}
function canOilWeapon(item) {
  return item?.type === "weapon" && item.damage?.base?.types.some(type => ["piercing", "slashing"].includes(type));
}
function endGaseousForm() {
  change(() => {
    applicationState.consumableEffects = applicationState.consumableEffects.filter(id => id !== gaseousPotion);
  }, "Gaseous Form ended.");
}
function normalizeOtherConsumableUses(raw) {
  return Array.isArray(raw) ? raw.slice(-30).filter(entry =>
    entry && consumableRules.has(entry.id) && typeof entry.target === "string" &&
    Number.isSafeInteger(entry.quantity) && entry.quantity > 0 &&
    Number.isSafeInteger(entry.healing) && entry.healing >= 0
  ).map(entry => ({id: entry.id, target: entry.target.slice(0, 120), quantity: entry.quantity, healing: entry.healing})) : [];
}
function registerConsumable(ids, rule) {
  for (const id of ids.split(" ")) consumableRules.set(id, rule);
}
registerConsumable("ytlsBjYsZ7OBSEBs", {healing: [2, 4, 2]});
registerConsumable("L887NdWEP5NqHCrQ", {healing: [4, 4, 4]});
registerConsumable("5m9ErO9In8Uc5yyf", {healing: [8, 4, 8]});
registerConsumable("JFiSlgcm3uSSBM5t", {healing: [10, 4, 20]});
registerConsumable("VmcgAIsRCyrjBguC", {verb: "Apply", healing: [2, 8, 2], ointment: true});
registerConsumable("Sx5E6utixHdAbGNb FvNOwWbh5FXyX4xe WPWszFTGzmdIuDRJ", {verb: "Throw", table: "Resolve the improvised attack and the target’s outcome at the table."});
registerConsumable("Xbq8CyXSRV358SfP", {verb: "Apply", doses: true, duration: "1 hour", table: "Resolve Etherealness at the table. Use one additional vial per size above Medium."});
registerConsumable("C0MNXWA81ufzGlp5", {verb: "Apply", duration: "1 hour", table: "Choose a carried weapon to update its rolls. For another creature’s weapon or ammunition, apply +3 at the table."});
registerConsumable("FIDyR0kZnxGy7bj8", {verb: "Apply", doses: true, duration: "8 hours", table: "Choose Freedom of Movement on a creature or Grease on the ground. Use one additional vial per size above Medium when coating a creature."});
for (const [damage, id] of Object.entries({
  acid: "zgZkJAyFAfYmyn11", cold: "34YKlIJVVWLeBv7R", fire: "Jj4iFQQGvckx8Wsj",
  force: "kKGJjVVlJVoakWgQ", lightning: "8MPnSrvEeZhPhtTi", necrotic: "xw99pcqPBVwtMOLw",
  poison: "f5chGcpQCi1HYPQw", psychic: "c0luemOP0iW8L23R", radiant: "LBQWNqX6hZOKhQ8a",
  thunder: "zBX8LLC2CjC89Dzl"
})) registerConsumable(id, {duration: "1 hour", grant: damage + "-resistance"});
for (const [score, ids] of Object.entries({
  21: "mhFBTY0egW8AeCHe", 23: "TevMHicE3A70AlmP 4ZiJsDTRA1GgcWKP",
  25: "bEZOY6uvHRweMM56", 27: "lAcTZgNtpmks2Mo5", 29: "1KMSpOSU0EliUBm2"
})) registerConsumable(ids, {duration: "1 hour", strength: Number(score)});
registerConsumable("aMnWi1WXWpxRHq4r", {duration: "1 hour", climb: true, table: "Apply Advantage to Athletics checks made to climb."});
registerConsumable("eTNc8XPtvZNe3yQs", {duration: "1 hour", fly: true, table: "Can hover. Resolve falling when the potion expires."});
registerConsumable("CAZMwFBWp9VC0ZCg", {duration: "1 hour", water: true});
registerConsumable("rTn4p9nJr4Aq2GPB", {duration: "1 hour, or until attacking or casting", grant: "invisible", table: "End the effect after an attack."});
registerConsumable("gTRFQLdVD1gsKtPi", {duration: "1d4 hours", size: 1, table: "Roll duration and resolve the spell’s other benefits at the table."});
registerConsumable("HY8duCwmvlXOruTG", {duration: "1d4 hours", size: -1, table: "Roll duration and resolve the spell’s other penalties at the table."});
registerConsumable("ctKfjHjk9gs9UtZI", {duration: "1 minute", haste: true, table: "Resolve the restricted additional action and the turn of lethargy at expiry."});
registerConsumable("wNKYbKYwOHbA7SH8", {duration: "1 hour", heroism: true, table: "Apply Bless and track expiry of its temporary HP at the table."});
registerConsumable("Fc6UfFNOnW80XMzi", {duration: "1 hour", table: "Apply Advantage on saves against poison if the drinker is eligible."});
registerConsumable("63nb14yQRJMc4bIn", {duration: "10 minutes to trigger, then 1 hour", table: "Identify the next creature seen and resolve the charm at the table."});
registerConsumable("nXWevqtV6p484N59", {duration: "1 hour", table: "Cast at will through the spell chooser. Resolve the DC 13 save and target at the table."});
registerConsumable("bAyr7j5Peq9wIJTa", {duration: "Clairvoyance duration", table: "Choose the sensor’s location and sense, and track the spell at the table."});
registerConsumable("Ct9LR9Ft1FG4a6Y1", {duration: "Detect Thoughts duration", table: "Resolve Detect Thoughts with DC 13 at the table."});
registerConsumable("bqZ6NTLDCUB98YjV", {duration: "1 hour, or end as a Bonus Action", table: "Pass through small openings. Handle speech, held objects, liquids, and nearby creatures at the table."});
const slipperinessOil = "FIDyR0kZnxGy7bj8";
function consumableCombatUse(id) {
  const rule = consumableRules.get(id);
  if (!rule) return null;
  if (id === slipperinessOil) return {context: "action", target: "ground", label: "Grease ground"};
  if (rule.verb === "Apply" && !rule.ointment) return null;
  const item = itemById.get(id);
  return {context: !rule.verb && item.source.rules === "2024" ? "bonus" : "action"};
}
function consumableVerb(item) {
  return consumableRules.get(item.id)?.verb || "Drink";
}
function normalizeConsumableEffects(raw) {
  if (!Array.isArray(raw)) return [];
  return [...new Set(raw.filter(id => typeof id === "string" && consumableRules.get(id)?.duration))];
}
function activeConsumables() {
  return applicationState.consumableEffects.map(id => ({record: itemById.get(id), effect: consumableRules.get(id)}));
}
function renderConsumableEffects(expanded) {
  if (applicationState.oiledWeaponId) {
    const entry = effectEntry("consumable:sharpness", "Oil of Sharpness", expanded);
    const weapon = itemById.get(applicationState.oiledWeaponId);
    appendText(entry.querySelector("summary"), "small", weapon.name + " · 1 hour");
    appendText(entry, "p", "The coating makes this weapon magical and grants +3 to its attack and damage rolls.");
    appendText(entry, "button", "End coating").onclick = () =>
      change(() => { applicationState.oiledWeaponId = null; }, "Oil of Sharpness ended.");
    elements.effects.append(entry);
  }
  for (const {record, effect} of activeConsumables()) {
    const entry = effectEntry("consumable:" + record.id, record.name, expanded);
    appendText(entry.querySelector("summary"), "small", effect.duration);
    appendText(entry, "p", ["Kincaid", record.source.rules + " rules", effect.table].filter(Boolean).join(" · "));
    appendText(entry, "button", "End effect").onclick = () => change(() => {
      applicationState.consumableEffects = applicationState.consumableEffects.filter(id => id !== record.id);
    }, record.name + " ended.");
    elements.effects.append(entry);
  }
}
function collectionDialog(title, trigger) {
  const dialog = document.createElement("dialog");
  dialog.className = "sheetDialog collectionDialog";
  const form = appendText(dialog, "form", "");
  const heading = appendText(form, "h3", title);
  heading.id = "collectionDialogTitle";
  dialog.setAttribute("aria-labelledby", heading.id);
  const actions = appendText(form, "footer", "");
  actions.className = "dialogFooter";
  const cancel = appendText(actions, "button", "Cancel");
  cancel.type = "button";
  const confirm = appendText(actions, "button", "Confirm");
  form.method = "dialog";
  dialog.addEventListener("close", () => {
    dialog.remove();
    restoreInventoryActionFocus(trigger);
  });
  wireDialogDismissal(dialog, cancel);
  document.body.append(dialog);
  return {dialog, form, actions, confirm, field(tag, label) {
    const wrapper = appendText(form, "label", label + " ");
    form.insertBefore(wrapper, actions);
    return appendText(wrapper, tag, "");
  }, note(value) { return form.insertBefore(appendText(form, "p", value), actions); }};
}
function openConsumable(id, trigger, combatTarget) {
  const item = itemById.get(id);
  const stock = applicationState.inventory[id];
  const rule = consumableRules.get(id);
  if (!rule || !stock) return;
  const {dialog, form, field, note, confirm} = collectionDialog(item.name, trigger);
  const verb = consumableVerb(item);
  confirm.textContent = verb === "Drink" ? "Use potion" : verb;
  const otherOnly = verb === "Throw" || id === sharpnessOil;
  const target = field("select", "Target");
  if (!otherOnly) target.add(new Option("Kincaid", "self"));
  if (id === sharpnessOil) {
    for (const weaponId of Object.keys(applicationState.inventory)) {
      const weapon = itemById.get(weaponId);
      if (canOilWeapon(weapon)) target.add(new Option(weapon.name, "weapon:" + weaponId));
    }
    target.add(new Option("Slashing or piercing weapon", "other"));
    target.add(new Option("Up to five pieces of slashing or piercing ammunition", "ammunition"));
  } else if (verb === "Throw") {
    target.add(new Option("Throw at a target", "other"));
    if (id !== "FvNOwWbh5FXyX4xe") target.add(new Option("Splash a nearby target", "splash"));
  } else target.add(new Option("Another recipient", "other"));
  if (id === slipperinessOil) target.add(new Option("Ground", "ground"));
  if (combatTarget === "ground") {
    target.replaceChildren(new Option("Ground", "ground"));
    confirm.textContent = "Grease ground";
  }

  const units = rule.doses ? field("input", "Vials used") : null;
  if (units) {
    Object.assign(units, {type: "number", min: 1, max: stock, value: 1, required: true});
    const sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];
    const syncTarget = () => {
      const self = target.value === "self";
      const min = self ? 1 + Math.max(0, sizes.indexOf(currentSize()) - 2) : 1;
      units.min = min;
      units.value = min;
      units.readOnly = self || target.value === "ground";
    };
    target.onchange = syncTarget;
    syncTarget();
  }
  let roll;
  if (rule.healing) {
    const [dice, sides, bonus] = rule.healing;
    roll = field("input", `Healing (${dice}d${sides} + ${bonus})`);
    Object.assign(roll, {type: "number", min: dice + bonus, max: dice * sides + bonus, required: true});
  }
  const recipient = field("input", "Recipient or target (optional)");
  recipient.maxLength = 80;
  const syncRecipient = () => { recipient.parentElement.hidden = target.value === "self" || target.value.startsWith("weapon:"); };
  target.addEventListener("change", syncRecipient);
  syncRecipient();
  note([item.source.rules + " rules", rule.doses ? "Use the number of vials required by the target." : "",
    rule.ointment ? "Action. Inventory quantity is measured in doses. A jar contains 1d4 + 1." :
    verb === "Drink" || verb === "Throw" ? (consumableCombatUse(id).context === "bonus" ? "Bonus Action." : "Action under the bundled rules.") :
    rule.verb === "Apply" ? "Application takes 1 minute. Ground use of Oil of Slipperiness takes an Action." : "",
    rule.duration && "Duration: " + rule.duration, rule.table].filter(Boolean).join(" "));
  const status = note("");
  status.setAttribute("role", "status");
  form.onsubmit = event => {
    event.preventDefault();
    if (!dialog.open || !form.checkValidity()) return;
    const self = target.value === "self";
    const weaponId = target.value.startsWith("weapon:") ? target.value.slice(7) : null;
    if (weaponId && (!applicationState.inventory[weaponId] || !canOilWeapon(itemById.get(weaponId)))) return;
    const used = units ? units.valueAsNumber : 1;
    if (!Number.isInteger(used) || used < 1 || used > applicationState.inventory[id] || !applicationState.inventory[id]) return;
    if (!applicationState.currentHitPoints || conditionModifiers().incapacitated) {
      status.textContent = "Kincaid cannot use an item while incapacitated.";
      return;
    }
    if (isGaseous()) { status.textContent = "Items cannot be used in Gaseous Form."; return; }
    const targetLabel = recipient.value.trim() || target.selectedOptions[0].textContent;
    const healing = roll ? roll.valueAsNumber : 0;
    const recovered = self && healing ? Math.min(healing, currentMaxHP() - applicationState.currentHitPoints) : 0;
    dialog.close();
    change(() => {
      applicationState.inventory[id] -= used;
      if (!applicationState.inventory[id]) delete applicationState.inventory[id];
      if (weaponId) applicationState.oiledWeaponId = weaponId;
      else if (!self) applicationState.otherConsumableUses = [
        ...applicationState.otherConsumableUses.slice(-29), {id, target: targetLabel, quantity: used, healing}
      ];
      if (self) {
        applicationState.currentHitPoints += recovered;
        if (rule.ointment) applicationState.conditions = applicationState.conditions.filter(entry => entry.effectId !== "poisoned");
        if (rule.heroism) applicationState.temporaryHitPoints = Math.max(10, applicationState.temporaryHitPoints);
        if (rule.duration && !applicationState.consumableEffects.includes(id)) applicationState.consumableEffects.push(id);
      }
    }, item.name + " used. " + (self ? (roll ? recovered + " HP regained." : "") :
      (weaponId ? "Coated " : "Target: ") + targetLabel + ". " + (roll ? healing + " HP rolled." : "")));
    restoreInventoryActionFocus(trigger);
  };
  dialog.showModal();
}
