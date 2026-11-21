const featManager = getElementById("featManager");
const ownedFeatList = getElementById("ownedFeatList");
const featCatalog = getElementById("featCatalog");
const openFeatCatalog = getElementById("openFeatCatalog");
const closeFeatCatalog = getElementById("closeFeatCatalog");
const featSearch = getElementById("featSearch");
const featCategory = getElementById("featCategory");
const featSort = getElementById("featSort");
const featCatalogResults = getElementById("featCatalogResults");
const featCatalogList = getElementById("featCatalogList");
const featPageStatus = getElementById("featPageStatus");
const previousFeatPage = getElementById("previousFeatPage");
const nextFeatPage = getElementById("nextFeatPage");
const featCatalogFeedback = getElementById("featCatalogFeedback");
const featCatalogNotice = getElementById("featCatalogNotice");
const featCatalogUndo = getElementById("featCatalogUndo");
const featsPerPage = 8;
let featPage = 0;

const featNameOrder = (a, b) => a.name.localeCompare(b.name);
const featRequirements = feat => [feat.level && `Level ${feat.level}+`, ...(feat.requirements || [])].filter(Boolean);
const searchableFeats = [...featById.values()].map(feat => ({
  feat,
  keywords: [feat.name, feat.category, ...featRequirements(feat)].join(" ").toLowerCase()
}));
const featSortOrders = {
  "name-desc": (a, b) => featNameOrder(b, a),
  category: (a, b) => a.category.localeCompare(b.category),
  level: (a, b) => (a.level ?? Infinity) - (b.level ?? Infinity)
};
for (const category of [...new Set(searchableFeats.map(({feat}) => feat.category))].sort()) {
  featCategory.add(new Option(category, category));
}

function featRow(root, feat, owned) {
  const count = applicationState.feats[feat.id] || 0;
  const row = appendText(root, "div", "");
  row.className = owned ? "item inventoryItem" : "item catalogItem";
  const title = appendText(row, "div", "");
  appendText(title, "b", feat.name);
  const details = [feat.category, ...featRequirements(feat)];
  if (count && (!owned || count > 1)) details.push(owned ? `×${count}` : count === 1 ? "Owned" : `Owned ×${count}`);
  appendText(title, "div", details.join(" · ")).className = "muted";

  const controls = appendText(row, "div", "");
  controls.className = "row inventoryControls";
  const info = collectionButton(controls, "ⓘ", feat.name + " information", owned ? "ownedFeatInfo" : "featInfo", feat.id);
  info.className = "infoBtn";
  info.title = info.getAttribute("aria-label");
  if (owned) {
    collectionButton(controls, count > 1 ? "Remove one" : "Remove", "Remove " + (count > 1 ? "one copy of " : "") + feat.name, "removeFeat", feat.id);
  } else {
    const add = collectionButton(controls, count && feat.repeatable ? "Add another" : "Add", "Add " + feat.name, "addFeat", feat.id);
    add.disabled = count > 0 && !feat.repeatable;
  }
}

function renderOwnedFeats() {
  ownedFeatList.replaceChildren();
  const owned = Object.keys(applicationState.feats).map(id => featById.get(id)).sort(featNameOrder);
  if (!owned.length) appendText(ownedFeatList, "p", "Your character has no feats.").className = "muted";
  for (const feat of owned) featRow(ownedFeatList, feat, true);
}

function renderFeatCatalog() {
  const terms = featSearch.value.trim().toLowerCase().split(/\s+/);
  const category = featCategory.value;
  const order = featSortOrders[featSort.value];
  const matches = searchableFeats
    .filter(({feat, keywords}) => (!category || feat.category === category) && terms.every(term => keywords.includes(term)))
    .map(({feat}) => feat)
    .sort((a, b) => order?.(a, b) || featNameOrder(a, b));
  featPage = Math.min(featPage, Math.max(0, Math.ceil(matches.length / featsPerPage) - 1));
  const start = featPage * featsPerPage;
  featCatalogList.replaceChildren();
  for (const feat of matches.slice(start, start + featsPerPage)) featRow(featCatalogList, feat, false);
  let status = "No matching feats.";
  if (matches.length > featsPerPage)
    status = `${start + 1}–${Math.min(start + featsPerPage, matches.length)} of ${matches.length} feats`;
  else if (matches.length)
    status = matches.length === 1 ? "1 feat" : `${matches.length} feats`;
  if (featPageStatus.textContent !== status) featPageStatus.textContent = status;
  previousFeatPage.disabled = featPage === 0;
  nextFeatPage.disabled = start + featsPerPage >= matches.length;
  getElementById("featPages").hidden = matches.length <= featsPerPage;
}

function renderFeats() {
  if (!featManager.classList.contains("hidden")) renderOwnedFeats();
  if (featCatalog.open) renderFeatCatalog();
}

function openFeatInfo(id) {
  const feat = featById.get(id);
  if (!feat) return;
  elements.infoTitle.textContent = feat.name;
  const body = elements.infoBody;
  body.replaceChildren();
  appendText(body, "p", [feat.category, ...featRequirements(feat), feat.repeatable && "Repeatable"]
    .filter(Boolean).join(" · ")).className = "muted";
  // The importer emits only allowlisted formatting tags, without attributes.
  appendText(body, "div", "").innerHTML = feat.description;
  appendText(body, "p", [feat.rules && feat.rules + " rules", feat.license, feat.sourcePath].filter(Boolean).join(" · ")).className = "muted";
  showInfo();
}

function changeFeatCount(id, delta) {
  const feat = featById.get(id);
  const count = (applicationState.feats[id] || 0) + delta;
  if (!feat || !Number.isSafeInteger(count) || count < 0 || (count > 1 && !feat.repeatable)) return;
  change(() => {
    if (count) applicationState.feats[id] = count;
    else delete applicationState.feats[id];
  }, `${feat.name} ${delta > 0 ? "added" : "removed"}${count > 1 ? ` · ${count} owned` : ""}.`);
}

function filterFeatCatalog() {
  featPage = 0;
  renderFeatCatalog();
  featCatalogResults.scrollTop = 0;
}
openFeatCatalog.onclick = () => {
  featCatalogFeedback.hidden = true;
  featCatalogNotice.textContent = "";
  filterFeatCatalog();
  openFeatCatalog.focus({preventScroll: true});
  featCatalog.showModal();
  closeFeatCatalog.focus();
};
wireDialogDismissal(featCatalog, closeFeatCatalog);
featSearch.addEventListener("input", filterFeatCatalog);
for (const select of [featCategory, featSort]) select.addEventListener("change", filterFeatCatalog);
for (const [button, direction] of [[previousFeatPage, -1], [nextFeatPage, 1]]) {
  button.onclick = () => {
    featPage += direction;
    renderFeatCatalog();
    featCatalogResults.scrollTop = 0;
    if (button.disabled) (direction === -1 ? nextFeatPage : previousFeatPage).focus();
  };
}

function showFeatCatalogFeedback() {
  featCatalogFeedback.hidden = false;
  featCatalogNotice.textContent = applicationState.noticeMessage;
  featCatalogUndo.disabled = !applicationState.undoHistory.length;
}
featCatalogList.addEventListener("click", event => {
  const {featInfo, addFeat} = event.target.dataset;
  if (featInfo) {
    event.target.focus({preventScroll: true});
    openFeatInfo(featInfo);
  }
  if (addFeat && !event.target.disabled) {
    changeFeatCount(addFeat, 1);
    showFeatCatalogFeedback();
    if (!featCatalog.contains(document.activeElement))
      featCatalogList.querySelector(`[data-feat-info="${addFeat}"]`)?.focus({preventScroll: true});
  }
});
featCatalogUndo.onclick = () => {
  undo();
  showFeatCatalogFeedback();
  if (featCatalogUndo.disabled) featSearch.focus({preventScroll: true});
};

ownedFeatList.addEventListener("click", event => {
  const {ownedFeatInfo, removeFeat} = event.target.dataset;
  if (ownedFeatInfo) {
    event.target.focus({preventScroll: true});
    openFeatInfo(ownedFeatInfo);
  }
  if (removeFeat) {
    changeFeatCount(removeFeat, -1);
    if (!ownedFeatList.contains(document.activeElement)) openFeatCatalog.focus({preventScroll: true});
  }
});
