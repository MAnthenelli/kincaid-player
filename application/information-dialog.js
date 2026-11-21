wireDialogDismissal(elements.infoModal, elements.closeInfo);

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
  const printedSkills = formRecord.sensesAndSkillsDescription || "";
  const skills = activeSheet
    ? [liveFormSkills(printedSkills, formRecord), additionalSkills(formRecord, printedSkills)].filter(Boolean).join(" · ")
    : printedSkills;
  elements.infoTitle.textContent = formRecord.name;
  elements.infoBody.innerHTML = `<p><b>${getFormRuleset(formRecord)} · CR ${formRecord.challengeRating} · ${activeSheet ? liveSize() : formRecord.size}</b><br>Source: ${getFormSource(formRecord)}</p>${renderBaseCreatureStatistics(formRecord.baseCreatureId)}<p><b>Wild Shape · AC ${activeSheet ? liveAC() : formAC(formId)}</b> · ${activeSheet ? liveMovement() : Object.entries(
    formRecord.speeds
  )
    .map(([speedName, speed]) => `${formatSpeedName(speedName)} ${speed} ft`)
    .join(
      " · "
    )}</p>${activeSheet ? `<p>Initiative ${initiativeText()}${conditionHint(defenseDisplay())}</p>` : ""}<p>${savingThrows}</p>${skills ? `<p><b>Senses and skills</b><br>${skills}</p>` : ""}${formRecord.appearanceDescription ? `<p><b>Appearance</b><br>${formRecord.appearanceDescription}</p>` : ""}<p><b>Use</b><br>${formRecord.roleDescription}</p>${formRecord.traits.map((trait) => `<div class="attack"><b>${trait.name}</b> · ${trait.description}</div>`).join("")}${formRecord.actions.map((action) => `<div class="attack"><b>${action.name}</b> · ${activeSheet ? formActionText(action.name, action.description) : action.description}</div>`).join("")}${formRecord.bonusActions.map((action) => `<div class="attack"><b>${action.name} · Bonus Action</b> · ${activeSheet ? formActionText(action.name, action.description) : action.description}</div>`).join("")}`;
  showInfo();
}
function showInfo() {
  if (!elements.infoModal.open) elements.infoModal.showModal();
  elements.infoModal.scrollTop = 0;
  elements.closeInfo.focus();
}

function openItemInfo(id) {
  const item = itemById.get(id);
  if (!item) return;
  const body = elements.infoBody;
  elements.infoTitle.textContent = item.name;
  body.replaceChildren();
  appendText(body, "p", itemSummary(item)).className = "muted";

  function field(label, value) {
    if (value === undefined || value === null || value === "") return;
    const row = appendText(body, "p", "");
    appendText(row, "b", label);
    row.append(" · " + value);
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
  field("Source", provenance.filter(Boolean).join(" · "));
  showInfo();
}
