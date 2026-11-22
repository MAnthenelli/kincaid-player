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
  const details = carried ? [equipped && "Equipped", itemSummary(item)] : [itemSummary(item)];
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
  const info = collectionButton(controls, "ⓘ", name + " details", carried ? "carriedItemInfo" : "itemInfo", item.id);
  info.className = "infoBtn";
  info.title = info.getAttribute("aria-label");
  if (carried) {
    if (item.category === "potion") {
      const verb = consumableVerb(item);
      collectionButton(controls, verb, verb + " " + name, "useItem", item.id);
    }
    if (canEquipItem(item)) {
      const label = equipped ? "Unequip" : "Equip";
      collectionButton(controls, label, label + " " + name, "toggleEquippedItem", item.id);
    }
    if (item.attunement === "required") {
      const attuned = applicationState.attunedItemIds.includes(item.id);
      const button = collectionButton(controls, attuned ? "End attunement" : "Attune", "Attunement: " + name, "attuneItem", item.id);
      button.disabled = !attuned && applicationState.attunedItemIds.length >= 3;
      if (button.disabled) button.title = "Three attunement slots are in use";
    }
    if (item.id === venomDaggerId) {
      const current = applicationState.venomDagger;
      const label = {ready: "Coat blade", coated: "End coating", spent: "Recharge at dawn"}[current];
      const button = collectionButton(controls, label, label + " · Dagger of Venom", "venomDagger",
        {ready: "coated", coated: "spent", spent: "ready"}[current]);
      button.disabled = current === "ready" && (!equipped || !!applicationState.activeFormId || conditionModifiers().incapacitated);
      if (button.disabled) button.title = "Equip the dagger in Dragonborn form to coat it";
    }
    const quantityControls = appendText(controls, "div", "");
    quantityControls.className = "itemQuantity";
    appendText(quantityControls, "span", item.id === "VmcgAIsRCyrjBguC" ? `Doses ${quantity}` : `Qty ${quantity}`);
    if (quantity > 1) collectionButton(quantityControls, "−", "Remove one " + name, "decreaseItem", item.id);
    const removeLabel = quantity > 1 ? "Remove stack" : "Remove";
    collectionButton(controls, removeLabel, `${removeLabel}: ${name} from inventory`, "removeItem", item.id);
  } else {
    collectionButton(controls, quantity ? "Add another" : "Add", "Add one " + name + " to inventory", "addItem", item.id);
  }
}

function renderCarriedItems() {
  carriedItemList.replaceChildren();
  const items = Object.keys(applicationState.inventory).map(id => itemById.get(id)).sort(itemNameOrder);
  renderGoodberryInventory();
  const uses = applicationState.otherConsumableUses;
  if (uses.length) {
    const details = appendText(carriedItemList, "details", "");
    details.className = "collectionDetail";
    appendText(details, "summary", "Uses on other targets");
    const list = appendText(details, "ul", "");
    for (const use of uses.slice().reverse()) appendText(list, "li",
      `${itemById.get(use.id).name} ×${use.quantity} · ${use.target}${use.healing ? " · " + use.healing + " HP rolled" : ""}`);
  }
  if (!items.length && !applicationState.goodberryBatches.length) appendText(carriedItemList, "p", "Your inventory is empty. Add items from the catalog.").className = "muted";
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

function changeItemQuantity(id, delta, notice) {
  const item = itemById.get(id);
  const quantity = (applicationState.inventory[id] || 0) + delta;
  if (!item || quantity < 0 || !Number.isSafeInteger(quantity)) return;
  change(() => {
    if (quantity) applicationState.inventory[id] = quantity;
    else {
      delete applicationState.inventory[id];
      if (applicationState.oiledWeaponId === id) applicationState.oiledWeaponId = null;
      applicationState.attunedItemIds = applicationState.attunedItemIds.filter(itemId => itemId !== id);
      applicationState.equippedItemIds = applicationState.equippedItemIds.filter(equippedId => equippedId !== id);
    }
  }, notice || `${item.name} · ${quantity} carried.`);
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
  if (event.target.dataset.venomDagger) changeVenomDagger(event.target.dataset.venomDagger);
  if (event.target.dataset.attuneItem) toggleAttunement(event.target.dataset.attuneItem);
  if (event.target.dataset.useItem) openConsumable(event.target.dataset.useItem, event.target);
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

let berryDetailsOpen = false;
function renderGoodberryInventory() {
  const batches = applicationState.goodberryBatches;
  if (!batches.length) return;
  const row = appendText(carriedItemList, "details", "");
  row.className = "inventoryItem collectionDetail";
  row.open = berryDetailsOpen;
  row.ontoggle = () => { berryDetailsOpen = row.open; };
  const count = batches.reduce((total, batch) => total + batch.remaining, 0);
  appendText(row, "summary", "Goodberry · " + count);
  appendText(row, "p", "Bonus Action to eat one. Each batch lasts 24 hours of game time.");
  for (const [index, batch] of batches.entries()) {
    const controls = appendText(row, "div", "");
    controls.className = "row wrap inventoryControls";
    controls.dataset.entry = "goodberry:" + batch.id;
    appendText(controls, "span", "Batch " + (index + 1) + " · " + batch.remaining);
    for (const [action, label] of [["eat", "Eat one"], ["give", "Give one"], ["expire", "Expire batch"]]) {
      const button = appendText(controls, "button", label);
      button.disabled = action === "eat" && !canEatGoodberry();
      button.onclick = () => {
        berryDetailsOpen = true;
        useGoodberry(batch, action);
        (carriedItemList.querySelector("details button") || openItemCatalog).focus();
      };
    }
  }
}

function getInventoryActions() {
  if (!applicationState.currentHitPoints || conditionModifiers().incapacitated) return [];
  if (isGaseous()) return [{
    id: "endGaseousFormBonus", context: "bonus", label: "End Gaseous Form",
    activate: endGaseousForm
  }];

  const actions = [];
  const batches = applicationState.goodberryBatches;
  if (batches.length) actions.push({
    id: "eatGoodberryBonus", context: "bonus", label: "Eat Goodberry",
    hint: batches.reduce((total, batch) => total + batch.remaining, 0) + " left · +1 HP",
    activate: () => useGoodberry(batches[0], "eat")
  });

  // Wild Shape's equipment access is adjudicated separately from the equipped humanoid loadout.
  if (applicationState.activeFormId) return actions;
  for (const [id, stock] of Object.entries(applicationState.inventory)) {
    const use = consumableCombatUse(id);
    if (!use) continue;
    const item = itemById.get(id);
    actions.push({
      id: "combatUse-" + id, context: use.context, label: use.label || consumableVerb(item) + " " + item.name,
      hint: stock + " left", dialog: true, activate: trigger => openConsumable(id, trigger, use.target)
    });
  }
  for (const id of applicationState.equippedItemIds) {
    const item = itemById.get(id);
    const ammo = compatibleAmmunition(item);
    if (!ammo.length) continue;
    actions.push({
      id: "shoot-" + id, context: "action", label: "Shoot " + item.name,
      hint: ammo.reduce((total, record) => total + applicationState.inventory[record.id], 0) + " ammo",
      dialog: true, activate: trigger => openAmmunitionUse(item, trigger)
    });
  }
  if (gearActive(venomDaggerId) && applicationState.venomDagger === "ready") actions.push({
    id: "coatVenomDaggerAction", context: "action", label: "Coat Dagger of Venom",
    activate: () => changeVenomDagger("coated")
  });
  return actions.sort((a, b) => a.label.localeCompare(b.label));
}
function restoreInventoryActionFocus(trigger) {
  const fallback = trigger.dataset.inventoryAction ? getElementById("actionsTab") :
    trigger.dataset.useItem ? carriedItemList.querySelector('[data-use-item="' + trigger.dataset.useItem + '"]') || openItemCatalog : null;
  (trigger.isConnected ? trigger : getElementById(trigger.id) || fallback)?.focus({preventScroll: true});
}
function renderInventoryActions() {
  const groups = {action: elements.actions, bonus: elements.bonus, reaction: elements.reaction};
  for (const action of getInventoryActions()) {
    const row = appendText(groups[action.context], "div", "");
    row.className = "choice row wrap";
    const button = appendText(row, "button", action.label);
    button.id = action.id;
    button.type = "button";
    button.dataset.inventoryAction = action.context;
    if (action.dialog) button.setAttribute("aria-haspopup", "dialog");
    if (action.hint) appendText(row, "small", action.hint);
    button.onclick = () => {
      if (!button.isConnected || !getInventoryActions().some(eligible => eligible.id === action.id)) return;
      action.activate(button);
      if (!action.dialog) restoreInventoryActionFocus(button);
    };
  }
}

function canEatGoodberry() {
  return applicationState.currentHitPoints > 0 && !conditionModifiers().incapacitated && !isGaseous();
}

function useGoodberry(batch, action) {
  if (!applicationState.goodberryBatches.includes(batch)) return;
  if (action === "eat" && !canEatGoodberry()) return;
  const recovered = action === "eat" && applicationState.currentHitPoints < currentMaxHP() ? 1 : 0;
  change(() => {
    applicationState.currentHitPoints += recovered;
    if (action === "expire") batch.remaining = 0;
    else batch.remaining--;
    if (!batch.remaining) applicationState.goodberryBatches = applicationState.goodberryBatches.filter(item => item !== batch);
  }, action === "eat" ? "Goodberry eaten. " + recovered + " HP regained." :
    action === "give" ? "Goodberry given away." : "Goodberry batch expired.");
}

