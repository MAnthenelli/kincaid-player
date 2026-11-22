const selectionCatalog = getElementById("selectionCatalog");
const selectionSearch = getElementById("selectionSearch");
const selectionResults = getElementById("selectionResults");
const selectionList = getElementById("selectionList");
const selectionOutgoing = getElementById("selectionOutgoing");
const selectionClose = getElementById("closeSelectionCatalog");
const selectionPageSize = 24;
const selectionSettings = {
  spell: {key: "preparedSpellNames", maximum: kincaid.maximumPreparedSpells, options: PREPARED_SPELL_OPTIONS, add: "Prepare", remove: "Unprepare"},
  cantrip: {key: "knownCantripNames", maximum: kincaid.maximumSelectedCantrips, options: CANTRIP_LIBRARY.filter(name => !CIRCLE_CANTRIPS.includes(name)), add: "Select", remove: "Remove"},
  form: {key: "knownFormIds", maximum: kincaid.maximumKnownForms, options: getFormIds(), add: "Add", remove: "Remove"}
};
const selectionEditing = new Set();
let selectionPicker = null;

const spellResults = getSpellRecords().map(record => ({
  id: record.name, record,
  search: [record.name, record.school, SPELL_QUICK_TEXT[record.name]].join(" ").toLowerCase()
}));
const formResults = getFormRecords().map(([id, record]) => ({id, record, search: buildFormSearchText(record)}));

const catalogForms = formResults.map(({record}) => record);

function populateSelectionFilter(id, values, format = value => value) {
  const select = getElementById(id);
  for (const value of new Set(values)) select.add(new Option(format(value), value));
}
const catalogSpellLevels = [...new Set(spellResults.map(({record}) => record.level))].filter(Boolean).sort((a, b) => a - b);
populateSelectionFilter("spellLevel", catalogSpellLevels, level => "Level " + level);
populateSelectionFilter("spellSchool", spellResults.map(({record}) => record.school).sort());
populateSelectionFilter("formEdition", formResults.map(({record}) => getFormRuleset(record)).sort());
populateSelectionFilter("formCR", formResults.map(({record}) => record.challengeRating)
  .sort((a, b) => getChallengeRatingValue(a) - getChallengeRatingValue(b)), cr => "CR " + cr);
populateSelectionFilter("formMovement", formResults.flatMap(({record}) => Object.keys(record.speeds)).sort(), formatSpeedName);
const formRoles = ["combat", "control", "damage", "scout", "stealth", "transport"];
populateSelectionFilter("formRoleFilter", formRoles.filter(role => formResults.some(({record}) => record.searchTags.includes(role))), formatSpeedName);

function selectionNames(kind) {
  return applicationState[selectionSettings[kind].key];
}

function selectionLabel(kind, id) {
  if (kind !== "form") return id;
  const form = getFormRecord(id);
  return `${form.name} · ${getFormRuleset(form)}`;
}

function canReplaceSelection(kind, id) {
  return kind !== "form" || applicationState.activeFormId !== id;
}

function spellGrant(record) {
  if (record.availability === "druidicSpell") return "Always prepared · Druidic";
  if (record.availability === "circleSpell") return "Always prepared · Circle of the Moon";
  if (record.availability === "grantedCantrip") return "Granted · Circle of the Moon";
  return "";
}

function selectionRow(root, kind, id, status = "") {
  const row = appendText(root, "div", "");
  row.className = "item selectionRow";
  const text = appendText(row, "div", "");
  text.className = "selectionText";
  const record = kind === "form" ? getFormRecord(id) : getSpellRecord(id);
  const name = appendText(text, "div", "");
  const title = appendText(name, "b", kind === "form" ? formDisplayName(record, catalogForms) : "");
  if (kind !== "form") {
    const details = collectionButton(title, record.name, record.name + " details", "spellInfo", id);
    details.className = "detailName";
  }
  const meta = appendText(text, "div", "");
  meta.className = "muted";
  if (kind === "form") {
    const speeds = Object.entries(record.speeds)
      .map(([mode, speed]) => `${formatSpeedName(mode)} ${speed} ft`).join(" · ");
    meta.textContent = ["CR " + record.challengeRating, record.size, speeds].join(" · ");
    const movementOnly = Object.keys(record.speeds).map(formatSpeedName).join(" · ");
    if (record.roleDescription && record.roleDescription !== movementOnly) appendText(text, "small", record.roleDescription);
  } else {
    name.insertAdjacentHTML("beforeend", spellMarks(record));
    meta.textContent = [record.school,
      (record.availability === "circleSpell" || record.availability === "grantedCantrip") && "Castable in Wild Shape"
    ].filter(Boolean).join(" · ");
  }
  if (status) appendText(text, "small", status).className = "selectionStatus";
  const actions = appendText(row, "div", "");
  actions.className = "selectionActions";
  if (kind === "form") {
    const info = collectionButton(actions, "ⓘ", selectionLabel(kind, id) + " details", "formInfo", id);
    info.className = "infoBtn";
    info.title = info.getAttribute("aria-label");
  }
  return actions;
}

function selectionAction(root, label, kind, id, action) {
  const button = collectionButton(root, label, `${label} ${selectionLabel(kind, id)}`, action, id);
  button.dataset.selectionKind = kind;
  if (action === "replaceSelection") button.setAttribute("aria-haspopup", "dialog");
  return button;
}

function renderOwnedSelection(root, kind, id, editing) {
  const record = kind === "form" ? getFormRecord(id) : getSpellRecord(id);
  const granted = kind === "form" ? "" : spellGrant(record);
  const active = !canReplaceSelection(kind, id);
  const actions = selectionRow(root, kind, id, granted || (active ? "Current form" : ""));
  if (kind !== "form") {
    const cast = collectionButton(actions, "Cast", "Cast " + record.name, "openCast", "all");
    cast.dataset.castName = record.name;
    cast.setAttribute("aria-haspopup", "dialog");
  }
  if (granted || active || (kind === "cantrip" && !editing)) return;
  selectionAction(actions, "Replace", kind, id, "replaceSelection");
  if (editing) selectionAction(actions, selectionSettings[kind].remove, kind, id, "removeSelection");
}

function renderSpellSelections() {
  const sections = getElementById("spellSelections");
  sections.replaceChildren();
  const editing = selectionEditing.has("spell");
  const cantrips = selectionNames("cantrip");
  const prepared = selectionNames("spell");
  const byName = (a, b) => a.localeCompare(b);
  const group = (title, ids, kind) => {
    appendText(sections, "h3", title);
    const list = appendText(sections, "div", "");
    list.className = "library selectionList";
    if (!ids.length) appendText(list, "p", kind === "cantrip" ? "No known cantrips." : "No spells prepared.").className = "muted";
    for (const id of ids) renderOwnedSelection(list, kind, id, editing);
    return list;
  };
  group(`Cantrips · ${cantrips.length}/${selectionSettings.cantrip.maximum} chosen`,
    [...cantrips, ...CIRCLE_CANTRIPS].sort(byName), "cantrip");
  appendText(sections, "h3", `Prepared · ${prepared.length}/${selectionSettings.spell.maximum}`);
  const list = appendText(sections, "div", "");
  list.className = "library selectionList";
  if (!prepared.length) appendText(list, "p", "No spells prepared.").className = "muted";
  for (const level of catalogSpellLevels) {
    const spells = prepared.filter(name => getSpellRecord(name).level === level).sort(byName);
    if (!spells.length) continue;
    appendText(list, "h4", `Level ${level}`);
    for (const id of spells) renderOwnedSelection(list, "spell", id, editing);
  }
  group("Always prepared", [...ALWAYS_PREPARED_SPELLS].sort((a, b) => getSpellRecord(a).level - getSpellRecord(b).level || byName(a, b)), "spell");
  document.querySelector('[data-browse-selection="cantrip"]').hidden = !editing || cantrips.length >= selectionSettings.cantrip.maximum;
}

function renderSelections() {
  if (!getElementById("spellManager").classList.contains("hidden")) renderSpellSelections();
  if (!getElementById("formManager").classList.contains("hidden")) {
    const known = selectionNames("form");
    const list = getElementById("formSelections");
    getElementById("knownCount").textContent = known.length;
    list.replaceChildren();
    if (!known.length) appendText(list, "p", "No known forms. Browse the Bestiary to add one.").className = "muted";
    for (const id of known) renderOwnedSelection(list, "form", id, selectionEditing.has("form"));
  }
  if (selectionCatalog.open) renderSelectionCatalog();
}

function matchingSelections() {
  const term = selectionSearch.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const value = id => getElementById(id).value;
  if (selectionPicker.kind === "form") {
    const edition = value("formEdition"), cr = value("formCR"), movement = value("formMovement");
    const role = value("formRoleFilter"), sort = value("formSort");
    const rating = record => getChallengeRatingValue(record.challengeRating);
    return formResults.filter(({record, search}) =>
      term.every(word => search.includes(word)) &&
      (!edition || edition === getFormRuleset(record)) && (!cr || cr === record.challengeRating) &&
      (!movement || Object.hasOwn(record.speeds, movement)) && (!role || record.searchTags.includes(role))
    ).sort(({record: a}, {record: b}) => {
      const order = sort === "cr-desc" ? rating(b) - rating(a) :
        sort === "cr-asc" ? rating(a) - rating(b) :
        sort === "speed" ? getMaximumFormSpeed(b) - getMaximumFormSpeed(a) : 0;
      return order || a.name.localeCompare(b.name) || a.rulesEdition.localeCompare(b.rulesEdition);
    });
  }
  const level = value("spellLevel"), school = value("spellSchool");
  const property = value("spellProperty"), sort = value("spellSort");
  return spellResults.filter(({record, search}) =>
    term.every(word => search.includes(word)) && (!level || Number(level) === record.level) &&
    (!school || school === record.school) &&
    (!property || (property === "ritual" ? record.ritual : record.concentration))
  ).sort(({record: a}, {record: b}) => {
    const order = sort === "name" ? 0 : sort === "school" ? a.school.localeCompare(b.school) : a.level - b.level;
    return order || a.name.localeCompare(b.name);
  });
}

function pickerSelection(kind) {
  return kind === "spell" && selectionPicker.draft ? selectionPicker.draft : selectionNames(kind);
}

function renderCatalogSelection({id, record}) {
  const form = selectionPicker.kind === "form";
  const kind = form ? "form" : record.level ? "spell" : "cantrip";
  const names = pickerSelection(kind);
  const selected = names.includes(id);
  const grant = form ? "" : spellGrant(record);
  const active = selectionPicker.mode !== "rest" && !canReplaceSelection(kind, id);
  const status = grant || (active ? "Current form" : selected ? (kind === "spell" ? "Prepared" : "Known") : "");
  const actions = selectionRow(selectionList, kind, id, status);
  if (grant || active) return;
  if (kind !== selectionPicker.kind) return;
  if (selected) {
    if (selectionPicker.draft)
      selectionAction(actions, "Unprepare", kind, id, "unprepareDraft");
    else if (selectionPicker.mode === "rest" && form)
      selectionAction(actions, "Replace", kind, id, "chooseOutgoing");
    return;
  }
  const replace = selectionPicker.outgoing || names.length >= selectionSettings[kind].maximum || selectionPicker.mode === "rest" && form;
  selectionAction(actions, replace ? "Swap in" : selectionSettings[kind].add, kind, id, "catalogSelection");
}

function renderSelectionCatalog() {
  if (!selectionPicker) return;
  const picker = selectionPicker;
  const results = matchingSelections();
  const pages = Math.max(1, Math.ceil(results.length / selectionPageSize));
  picker.page = Math.min(picker.page, pages - 1);
  const start = picker.page * selectionPageSize;
  selectionList.replaceChildren();
  for (const result of results.slice(start, start + selectionPageSize)) renderCatalogSelection(result);
  const noun = picker.kind === "form" ? "forms" : "spells";
  getElementById("selectionPageStatus").textContent = results.length === 0 ? `No matching ${noun}.` :
    pages === 1 ? `${results.length} ${results.length === 1 ? noun.slice(0, -1) : noun}` :
    `${start + 1}–${Math.min(start + selectionPageSize, results.length)} of ${results.length} ${noun}`;
  getElementById("selectionPages").hidden = pages === 1;
  getElementById("previousSelectionPage").disabled = picker.page === 0;
  getElementById("nextSelectionPage").disabled = picker.page === pages - 1;
  const names = pickerSelection(picker.kind);
  const context = [`${names.length}/${selectionSettings[picker.kind].maximum} ${picker.kind === "spell" ? "prepared" : "known"}`];
  if (picker.mode === "rest") context.push("Long Rest");
  else context.push(picker.kind === "cantrip" ? "Level-up or character correction" : "Character corrections");
  if (picker.outgoing) context.push("Replacing " + selectionLabel(picker.kind, picker.outgoing));
  getElementById("selectionContext").textContent = context.join(" · ");
  const feedback = getElementById("selectionFeedback");
  feedback.hidden = !picker.feedback;
  feedback.textContent = picker.feedback;
  const save = getElementById("savePreparedSelection");
  save.hidden = !picker.draft;
  save.disabled = !picker.draft || sameSelection(picker.draft, restDraft.preparedSpells);
  selectionClose.textContent = picker.mode !== "rest" ? "Done" : save.disabled ? "Back to rest" : "Discard changes";
  const undoButton = getElementById("undoSelection");
  undoButton.hidden = !picker.undo || picker.undo !== applicationState.undoHistory.at(-1);
  getElementById("selectionSaveControls").hidden = save.hidden && undoButton.hidden;
}

function sameSelection(first, second) {
  return first.length === second.length && first.every(id => second.includes(id));
}

function openSelectionCatalog(trigger, kind, mode = "edit", outgoing = "") {
  selectionPicker = {kind, mode, outgoing, page: 0, priorFocus: trigger};
  if (kind === "spell" && mode === "rest") selectionPicker.draft = [...restDraft.preparedSpells];
  getElementById("selectionCatalogTitle").textContent = kind === "form" ? "Bestiary" : "Spell Library";
  selectionSearch.placeholder = kind === "form" ? "Search forms" : "Search spells";
  selectionSearch.setAttribute("aria-label", selectionSearch.placeholder);
  selectionSearch.value = "";
  getElementById("spellFilters").hidden = kind === "form";
  getElementById("formFilters").hidden = kind !== "form";
  for (const filter of selectionCatalog.querySelectorAll(".catalogFilters select")) filter.selectedIndex = 0;
  const spellLevel = getElementById("spellLevel");
  spellLevel.value = kind === "cantrip" ? "0" : "";
  spellLevel.disabled = kind === "cantrip";
  getElementById("selectionPending").hidden = true;
  renderSelectionCatalog();
  trigger.focus({preventScroll: true});
  selectionCatalog.showModal();
  selectionResults.scrollTop = 0;
  selectionSearch.focus({preventScroll: true});
}

function selectionFallbackFocus(picker) {
  const {priorFocus, kind, mode} = picker;
  const replacement = controlIdentity(priorFocus);
  const updatedTrigger = [...document.querySelectorAll("[data-replace-selection]")].find(button => controlIdentity(button) === replacement);
  const fallback = mode === "rest" ? elements.longRest :
    document.querySelector(`[data-browse-selection="${kind === "cantrip" ? "spell" : kind}"]`);
  const target = priorFocus.isConnected && !priorFocus.hidden && !priorFocus.disabled ? priorFocus : updatedTrigger || fallback;
  target?.focus({preventScroll: true});
}

wireDialogDismissal(selectionCatalog, selectionClose);
selectionCatalog.addEventListener("close", () => {
  if (selectionCatalog.open || !selectionPicker) return;
  const picker = selectionPicker;
  selectionPicker = null;
  selectionFallbackFocus(picker);
});

function refilterSelections() {
  if (!selectionCatalog.open) return;
  clearSelectionConfirmation();
  selectionPicker.page = 0;
  renderSelectionCatalog();
  selectionResults.scrollTop = 0;
}
selectionSearch.addEventListener("input", refilterSelections);
for (const filter of selectionCatalog.querySelectorAll(".catalogFilters select"))
  filter.addEventListener("change", refilterSelections);
for (const [id, direction] of [["previousSelectionPage", -1], ["nextSelectionPage", 1]]) {
  getElementById(id).onclick = event => {
    clearSelectionConfirmation();
    selectionPicker.page += direction;
    renderSelectionCatalog();
    selectionResults.scrollTop = 0;
    if (event.currentTarget.disabled)
      getElementById(direction < 0 ? "nextSelectionPage" : "previousSelectionPage").focus();
  };
}

function chooseSelectionCandidate(id, trigger) {
  const picker = selectionPicker;
  const names = pickerSelection(picker.kind);
  picker.pending = {id, trigger};
  const needsOutgoing = picker.outgoing || names.length >= selectionSettings[picker.kind].maximum ||
    picker.kind === "form" && picker.mode === "rest";
  picker.pending.needsOutgoing = Boolean(needsOutgoing);
  const outgoingIds = names.filter(name => picker.mode === "rest" || canReplaceSelection(picker.kind, name));
  selectionOutgoing.replaceChildren(new Option("Choose an outgoing entry", ""));
  for (const outgoing of outgoingIds) selectionOutgoing.add(new Option(selectionLabel(picker.kind, outgoing), outgoing));
  selectionOutgoing.value = picker.outgoing || "";
  getElementById("selectionOutgoingField").hidden = !needsOutgoing || Boolean(picker.outgoing);
  getElementById("selectionPending").hidden = false;
  renderSelectionConfirmation();
  (getElementById("selectionOutgoingField").hidden ? getElementById("confirmSelection") : selectionOutgoing)
    .focus({preventScroll: true});
  getElementById("selectionPending").scrollIntoView?.({block: "nearest"});
}

function renderSelectionConfirmation() {
  if (!selectionPicker?.pending) return;
  const {kind, pending} = selectionPicker;
  const incoming = selectionLabel(kind, pending.id);
  const outgoing = selectionOutgoing.value;
  const confirm = getElementById("confirmSelection");
  confirm.disabled = pending.needsOutgoing && !outgoing;
  confirm.textContent = pending.needsOutgoing ? "Confirm swap" : selectionSettings[kind].add;
  getElementById("selectionPendingText").textContent = outgoing ?
    `Replace ${selectionLabel(kind, outgoing)} with ${incoming}?` :
    pending.needsOutgoing ? `Choose which entry to replace with ${incoming}.` : `${selectionSettings[kind].add} ${incoming}?`;
}
selectionOutgoing.onchange = renderSelectionConfirmation;

function clearSelectionConfirmation(restoreFocus = false) {
  const trigger = selectionPicker.pending?.trigger;
  selectionPicker.pending = null;
  getElementById("selectionPending").hidden = true;
  if (restoreFocus) (trigger?.isConnected ? trigger : selectionSearch).focus({preventScroll: true});
}
getElementById("cancelSelection").onclick = () => clearSelectionConfirmation(true);

function setSelectionFeedback(message, commit) {
  selectionPicker.feedback = message;
  if (commit) selectionPicker.undo = applicationState.undoHistory.at(-1);
  renderSelectionCatalog();
  selectionSearch.focus({preventScroll: true});
}

getElementById("confirmSelection").onclick = () => {
  const picker = selectionPicker;
  const {kind, pending} = picker;
  if (!pending) return;
  const {id, needsOutgoing} = pending;
  const outgoing = selectionOutgoing.value;
  const settings = selectionSettings[kind];
  const names = pickerSelection(kind);
  if (!settings.options.includes(id) || names.includes(id)) return;
  if (needsOutgoing) {
    if (!names.includes(outgoing) || (picker.mode !== "rest" && !canReplaceSelection(kind, outgoing))) return;
  } else if (names.length >= settings.maximum || kind === "form" && picker.mode === "rest") return;
  const next = outgoing ? names.map(name => name === outgoing ? id : name) : [...names, id];
  const message = outgoing ? `Replaced ${selectionLabel(kind, outgoing)} with ${selectionLabel(kind, id)}.` :
    `${selectionLabel(kind, id)} ${kind === "spell" ? "prepared" : "added"}.`;
  clearSelectionConfirmation();
  picker.outgoing = "";
  if (picker.draft) {
    picker.draft = next;
    setSelectionFeedback(message.replace(/\.$/, "") + " in draft.", false);
    return;
  }
  if (kind === "form" && picker.mode === "rest") {
    restDraft.formSwap = {outgoing, incoming: id};
    renderLongRestChoices();
    selectionCatalog.close();
    return;
  }
  change(() => { applicationState[settings.key] = next; }, message);
  setSelectionFeedback(message, true);
};

getElementById("savePreparedSelection").onclick = () => {
  const {draft} = selectionPicker;
  if (!draft || sameSelection(draft, restDraft.preparedSpells)) return;
  restDraft.preparedSpells = draft;
  renderLongRestChoices();
  selectionCatalog.close();
};

getElementById("undoSelection").onclick = () => {
  const picker = selectionPicker;
  if (picker.undo !== applicationState.undoHistory.at(-1)) return;
  undo();
  picker.undo = null;
  clearSelectionConfirmation();
  setSelectionFeedback("Undone.", false);
};

document.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  const data = button.dataset;
  if (data.browseSelection) openSelectionCatalog(button, data.browseSelection);
  if (data.replaceSelection) openSelectionCatalog(button, data.selectionKind, "edit", data.replaceSelection);
  if (data.editSelection) {
    const kind = data.editSelection;
    if (selectionEditing.has(kind)) selectionEditing.delete(kind);
    else selectionEditing.add(kind);
    button.setAttribute("aria-pressed", String(selectionEditing.has(kind)));
    renderSelections();
  }
  if (data.removeSelection) {
    const kind = data.selectionKind;
    const id = data.removeSelection;
    if (!selectionNames(kind).includes(id) || !canReplaceSelection(kind, id)) return;
    change(() => { applicationState[selectionSettings[kind].key] = selectionNames(kind).filter(name => name !== id); },
      `${selectionLabel(kind, id)} ${kind === "spell" ? "unprepared" : "removed"}.`);
    document.querySelector(`[data-edit-selection="${kind === "cantrip" ? "spell" : kind}"]`).focus({preventScroll: true});
  }
  if (data.catalogSelection && selectionCatalog.open) chooseSelectionCandidate(data.catalogSelection, button);
  if (data.chooseOutgoing) {
    clearSelectionConfirmation();
    selectionPicker.outgoing = data.chooseOutgoing;
    renderSelectionCatalog();
    selectionSearch.focus({preventScroll: true});
  }
  if (data.unprepareDraft) {
    clearSelectionConfirmation();
    selectionPicker.draft = selectionPicker.draft.filter(name => name !== data.unprepareDraft);
    setSelectionFeedback(`${data.unprepareDraft} unprepared in draft.`, false);
  }
});
