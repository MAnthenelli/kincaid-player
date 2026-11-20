function openSpellInfo(name) {
  const record = getSpellRecord(name);
  if (!record) return;
  elements.infoTitle.textContent = record.name;
  elements.infoBody.replaceChildren();
  function field(label, value) {
    if (!value) return;
    const paragraph = document.createElement("p");
    const heading = document.createElement("strong");
    heading.textContent = label;
    paragraph.append(heading, document.createElement("br"), value);
    paragraph.style.whiteSpace = "pre-line";
    elements.infoBody.append(paragraph);
  }
  field(record.level ? "Level " + record.level : "Cantrip", record.school);
  field("Casting time", record.castingTime || {action:"Action", bonusAction:"Bonus Action", reaction:"Reaction"}[record.actionType]);
  field("Trigger", record.castingTrigger);
  field("Range", record.range);
  field("Components", record.components.join(", ").toUpperCase());
  field("Material", record.material);
  field("Duration", (record.concentration ? "Concentration, " : "") + record.duration);
  if (record.ritual) field("Ritual", "Yes");
  field("Description", record.description);
  field("Using a higher-level spell slot", record.higherLevelSlot);
  field("Cantrip upgrade", record.cantripUpgrade);
  if (record.summonedCreature) {
    field(record.summonedCreature.name, record.summonedCreature.text);
    if (record.summonedCreature.abilities) {
      const table = document.createElement("table");
      table.createCaption().textContent = record.summonedCreature.name + " abilities";
      const headings = table.createTHead().insertRow();
      for (const label of ["Ability", "Score", "Modifier", "Save"]) {
        const header = document.createElement("th");
        header.scope = "col";
        header.textContent = label;
        headings.append(header);
      }
      const body = table.createTBody();
      for (const [ability, values] of Object.entries(record.summonedCreature.abilities)) {
        const row = body.insertRow();
        const signed = number => (number >= 0 ? "+" : "") + number;
        for (const value of [ability, values.score, signed(values.modifier), signed(values.save)]) {
          row.insertCell().textContent = value;
        }
      }
      elements.infoBody.append(table);
    }
  }
  showInfo();
}
function renderBaseCreatureStatistics(creatureId) {
  const creature = BASE_CREATURES[creatureId];
  if (!creature) return "";
  const scores = Object.entries(creature.abilityScores)
    .map(([ability, score]) => `${ability.toUpperCase()} ${score}`).join(" · ");
  return `<p><b>Base beast · ${getFormRuleset(creature)}</b><br>AC ${creature.armorClass} · HP ${creature.hitPointMaximum}<br>${scores}${creature.languages?.length ? "<br>Languages: " + creature.languages : ""}</p>`;
}
function openFormInfo(formId, activeSheet = false) {
  let formRecord = getFormRecord(formId);
  if (!formRecord) return;
  const mods = conditionModifiers();
  let savingThrows = getFormSavingThrowRows(formRecord)
    .map(([ability, value]) => `${ability} ${activeSheet ? savingThrowDisplay(ability, value, mods) : signedRoll(value)}`)
    .join(" · ");
  elements.infoTitle.textContent = formRecord.name;
  elements.infoBody.innerHTML = `<p><b>${getFormRuleset(formRecord)} · CR ${formRecord.challengeRating} · ${activeSheet ? currentSize() : formRecord.size}</b><br>Source: ${getFormSource(formRecord)}</p>${renderBaseCreatureStatistics(formRecord.baseCreatureId)}<p><b>Wild Shape · AC ${formAC(formId)}</b> · ${activeSheet ? liveMovement() : Object.entries(
    formRecord.speeds
  )
    .map(([speedName, speed]) => `${formatSpeedName(speedName)} ${speed} ft`)
    .join(
      " · "
    )}</p>${activeSheet ? `<p>Initiative ${initiativeText()}${conditionHint(defenseDisplay())}</p>` : ""}<p>${savingThrows}</p>${formRecord.sensesAndSkillsDescription ? `<p><b>Form-specific senses and skills</b><br>${activeSheet ? liveFormSkills(formRecord.sensesAndSkillsDescription) : formRecord.sensesAndSkillsDescription}</p>` : ""}${formRecord.appearanceDescription ? `<p><b>Appearance</b><br>${formRecord.appearanceDescription}</p>` : ""}<p><b>Use</b><br>${formRecord.roleDescription}</p>${formRecord.traits.map((trait) => `<div class="attack"><b>${trait.name}</b> · ${trait.description}</div>`).join("")}${formRecord.actions.map((action) => `<div class="attack"><b>${action.name}</b> · ${activeSheet ? formActionText(action.name, action.description) : action.description}</div>`).join("")}${formRecord.bonusActions.map((action) => `<div class="attack"><b>${action.name} · Bonus Action</b> · ${activeSheet ? formActionText(action.name, action.description) : action.description}</div>`).join("")}`;
  showInfo();
}
let infoReturnFocus = null;
function showInfo() {
  infoReturnFocus = document.activeElement;
  elements.infoModal.classList.remove("hidden");
  elements.closeInfo.focus();
}
function closeInfo() {
  elements.infoModal.classList.add("hidden");
  if (infoReturnFocus && document.contains(infoReturnFocus))
    infoReturnFocus.focus();
  infoReturnFocus = null;
}
