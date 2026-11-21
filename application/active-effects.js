function activeSpellText(name, level, effect) {
  const target = effect?.self ? "Kincaid" : "Target";
  if (name === "Guidance" && effect?.choice)
    return `${target} adds 1d4 to ${effect.choice} checks for up to 1 minute while the caster concentrates.`;
  if (name === "Aid")
    return `Each target gains ${(level - 1) * statusById.get("aid").hitPointsPerLevel} current and maximum HP for 8 hours.`;
  if (name === "Enhance Ability") {
    const ability = effect?.choice || "the chosen ability";
    const additional = level > 2 ? " A second target can choose its own ability." : "";
    return `${target} has Advantage on ability checks using ${ability}. Concentration, up to 1 hour.${additional}`;
  }
  if (name === "Enlarge/Reduce") {
    const reduced = effect?.choice === "reduce";
    return `${target} is one size ${reduced ? "smaller" : "larger"} and has ${reduced ? "Disadvantage" : "Advantage"} on Strength checks and saves. On a hit with ${reduced ? "a reduced" : "an enlarged"} weapon or an Unarmed Strike, ${reduced ? "subtract 1d4 damage (minimum 1)" : "add 1d4 damage"}. Concentration, up to 1 minute.`;
  }
  if (name === "Protection from Energy" && effect?.choice)
    return target + " has resistance to " + effect.choice + " damage.";
  if (effect?.self && SELF_EFFECT_SUMMARIES[name])
    return (
      SELF_EFFECT_SUMMARIES[name] +
      " Duration: " +
      (SPELL_METADATA[name]?.[2] || "see spell.")
    );
  level = level || SPELL_METADATA[name]?.[0] || 0;
  if (name === "Moonbeam") {
    let dice = 2 + Math.max(0, level - 2);
    return `When the beam appears, moves into a creature’s space, a creature enters it, or a creature ends its turn there, that creature makes a DC ${spellSaveDC} CON save. It takes ${dice}d10 radiant damage on a failed save or half on a success. A creature saves only once per turn.`;
  }
  if (name === "Conjure Animals") {
    let dice = 3 + Math.max(0, level - 3);
    return `When the pack moves within 10 feet of a creature, or a creature enters or ends its turn within 10 feet of the pack, that creature makes a DC ${spellSaveDC} DEX save. It takes ${dice}d10 slashing damage on a failed save. A creature saves only once per turn.`;
  }
  if (name === "Entangle")
    return `When the plants appear, targets in the area make a DC ${spellSaveDC} STR save. On a failure, a target is Restrained. It can use an Action to make a DC ${spellSaveDC} STR check, ending the condition on a success. The area is difficult terrain.`;
  if (name === "Faerie Fire")
    return `When the spell appears, targets in the area make a DC ${spellSaveDC} DEX save. On a failure, a target is outlined: attacks against it have Advantage, and it cannot benefit from Invisible.`;
  if (name === "Spike Growth")
    return "When a creature moves through the area, it takes 2d4 piercing damage for every 5 feet it travels. The 20-foot-radius area is difficult terrain.";
  if (name === "Sleet Storm")
    return "While a creature is in the 40-foot-radius cylinder, the area is heavily obscured and difficult terrain. Creatures can fall Prone, and concentration can be disrupted.";
  if (name === "Wind Wall")
    return `When the wall appears, targets in it make a DC ${spellSaveDC} STR save. They take 4d8 bludgeoning damage, halved on a successful save. The wall blocks many projectiles and gases.`;
  if (name === "Fog Cloud")
    return "While the spell lasts, the 20-foot-radius sphere is heavily obscured. Wind can disperse it.";
  if (name === "Pass without Trace")
    return "While chosen creatures remain within 30 feet of you, they gain +10 to Dexterity (Stealth) checks and leave no tracks.";
  if (name === "Protection from Evil and Good")
    return "While the spell lasts, listed supernatural creatures have Disadvantage on attacks against the protected target and cannot newly possess or frighten it.";
  if (name === "Longstrider")
    return "While the spell lasts, all of the target’s Speeds increase by 10 feet.";
  if (name === "Daylight")
    return "While the spell lasts, the chosen point sheds bright light for 60 feet and dim light for another 60 feet.";
  if (name === "Plant Growth")
    return "In the overgrown area, every 1 foot of travel costs 4 feet unless that space was excluded from the spell.";
  return SPELL_QUICK_TEXT[name] || "";
}
// Expansion is a reading preference. Keep it across unrelated play-state changes.
function effectEntry(key, label, expanded) {
  const entry = document.createElement("details");
  entry.dataset.entry = key;
  entry.open = expanded.has(key);
  const title = document.createElement("summary");
  title.textContent = label;
  entry.append(title);
  return entry;
}
function appendText(parent, tag, text) {
  const el = document.createElement(tag);
  el.textContent = text;
  parent.append(el);
  return el;
}
function renderEffects(expanded) {
  elements.conc.replaceChildren();
  elements.effects.replaceChildren();
  for (const effect of applicationState.activeEffects) {
    const concentration = effect.n === applicationState.concentrationEffect;
    const label = (concentration ? "Concentration · " : "") + effect.n;
    const order = effect.order ?? "legacy";
    const key = "spell:" + effect.n + (effect.n === "Aid" ? ":" + order : "");
    const entry = effectEntry(key, label, expanded);
    const type = getEffectCategoryLabel(getEffectDefinition(effect.n));
    const summary = entry.querySelector("summary");
    if (effect.self) appendText(summary, "small", effect.n === "Aid" ? "Kincaid · Level " + effect.level : "Kincaid");
    else if (SPELL_SELF_TARGET_MODES[effect.n] === "optional") appendText(summary, "small", "Other target");
    if (effect.n === "Moonbeam") appendText(summary, "small", "DC " + spellSaveDC + " CON · " + (2 + Math.max(0, effect.level - 2)) + "d10 radiant");
    appendText(entry, "small", [type, effect.level ? "Level " + effect.level : "", SPELL_METADATA[effect.n]?.[2]].filter(Boolean).join(" · "));
    appendText(entry, "p", activeSpellText(effect.n, effect.level, effect));
    const end = appendText(entry, "button", "End " + effect.n);
    end.dataset.end = effect.n;
    if (effect.n === "Aid") end.dataset.effectOrder = order;
    (concentration ? elements.conc : elements.effects).append(entry);
  }
  if (applicationState.draconicFlightState === "active") {
    const entry = effectEntry("flight", "Draconic Flight", expanded);
    appendText(entry, "p", (applicationState.activeFormId ? "Suspended in Beast form. " : "") + "Fly Speed equals current Speed. Lasts 10 minutes or until retracted or Incapacitated.");
    appendText(entry, "button", "End flight").dataset.endFlight = "1";
    elements.effects.append(entry);
  }
}
function renderConditions(expanded) {
  const list = getElementById("conditionList");
  list.replaceChildren();
  const groups = new Map();
  const {blocked} = conditionModifiers();
  applicationState.conditions.forEach((item, index) => {
    const key = (item.custom ? "custom:" : "rule:") + item.name;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({...item, index});
  });
  for (const [key, entries] of groups) {
    const {name, custom, level, note} = entries[0];
    const definition = statusByName.get(name);
    const entry = effectEntry(key, name + (level ? " " + level : custom ? " · Custom" : ""), expanded);
    const summary = entry.querySelector("summary");
    if (!custom && blocked.has(definition.id)) appendText(summary, "small", "Immune");
    if (entries.length > 1) appendText(summary, "small", entries.length + " sources");
    else if (note) appendText(summary, "small", note).className = "entryNote";
    const parameter = !custom && definition.parameter;
    const formatParameter = value => parameter.field === "level" ? "Level " + value : String(value);
    if (parameter && entries.length === 1) appendText(summary, "small", formatParameter(entries[0][parameter.field]));
    if (!custom) appendText(entry, "p", effectReminder(definition));
    if (level) {
      const field = appendText(entry, "label", "Exhaustion level ");
      const select = document.createElement("select");
      for (let n = 1; n <= 6; n++) select.add(new Option(n === 6 ? "6 · Death" : String(n), String(n)));
      select.value = String(level);
      field.append(select);
      select.onchange = () => {
        const next = Number(select.value);
        change(() => applicationState.conditions[entries[0].index].level = next, "Exhaustion set to " + next + ".");
      };
    }
    entries.forEach((application, i) => {
      const {index, note} = application;
      const row = document.createElement("div");
      row.className = "conditionInstance";
      if (entries.length > 1) appendText(row, "span", [
        note || "Source " + (i + 1), parameter ? formatParameter(application[parameter.field]) : ""
      ].filter(Boolean).join(" · "));
      const remove = appendText(row, "button", level ? "Remove exhaustion" : "Remove");
      remove.setAttribute("aria-label", "Remove " + name + (note ? " from " + note : ""));
      remove.dataset.removeCondition = "";
      remove.onclick = () => {
        change(() => applicationState.conditions.splice(index, 1), name + " removed.");
        ([...list.children].find(el => el.dataset.entry === key)?.querySelector("summary") || getElementById("openEffects")).focus();
      };
      entry.append(row);
    });
    list.append(entry);
  }
}
