function crValue(cr) {
  return cr === "1/4" ? 0.25 : +cr;
}
function maxSpeed(formRecord) {
  return getMaximumFormSpeed(formRecord);
}
function sortForms(entries, mode) {
  return entries.sort((a, b) => {
    let [firstId, firstForm] = a,
      [secondId, secondForm] = b;
    if (mode === "cr-asc")
      return (
        getChallengeRatingValue(firstForm.challengeRating) -
          getChallengeRatingValue(secondForm.challengeRating) ||
        firstForm.name.localeCompare(secondForm.name)
      );
    if (mode === "cr-desc")
      return (
        getChallengeRatingValue(secondForm.challengeRating) -
          getChallengeRatingValue(firstForm.challengeRating) ||
        firstForm.name.localeCompare(secondForm.name)
      );
    if (mode === "role-name")
      return (
        firstForm.roleDescription.localeCompare(secondForm.roleDescription) ||
        firstForm.name.localeCompare(secondForm.name)
      );
    if (mode === "known-first")
      return (
        Number(applicationState.knownFormIds.includes(secondId)) -
          Number(applicationState.knownFormIds.includes(firstId)) ||
        firstForm.name.localeCompare(secondForm.name)
      );
    if (mode === "speed-desc")
      return (
        maxSpeed(secondForm) - maxSpeed(firstForm) ||
        firstForm.name.localeCompare(secondForm.name)
      );
    return firstForm.name.localeCompare(secondForm.name);
  });
}
function sortSpells(list, mode) {
  return list.sort((a, b) => {
    let al = SPELL_METADATA[a]?.[0] || 0,
      bl = SPELL_METADATA[b]?.[0] || 0;
    if (mode === "name") return a.localeCompare(b);
    if (mode === "school-name")
      return (
        (SPELL_SCHOOLS[a] || "").localeCompare(SPELL_SCHOOLS[b] || "") ||
        a.localeCompare(b)
      );
    if (mode === "prepared-first") {
      let ap =
          applicationState.knownCantripNames.includes(a) ||
          CIRCLE_CANTRIPS.includes(a) ||
          ALWAYS_PREPARED_SPELLS.includes(a) ||
          applicationState.preparedSpellNames.includes(a),
        bp =
          applicationState.knownCantripNames.includes(b) ||
          CIRCLE_CANTRIPS.includes(b) ||
          ALWAYS_PREPARED_SPELLS.includes(b) ||
          applicationState.preparedSpellNames.includes(b);
      return Number(bp) - Number(ap) || al - bl || a.localeCompare(b);
    }
    return al - bl || a.localeCompare(b);
  });
}
function renderLibraries() {
  if (elements.formCR.options.length === 1) {
    const ratings = [...new Set(getFormRecords().map(([, form]) => form.challengeRating))];
    ratings.sort((a, b) => getChallengeRatingValue(a) - getChallengeRatingValue(b));
    for (const rating of ratings) elements.formCR.add(new Option(rating, rating));
  }
  if (elements.formEdition.options.length === 1) {
    const editions = new Set(getFormRecords().map(([, form]) => getFormRuleset(form)));
    for (const edition of [...editions].sort()) elements.formEdition.add(new Option(edition, edition));
  }
  const previous = elements.swapForm.value;
  const known = applicationState.knownFormIds;
  elements.swapFormField.hidden = known.length < kincaid.maximumKnownForms;
  elements.swapForm.replaceChildren(new Option("Choose a form", ""));
  for (const id of known) {
    const form = getFormRecord(id);
    if (id !== applicationState.activeFormId) elements.swapForm.add(new Option(form.name + " · " + getFormRuleset(form), id));
  }
  if (known.includes(previous)) elements.swapForm.value = previous;
  elements.knownCount.textContent = applicationState.knownFormIds.length;
  let formQuery = (elements.formSearch.value || "").toLowerCase(),
    challengeRating = elements.formCR.value,
    role = elements.formRoleFilter.value;
  elements.formLibrary.innerHTML =
    sortForms(
      getFormRecords().filter(([formId, formRecord]) => {
        let searchText = buildFormSearchText(formRecord);
        return (
          (!formQuery || searchText.includes(formQuery)) &&
          (!elements.formEdition.value || elements.formEdition.value === getFormRuleset(formRecord)) &&
          (!challengeRating ||
            formRecord.challengeRating === challengeRating) &&
          (!role || formRecord.searchTags.includes(role))
        );
      }),
      elements.formSort.value
    )
      .map(
        ([formId, formRecord]) =>
          `<div class="item"><div><b>${formRecord.name}</b><div class="muted">${getFormRuleset(formRecord)} · CR ${formRecord.challengeRating} · ${formRecord.size} · ${formRecord.roleDescription}</div></div><div><button class="infoBtn" data-form-info="${formId}" aria-label="${formRecord.name} information" title="${formRecord.name} information">ⓘ</button><button data-form="${formId}">${applicationState.knownFormIds.includes(formId) ? "Remove" : (elements.swapForm.value ? "Swap in" : "Add")}</button></div></div>`
      )
      .join("") || '<div class="muted">No matching forms.</div>';
  let all = [
      ...new Set([
        ...CANTRIP_LIBRARY,
        ...PREPARED_SPELL_OPTIONS,
        ...ALWAYS_PREPARED_SPELLS
      ])
    ],
    sq = (elements.spellSearch.value || "").toLowerCase(),
    lv = elements.spellLevel.value,
    school = elements.spellSchool.value;
  if (
    !elements.spellSchool.options.length ||
    elements.spellSchool.options.length === 1
  ) {
    [...new Set(all.map((x) => SPELL_SCHOOLS[x]).filter(Boolean))]
      .sort()
      .forEach((x) => elements.spellSchool.add(new Option(x, x)));
  }
  elements.cantripCount.textContent = applicationState.knownCantripNames.length;
  elements.prepCount.textContent = applicationState.preparedSpellNames.length;
  elements.spellLibrary.innerHTML =
    sortSpells(
      all.filter((x) => {
        let level = SPELL_METADATA[x]?.[0] ?? 0,
          text = [
            x,
            SPELL_SCHOOLS[x],
            SPELL_QUICK_TEXT[x],
            level ? "level " + level : "cantrip"
          ]
            .join(" ")
            .toLowerCase();
        return (
          (!sq || text.includes(sq)) &&
          (lv === "" || String(level) === lv) &&
          (!school || SPELL_SCHOOLS[x] === school)
        );
      }),
      elements.spellSort.value
    )
      .map((x) => {
        let isCantrip = (SPELL_METADATA[x]?.[0] || 0) === 0,
          circle = CIRCLE_CANTRIPS.includes(x),
          always =
            circle ||
            ALWAYS_PREPARED_SPELLS.includes(x),
          button = isCantrip
            ? circle
              ? '<span class="badge">Circle cantrip</span>'
              : `<button data-cantrip="${x}">${applicationState.knownCantripNames.includes(x) ? "Remove" : "Select"}</button>`
            : always
              ? `<span class="badge">${CIRCLE_SPELLS.includes(x) ? "Always prepared · Circle" : "Always prepared · Druidic"}</span>`
              : `<button data-prep="${x}">${applicationState.preparedSpellNames.includes(x) ? "Unprepare" : "Prepare"}</button>`;
        return `<div class="item"><div><b>${x}</b><div>${levelPips(SPELL_METADATA[x]?.[0] || 0)} <span class="muted">${isCantrip ? "Cantrip" : "Level " + SPELL_METADATA[x][0]} · ${SPELL_SCHOOLS[x] || ""}${circle ? " · always prepared" : ""}</span></div></div><div><button class="infoBtn" data-spell-info="${x}" aria-label="${x} information" title="${x} information">ⓘ</button>${button}</div></div>`;
      })
      .join("") || '<div class="muted">No matching spells.</div>';
  for (const filters of document.querySelectorAll(".filterOptions")) {
    const active = [...filters.querySelectorAll("select")].filter(field => field.selectedIndex > 0);
    filters.querySelector("summary").textContent = ["Filters", ...active.map(field => field.selectedOptions[0].text)].join(" · ");
  }
}
