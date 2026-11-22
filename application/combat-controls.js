const attackBonusPattern = /(attack(?: roll)?[: ]+)([+-]\d+)|([+-]\d+)(?= to hit)/i;
function liveAttackText(detail) {
  const match = detail.match(attackBonusPattern);
  if (!match) return detail;
  const tail = detail.slice(match.index + match[0].length);
  const suffix = tail.startsWith(" to hit") ? " to hit" : "";
  return detail.slice(0, match.index) + (match[1] || "") +
    rollDisplay(Number(match[2] || match[3]), "attack", "", "", suffix, tail.slice(suffix.length));
}
function choice(label, detail = "", quick = "") {
  if (!detail) return `<div class="combatOption"><b>${label}</b></div>`;
  return `<div class="combatOption"><details data-action-details><summary><b>${label}</b></summary><div class="actionRules">${detail}</div></details>${quick ? `<div class="actionQuick">${quick}</div>` : ""}</div>`;
}

function spellLevelBadge(level) {
  return `<span class="spellLevel" aria-label="${level ? `Spell level ${level}` : "Cantrip"}">${level}</span>`;
}

function spellPropertyMark(letter, label) {
  const detail = letter === "R"
    ? "Casting takes 10 extra minutes and uses no spell slot."
    : "Requires Concentration. Starting another Concentration spell ends this one.";
  return detailButton(letter, detail, "spellProperty", label);
}

function spellMarks(record, level = record.level) {
  return spellLevelBadge(level) + (record.ritual ? spellPropertyMark("R", "Ritual") : "") +
    (record.requiresConcentration ? spellPropertyMark("C", "Concentration") : "");
}

function compactAttack(detail) {
  const hit = detail.match(attackBonusPattern);
  const dc = detail.match(/(?:DC|escape DC) \d+(?: (?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma))?/i)?.[0];
  const damagePattern = /(?:\d+\s*\((?:\d+d\d+)(?:\s*[+−-]\s*\d+)?\)|\d+d\d+(?:\s*[+−-]\s*\d+)?|\d+)\s+(?:acid|bludgeoning|cold|fire|force|lightning|necrotic|piercing|poison|psychic|radiant|slashing|thunder)\b/gi;
  const damage = [...detail.matchAll(damagePattern)].map(match => match[0]).join(" + ");
  const parts = [hit && rollDisplay(Number(hit[2] || hit[3]), "attack", "", "", " to hit"), dc, damage];
  return parts.filter(Boolean).join(" · ") + (!hit && dc ? harmfulTargetHint() : "");
}
function oaEligible(formId, actionName) {
  let formRecord = getFormRecord(formId);
  return Boolean(
    formRecord &&
    formRecord.actions.some(
      (action) => action.name === actionName && action.opportunityAttack
    )
  );
}
function oaMarker() {
  return '<span class="oaMark" title="Available for an Opportunity Attack">OA<span class="srOnly"> · Opportunity Attack eligible</span></span>';
}
function opportunityRoll(action) {
  const note = action.opportunityAttack.note;
  if (attackBonusPattern.test(note)) return liveAttackText(note);
  const match = action.description.match(attackBonusPattern);
  return match ? rollDisplay(Number(match[2] || match[3]), "attack", "", "", " to hit", " · " + note) : note;
}
function opportunityOptions() {
  const notes = conditionModifiers().records.map(record => record.opportunityNote).filter(Boolean);
  if (notes.length) return choice("Opportunity Attack", notes.join(" · "));
  if (!applicationState.activeFormId)
    return equippedWeaponChoices(true) + choice(
      "Opportunity Attack",
      `Unarmed Strike · Damage: ${rollDisplay(abilityModifier("strength") + proficiencyBonus, "attack", "", "", " to hit")} · Grapple or Shove${harmfulTargetHint()}`
    );
  let options = getFormOpportunityAttackActions(
    getFormRecord(applicationState.activeFormId)
  )
    .map(
      (action) =>
        `<div class="oaLine"><b>${action.name}</b><span>${opportunityRoll(action)}</span></div>`
    )
    .join("");
  options += `<div class="oaLine"><b>Unarmed Strike</b><span>Shove${harmfulTargetHint()}</span></div>`;
  return choice("Opportunity Attack", `<div class="oaList">${options}</div>`);
}
function caster(kind) {
  return `<button type="button" id="${kind}Spell" data-open-cast="${kind}" aria-haspopup="dialog">${kind === "turn" ? "Action spells" : "Bonus action spells"}</button>`;
}
function spellControl() {
  return caster("turn") + (applicationState.activeFormId ? "" :
    '<button type="button" id="wildCompanionCast" data-open-cast="companion" data-cast-name="Find Familiar" aria-haspopup="dialog">Wild Companion</button>');
}
function bonusSpellControl() {
  return caster("bonus");
}
function reactionSpellControl() {
  const learnedReaction = initiateSpellRecords.some(record =>
    record.actionType === "reaction" && castMethods(record, "reaction").length);
  if (learnedReaction)
    return '<button type="button" id="castReactionSpell" data-open-cast="reaction" aria-haspopup="dialog">Reaction spells</button>';
  return hasFeat("war-caster") ?
    '<button type="button" id="reactionSpell" data-open-cast="reaction" aria-haspopup="dialog">War Caster</button>' : "";
}
const spellAttacks = new Set(["Starry Wisp", "Ice Knife", "Poison Spray", "Thorn Whip", "Flame Blade", "Produce Flame"]);
const targetSaveSpells = new Set(["Animal Friendship", "Call Lightning", "Charm Person", "Conjure Animals", "Enlarge/Reduce", "Entangle", "Faerie Fire", "Flaming Sphere", "Gust of Wind", "Heat Metal", "Hold Person", "Ice Knife", "Moonbeam", "Sleet Storm", "Thunderclap", "Thunderwave", "Wind Wall"]);
function spellResolution(name, ability = "wisdom") {
  const attack = proficiencyBonus + abilityModifier(ability);
  const lines = [];
  if (spellAttacks.has(name)) {
    const label = ["Flame Blade", "Produce Flame"].includes(name) ? "When attacking" : "Spell attack";
    lines.push(label + " " + rollDisplay(attack, "attack"));
  }
  if (targetSaveSpells.has(name)) {
    const qualifier = name === "Moonbeam" ? ' · CON · <span data-moonbeam-damage></span>' : "";
    lines.push("Save DC " + (8 + attack) + qualifier + (spellAttacks.has(name) ? "" : harmfulTargetHint()));
  }
  if (name === "Spike Growth") lines.push(harmfulTargetHint());
  if (name === "Dispel Magic") lines.push("Higher-level spell · WIS check " + rollDisplay(abilityModifier("wisdom"), "check", "WIS"));
  return lines.filter(Boolean).map(line => `<div class="spellResolution"><span>${line}</span></div>`).join("");
}
function progressive(kind, name, methods) {
  let box = getElementById(kind + "Progressive");
  if (!box) return;
  if (!name) {
    box.innerHTML = "";
    return;
  }
  const info = `<button type="button" class="detailName" data-spell-info="${name}" aria-label="${name} details">Details</button>`;
  const record = getSpellRecord(name);
  const self = kind === "reaction" ? "none" : SPELL_SELF_TARGET_MODES[name];
  let html = '<div class="selectedSpellCard"><div class="spellMeta"><span>' +
    (record.level ? "Level " + record.level : "Cantrip") + (record.requiresConcentration ? " · Concentration" : "") +
    '</span>' + info.replace(">Details<", ">Spell rules<") + "</div><div data-spell-resolution>" + spellResolution(name) + "</div>" +
    '<div class="castFields">';
  const grants = initiateChoices(name);
  if (grants.length) {
    html += '<label class="spellField">Spellcasting source <select id="castAbilitySource">' +
      (classSpellKnown(record) ? '<option value="">Druid · WIS</option>' : '') +
      grants.map(grant => '<option value="' + grant.list + '">Magic Initiate · ' + grant.list + ' · ' +
        grant.ability.toUpperCase() + '</option>').join("") + '</select></label>';
  }
  const choiceField = getEffectDefinition(name)?.choice;
  if (choiceField) {
    html += `<label class="spellField">${choiceField.label} <select data-effect-choice id="${kind}${choiceField.field}">${choiceField.values.map(value => `<option value="${value}">${value[0].toUpperCase() + value.slice(1)}</option>`).join("")}</select></label>`;
  }
  if (self === "optional")
    html += `<label class="spellField"><input type="checkbox" id="${kind}Self"> <span>Target Kincaid</span></label>`;
  if (self === "only")
    html += `<small class="spellField">Target: Kincaid</small>`;
  if (["Cure Wounds", "Healing Word"].includes(name))
    html += `<label id="${kind}HealingWrap" class="spellField hidden"><span>Healing rolled</span><input type="number" id="${kind}Healing" min="0" inputmode="numeric" aria-label="Healing rolled in Hit Points"><span>HP</span></label>`;
  html += "</div>";
  if (kind === "reaction") html += record.actionType === "reaction"
    ? "<p>" + (record.castingTrigger || "Use when the spell’s reaction trigger occurs.") + "</p>"
    : '<p>Target only the creature that provoked the opportunity attack.</p>';
  if (getSpellRecord(name)?.components.includes("s")) {
    for (const condition of conditionModifiers().records)
      if (condition.somaticReminder) html += conditionHint(condition.somaticReminder);
  }
  if (applicationState.concentrationEffect && (record.requiresConcentration || methods.some(method => method.long))) {
    const ending = record.requiresConcentration || methods.every(method => method.long)
      ? "ends when you begin casting." : "ends if you cast using a longer casting time.";
    html += `<p>${applicationState.concentrationEffect} ${ending}</p>`;
  }
  if (!methods.length)
    html += `<p>${spellRestriction(name, kind) || (applicationState.activeFormId
      ? "Check your Wild Shape spell access and available slots." :
      "No casting option is available.")}</p>`;
  html += '<div class="spellCommands castMethods">';
  const slots = methods.filter(method => method.spend && !method.long);
  if (slots.length === 1) {
    const {level} = slots[0];
    html += '<small>Level ' + level + ' · ' + applicationState.spellSlots[level] + ' left</small>';
  }
  if (slots.length > 1) {
    html += '<label class="spellField">Spell slot <select data-slot-choice>' +
      slots.map(method => '<option value="' + method.id + '">Level ' + method.level + ' · ' +
        applicationState.spellSlots[method.level] + ' left</option>').join("") +
      '</select></label>';
  }
  for (const method of methods) {
    if (slots.length > 1 && slots.includes(method) && method !== slots[0]) continue;
    const label = method.spend && !method.long ? "Cast at level " + method.level :
      method.initiate ? method.label + " · " + grants.find(grant => grant.list === method.initiate).ability.toUpperCase() :
      method.ritual ? method.label : method.long ? method.label.replace(/^Complete/, "Begin") : method.label;
    html += '<button type="button" data-cast-method="' + method.id + '"' +
      (slots.length > 1 && method === slots[0] ? ' data-selected-slot' : '') + '>' + label + '</button>';
  }
  html += '</div><small class="upcastBenefit" data-upcast-benefit hidden></small></div>';
  box.innerHTML = html;
  const abilitySource = box.querySelector("#castAbilitySource");
  const resolution = box.querySelector("[data-spell-resolution]");
  if (abilitySource && resolution) {
    abilitySource.onchange = () => {
      const grant = grants.find(choice => choice.list === abilitySource.value);
      resolution.innerHTML = spellResolution(name, grant?.ability);
    };
    abilitySource.onchange();
  }
  const benefit = box.querySelector("[data-upcast-benefit]");
  
  function showUpcastBenefit(level) {
    const moonbeamDamage = box.querySelector("[data-moonbeam-damage]");
    if (moonbeamDamage) moonbeamDamage.textContent = level + "d10 radiant";
    benefit.hidden = level <= record.level || !record.higherLevelSlot;
    benefit.textContent = benefit.hidden ? "" : name === "Enhance Ability"
      ? "Up to " + (level - record.level + 1) + " targets. Track other targets at the table."
      : record.higherLevelSlot;
  }
  showUpcastBenefit(slots[0]?.level || record.level);
  const slotsControl = box.querySelector("[data-slot-choice]");
  if (slotsControl) slotsControl.onchange = () => {
    const button = box.querySelector("[data-selected-slot]");
    button.dataset.castMethod = slotsControl.value;
    const level = Number(slotsControl.value.slice(4));
    button.textContent = "Cast at level " + level;
    showUpcastBenefit(level);
  };
}
function formControl() {
  const forms = applicationState.knownFormIds.map(getFormRecord);
  const options = applicationState.knownFormIds.map((id, index) =>
    `<option value="${id}">${formDisplayName(forms[index], forms)}</option>`
  ).join("");
  return `<div class="inline formControl">
    <div class="row"><select aria-label="Wild Shape form" id="turnForm"><option value="">Choose beast</option>${options}</select><button class="infoBtn" data-form-info="current" aria-label="Selected form details" title="Selected form details" hidden disabled>ⓘ</button></div>
    <div class="row wrap featureControls">
      <button id="shapeNow" hidden>Transform</button>
      ${applicationState.activeFormId ? '<button id="leaveNow">End Wild Shape</button>' : ""}
      <small>${applicationState.wildShapeUses ? "1 Wild Shape use" : "No Wild Shape uses"}</small>
    </div>
  </div>`;
}

let renderedFormId;
// The draft belongs to its picker. Restore it only while that spell is available.
function renderCombatSelections() {
  const selectors = ["#breathShape"];
  if (renderedFormId === applicationState.activeFormId) selectors.push("#turnForm");
  renderedFormId = applicationState.activeFormId;
  const fields = [...document.querySelectorAll(selectors.join(", "))]
    .filter(field => field.id && field.value)
    .map(field => ({id: field.id, value: field.value, checked: field.checked}));
  renderTurn();
  if (conditionModifiers().incapacitated) {
    for (const button of document.querySelectorAll("#shapeNow, #leaveNow, #useFlight, #useBreath, #breathShape"))
      button.disabled = true;
  }
  for (const field of fields) {
    const control = getElementById(field.id);
    if (!control || (control.options && ![...control.options].some(option => option.value === field.value))) continue;
    control.value = field.value;
    if (control.type === "checkbox") control.checked = field.checked;
    control.dispatchEvent(new Event("change", {bubbles: true}));
  }
}

const ammunitionTypes = {
  shortbow: /^ammunition\/arrow(?:\.|-)/,
  longbow: /^ammunition\/arrow(?:\.|-)/,
  handcrossbow: /^ammunition\/(?:crossbow-bolt|bolt-of-slaying)(?:\.|-)/,
  lightcrossbow: /^ammunition\/(?:crossbow-bolt|bolt-of-slaying)(?:\.|-)/,
  heavycrossbow: /^ammunition\/(?:crossbow-bolt|bolt-of-slaying)(?:\.|-)/,
  sling: /^ammunition\/sling-bullet(?:\.|-)/,
  blowgun: /^ammunition\/blowgun-needle(?:\.|-)/,
};
function weaponBaseAttack(item) {
  const ranged = item.subtype?.endsWith("R");
  const strength = abilityModifier("strength");
  const dexterity = abilityModifier("dexterity");
  const useDexterity = ranged || (item.properties?.includes("fin") && dexterity > strength);
  const ability = useDexterity ? dexterity : strength;
  // Kincaid's build grants simple weapon proficiency.
  const proficiency = item.subtype?.startsWith("simple") ? proficiencyBonus : 0;
  const inherentMagic = Number(item.magicalBonus || 0) * Number(item.attunement !== "required" || gearActive(item.id));
  const magic = item.id === applicationState.oiledWeaponId ? Math.max(3, inherentMagic) : inherentMagic;
  const attack = ability + proficiency + magic + (ranged && hasFeat("archery") ? 2 : 0);
  const damage = item.damage?.base;
  return {attack, ability, proficiency, magic, useDexterity, damage};
}
function compatibleAmmunition(item) {
  const match = ammunitionTypes[item.baseItem];
  if (!match || !item.properties?.includes("amm")) return [];
  if (item.properties.includes("two") && applicationState.equippedItemIds.some(id => armorSlot(itemById.get(id)) === "shield")) return [];
  return Object.keys(applicationState.inventory).map(id => itemById.get(id))
    .filter(record => match.test(record.sourcePath)).sort(itemNameOrder);
}
function openAmmunitionUse(item, trigger) {
  const {dialog, form, field, note, confirm} = collectionDialog("Shoot " + item.name, trigger);
  const ammo = field("select", "Ammunition");
  for (const record of compatibleAmmunition(item)) {
    ammo.add(new Option(record.name + " · " + applicationState.inventory[record.id], record.id));
  }
  const preview = note("");
  const showRoll = () => {
    const record = itemById.get(ammo.value);
    if (!record) return "";
    const base = weaponBaseAttack(item);
    const bonus = Number(record.magicalBonus || 0);
    const resolved = resolveRoll(base.attack + bonus, "attack", base.useDexterity ? "DEX" : "STR");
    const damageModifier = base.ability + base.magic + bonus;
    const dice = base.damage?.number ? base.damage.number + "d" + base.damage.denomination : (base.damage?.bonus || "");
    const shot = resolved.value + " to hit" + (resolved.result ? " · " + resolved.result : "") +
      (dice ? " · " + dice + (damageModifier ? signedRoll(damageModifier) : "") + " " + (base.damage.types || []).join("/") : "");
    preview.textContent = shot;
    return shot;
  };
  ammo.onchange = showRoll;
  showRoll();
  note("Roll and resolve the attack at the table. Spend one piece of ammunition on a shot, whether it hits or misses.");
  confirm.textContent = "Spend ammunition";
  form.onsubmit = event => {
    event.preventDefault();
    if (!dialog.open || !getInventoryActions().some(action => action.id === trigger.id) ||
        !compatibleAmmunition(item).some(record => record.id === ammo.value)) return;
    const shot = showRoll();
    const id = ammo.value;
    dialog.close();
    changeItemQuantity(id, -1, item.name + " · " + itemById.get(id).name + " spent. " + shot);
    restoreInventoryActionFocus(trigger);
  };
  dialog.showModal();
}
function equippedWeaponChoices(reaction = false) {
  const items = applicationState.equippedItemIds.map(id => itemById.get(id));
  const shield = items.some(item => armorSlot(item) === "shield");
  return items.filter(item => item.type === "weapon").map(item => {
    const base = item.damage?.base;
    if (!base?.number || !base.denomination) return "";
    const ranged = item.subtype?.endsWith("R");
    if (reaction && ranged) return "";
    const traits = item.properties || [];
    const {attack, ability, proficiency, magic, useDexterity} = weaponBaseAttack(item);
    const faces = `${base.number}d${base.denomination}`;
    const damage = faces + ((ability + magic) ? signedRoll(ability + magic) : "") + " " + base.types.join("/");
    // The 2014 Basic Rules weapon table supplies the missing 1d10 Longsword die.
    const versatile = (item.id === "10ZP2Bu3vnCuYMIB" || item.baseItem === "longsword") ? {number: 1, denomination: 10} : item.damage?.versatile;
    const notes = [
      item.id === venomDaggerId && applicationState.venomDagger === "coated" &&
        "On the next creature hit within 1 minute: DC 15 CON or 2d10 poison damage and Poisoned for 1 minute. End the coating on hit or expiry.",
      item.id === applicationState.oiledWeaponId && "Oil of Sharpness · Magical",
      proficiency ? "Proficient" : "No weapon proficiency recorded",
      traits.includes("fin") && "Finesse",
      ranged && item.range?.value && `Range ${item.range.value}/${item.range.long ?? item.range.value} ft`,
      !ranged && traits.includes("rch") && `Reach ${item.range?.reach || 10} ft`,
      traits.includes("amm") && "Spend compatible ammunition on attack",
      traits.includes("lod") && "Loading limits shots per action",

      traits.includes("thr") && `Thrown ${item.range?.value ?? "see details"}/${item.range?.long ?? "see details"} ft`,
      shield && traits.includes("two") && "Unequip shield before attacking with two hands",
      traits.includes("ver") && (shield ? "Unequip shield for two-handed use" :
        versatile?.number ? `Two-handed damage ${versatile.number}d${versatile.denomination}${(ability + magic) ? signedRoll(ability + magic) : ""}` :
        "Versatile: see weapon details for two-handed damage"),
      hasFeat("savage-attacker") && "On a hit, you may roll weapon damage dice twice and choose one result once per turn.",
      hasFeat("great-weapon-fighting") && (traits.includes("ver") || traits.includes("two")) &&
        "When wielding in two hands, treat 1s and 2s on damage dice as 3s.",
      hasFeat("two-weapon-fighting") && traits.includes("lgt") &&
        "Add the ability modifier to the extra Light attack if it is not already included."
    ].filter(Boolean);
    const quick = shield && traits.includes("two") ? "Two hands required" :
      rollDisplay(attack, "attack", useDexterity ? "DEX" : "STR", "", " to hit") + " · " + damage;
    return choice(item.name + (reaction ? " · Opportunity Attack" : ""), notes.join(" · "), quick);
  }).join("");
}
