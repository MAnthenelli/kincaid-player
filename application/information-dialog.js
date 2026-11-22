wireDialogDismissal(elements.infoModal, elements.closeInfo);

function appendInfoSource(body, provenance) {
  const text = provenance.filter(Boolean).join(" · ");
  if (!text) return;
  const source = appendText(body, "details", "");
  source.className = "infoSource";
  appendText(source, "summary", "Source");
  appendText(source, "p", text);
}

function appendInfoFact(facts, label, value) {
  const fact = appendText(facts, "div", "");
  appendText(fact, "dt", label);
  appendText(fact, "dd", value);
}

function openSpellInfo(name) {
  const record = getSpellRecord(name);
  if (!record) return;
  elements.infoTitle.textContent = record.name;
  elements.infoBody.replaceChildren();
  const body = elements.infoBody;
  appendText(body, "p", [record.level ? "Level " + record.level : "Cantrip", record.school]
    .filter(Boolean).join(" · ")).className = "muted";
  const facts = appendText(body, "dl", "");
  facts.className = "infoFacts";
  function field(label, value) {
    if (value) appendInfoFact(facts, label, value);
  }
  function section(label, value) {
    if (!value) return;
    if (label) appendText(body, "h3", label);
    const rules = appendText(body, "p", "");
    rules.className = "infoRules";
    value.split(/\*\*([^*]+)\*\*/).forEach((part, index) => {
      if (index % 2) appendText(rules, "strong", part);
      else rules.append(part);
    });
  }
  field("Casting time", record.castingTime || {action:"Action", bonusAction:"Bonus Action", reaction:"Reaction"}[record.actionType]);
  field("Trigger", record.castingTrigger);
  field("Range", record.range);
  field("Components", record.components.join(", ").toUpperCase());
  field("Material", record.material);
  field("Duration", (record.requiresConcentration ? "Concentration, " : "") + record.duration);
  if (record.ritual) field("Ritual", "+10 minutes · No spell slot");
  section("", record.description);
  section("Higher-level slots", record.higherLevelSlot);
  if (castDialog.open && record.level)
    appendText(body, "small", "You can expend one spell slot to cast a spell per turn.");
  section("Cantrip upgrade", record.cantripUpgrade);
  if (record.summonedCreature) {
    section(record.summonedCreature.name, record.summonedCreature.text);
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
  if (!castDialog.open && record.availability !== "wildCompanion" && spellKnown(record)) {
    const cast = collectionButton(body, "Cast", "Cast " + record.name, "openCast", "all");
    cast.dataset.castName = record.name;
    cast.setAttribute("aria-haspopup", "dialog");
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
  let savingThrows = getFormSavingThrowRows(formRecord)
    .map(([ability, value]) => `${ability} ${activeSheet ? savingThrowDisplay(ability, value) : signedRoll(value)}`)
    .join(" · ");
  const printedSkills = formRecord.sensesAndSkillsDescription || "";
  const skills = activeSheet
    ? [liveFormSkills(printedSkills, formRecord), additionalSkills(formRecord, printedSkills)].filter(Boolean).join(" · ")
    : printedSkills;
  elements.infoTitle.textContent = formRecord.name;
  const speed = activeSheet ? liveMovement() : Object.entries(formRecord.speeds)
    .map(([name, value]) => `${formatSpeedName(name)} ${value} ft`).join(" · ");
  const ac = activeSheet ? liveAC() : formAC(formId);
  const sections = [
    ["Traits", formRecord.traits, trait => trait.description],
    ["Actions", formRecord.actions, action => activeSheet ? formActionText(action.name, action.description) : action.description],
    ["Bonus actions", formRecord.bonusActions, action => activeSheet ? formActionText(action.name, action.description) : action.description]
  ];
  const rules = sections.filter(([, entries]) => entries.length).map(([heading, entries, describe]) =>
    `<section class="infoSection"><h3>${heading}</h3>${entries.map(entry =>
      `<div class="attack"><b>${entry.name}</b><p>${describe(entry)}</p></div>`).join("")}</section>`
  ).join("");
  elements.infoBody.innerHTML = `
    <p class="muted">${getFormRuleset(formRecord)} · CR ${formRecord.challengeRating} · ${activeSheet ? liveSize() : formRecord.size}</p>
    <section class="infoSection">
      <h3>Wild Shape</h3>
      <p><b>AC ${ac}</b> · ${speed}</p>
      ${activeSheet ? `<p>Initiative ${initiativeText()}${conditionHint(defenseDisplay())}</p>` : ""}
      <p><b>Saving throws</b><br>${savingThrows}</p>
      ${skills ? `<p><b>Senses and skills</b><br>${skills}</p>` : ""}
    </section>
    ${rules}
    ${renderBaseCreatureStatistics(formRecord.baseCreatureId)}
    ${formRecord.roleDescription ? `<p>${formRecord.roleDescription}</p>` : ""}
    ${formRecord.appearanceDescription ? `<p>${formRecord.appearanceDescription}</p>` : ""}
    <p class="muted">${getFormSource(formRecord)}</p>`;
  showInfo();
}
function showInfo() {
  if (!elements.infoModal.open) elements.infoModal.showModal();
  elements.infoBody.scrollTop = 0;
  elements.closeInfo.focus();
}

function openItemInfo(id) {
  const item = itemById.get(id);
  if (!item) return;
  const body = elements.infoBody;
  elements.infoTitle.textContent = item.name;
  body.replaceChildren();
  appendText(body, "p", itemSummary(item)).className = "muted";

  const facts = appendText(body, "dl", "");
  facts.className = "infoFacts";
  function field(label, value) {
    if (value !== undefined && value !== null && value !== "") appendInfoFact(facts, label, String(value));
  }
  const {armor, attunement, capacity, damage, price, range, source, weight} = item;
  if (typeof weight?.value === "number" && weight.units) field("Weight", weight.value + " " + weight.units);
  if (typeof price?.value === "number" && price.denomination) field("Listed price", price.value + " " + price.denomination);
  if (attunement) field("Attunement", attunement === "required" ? "Required" : "Optional");
  if (item.category === "armor" && armor?.value > 0) {
    const bonus = armor.magicalBonus ? " + " + armor.magicalBonus + " magic bonus" : "";
    const dex = item.subtype === "light" ? " + Dex modifier" :
      item.subtype === "medium" ? " + Dex modifier (max " + armor.dex + ")" : "";
    field("Armor Class", (item.subtype === "shield" ? "+" : "") + armor.value + dex + bonus);
    field("Strength requirement", item.strength);
  }
  if (capacity?.value) field("Capacity", capacity.value + (capacity.type === "weight" && weight?.units ? " " + weight.units : ""));
  if (range?.value) field("Range", [range.value, range.long].filter(Boolean).join("/") + " " + range.units);
  if (range?.reach) field("Reach", range.reach + " " + range.units);
  for (const [label, part] of [["Damage", damage?.base], ["Versatile damage", damage?.versatile]]) {
    if (!part) continue;
    let formula = part.custom?.enabled ? part.custom.formula :
      part.number && part.denomination ? part.number + "d" + part.denomination : "";
    if (!part.custom?.enabled && part.bonus) {
      formula = formula ? formula + (part.bonus.startsWith("-") ? " " : " + ") + part.bonus : part.bonus;
    }
    if (!formula) continue;
    const types = part.types?.join(" or ");
    field(types === "healing" ? "Healing" : label, [formula, types === "healing" ? "" : types].filter(Boolean).join(" "));
  }
  field("Maximum uses", item.maximumUses);
  const propertyLabels = {
    mgc: "Magical", ada: "Adamantine", stealthDisadvantage: "Stealth disadvantage",
    weightlessContents: "Weightless contents", foc: "Spellcasting focus", ver: "Versatile",
    hvy: "Heavy", two: "Two-handed", lgt: "Light", thr: "Thrown", amm: "Ammunition",
    lod: "Loading", fin: "Finesse", ret: "Returning", rch: "Reach", spc: "Special"
  };
  field("Properties", item.properties?.map(property => propertyLabels[property] || property).join(", "));

  if (item.description) {
    const description = appendText(body, "div", "");
    description.className = "itemDescription";
    description.innerHTML = item.description; // Importer emits only allowlisted tags and numeric table spans.
  }
  const contents = itemContentsById.get(id);
  if (contents?.length) {
    appendText(body, "h3", "Pack contents");
    const list = appendText(body, "ul", "");
    for (const member of contents.slice().sort(itemNameOrder)) {
      appendText(list, "li", member.quantity + " × " + member.name);
    }
  }
  const provenance = [source.rules && source.rules + " rules", source.custom, source.book,
    source.page && "page " + source.page, source.license, item.sourcePath];
  appendInfoSource(body, provenance);
  showInfo();
}
