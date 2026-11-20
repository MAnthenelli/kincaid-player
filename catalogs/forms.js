const FORMS = {
  "snake": {
    "id": "snake",
    "name": "Giant Constrictor Snake",
    "rulesEdition": "2024",
    "challengeRating": "2",
    "size": "Huge",
    "armorClass": 12,
    "abilityModifiers": {
      "strength": 4,
      "dexterity": 2,
      "constitution": 1
    },
    "savingThrowOverrides": {},
    "speeds": {
      "walk": 30,
      "swim": 30
    },
    "roleDescription": "Grapple · swim",
    "searchTags": [
      "combat",
      "grapple",
      "control",
      "swim",
      "aquatic"
    ],
    "appearanceDescription": "An enormous, thick-bodied serpent with heavy coils, broad scales, and a blunt wedge-shaped head. Its body is built to wrap around large prey and move equally well across ground or through water.",
    "sensesAndSkillsDescription": "Blindsight 10 ft",
    "traits": [],
    "actions": [
      {
        "name": "Multiattack",
        "description": "Make one Bite attack, then use Constrict.",
        "opportunityAttack": null
      },
      {
        "name": "Bite",
        "description": "+6 to hit · Reach 10 ft · 2d6 + 4 piercing.",
        "opportunityAttack": {
          "note": "10 ft"
        }
      },
      {
        "name": "Constrict",
        "description": "Large or smaller target within 10 ft makes DC 14 STR save. Fail: 2d8 + 4 bludgeoning and Grappled. Escape DC 14.",
        "opportunityAttack": null
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "allo": {
    "id": "allo",
    "name": "Allosaurus",
    "rulesEdition": "2024",
    "challengeRating": "2",
    "size": "Large",
    "armorClass": 13,
    "abilityModifiers": {
      "strength": 4,
      "dexterity": 1,
      "constitution": 3
    },
    "savingThrowOverrides": {},
    "speeds": {
      "walk": 60
    },
    "roleDescription": "Charge · pursuit",
    "searchTags": [
      "combat",
      "damage",
      "charge",
      "pursuit"
    ],
    "appearanceDescription": "A large bipedal predator with a long balancing tail, powerful hind legs, a heavy jaw, and short clawed forelimbs. Its build favors sudden straight-line charges.",
    "sensesAndSkillsDescription": "",
    "traits": [
      {
        "name": "Charging Claws",
        "description": "Before the Claws hit, move at least 30 feet straight toward a Large or smaller target. On the hit, the target automatically becomes Prone; it makes no saving throw. You can then make one Bite attack against that target as part of the same action. If you did not meet the movement and size requirements, Claws deals damage only and does not enable Bite."
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "description": "Attack +6 · reach 5 ft · Hit: 1d8 + 4 slashing. If you moved 30 ft straight toward a Large or smaller target immediately before the hit: target falls Prone, no save; then make one Bite attack.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Bite",
        "description": "+6 to hit · Reach 5 ft · 2d10 + 4 piercing.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "tiger": {
    "id": "tiger",
    "name": "Saber-Toothed Tiger",
    "rulesEdition": "2024",
    "challengeRating": "2",
    "size": "Large",
    "armorClass": 13,
    "abilityModifiers": {
      "strength": 4,
      "dexterity": 3,
      "constitution": 2
    },
    "savingThrowOverrides": {
      "strength": 6,
      "dexterity": 5
    },
    "speeds": {
      "walk": 40
    },
    "roleDescription": "Damage · mobility",
    "searchTags": [
      "combat",
      "damage",
      "mobility",
      "stealth",
      "scout"
    ],
    "appearanceDescription": "A massive low-slung cat with muscular shoulders, broad paws, and two long curved upper canines. Its springing gait and flexible body suit rapid attacks and evasive movement.",
    "sensesAndSkillsDescription": "Darkvision 60 ft · Stealth +7",
    "traits": [
      {
        "name": "Running Leap",
        "description": "With a 10-foot running start, long jump up to 25 feet."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "Make two Rend attacks.",
        "opportunityAttack": null
      },
      {
        "name": "Rend",
        "description": "+6 to hit · Reach 5 ft · 2d6 + 4 slashing.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "bonusActions": [
      {
        "name": "Nimble Escape",
        "description": "Take the Disengage or Hide action.",
        "opportunityAttack": null
      }
    ],
    "reactions": []
  },
  "elk": {
    "id": "elk",
    "baseCreatureId": "giant-elk-2014",
    "searchTags": [
      "combat",
      "transport",
      "charge",
      "mount"
    ],
    "roleDescription": "Transport · charge",
    "appearanceDescription": "A towering elk with a deep chest, long legs, and an immense branching rack of antlers. Its back is broad enough to serve as a mount for several Medium riders if the DM permits the arrangement."
  },
  "gspider": {
    "id": "gspider",
    "baseCreatureId": "giant-spider-2014",
    "searchTags": [
      "combat",
      "control",
      "restrain",
      "climb",
      "stealth",
      "scout"
    ],
    "roleDescription": "Climb · restrain",
    "appearanceDescription": "A horse-sized spider with long jointed legs, hooked feet, clustered eyes, and a heavy abdomen that produces strong webbing."
  },
  "plesio": {
    "id": "plesio",
    "baseCreatureId": "plesiosaurus-2014",
    "searchTags": [
      "combat",
      "swim",
      "aquatic",
      "transport"
    ],
    "roleDescription": "Aquatic combat · transport",
    "appearanceDescription": "A broad-bodied marine reptile with four paddle-like flippers, a short tail, and a long flexible neck ending in a narrow toothed head."
  },
  "jackal": {
    "id": "jackal",
    "baseCreatureId": "jackal-2014",
    "searchTags": [
      "scout",
      "stealth"
    ],
    "roleDescription": "Small scout",
    "appearanceDescription": "A lean, long-legged canine with a narrow muzzle, large upright ears, and a light frame built for quick travel."
  },
  "rat": {
    "id": "rat",
    "baseCreatureId": "rat-2014",
    "searchTags": [
      "scout",
      "tiny"
    ],
    "roleDescription": "Tiny scout",
    "appearanceDescription": "A small brown or gray rodent with a pointed muzzle, rounded ears, grasping feet, and a long bare tail."
  },
  "almiraj": {
    "id": "almiraj",
    "name": "Almiraj",
    "rulesEdition": "2014",
    "challengeRating": "0",
    "size": "Small",
    "armorClass": 13,
    "abilityModifiers": {
      "strength": -4,
      "dexterity": 3,
      "constitution": 0
    },
    "savingThrowOverrides": {},
    "speeds": {
      "walk": 50
    },
    "roleDescription": "Fast scout · stealth",
    "searchTags": [
      "scout",
      "stealth",
      "speed",
      "small",
      "familiar"
    ],
    "appearanceDescription": "A large, timid rabbit with soft fur and a single 1-foot-long spiral horn rising from its forehead. Its light frame and powerful hind legs are built for speed and evasion.",
    "sensesAndSkillsDescription": "Darkvision 30 ft · Perception +4 · Stealth +5",
    "traits": [
      {
        "name": "Keen Senses",
        "description": "Advantage on Perception checks that rely on hearing or sight."
      },
      {
        "name": "Familiar",
        "description": "With the DM’s permission, the Find Familiar spell can summon an almiraj."
      }
    ],
    "actions": [
      {
        "name": "Horn",
        "description": "Attack +5 · reach 5 ft · Hit: 1d4 + 3 piercing.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "cbadger": {
    "id": "cbadger",
    "name": "Cave Badger",
    "rulesEdition": "2014",
    "challengeRating": "1/4",
    "size": "Medium",
    "armorClass": 12,
    "abilityModifiers": {
      "strength": 1,
      "dexterity": 0,
      "constitution": 2
    },
    "savingThrowOverrides": {},
    "speeds": {
      "walk": 30,
      "burrow": 15
    },
    "roleDescription": "Burrow · tunneler",
    "searchTags": [
      "burrow",
      "tunneler",
      "exploration",
      "scout",
      "tremorsense"
    ],
    "appearanceDescription": "A broad, low-slung badger with powerful forelimbs, heavy digging claws, and a coat dusted with cave soil.",
    "sensesAndSkillsDescription": "Darkvision 30 ft · Tremorsense 60 ft",
    "traits": [
      {
        "name": "Keen Smell",
        "description": "Advantage on Perception checks that rely on smell."
      },
      {
        "name": "Tunneler",
        "description": "When the Cave Badger burrows, it leaves tunnels behind."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "Make one Bite attack and one Claws attack.",
        "opportunityAttack": null
      },
      {
        "name": "Bite",
        "description": "+3 to hit · Reach 5 ft · 1d6 + 1 piercing.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Claws",
        "description": "+3 to hit · Reach 5 ft · 2d4 + 1 slashing.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "velo": {
    "id": "velo",
    "name": "Velociraptor",
    "rulesEdition": "2014",
    "challengeRating": "1/4",
    "size": "Tiny",
    "armorClass": 13,
    "abilityModifiers": {
      "strength": -2,
      "dexterity": 2,
      "constitution": 1
    },
    "savingThrowOverrides": {},
    "speeds": {
      "walk": 30
    },
    "roleDescription": "Tiny pack attacker",
    "searchTags": [
      "combat",
      "scout",
      "stealth",
      "tiny"
    ],
    "appearanceDescription": "A turkey-sized feathered predator with a long stiff tail, grasping forelimbs, and a raised sickle claw on each hind foot.",
    "sensesAndSkillsDescription": "",
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "Advantage on an attack if a conscious ally is within 5 feet of the target."
      }
    ],
    "actions": [
      {
        "name": "Multiattack",
        "description": "Make one Bite attack and one Claws attack.",
        "opportunityAttack": null
      },
      {
        "name": "Bite",
        "description": "Attack +4 · reach 5 ft · Hit: 1d6 + 2 piercing. Pack Tactics can grant Advantage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Claws",
        "description": "Attack +4 · reach 5 ft · Hit: 1d4 + 2 slashing. Pack Tactics can grant Advantage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-spider-2024": {
    "id": "giant-spider-2024",
    "name": "Giant Spider",
    "rulesEdition": "2024",
    "challengeRating": "1",
    "size": "Large",
    "armorClass": 14,
    "abilityModifiers": {
      "strength": 2,
      "dexterity": 3,
      "constitution": 1
    },
    "savingThrowOverrides": {},
    "speeds": {
      "walk": 30,
      "climb": 30
    },
    "roleDescription": "Climb · restrain",
    "searchTags": [
      "combat",
      "control",
      "restrain",
      "climb",
      "stealth",
      "scout"
    ],
    "appearanceDescription": "A horse-sized spider with long jointed legs, hooked feet, clustered eyes, and a heavy abdomen that produces strong webbing.",
    "sensesAndSkillsDescription": "Darkvision 60 ft.; Passive Perception 14 · Perception +4, Stealth +7",
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webs, and it knows the location of any other creature in contact with the same web."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Attack Roll: +5, reach 5 ft. Hit: 7 (1d8 + 3) Piercing damage plus 7 (2d6) Poison damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Web (Recharge 5–6)",
        "description": "Dexterity Saving Throw: DC 13, one creature the spider can see within 60 feet. Failure: The target has the Restrained condition until the web is destroyed (AC 10; HP 5; Vulnerability to Fire damage; Immunity to Poison and Psychic damage).",
        "opportunityAttack": null
      }
    ],
    "bonusActions": [],
    "reactions": [],
    "baseCreatureId": "giant-spider-2024"
  },
  "rat-2024": {
    "id": "rat-2024",
    "name": "Rat",
    "rulesEdition": "2024",
    "challengeRating": "0",
    "size": "Tiny",
    "armorClass": 10,
    "abilityModifiers": {
      "strength": -4,
      "dexterity": 0,
      "constitution": -1
    },
    "savingThrowOverrides": {},
    "speeds": {
      "walk": 20,
      "climb": 20
    },
    "roleDescription": "Tiny scout",
    "searchTags": [
      "scout",
      "tiny"
    ],
    "appearanceDescription": "A small brown or gray rodent with a pointed muzzle, rounded ears, grasping feet, and a long bare tail.",
    "sensesAndSkillsDescription": "Darkvision 30 ft.; Passive Perception 12 · Perception +2",
    "traits": [
      {
        "name": "Agile",
        "description": "The rat doesn’t provoke an Opportunity Attack when it moves out of an enemy’s reach."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Attack Roll: +2, reach 5 ft. Hit: 1 Piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "bonusActions": [],
    "reactions": [],
    "baseCreatureId": "rat-2024"
  },
  "cat-2024": {
    "id": "cat-2024",
    "name": "Cat",
    "rulesEdition": "2024",
    "challengeRating": "0",
    "size": "Tiny",
    "armorClass": 12,
    "abilityModifiers": {
      "strength": -4,
      "dexterity": 2,
      "constitution": 0
    },
    "savingThrowOverrides": {
      "dexterity": 4
    },
    "speeds": {
      "walk": 40,
      "climb": 40
    },
    "roleDescription": "Inconspicuous scout",
    "searchTags": [
      "scout",
      "stealth",
      "climb",
      "tiny"
    ],
    "appearanceDescription": "A small domestic cat with a flexible body, padded paws, climbing claws, and a familiar silhouette that rarely attracts attention.",
    "sensesAndSkillsDescription": "Darkvision 60 ft.; Passive Perception 13 · Perception +3, Stealth +4",
    "traits": [
      {
        "name": "Jumper",
        "description": "The cat’s jump distance is determined using its Dexterity rather than its Strength."
      }
    ],
    "actions": [
      {
        "name": "Scratch",
        "description": "Melee Attack Roll: +4, reach 5 ft. Hit: 1 Slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "bonusActions": [],
    "reactions": [],
    "baseCreatureId": "cat-2024"
  },
  "spider-2024": {
    "id": "spider-2024",
    "name": "Spider",
    "rulesEdition": "2024",
    "challengeRating": "0",
    "size": "Tiny",
    "armorClass": 12,
    "abilityModifiers": {
      "strength": -4,
      "dexterity": 2,
      "constitution": -1
    },
    "savingThrowOverrides": {},
    "speeds": {
      "walk": 20,
      "climb": 20
    },
    "roleDescription": "Tiny climber",
    "searchTags": [
      "scout",
      "stealth",
      "climb",
      "tiny"
    ],
    "appearanceDescription": "A tiny eight-legged spider with a compact body and fine climbing limbs, easy to overlook against a wall or ceiling.",
    "sensesAndSkillsDescription": "Darkvision 30 ft.; Passive Perception 10 · Stealth +4",
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including along ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webs, and the spider knows the location of any other creature in contact with the same web."
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Attack Roll: +4, reach 5 ft. Hit: 1 Piercing damage plus 2 (1d4) Poison damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "bonusActions": [],
    "reactions": [],
    "baseCreatureId": "spider-2024"
  }
};
