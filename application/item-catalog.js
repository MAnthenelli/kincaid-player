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
  return base + shield;
}
