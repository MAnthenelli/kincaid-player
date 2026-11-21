const EFFECT_DEFINITIONS = {
  Longstrider: {
    name: "Longstrider",
    speedDelta: 10,
    baseLevel: 1,
    requiresConcentration: false,
    duration: "1 hour",
    category: "character",
    choice: null
  },
  "Enhance Ability": {
    name: "Enhance Ability",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "concentration",
    category: "character",
    choice: { field: "Ability", label: "Ability", values: ["Strength", "Dexterity", "Intelligence", "Wisdom", "Charisma"] }
  },
  "Enlarge/Reduce": {
    name: "Enlarge/Reduce",
    grants: ["resize"],
    baseLevel: 2,
    requiresConcentration: true,
    duration: "concentration",
    category: "transformation",
    choice: {
      field: "Size", label: "Size change",
      values: ["enlarge", "reduce"]
    }
  },
  "Pass without Trace": {
    name: "Pass without Trace",
    grants: ["quiet-steps"],
    baseLevel: 2,
    requiresConcentration: true,
    duration: "concentration",
    category: "character",
    choice: null
  },
  "Wind Wall": {
    name: "Wind Wall",
    baseLevel: 3,
    requiresConcentration: true,
    duration: "concentration",
    category: "battlefield",
    choice: null
  },
  "Plant Growth": {
    name: "Plant Growth",
    baseLevel: 3,
    requiresConcentration: false,
    duration: "indefinite",
    category: "battlefield",
    choice: null
  },
  Daylight: {
    name: "Daylight",
    baseLevel: 3,
    requiresConcentration: false,
    duration: "1 hour",
    category: "battlefield",
    choice: null
  },
  Entangle: {
    name: "Entangle",
    baseLevel: 1,
    requiresConcentration: true,
    duration: "concentration",
    category: "battlefield",
    choice: null
  },
  "Faerie Fire": {
    name: "Faerie Fire",
    baseLevel: 1,
    requiresConcentration: true,
    duration: "concentration",
    category: "battlefield",
    choice: null
  },
  "Fog Cloud": {
    name: "Fog Cloud",
    baseLevel: 1,
    requiresConcentration: true,
    duration: "concentration",
    category: "battlefield",
    choice: null
  },
  "Protection from Evil and Good": {
    name: "Protection from Evil and Good",
    baseLevel: 1,
    requiresConcentration: true,
    duration: "concentration",
    category: "character",
    choice: null
  },
  "Spike Growth": {
    name: "Spike Growth",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "concentration",
    category: "battlefield",
    choice: null
  },
  "Sleet Storm": {
    name: "Sleet Storm",
    baseLevel: 3,
    requiresConcentration: true,
    duration: "concentration",
    category: "battlefield",
    choice: null
  },
  Moonbeam: {
    name: "Moonbeam",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "concentration",
    category: "battlefield",
    choice: null
  },
  "Conjure Animals": {
    name: "Conjure Animals",
    baseLevel: 3,
    requiresConcentration: true,
    duration: "concentration",
    category: "summon",
    choice: null
  },
  Guidance: {
    name: "Guidance",
    grants: ["guidance"],
    baseLevel: 0,
    requiresConcentration: true,
    duration: "concentration",
    category: "character",
    choice: { field: "Skill", label: "Skill", values: Object.keys(characterSkills) }
  },
  Resistance: {
    name: "Resistance",
    baseLevel: 0,
    requiresConcentration: true,
    duration: "concentration",
    category: "character",
    choice: null
  },
  "Produce Flame": {
    name: "Produce Flame",
    baseLevel: 0,
    requiresConcentration: false,
    duration: "10 minutes",
    category: "character",
    choice: null
  },
  Shillelagh: {
    name: "Shillelagh",
    baseLevel: 0,
    requiresConcentration: false,
    duration: "1 minute",
    category: "character",
    choice: null
  },
  "Animal Friendship": {
    name: "Animal Friendship",
    baseLevel: 1,
    requiresConcentration: false,
    duration: "24 hours",
    category: "character",
    choice: null
  },
  "Charm Person": {
    name: "Charm Person",
    baseLevel: 1,
    requiresConcentration: false,
    duration: "1 hour",
    category: "character",
    choice: null
  },
  "Detect Magic": {
    name: "Detect Magic",
    baseLevel: 1,
    requiresConcentration: true,
    duration: "10 minutes",
    category: "character",
    choice: null
  },
  "Detect Poison and Disease": {
    name: "Detect Poison and Disease",
    baseLevel: 1,
    requiresConcentration: true,
    duration: "10 minutes",
    category: "character",
    choice: null
  },
  Jump: {
    name: "Jump",
    baseLevel: 1,
    requiresConcentration: false,
    duration: "1 minute",
    category: "character",
    choice: null
  },
  "Speak with Animals": {
    name: "Speak with Animals",
    baseLevel: 1,
    requiresConcentration: false,
    duration: "10 minutes",
    category: "character",
    choice: null
  },
  Aid: {
    name: "Aid",
    grants: ["aid"],
    baseLevel: 2,
    requiresConcentration: false,
    duration: "8 hours",
    category: "character",
    choice: null
  },
  Barkskin: {
    name: "Barkskin",
    baseLevel: 2,
    requiresConcentration: false,
    duration: "1 hour",
    category: "character",
    choice: null
  },
  "Beast Sense": {
    name: "Beast Sense",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "1 hour",
    category: "character",
    choice: null
  },
  "Continual Flame": {
    name: "Continual Flame",
    baseLevel: 2,
    requiresConcentration: false,
    duration: "Until dispelled",
    category: "character",
    choice: null
  },
  Darkvision: {
    name: "Darkvision",
    baseLevel: 2,
    requiresConcentration: false,
    duration: "8 hours",
    category: "character",
    choice: null
  },
  "Flame Blade": {
    name: "Flame Blade",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "10 minutes",
    category: "character",
    choice: null
  },
  "Flaming Sphere": {
    name: "Flaming Sphere",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "1 minute",
    category: "character",
    choice: null
  },
  "Gust of Wind": {
    name: "Gust of Wind",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "1 minute",
    category: "character",
    choice: null
  },
  "Heat Metal": {
    name: "Heat Metal",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "1 minute",
    category: "character",
    choice: null
  },
  "Hold Person": {
    name: "Hold Person",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "1 minute",
    category: "character",
    choice: null
  },
  "Locate Object": {
    name: "Locate Object",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "10 minutes",
    category: "character",
    choice: null
  },
  "Protection from Poison": {
    name: "Protection from Poison",
    grants: ["poison-ward"],
    endsOnCast: ["poisoned"],
    baseLevel: 2,
    requiresConcentration: false,
    duration: "1 hour",
    category: "character",
    choice: null
  },
  "Summon Beast": {
    name: "Summon Beast",
    baseLevel: 2,
    requiresConcentration: true,
    duration: "1 hour",
    category: "summon",
    choice: null
  },
  "Aura of Vitality": {
    name: "Aura of Vitality",
    baseLevel: 3,
    requiresConcentration: true,
    duration: "1 minute",
    category: "character",
    choice: null
  },
  "Call Lightning": {
    name: "Call Lightning",
    baseLevel: 3,
    requiresConcentration: true,
    duration: "10 minutes",
    category: "character",
    choice: null
  },
  "Elemental Weapon": {
    name: "Elemental Weapon",
    baseLevel: 3,
    requiresConcentration: true,
    duration: "1 hour",
    category: "character",
    choice: null
  },
  "Feign Death": {
    name: "Feign Death",
    grants: ["feigned-death"],
    baseLevel: 3,
    requiresConcentration: false,
    duration: "1 hour",
    category: "character",
    choice: null
  },
  "Meld into Stone": {
    name: "Meld into Stone",
    baseLevel: 3,
    requiresConcentration: false,
    duration: "8 hours",
    category: "character",
    choice: null
  },
  "Protection from Energy": {
    name: "Protection from Energy",
    baseLevel: 3,
    requiresConcentration: true,
    duration: "1 hour",
    category: "character",
    choice: { field: "DamageType", label: "Damage type", values: ["Acid", "Cold", "Fire", "Lightning", "Thunder"],
      grants: {Acid:"acid-resistance", Cold:"cold-resistance", Fire:"fire-resistance", Lightning:"lightning-resistance", Thunder:"thunder-resistance"} }
  },
  "Speak with Plants": {
    name: "Speak with Plants",
    baseLevel: 3,
    requiresConcentration: false,
    duration: "10 minutes",
    category: "character",
    choice: null
  },
  "Summon Fey": {
    name: "Summon Fey",
    baseLevel: 3,
    requiresConcentration: true,
    duration: "1 hour",
    category: "summon",
    choice: null
  },
  "Water Breathing": {
    name: "Water Breathing",
    baseLevel: 3,
    requiresConcentration: false,
    duration: "24 hours",
    category: "character",
    choice: null
  },
  "Water Walk": {
    name: "Water Walk",
    baseLevel: 3,
    requiresConcentration: false,
    duration: "1 hour",
    category: "character",
    choice: null
  }
};
