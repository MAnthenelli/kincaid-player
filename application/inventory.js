const itemCatalogList = getElementById("itemCatalogList");
const itemCatalog = getElementById("itemCatalog");
const itemCatalogResults = getElementById("itemCatalogResults");
const catalogFeedback = getElementById("catalogFeedback");
const catalogNotice = getElementById("catalogNotice");
const catalogUndo = getElementById("catalogUndo");
const carriedItemList = getElementById("carriedItemList");
const openItemCatalog = getElementById("openItemCatalog");
const itemSearch = getElementById("itemSearch");
const itemCategory = getElementById("itemCategory");
const itemRarity = getElementById("itemRarity");
const itemSort = getElementById("itemSort");
const itemPageStatus = getElementById("itemPageStatus");
const previousItemPage = getElementById("previousItemPage");
const nextItemPage = getElementById("nextItemPage");
const itemPageSize = 24;
let itemPage = 0;
const rarityRanks = new Map(Object.keys(itemRarityLabels).map((rarity, rank) => [rarity, rank]));
const priceUnits = {cp: 1, sp: 10, ep: 50, gp: 100, pp: 1000};
const searchableItems = ITEM_RECORDS.map(item => ({
  item, keywords: [item.name, itemCategoryLabel(item), itemParentName(item),
    itemRarityLabel(item), item.source.rules].filter(Boolean).join(" ").toLowerCase()
}));
for (const category of [...new Set(ITEM_RECORDS.map(item => item.category))]
  .sort((a, b) => itemCategoryLabel({category: a}).localeCompare(itemCategoryLabel({category: b})))) {
  itemCategory.add(new Option(itemCategoryLabel({category}), category));
}
for (const [rarity, label] of Object.entries(itemRarityLabels)) {
  itemRarity.add(new Option(label, rarity), itemRarity.options.length - 1);
}

function compareItemValues(a, b, direction = 1) {
  if (!Number.isFinite(a)) return Number.isFinite(b) ? 1 : 0;
  if (!Number.isFinite(b)) return -1;
  return direction * (a - b);
}

const listedPrice = item => item.price?.value * priceUnits[item.price?.denomination];
const itemSortOrders = {
  "name-desc": (a, b) => b.name.localeCompare(a.name),
  category: (a, b) => itemCategoryLabel(a).localeCompare(itemCategoryLabel(b)),
  "rarity-desc": (a, b) => compareItemValues(rarityRanks.get(a.rarity), rarityRanks.get(b.rarity), -1),
  "rarity-asc": (a, b) => compareItemValues(rarityRanks.get(a.rarity), rarityRanks.get(b.rarity)),
  "price-asc": (a, b) => compareItemValues(listedPrice(a), listedPrice(b)),
  "price-desc": (a, b) => compareItemValues(listedPrice(a), listedPrice(b), -1),
  weight: (a, b) => compareItemValues(a.weight?.value, b.weight?.value),
  owned: (a, b) => Number(Boolean(applicationState.inventory[b.id])) - Number(Boolean(applicationState.inventory[a.id]))
};

function inventoryRow(root, item, carried) {
  const row = appendText(root, "div", "");
  row.className = carried ? "item inventoryItem" : "item catalogItem";
  const title = appendText(row, "div", "");
  appendText(title, "b", item.name);
  const quantity = applicationState.inventory[item.id] || 0;
  const equipped = applicationState.equippedItemIds.includes(item.id);
  const details = carried ? [`Qty ${quantity}`, equipped && "Equipped", itemSummary(item)] : [itemSummary(item)];
  if (!carried) {
    if (quantity) details.push(`Owned ${quantity}`);
    if (itemSort.value.startsWith("price") && Number.isFinite(listedPrice(item)))
      details.push(`${item.price.value} ${item.price.denomination}`);
    if (itemSort.value === "weight" && Number.isFinite(item.weight?.value))
      details.push(`${item.weight.value} ${item.weight.units}`);
  }
  appendText(title, "div", details.filter(Boolean).join(" · ")).className = "muted";
  const controls = appendText(row, "div", "");
  controls.className = "row inventoryControls";
  const name = [item.name, itemParentName(item)].filter(Boolean).join(", ");
  const info = collectionButton(controls, "ⓘ", name + " information", carried ? "carriedItemInfo" : "itemInfo", item.id);
  info.className = "infoBtn";
  info.title = info.getAttribute("aria-label");
  if (carried) {
    if (canEquipItem(item)) {
      const label = equipped ? "Unequip" : "Equip";
      collectionButton(controls, label, label + " " + name, "toggleEquippedItem", item.id);
    }
    if (quantity > 1) collectionButton(controls, "−", "Remove one " + name, "decreaseItem", item.id);
    collectionButton(controls, "Remove", "Remove " + name + " from inventory", "removeItem", item.id);
  } else {
    collectionButton(controls, quantity ? "Add another" : "Add", "Add one " + name + " to inventory", "addItem", item.id);
  }
}

function renderCarriedItems() {
  carriedItemList.replaceChildren();
  const items = Object.keys(applicationState.inventory).map(id => itemById.get(id)).sort(itemNameOrder);
  if (!items.length) appendText(carriedItemList, "p", "Your inventory is empty. Add items from the catalog.").className = "muted";
  for (const item of items) inventoryRow(carriedItemList, item, true);
}

function renderItemCatalog() {
  const terms = itemSearch.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const category = itemCategory.value;
  const rarity = itemRarity.value;
  const order = itemSortOrders[itemSort.value];
  const matches = searchableItems.filter(({item, keywords}) =>
    (!category || category === item.category) &&
    (!rarity || rarity === (item.rarity || "unlisted")) &&
    terms.every(term => keywords.includes(term)))
    .map(({item}) => item)
    .sort((a, b) => order?.(a, b) || itemNameOrder(a, b));
  itemPage = Math.min(itemPage, Math.max(0, Math.ceil(matches.length / itemPageSize) - 1));
  const start = itemPage * itemPageSize;
  itemCatalogList.replaceChildren();
  for (const item of matches.slice(start, start + itemPageSize)) inventoryRow(itemCatalogList, item, false);
  let status = "No matching items.";
  if (matches.length > itemPageSize)
    status = `${start + 1}–${Math.min(start + itemPageSize, matches.length)} of ${matches.length} items`;
  else if (matches.length)
    status = matches.length === 1 ? "1 item" : `${matches.length} items`;
  if (itemPageStatus.textContent !== status) itemPageStatus.textContent = status;
  previousItemPage.disabled = itemPage === 0;
  nextItemPage.disabled = start + itemPageSize >= matches.length;
  getElementById("itemPages").hidden = matches.length <= itemPageSize;
}

function renderInventory() {
  if (!getElementById("inventoryManager").classList.contains("hidden")) renderCarriedItems();
  if (itemCatalog.open) renderItemCatalog();
}

openItemCatalog.onclick = () => {
  catalogFeedback.hidden = true;
  catalogNotice.textContent = "";
  renderItemCatalog();
  openItemCatalog.focus({preventScroll: true});
  itemCatalog.showModal();
  getElementById("closeItemCatalog").focus();
};
wireDialogDismissal(itemCatalog, getElementById("closeItemCatalog"));

function filterItemCatalog() {
  itemPage = 0;
  renderItemCatalog();
  itemCatalogResults.scrollTop = 0;
}
itemSearch.addEventListener("input", filterItemCatalog);
for (const select of [itemCategory, itemRarity, itemSort]) select.addEventListener("change", filterItemCatalog);
for (const [button, direction] of [[previousItemPage, -1], [nextItemPage, 1]]) {
  button.onclick = () => {
    itemPage += direction;
    renderItemCatalog();
    itemCatalogResults.scrollTop = 0;
    if (button.disabled) (direction === -1 ? nextItemPage : previousItemPage).focus();
  };
}

function changeItemQuantity(id, delta) {
  const item = itemById.get(id);
  const quantity = (applicationState.inventory[id] || 0) + delta;
  if (!item || quantity < 0 || !Number.isSafeInteger(quantity)) return;
  change(() => {
    if (quantity) applicationState.inventory[id] = quantity;
    else {
      delete applicationState.inventory[id];
      applicationState.equippedItemIds = applicationState.equippedItemIds.filter(equippedId => equippedId !== id);
    }
  }, `${item.name} · ${quantity} carried.`);
}

function toggleItemEquipped(id) {
  const item = itemById.get(id);
  if (!canEquipItem(item) || !applicationState.inventory[id]) return;
  const equipped = applicationState.equippedItemIds;
  const slot = armorSlot(item);
  const unequip = equipped.includes(id);
  change(() => {
    applicationState.equippedItemIds = equipped.filter(equippedId =>
      equippedId !== id && (unequip || !slot || armorSlot(itemById.get(equippedId)) !== slot));
    if (!unequip) applicationState.equippedItemIds.push(id);
  }, `${item.name} ${unequip ? "unequipped" : "equipped"}.`);
}

itemCatalogList.addEventListener("click", event => {
  const {itemInfo, addItem} = event.target.dataset;
  if (itemInfo) {
    event.target.focus({preventScroll: true});
    openItemInfo(itemInfo);
  }
  if (addItem) {
    changeItemQuantity(addItem, 1);
    catalogFeedback.hidden = false;
    catalogNotice.textContent = applicationState.noticeMessage;
    catalogUndo.disabled = !applicationState.undoHistory.length;
    if (!itemCatalog.contains(document.activeElement)) itemSearch.focus({preventScroll: true});
  }
});
catalogUndo.onclick = () => {
  undo();
  catalogNotice.textContent = applicationState.noticeMessage;
  catalogUndo.disabled = !applicationState.undoHistory.length;
  if (catalogUndo.disabled) itemSearch.focus({preventScroll: true});
};

getElementById("inventoryManager").addEventListener("click", event => {
  const {carriedItemInfo, toggleEquippedItem, decreaseItem, removeItem} = event.target.dataset;
  if (carriedItemInfo) openItemInfo(carriedItemInfo);
  if (toggleEquippedItem) toggleItemEquipped(toggleEquippedItem);
  if (decreaseItem) {
    changeItemQuantity(decreaseItem, -1);
    if (document.activeElement === document.body)
      carriedItemList.querySelector(`[data-remove-item="${decreaseItem}"]`)?.focus({preventScroll: true});
  }
  if (removeItem) {
    changeItemQuantity(removeItem, -applicationState.inventory[removeItem]);
    if (!applicationState.inventory[removeItem] && document.activeElement === document.body) {
      const next = carriedItemList.querySelector("button") || openItemCatalog;
      next.focus({preventScroll: true});
    }
  }
});
