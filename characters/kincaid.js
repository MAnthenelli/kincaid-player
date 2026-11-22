// Build and equipment from Kincaid's character PDF, pages 1–4.
// The combat loadout follows the older play sheet. The PDF's AC 11 is unarmored.
const kincaid = {
  grants: ["cold-resistance"],
  druidLevel: 6,
  hitDieSize: 8,
  maximumHitPoints: 51,
  abilityScores: { strength: 8, dexterity: 12, constitution: 16, intelligence: 8, wisdom: 18, charisma: 13 },
  savingThrowProficiencies: ["intelligence", "wisdom"],
  primalOrder: "Magician",
  skillProficiencies: {Insight: 1, Nature: 1, Perception: 1, Persuasion: 1},
  skillProficiencySources: {}, // Insight, Nature, Perception and Persuasion grant choices are unconfirmed.
  walkingSpeed: 30,
  darkvision: 60,
  size: "Medium",
  startingFeatIds: ["alert", "war-caster"],
  featReferences: [{
    id: "war-caster",
    name: "War Caster",
    category: "General",
    description: "<p>The sheet shows Advantage on Constitution saves to maintain Concentration and offers reaction spellcasting when a creature leaves your reach. The spell must target only that creature.</p>",
    sourcePath: "Kincaid’s existing character sheet"
  }],
  maximumSelectedCantrips: 4,
  maximumPreparedSpells: 10,
  maximumKnownForms: 6,
  maximumWildShapeUses: 3,
  shortRestWildShapeRecovery: 1,
  spellSlotMaximums: {1: 4, 2: 3, 3: 3},
  startingInventory: {
    TIV3B1vbrVHIhQAm: 1, // Studded Leather Armor
    sSs3hSzkKBMNBgTs: 1  // Shield
  },
  startingEquippedItemIds: ["TIV3B1vbrVHIhQAm", "sSs3hSzkKBMNBgTs"],
  startingForms: ["snake", "allo", "tiger", "elk", "gspider", "plesio"],
  // Starting selection for a fresh sheet; the PDF lists options without ten daily picks.
  startingPreparedSpells: ["Animal Friendship", "Charm Person", "Create or Destroy Water", "Detect Magic", "Detect Poison and Disease", "Entangle", "Faerie Fire", "Fog Cloud", "Goodberry", "Healing Word"],
  startingCantrips: ["Elementalism", "Guidance", "Message", "Resistance"]
};
// Governing abilities for standard skill checks. Physical modifiers change in Wild Shape.
const characterSkills = {
  Acrobatics: "DEX", "Animal Handling": "WIS", Arcana: "INT",
  Athletics: "STR", Deception: "CHA", History: "INT",
  Insight: "WIS", Intimidation: "CHA", Investigation: "INT",
  Medicine: "WIS", Nature: "INT", Perception: "WIS",
  Performance: "CHA", Persuasion: "CHA", Religion: "INT",
  "Sleight of Hand": "DEX", Stealth: "DEX", Survival: "WIS"
};
const abilityModifier = ability => Math.floor(((typeof applicationState === "undefined" ? kincaid.abilityScores[ability] : abilityScore(ability)) - 10) / 2);
const proficiencyBonus = 2 + Math.floor((kincaid.druidLevel - 1) / 4);
const spellAttackBonus = () => proficiencyBonus + abilityModifier("wisdom");
const spellSaveDC = () => 8 + spellAttackBonus();
const breathSaveDC = () => 8 + proficiencyBonus + abilityModifier("constitution");
const circleFormArmorClass = () => 13 + abilityModifier("wisdom");
const circleFormTemporaryHP = 3 * kincaid.druidLevel;
const spellSlotLevels = Object.keys(kincaid.spellSlotMaximums).map(Number);
const MAX = kincaid.maximumHitPoints;
const MAX_CANTRIPS = kincaid.maximumSelectedCantrips;
