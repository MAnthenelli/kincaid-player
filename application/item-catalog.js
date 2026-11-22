const itemById = new Map();
const itemContentsById = new Map();
for (const record of ITEM_RECORDS) {
  if (!record.id || !record.name || itemById.has(record.id))
    throw new Error("Missing or duplicate item identity: " + record.sourcePath);
  itemById.set(record.id, record);
  if (record.containerId) {
    if (!itemContentsById.has(record.containerId)) itemContentsById.set(record.containerId, []);
    itemContentsById.get(record.containerId).push(record);
  }
}
for (const id of Object.keys(kincaid.startingInventory)) {
  if (!itemById.has(id)) throw new Error("Unknown starting item: " + id);
}

const itemCategoryLabels = {
  ammunition: "Ammunition", armor: "Armor & Shields", container: "Containers",
  equipment: "Equipment", "equipment-packs": "Equipment Packs", food: "Food",
  loot: "Loot", poison: "Poisons", potion: "Potions", ring: "Rings",
  rod: "Rods", scroll: "Scrolls", "spellcasting-focus": "Spellcasting Foci",
  tool: "Tools", trinket: "Trinkets", wand: "Wands", weapon: "Weapons"
};
const itemRarityLabels = {
  common: "Common", uncommon: "Uncommon", rare: "Rare", veryRare: "Very rare",
  legendary: "Legendary", artifact: "Artifact"
};
const itemCategoryLabel = item => itemCategoryLabels[item.category] || item.category;
const itemRarityLabel = item => itemRarityLabels[item.rarity] || item.rarity;
const itemParentName = item => itemById.get(item.containerId)?.name;
const itemSummary = item => [
  itemParentName(item) || itemCategoryLabel(item),
  itemRarityLabel(item), item.source.rules
].filter(Boolean).join(" · ");
const itemNameOrder = (a, b) => a.name.localeCompare(b.name) ||
  (itemParentName(a) || "").localeCompare(itemParentName(b) || "") ||
  a.sourcePath.localeCompare(b.sourcePath);

const canEquipItem = item => item?.type === "equipment" || item?.type === "weapon";
const armorSlot = item => item?.category === "armor" ?
  (item.subtype === "shield" ? "shield" : "armor") : null;

function wornArmor() {
  if (applicationState.activeFormId) return null;
  return applicationState.equippedItemIds.map(id => itemById.get(id))
    .find(item => armorSlot(item) === "armor") || null;
}
function untrainedArmor() {
  const armor = wornArmor();
  return armor && ["medium", "heavy"].includes(armor.subtype) ? armor : null;
}
function equippedArmorClass() {
  const dexterity = abilityModifier("dexterity");
  let base = 10 + dexterity;
  let shield = 0;
  for (const id of applicationState.equippedItemIds) {
    const item = itemById.get(id);
    const slot = armorSlot(item);
    if (!slot || !item.armor?.value) continue;
    const value = item.armor.value + (item.armor.magicalBonus || 0);
    if (slot === "shield") shield = value;
    else if (item.subtype === "heavy") base = value;
    else if (item.subtype === "medium") base = value + Math.min(dexterity, item.armor.dex ?? 2);
    else base = value + dexterity;
  }
  const armored = applicationState.equippedItemIds.some(id => armorSlot(itemById.get(id)) === "armor");
  const bracers = !armored && !shield && gearActive(bracersOfDefense);
  return base + shield + protectionGear().length + Number(armored && hasFeat("defense")) + (bracers ? 2 : 0);
}

const venomDaggerId = "7i4s9msZWpAw4Ynv";
const venomDaggerStates = ["ready", "coated", "spent"];
function changeVenomDagger(next) {
  const current = applicationState.venomDagger;
  if (!applicationState.inventory[venomDaggerId]) return;
  if (next === "coated" && (current !== "ready" || applicationState.activeFormId ||
      !applicationState.equippedItemIds.includes(venomDaggerId) || conditionModifiers().incapacitated)) return;
  if (next === "spent" && current !== "coated") return;
  if (current === next) return;
  change(() => { applicationState.venomDagger = next; },
    ({ready: "Dagger of Venom recharged at dawn.", coated: "Dagger of Venom coated for 1 minute.",
      spent: "Dagger of Venom coating ended."})[next]);
  carriedItemList.querySelector("[data-venom-dagger]")?.focus();
}

function normalizeAttunedItems(raw, inventory) {
  return Array.isArray(raw) ? [...new Set(raw.filter(id =>
    inventory[id] && itemById.get(id)?.attunement === "required"))].slice(0, 3) : [];
}
function toggleAttunement(id) {
  if (!applicationState.inventory[id] || itemById.get(id)?.attunement !== "required") return;
  const slots = applicationState.attunedItemIds;
  const attuned = slots.includes(id);
  if (!attuned && slots.length >= 3) return;
  change(() => {
    applicationState.attunedItemIds = attuned ? slots.filter(value => value !== id) : [...slots, id];
  }, itemById.get(id).name + (attuned ? " attunement ended." : " attuned."));
  carriedItemList.querySelector('[data-attune-item="' + id + '"]')?.focus();
}
function gearActive(id, carried = false) {
  if (applicationState.activeFormId || !applicationState.inventory[id]) return false;
  const item = itemById.get(id);
  return (carried || applicationState.equippedItemIds.includes(id)) &&
    (item.attunement !== "required" || applicationState.attunedItemIds.includes(id));
}
const bracersOfDefense = "DSHi7yT6OUyDoCcu";
const luckstone = "296Zgo9RhltWShE1";
const bootsOfElvenkind = "KKWBLKQIWHtcpymp";
const gogglesOfNight = "XGAWqtmhK6SYBL6A";
const ringOfSwimming = "aA7MbjnpHYoYvmuW";
const ringOfWaterWalking = "LC5LsQOPwoHQW9Mi";
function protectionGear() {
  return applicationState.equippedItemIds.filter(id =>
    ["lvaMqEhfidfHDGf5", "QtmVEreNIWEVOoLR"].includes(id) && applicationState.attunedItemIds.includes(id));
}
