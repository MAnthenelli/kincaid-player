const BEASTS_2014 = {
  "ape-2014": {
    "name": "Ape",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/ape.yml",
    "sourceId": "K5cKmPoFkpuOotis",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/2",
    "armorClass": 12,
    "hitPointMaximum": 19,
    "abilityScores": {
      "str": 16,
      "dex": 14,
      "con": 14,
      "int": 6,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 2,
      "int": -2,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 30,
      "climb": 30
    },
    "skills": {
      "Athletics": 5,
      "Perception": 3
    },
    "initiative": 2,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Multiattack",
        "description": "The ape makes two fist attacks."
      },
      {
        "name": "Fist",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Rock",
        "description": "Ranged Weapon Attack: +5 to hit, range 25/50 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage."
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "axe-beak-2014": {
    "name": "Axe Beak",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/axe-beak.yml",
    "sourceId": "SXXvwaLBNuzBymp3",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 11,
    "hitPointMaximum": 19,
    "abilityScores": {
      "str": 14,
      "dex": 12,
      "con": 12,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 50
    },
    "skills": {},
    "initiative": 1,
    "senses": "Passive Perception 10",
    "languages": "",
    "description": "An axe beak is a tall flightless bird with strong legs and a heavy, wedge-shaped beak. It has a nasty disposition and tends to attack any unfamiliar creature that wanders too close.",
    "actions": [
      {
        "name": "Beak",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "baboon-2014": {
    "name": "Baboon",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/baboon.yml",
    "sourceId": "JW8bXggOMBx1S6tF",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Small",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 12,
    "hitPointMaximum": 3,
    "abilityScores": {
      "str": 8,
      "dex": 14,
      "con": 11,
      "int": 4,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "str": -1,
      "dex": 2,
      "con": 0,
      "int": -3,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 30,
      "climb": 30
    },
    "skills": {},
    "initiative": 2,
    "senses": "Passive Perception 11",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The baboon has advantage on an attack roll against a creature if at least one of the baboon's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "badger-2014": {
    "name": "Badger",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/badger.yml",
    "sourceId": "oQvORD924obyPdCc",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 10,
    "hitPointMaximum": 3,
    "abilityScores": {
      "str": 4,
      "dex": 11,
      "con": 12,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": -3,
      "dex": 0,
      "con": 1,
      "int": -4,
      "wis": 1,
      "cha": -3
    },
    "speeds": {
      "walk": 20,
      "burrow": 5
    },
    "skills": {},
    "initiative": 0,
    "senses": "Darkvision 30 ft. · Passive Perception 11",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The badger has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "black-bear-2014": {
    "name": "Black Bear",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/black-bear.yml",
    "sourceId": "D5WjGwKskeUT8HXa",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/2",
    "armorClass": 11,
    "hitPointMaximum": 19,
    "abilityScores": {
      "str": 15,
      "dex": 10,
      "con": 14,
      "int": 2,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 2,
      "dex": 0,
      "con": 2,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 40,
      "climb": 30
    },
    "skills": {
      "Perception": 3
    },
    "initiative": 0,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Multiattack",
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "boar-2014": {
    "name": "Boar",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/boar.yml",
    "sourceId": "lZR4lhNmYSf89s4Q",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 11,
    "hitPointMaximum": 11,
    "abilityScores": {
      "str": 13,
      "dex": 11,
      "con": 12,
      "int": 2,
      "wis": 9,
      "cha": 5
    },
    "savingThrows": {
      "str": 1,
      "dex": 0,
      "con": 1,
      "int": -4,
      "wis": -1,
      "cha": -3
    },
    "speeds": {
      "walk": 40
    },
    "skills": {},
    "initiative": 0,
    "senses": "Passive Perception 9",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Tusk",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Charge",
        "description": "If the boar moves at least 20 ft. straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 3 (1d6) slashing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone."
      },
      {
        "name": "Relentless (recharges after a Short or Long Rest)",
        "description": "If the boar takes 7 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "brown-bear-2014": {
    "name": "Brown Bear",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/brown-bear.yml",
    "sourceId": "omcDpBoB69esCXeM",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1",
    "armorClass": 11,
    "hitPointMaximum": 34,
    "abilityScores": {
      "str": 19,
      "dex": 10,
      "con": 16,
      "int": 2,
      "wis": 13,
      "cha": 7
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 3,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 40,
      "climb": 30
    },
    "skills": {
      "Perception": 3
    },
    "initiative": 0,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Multiattack",
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "camel-2014": {
    "name": "Camel",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/camel.yml",
    "sourceId": "FQMFuzzSh73d0Nrd",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/8",
    "armorClass": 9,
    "hitPointMaximum": 15,
    "abilityScores": {
      "str": 16,
      "dex": 8,
      "con": 14,
      "int": 2,
      "wis": 8,
      "cha": 5
    },
    "savingThrows": {
      "str": 3,
      "dex": -1,
      "con": 2,
      "int": -4,
      "wis": -1,
      "cha": -3
    },
    "speeds": {
      "walk": 50
    },
    "skills": {},
    "initiative": -1,
    "senses": "Passive Perception 9",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "cat-2014": {
    "name": "Cat",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/cat.yml",
    "sourceId": "hIf83RD3ZVW4Egfi",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 12,
    "hitPointMaximum": 2,
    "abilityScores": {
      "str": 3,
      "dex": 15,
      "con": 10,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": -4,
      "dex": 2,
      "con": 0,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 40,
      "climb": 30
    },
    "skills": {
      "Perception": 3,
      "Stealth": 4
    },
    "initiative": 2,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The cat has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "constrictor-snake-2014": {
    "name": "Constrictor Snake",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/constrictor-snake.yml",
    "sourceId": "UTuKdTah1DKfPwWe",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 12,
    "hitPointMaximum": 13,
    "abilityScores": {
      "str": 15,
      "dex": 14,
      "con": 12,
      "int": 1,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 1,
      "int": -5,
      "wis": 0,
      "cha": -4
    },
    "speeds": {
      "walk": 30,
      "swim": 30
    },
    "skills": {},
    "initiative": 2,
    "senses": "Blindsight 10 ft. · Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 14). Until this grapple ends, the creature is restrained, and the snake can't constrict another target.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "crab-2014": {
    "name": "Crab",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/crab.yml",
    "sourceId": "8RgUhb31VvjUNZU1",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 11,
    "hitPointMaximum": 2,
    "abilityScores": {
      "str": 2,
      "dex": 11,
      "con": 10,
      "int": 1,
      "wis": 8,
      "cha": 2
    },
    "savingThrows": {
      "str": -4,
      "dex": 0,
      "con": 0,
      "int": -5,
      "wis": -1,
      "cha": -4
    },
    "speeds": {
      "walk": 20,
      "swim": 20
    },
    "skills": {
      "Stealth": 2
    },
    "initiative": 0,
    "senses": "Blindsight 30 ft. · Passive Perception 9",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Amphibious",
        "description": "The crab can breathe air and water."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "crocodile-2014": {
    "name": "Crocodile",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/crocodile.yml",
    "sourceId": "8aCTKP5qaBPFOqxM",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/2",
    "armorClass": 12,
    "hitPointMaximum": 19,
    "abilityScores": {
      "str": 15,
      "dex": 10,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 0,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 20,
      "swim": 30
    },
    "skills": {
      "Stealth": 2
    },
    "initiative": 0,
    "senses": "Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained, and the crocodile can't bite another target",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The crocodile can hold its breath for 15 minutes."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "deer-2014": {
    "name": "Deer",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/deer.yml",
    "sourceId": "4EODJbmPlpnNGVR7",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 13,
    "hitPointMaximum": 4,
    "abilityScores": {
      "str": 11,
      "dex": 16,
      "con": 11,
      "int": 2,
      "wis": 14,
      "cha": 5
    },
    "savingThrows": {
      "str": 0,
      "dex": 3,
      "con": 0,
      "int": -4,
      "wis": 2,
      "cha": -3
    },
    "speeds": {
      "walk": 50
    },
    "skills": {},
    "initiative": 3,
    "senses": "Passive Perception 12",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "dire-wolf-2014": {
    "name": "Dire Wolf",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/dire-wolf.yml",
    "sourceId": "EYiQZ3rFL25fEJY5",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1",
    "armorClass": 14,
    "hitPointMaximum": 37,
    "abilityScores": {
      "str": 17,
      "dex": 15,
      "con": 15,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 2,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 50
    },
    "skills": {
      "Perception": 3,
      "Stealth": 4
    },
    "initiative": 2,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "draft-horse-2014": {
    "name": "Draft Horse",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/draft-horse.yml",
    "sourceId": "Bupo3E9X5Ptx6XeT",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 10,
    "hitPointMaximum": 19,
    "abilityScores": {
      "str": 18,
      "dex": 10,
      "con": 12,
      "int": 2,
      "wis": 11,
      "cha": 7
    },
    "savingThrows": {
      "str": 4,
      "dex": 0,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -2
    },
    "speeds": {
      "walk": 40
    },
    "skills": {},
    "initiative": 0,
    "senses": "Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "elk-2014": {
    "name": "Elk",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/elk.yml",
    "sourceId": "55PkbskG5iBZGrgR",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 10,
    "hitPointMaximum": 13,
    "abilityScores": {
      "str": 16,
      "dex": 10,
      "con": 12,
      "int": 2,
      "wis": 10,
      "cha": 6
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -2
    },
    "speeds": {
      "walk": 50
    },
    "skills": {},
    "initiative": 0,
    "senses": "Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Ram",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one prone creature. Hit: 8 (2d4 + 3) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Charge",
        "description": "If the elk moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "frog-2014": {
    "name": "Frog",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/frog.yml",
    "sourceId": "EZgiprHXA2D7Uyb3",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 11,
    "hitPointMaximum": 1,
    "abilityScores": {
      "str": 1,
      "dex": 13,
      "con": 8,
      "int": 1,
      "wis": 8,
      "cha": 3
    },
    "savingThrows": {
      "str": -5,
      "dex": 1,
      "con": -1,
      "int": -5,
      "wis": -1,
      "cha": -4
    },
    "speeds": {
      "walk": 20,
      "swim": 20
    },
    "skills": {
      "Perception": 1,
      "Stealth": 3
    },
    "initiative": 1,
    "senses": "Darkvision 30 ft. · Passive Perception 11",
    "languages": "",
    "description": "A frog has no effective attacks. It feeds on small insects and typically dwells near water, in trees, or underground. The frog’s statistics can also be used to represent a toad.",
    "actions": [],
    "traits": [
      {
        "name": "Amphibious",
        "description": "The frog can breathe air and water"
      },
      {
        "name": "Standing Leap",
        "description": "The frog's long jump is up to 10 ft. and its high jump is up to 5 ft., with or without a running start."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-badger-2014": {
    "name": "Giant Badger",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-badger.yml",
    "sourceId": "cJGY1ZywUOo6heNR",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 10,
    "hitPointMaximum": 13,
    "abilityScores": {
      "str": 13,
      "dex": 10,
      "con": 15,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 1,
      "dex": 0,
      "con": 2,
      "int": -4,
      "wis": 1,
      "cha": -3
    },
    "speeds": {
      "walk": 30,
      "burrow": 10
    },
    "skills": {},
    "initiative": 0,
    "senses": "Darkvision 30 ft. · Passive Perception 11",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Multiattack",
        "description": "The badger makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The badger has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-boar-2014": {
    "name": "Giant Boar",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-boar.yml",
    "sourceId": "SsuCaF2fIEoDdFA3",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "2",
    "armorClass": 12,
    "hitPointMaximum": 42,
    "abilityScores": {
      "str": 17,
      "dex": 10,
      "con": 16,
      "int": 2,
      "wis": 7,
      "cha": 5
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 3,
      "int": -4,
      "wis": -2,
      "cha": -3
    },
    "speeds": {
      "walk": 40
    },
    "skills": {},
    "initiative": 0,
    "senses": "Passive Perception 8",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Tusk",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Charge",
        "description": "If the boar moves at least 20 ft. straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 7 (2d6) slashing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
      },
      {
        "name": "Relentless (recharges after a Short or Long Rest)",
        "description": "If the boar takes 10 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-centipede-2014": {
    "name": "Giant Centipede",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-centipede.yml",
    "sourceId": "Hn8FFLEzscgT7azz",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Small",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 13,
    "hitPointMaximum": 4,
    "abilityScores": {
      "str": 5,
      "dex": 14,
      "con": 12,
      "int": 1,
      "wis": 7,
      "cha": 3
    },
    "savingThrows": {
      "str": -3,
      "dex": 2,
      "con": 1,
      "int": -5,
      "wis": -2,
      "cha": -4
    },
    "speeds": {
      "walk": 30,
      "climb": 30
    },
    "skills": {},
    "initiative": 2,
    "senses": "Blindsight 30 ft. · Passive Perception 8",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or take 10 (3d6) poison damage. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "giant-constrictor-snake-2014": {
    "name": "Giant Constrictor Snake",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-constrictor-snake.yml",
    "sourceId": "NpvwE1feOHyEqAbP",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Huge",
    "alignment": "unaligned",
    "challengeRating": "2",
    "armorClass": 12,
    "hitPointMaximum": 60,
    "abilityScores": {
      "str": 19,
      "dex": 14,
      "con": 12,
      "int": 1,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 1,
      "int": -5,
      "wis": 0,
      "cha": -4
    },
    "speeds": {
      "walk": 30,
      "swim": 30
    },
    "skills": {
      "Perception": 2
    },
    "initiative": 2,
    "senses": "Blindsight 10 ft. · Passive Perception 12",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage.",
        "opportunityAttack": {
          "note": "10 ft"
        }
      },
      {
        "name": "Constrict",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 13 (2d8 + 4) bludgeoning damage, and the target is grappled (escape DC 16). Until this grapple ends, the creature is restrained, and the snake can't constrict another target.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "giant-crab-2014": {
    "name": "Giant Crab",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-crab.yml",
    "sourceId": "AOJvmk1IchxNxQzP",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/8",
    "armorClass": 15,
    "hitPointMaximum": 13,
    "abilityScores": {
      "str": 13,
      "dex": 15,
      "con": 11,
      "int": 1,
      "wis": 9,
      "cha": 3
    },
    "savingThrows": {
      "str": 1,
      "dex": 2,
      "con": 0,
      "int": -5,
      "wis": -1,
      "cha": -4
    },
    "speeds": {
      "walk": 30,
      "swim": 30
    },
    "skills": {
      "Stealth": 4
    },
    "initiative": 2,
    "senses": "Blindsight 30 ft. · Passive Perception 9",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage, and the target is grappled (escape DC 11). The crab has two claws, each of which can grapple only one target.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Amphibious",
        "description": "The crab can breathe air and water."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-elk-2014": {
    "name": "Giant Elk",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-elk.yml",
    "sourceId": "hQt3qIahnB1Odb40",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Huge",
    "alignment": "unaligned",
    "challengeRating": "2",
    "armorClass": 14,
    "hitPointMaximum": 42,
    "abilityScores": {
      "str": 19,
      "dex": 16,
      "con": 14,
      "int": 7,
      "wis": 14,
      "cha": 10
    },
    "savingThrows": {
      "str": 4,
      "dex": 3,
      "con": 2,
      "int": -2,
      "wis": 2,
      "cha": 0
    },
    "speeds": {
      "walk": 60
    },
    "skills": {
      "Perception": 4
    },
    "initiative": 3,
    "senses": "Passive Perception 14",
    "languages": "Giant Elk; Understands Common, Elvish, and Sylvan but can't speak them",
    "description": "The majestic giant elk is rare to the point that its appearance is often taken as a foreshadowing of an important event, such as the birth of a king. Legends tell of gods that take the form of giant elk when visiting the Material Plane. Many cultures therefore believe that to hunt these creatures is to invite divine wrath.",
    "actions": [
      {
        "name": "Ram",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "opportunityAttack": {
          "note": "10 ft"
        }
      },
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one prone creature. Hit: 22 (4d8 + 4) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Charge",
        "description": "If the elk moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-fire-beetle-2014": {
    "name": "Giant Fire Beetle",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-fire-beetle.yml",
    "sourceId": "Z0GiAv3bJxTjUfjM",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Small",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 13,
    "hitPointMaximum": 4,
    "abilityScores": {
      "str": 8,
      "dex": 10,
      "con": 12,
      "int": 1,
      "wis": 7,
      "cha": 3
    },
    "savingThrows": {
      "str": -1,
      "dex": 0,
      "con": 1,
      "int": -5,
      "wis": -2,
      "cha": -4
    },
    "speeds": {
      "walk": 30
    },
    "skills": {},
    "initiative": 0,
    "senses": "Blindsight 30 ft. · Passive Perception 8",
    "languages": "",
    "description": "A giant fire beetle is a nocturnal creature that takes its name from a pair of glowing glands that give off light. Miners and adventurers prize these creatures, for a giant fire beetle’s glands continue to shed light for 1d6 days after the beetle dies. Giant fire beetles are most commonly found underground and in dark forests.",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d6 - 1) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Illumination",
        "description": "The beetle sheds bright light in a 10-foot radius and dim light for an additional 10 ft.."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-frog-2014": {
    "name": "Giant Frog",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-frog.yml",
    "sourceId": "kSAi2KRonL4G4JpO",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 11,
    "hitPointMaximum": 18,
    "abilityScores": {
      "str": 12,
      "dex": 13,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 1,
      "dex": 1,
      "con": 0,
      "int": -4,
      "wis": 0,
      "cha": -4
    },
    "speeds": {
      "walk": 30,
      "swim": 30
    },
    "skills": {
      "Perception": 2,
      "Stealth": 3
    },
    "initiative": 1,
    "senses": "Darkvision 30 ft. · Passive Perception 12",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage, and the target is grappled (escape DC 11). Until this grapple ends, the target is restrained, and the frog can't bite another target.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Swallow",
        "description": "The frog makes one bite attack against a Small or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the frog, and it takes 5 (2d4) acid damage at the start of each of the frog's turns. The frog can have only one target swallowed at a time. If the frog dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 ft. of movement, exiting prone."
      }
    ],
    "traits": [
      {
        "name": "Amphibious",
        "description": "The frog can breathe air and water"
      },
      {
        "name": "Standing Leap",
        "description": "The frog's long jump is up to 20 ft. and its high jump is up to 10 ft., with or without a running start."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-goat-2014": {
    "name": "Giant Goat",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-goat.yml",
    "sourceId": "rjqk7ToMD8sGr3n4",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/2",
    "armorClass": 11,
    "hitPointMaximum": 19,
    "abilityScores": {
      "str": 17,
      "dex": 11,
      "con": 12,
      "int": 3,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 1,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 40
    },
    "skills": {},
    "initiative": 0,
    "senses": "Passive Perception 11",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Ram",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Charge",
        "description": "If the goat moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 5 (2d4) bludgeoning damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
      },
      {
        "name": "Sure-Footed",
        "description": "The goat has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-hyena-2014": {
    "name": "Giant Hyena",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-hyena.yml",
    "sourceId": "aAqfEHPiVbhMwZ6j",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1",
    "armorClass": 12,
    "hitPointMaximum": 45,
    "abilityScores": {
      "str": 16,
      "dex": 14,
      "con": 14,
      "int": 2,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 2,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 50
    },
    "skills": {
      "Perception": 3
    },
    "initiative": 2,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [
      {
        "name": "Rampage",
        "description": "When the hyena reduces a creature to 0 hit points with a melee attack on its turn, the hyena can take a bonus action to move up to half its speed and make a bite attack."
      }
    ],
    "reactions": []
  },
  "giant-lizard-2014": {
    "name": "Giant Lizard",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-lizard.yml",
    "sourceId": "pLzSh4dA517Tn73E",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 12,
    "hitPointMaximum": 19,
    "abilityScores": {
      "str": 15,
      "dex": 12,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 30,
      "climb": 30
    },
    "skills": {},
    "initiative": 1,
    "senses": "Darkvision 30 ft. · Passive Perception 10",
    "languages": "",
    "description": "A giant lizard can be ridden or used as a draft animal. Lizardfolk also keep them as pets, and subterranean giant lizards are used as mounts and pack animals by drow, duergar, and others.",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "giant-octopus-2014": {
    "name": "Giant Octopus",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-octopus.yml",
    "sourceId": "p9Xnr820UAZBOIVN",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1",
    "armorClass": 11,
    "hitPointMaximum": 52,
    "abilityScores": {
      "str": 17,
      "dex": 13,
      "con": 13,
      "int": 4,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": 3,
      "dex": 1,
      "con": 1,
      "int": -3,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 10,
      "swim": 60
    },
    "skills": {
      "Perception": 4,
      "Stealth": 5
    },
    "initiative": 1,
    "senses": "Darkvision 60 ft. · Passive Perception 14",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Tentacles",
        "description": "Melee Weapon Attack: +5 to hit, reach 15 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage. If the target is a creature, it is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the octopus can't use its tentacles on another target.",
        "opportunityAttack": {
          "note": "15 ft"
        }
      },
      {
        "name": "Ink Cloud (recharges after a Short or Long Rest)",
        "description": "A 20-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action."
      }
    ],
    "traits": [
      {
        "name": "Hold Breath",
        "description": "While out of water, the octopus can hold its breath for 1 hour."
      },
      {
        "name": "Underwater Camouflage",
        "description": "The octopus has advantage on Dexterity (Stealth) checks made while underwater."
      },
      {
        "name": "Water Breathing",
        "description": "The octopus can breathe only underwater."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-venomous-snake-2014": {
    "name": "Giant Poisonous Snake",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-poisonous-snake.yml",
    "sourceId": "ZW39DE2zI3TXVYC9",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 14,
    "hitPointMaximum": 11,
    "abilityScores": {
      "str": 10,
      "dex": 18,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 0,
      "dex": 4,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -4
    },
    "speeds": {
      "walk": 30,
      "swim": 30
    },
    "skills": {
      "Perception": 2
    },
    "initiative": 4,
    "senses": "Blindsight 10 ft. · Passive Perception 12",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 6 (1d4 + 4) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.",
        "opportunityAttack": {
          "note": "10 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "giant-rat-diseased-2014": {
    "name": "Giant Rat (Diseased)",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-rat-diseased.yml",
    "sourceId": "z0zvgcIugizwcuxJ",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Small",
    "alignment": "unaligned",
    "challengeRating": "1/8",
    "armorClass": 12,
    "hitPointMaximum": 7,
    "abilityScores": {
      "str": 7,
      "dex": 15,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": -2,
      "dex": 2,
      "con": 0,
      "int": -4,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 30
    },
    "skills": {},
    "initiative": 2,
    "senses": "Darkvision 60 ft. · Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 10 Constitution saving throw or contract a disease. Until the disease is cured, the target can't regain hit points except by magical means, and the target's hit point maximum decreases by 3 (1d6) every 24 hours. If the target's hit point maximum drops to 0 as a result of this disease, the target dies.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-rat-2014": {
    "name": "Giant Rat",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-rat.yml",
    "sourceId": "q1YJIeIt6rK8fCKn",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Small",
    "alignment": "unaligned",
    "challengeRating": "1/8",
    "armorClass": 12,
    "hitPointMaximum": 7,
    "abilityScores": {
      "str": 7,
      "dex": 15,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": -2,
      "dex": 2,
      "con": 0,
      "int": -4,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 30
    },
    "skills": {},
    "initiative": 2,
    "senses": "Darkvision 60 ft. · Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The rat has advantage on an attack roll against a creature if at least one of the rat's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-sea-horse-2014": {
    "name": "Giant Sea Horse",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-sea-horse.yml",
    "sourceId": "c9XDGsTJRy9HUaxQ",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/2",
    "armorClass": 13,
    "hitPointMaximum": 16,
    "abilityScores": {
      "str": 12,
      "dex": 15,
      "con": 11,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 1,
      "dex": 2,
      "con": 0,
      "int": -4,
      "wis": 1,
      "cha": -3
    },
    "speeds": {
      "swim": 40
    },
    "skills": {},
    "initiative": 2,
    "senses": "Passive Perception 11",
    "languages": "",
    "description": "Like their smaller kin, giant sea horses are shy, colorful fish with elongated bodies and curled tails. Aquatic elves train them as mounts.",
    "actions": [
      {
        "name": "Ram",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Charge",
        "description": "If the sea horse moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) bludgeoning damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone."
      },
      {
        "name": "Water Breathing",
        "description": "The sea horse can breathe only underwater."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-spider-2014": {
    "name": "Giant Spider",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-spider.yml",
    "sourceId": "v99wOosUJjUgcUNF",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1",
    "armorClass": 14,
    "hitPointMaximum": 26,
    "abilityScores": {
      "str": 14,
      "dex": 16,
      "con": 12,
      "int": 2,
      "wis": 11,
      "cha": 4
    },
    "savingThrows": {
      "str": 2,
      "dex": 3,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 30,
      "climb": 30
    },
    "skills": {
      "Stealth": 7
    },
    "initiative": 3,
    "senses": "Darkvision 60 ft. · Blindsight 10 ft. · Passive Perception 10",
    "languages": "",
    "description": "To snare its prey, a giant spider spins elaborate webs or shoots sticky strands of webbing from its abdomen. Giant spiders are most commonly found underground, making their lairs on ceilings or in dark, web-filled crevices. Such lairs are often festooned with web cocoons holding past victims.",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 9 (2d8) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Web (Recharge 5–6)",
        "description": "Ranged Weapon Attack: +5 to hit, range 30/60 ft., one creature. Hit: The target is restrained by webbing. As an action, the restrained target can make a DC 12 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; hp 5; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage)."
      }
    ],
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-toad-2014": {
    "name": "Giant Toad",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-toad.yml",
    "sourceId": "Ixo5shumxy4I9qyD",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1",
    "armorClass": 11,
    "hitPointMaximum": 39,
    "abilityScores": {
      "str": 15,
      "dex": 13,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -4
    },
    "speeds": {
      "walk": 20,
      "swim": 40
    },
    "skills": {},
    "initiative": 1,
    "senses": "Darkvision 30 ft. · Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 5 (1d10) poison damage, and the target is grappled (escape DC 13). Until this grapple ends, the target is restrained, and the toad can't bite another target.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Swallow",
        "description": "The toad makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is swallowed, and the grapple ends. The swallowed target is blinded and restrained, it has total cover against attacks and other effects outside the toad, and it takes 10 (3d6) acid damage at the start of each of the toad's turns. The toad can have only one target swallowed at a time.\nIf the toad dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 5 feet of movement, exiting prone."
      }
    ],
    "traits": [
      {
        "name": "Amphibious",
        "description": "The toad can breathe air and water"
      },
      {
        "name": "Standing Leap",
        "description": "The toad's long jump is up to 20 ft. and its high jump is up to 10 ft., with or without a running start."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-weasel-2014": {
    "name": "Giant Weasel",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-weasel.yml",
    "sourceId": "8VXxqeBvN54rPh81",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/8",
    "armorClass": 13,
    "hitPointMaximum": 9,
    "abilityScores": {
      "str": 11,
      "dex": 16,
      "con": 10,
      "int": 4,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 0,
      "dex": 3,
      "con": 0,
      "int": -3,
      "wis": 1,
      "cha": -3
    },
    "speeds": {
      "walk": 40
    },
    "skills": {
      "Perception": 3,
      "Stealth": 5
    },
    "initiative": 3,
    "senses": "Darkvision 60 ft. · Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The weasel has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "giant-wolf-spider-2014": {
    "name": "Giant Wolf Spider",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/giant-wolf-spider.yml",
    "sourceId": "f9JbhBfWucrY2eDA",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 13,
    "hitPointMaximum": 11,
    "abilityScores": {
      "str": 12,
      "dex": 16,
      "con": 13,
      "int": 3,
      "wis": 12,
      "cha": 4
    },
    "savingThrows": {
      "str": 1,
      "dex": 3,
      "con": 1,
      "int": -4,
      "wis": 1,
      "cha": -3
    },
    "speeds": {
      "walk": 40,
      "climb": 40
    },
    "skills": {
      "Perception": 3,
      "Stealth": 7
    },
    "initiative": 3,
    "senses": "Darkvision 60 ft. · Blindsight 10 ft. · Passive Perception 13",
    "languages": "",
    "description": "Smaller than a giant spider, a giant wolf spider hunts prey across open ground or hides in a burrow or crevice, or in a hidden cavity beneath debris.",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 7 (2d6) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "goat-2014": {
    "name": "Goat",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/goat.yml",
    "sourceId": "y8sRU8Ks2lcrGsaf",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 10,
    "hitPointMaximum": 4,
    "abilityScores": {
      "str": 12,
      "dex": 10,
      "con": 11,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 1,
      "dex": 0,
      "con": 0,
      "int": -4,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 40
    },
    "skills": {},
    "initiative": 0,
    "senses": "Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Ram",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Charge",
        "description": "If the goat moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 2 (1d4) bludgeoning damage. If the target is a creature, it must succeed on a DC 10 Strength saving throw or be knocked prone."
      },
      {
        "name": "Sure-Footed",
        "description": "The goat has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "hunter-shark-2014": {
    "name": "Hunter Shark",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/hunter-shark.yml",
    "sourceId": "siBUEAj4UVdaiH6p",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "2",
    "armorClass": 12,
    "hitPointMaximum": 45,
    "abilityScores": {
      "str": 18,
      "dex": 13,
      "con": 15,
      "int": 1,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 2,
      "int": -5,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "swim": 40
    },
    "skills": {
      "Perception": 2
    },
    "initiative": 1,
    "senses": "Blindsight 30 ft. · Passive Perception 12",
    "languages": "",
    "description": "Smaller than a giant shark but larger and fiercer than a reef shark, a hunter shark haunts deep waters. It usually hunts alone, but multiple hunter sharks might feed in the same area. A fully grown hunter shark is 15 to 20 feet long.",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The shark has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "hyena-2014": {
    "name": "Hyena",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/hyena.yml",
    "sourceId": "cDr1JtzEV26bP5Ym",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 11,
    "hitPointMaximum": 5,
    "abilityScores": {
      "str": 11,
      "dex": 13,
      "con": 12,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 0,
      "dex": 1,
      "con": 1,
      "int": -4,
      "wis": 1,
      "cha": -3
    },
    "speeds": {
      "walk": 50
    },
    "skills": {
      "Perception": 3
    },
    "initiative": 1,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The hyena has advantage on an attack roll against a creature if at least one of the hyena's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "jackal-2014": {
    "name": "Jackal",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/jackal.yml",
    "sourceId": "MZYCPIVoBs918qGZ",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Small",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 12,
    "hitPointMaximum": 3,
    "abilityScores": {
      "str": 8,
      "dex": 15,
      "con": 11,
      "int": 3,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "str": -1,
      "dex": 2,
      "con": 0,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 40
    },
    "skills": {
      "Perception": 3
    },
    "initiative": 2,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The jackal has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The jackal has advantage on an attack roll against a creature if at least one of the jackal's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "lion-2014": {
    "name": "Lion",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/lion.yml",
    "sourceId": "hjhERRzafCiFFVLA",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1",
    "armorClass": 12,
    "hitPointMaximum": 26,
    "abilityScores": {
      "str": 17,
      "dex": 15,
      "con": 13,
      "int": 3,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 1,
      "int": -4,
      "wis": 1,
      "cha": -1
    },
    "speeds": {
      "walk": 50
    },
    "skills": {
      "Perception": 3,
      "Stealth": 6
    },
    "initiative": 2,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The lion has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The lion has advantage on an attack roll against a creature if at least one of the lion's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      },
      {
        "name": "Pounce",
        "description": "If the lion moves at least 20 ft. straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the lion can make one bite attack against it as a bonus action."
      },
      {
        "name": "Running Leap",
        "description": "With a 10-foot running start, the lion can long jump up to 25 ft.."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "lizard-2014": {
    "name": "Lizard",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/lizard.yml",
    "sourceId": "I2x01hzOjVN4NUjf",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 10,
    "hitPointMaximum": 2,
    "abilityScores": {
      "str": 2,
      "dex": 11,
      "con": 10,
      "int": 1,
      "wis": 8,
      "cha": 3
    },
    "savingThrows": {
      "str": -4,
      "dex": 0,
      "con": 0,
      "int": -5,
      "wis": -1,
      "cha": -4
    },
    "speeds": {
      "walk": 20,
      "climb": 20
    },
    "skills": {},
    "initiative": 0,
    "senses": "Darkvision 30 ft. · Passive Perception 9",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "mastiff-2014": {
    "name": "Mastiff",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/mastiff.yml",
    "sourceId": "YTpL2c3NO4sOn2UA",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/8",
    "armorClass": 12,
    "hitPointMaximum": 5,
    "abilityScores": {
      "str": 13,
      "dex": 14,
      "con": 12,
      "int": 3,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 1,
      "dex": 2,
      "con": 1,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 40
    },
    "skills": {
      "Perception": 3
    },
    "initiative": 2,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "Mastiffs are impressive hounds prized by humanoids for their loyalty and keen senses. Mastiffs can be trained as guard dogs, hunting dogs, and war dogs. Halflings and other Small humanoids ride them as mounts.",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The mastiff has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "mule-2014": {
    "name": "Mule",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/mule.yml",
    "sourceId": "Vk7uHVkJ5b26gaTh",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/8",
    "armorClass": 10,
    "hitPointMaximum": 11,
    "abilityScores": {
      "str": 14,
      "dex": 10,
      "con": 13,
      "int": 2,
      "wis": 10,
      "cha": 5
    },
    "savingThrows": {
      "str": 2,
      "dex": 0,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 40
    },
    "skills": {},
    "initiative": 0,
    "senses": "Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Beast of Burden",
        "description": "The mule is considered to be a Large animal for the purpose of determining its carrying capacity."
      },
      {
        "name": "Sure-Footed",
        "description": "The mule has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "octopus-2014": {
    "name": "Octopus",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/octopus.yml",
    "sourceId": "3UUNbGiG2Yf1ZPxM",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Small",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 12,
    "hitPointMaximum": 3,
    "abilityScores": {
      "str": 4,
      "dex": 15,
      "con": 11,
      "int": 3,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": -3,
      "dex": 2,
      "con": 0,
      "int": -4,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 5,
      "swim": 30
    },
    "skills": {
      "Perception": 2,
      "Stealth": 4
    },
    "initiative": 2,
    "senses": "Darkvision 30 ft. · Passive Perception 12",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Tentacles",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage, and the target is grappled (escape DC 10). Until this grapple ends, the octopus can't use its tentacles on another target.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Ink Cloud (recharges after a Short or Long Rest)",
        "description": "A 5-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action."
      }
    ],
    "traits": [
      {
        "name": "Hold Breath",
        "description": "While out of water, the octopus can hold its breath for 30 minutes."
      },
      {
        "name": "Underwater Camouflage",
        "description": "The octopus has advantage on Dexterity (Stealth) checks made while underwater."
      },
      {
        "name": "Water Breathing",
        "description": "The octopus can breathe only underwater."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "panther-2014": {
    "name": "Panther",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/panther.yml",
    "sourceId": "AijNdqMurWxDxUSl",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 12,
    "hitPointMaximum": 13,
    "abilityScores": {
      "str": 14,
      "dex": 15,
      "con": 10,
      "int": 3,
      "wis": 14,
      "cha": 7
    },
    "savingThrows": {
      "str": 2,
      "dex": 2,
      "con": 0,
      "int": -4,
      "wis": 2,
      "cha": -2
    },
    "speeds": {
      "walk": 50,
      "climb": 40
    },
    "skills": {
      "Perception": 4,
      "Stealth": 6
    },
    "initiative": 2,
    "senses": "Passive Perception 14",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The panther has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the panther moves at least 20 ft. straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the panther can make one bite attack against it as a bonus action."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "plesiosaurus-2014": {
    "name": "Plesiosaurus",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/plesiosaurus.yml",
    "sourceId": "4OeZZguYgJcsZoM9",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "2",
    "armorClass": 13,
    "hitPointMaximum": 68,
    "abilityScores": {
      "str": 18,
      "dex": 15,
      "con": 16,
      "int": 2,
      "wis": 12,
      "cha": 5
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 3,
      "int": -4,
      "wis": 1,
      "cha": -3
    },
    "speeds": {
      "walk": 20,
      "swim": 40
    },
    "skills": {
      "Perception": 3,
      "Stealth": 4
    },
    "initiative": 2,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) piercing damage.",
        "opportunityAttack": {
          "note": "10 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Hold Breath",
        "description": "The plesiosaurus can hold its breath for 1 hour."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "venomous-snake-2014": {
    "name": "Poisonous Snake",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/poisonous-snake.yml",
    "sourceId": "D5rwVIxmfFrdyyxT",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "1/8",
    "armorClass": 13,
    "hitPointMaximum": 2,
    "abilityScores": {
      "str": 2,
      "dex": 16,
      "con": 11,
      "int": 1,
      "wis": 10,
      "cha": 3
    },
    "savingThrows": {
      "str": -4,
      "dex": 3,
      "con": 0,
      "int": -5,
      "wis": 0,
      "cha": -4
    },
    "speeds": {
      "walk": 30,
      "swim": 30
    },
    "skills": {},
    "initiative": 3,
    "senses": "Blindsight 10 ft. · Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage, and the target must make a DC 10 Constitution saving throw, taking 5 (2d4) poison damage on a failed save, or half as much damage on a successful one.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "polar-bear-2014": {
    "name": "Polar Bear",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/polar-bear.yml",
    "sourceId": "hb6pjvdCNYmLLp8V",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "2",
    "armorClass": 12,
    "hitPointMaximum": 42,
    "abilityScores": {
      "str": 20,
      "dex": 10,
      "con": 16,
      "int": 2,
      "wis": 13,
      "cha": 7
    },
    "savingThrows": {
      "str": 5,
      "dex": 0,
      "con": 3,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 40,
      "swim": 30
    },
    "skills": {
      "Perception": 3
    },
    "initiative": 0,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Multiattack",
        "description": "The bear makes two attacks: one with its bite and one with its claws."
      },
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (1d8 + 5) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Claws",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The bear has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "pony-2014": {
    "name": "Pony",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/pony.yml",
    "sourceId": "PHO4J98zK2p4KNyc",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/8",
    "armorClass": 10,
    "hitPointMaximum": 11,
    "abilityScores": {
      "str": 15,
      "dex": 10,
      "con": 13,
      "int": 2,
      "wis": 11,
      "cha": 7
    },
    "savingThrows": {
      "str": 2,
      "dex": 0,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -2
    },
    "speeds": {
      "walk": 40
    },
    "skills": {},
    "initiative": 0,
    "senses": "Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "piranha-2014": {
    "name": "Quipper",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/quipper.yml",
    "sourceId": "nkyCGJ9wXeAZkyyz",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 13,
    "hitPointMaximum": 1,
    "abilityScores": {
      "str": 2,
      "dex": 16,
      "con": 9,
      "int": 1,
      "wis": 7,
      "cha": 2
    },
    "savingThrows": {
      "str": -4,
      "dex": 3,
      "con": -1,
      "int": -5,
      "wis": -2,
      "cha": -4
    },
    "speeds": {
      "swim": 40
    },
    "skills": {},
    "initiative": 3,
    "senses": "Darkvision 60 ft. · Passive Perception 8",
    "languages": "",
    "description": "A quipper is a carnivorous fish with sharp teeth. Quippers can adapt to any aquatic environment, including cold subterranean lakes. They frequently gather in swarms; the statistics for a swarm of quippers appear later in this appendix.",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Blood Frenzy",
        "description": "The quipper has advantage on melee attack rolls against any creature that doesn't have all its hit points."
      },
      {
        "name": "Water Breathing",
        "description": "The quipper can breathe only underwater."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "rat-2014": {
    "name": "Rat",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/rat.yml",
    "sourceId": "pozQUPTnLZW8epox",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 10,
    "hitPointMaximum": 1,
    "abilityScores": {
      "str": 2,
      "dex": 11,
      "con": 9,
      "int": 2,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": -4,
      "dex": 0,
      "con": -1,
      "int": -4,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "walk": 20
    },
    "skills": {},
    "initiative": 0,
    "senses": "Darkvision 30 ft. · Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The rat has advantage on Wisdom (Perception) checks that rely on smell."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "reef-shark-2014": {
    "name": "Reef Shark",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/reef-shark.yml",
    "sourceId": "F0yILX4xKKt4dxKY",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/2",
    "armorClass": 12,
    "hitPointMaximum": 22,
    "abilityScores": {
      "str": 14,
      "dex": 13,
      "con": 13,
      "int": 1,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": 2,
      "dex": 1,
      "con": 1,
      "int": -5,
      "wis": 0,
      "cha": -3
    },
    "speeds": {
      "swim": 40
    },
    "skills": {
      "Perception": 2
    },
    "initiative": 1,
    "senses": "Blindsight 30 ft. · Passive Perception 12",
    "languages": "",
    "description": "Smaller than giant sharks and hunter sharks, reef sharks inhabit shallow waters and coral reefs, gathering in small packs to hunt. A full-grown specimen measures 6 to 10 feet long.",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Pack Tactics",
        "description": "The shark has advantage on an attack roll against a creature if at least one of the shark's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      },
      {
        "name": "Water Breathing",
        "description": "The shark can breathe only underwater."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "rhinoceros-2014": {
    "name": "Rhinoceros",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/rhinoceros.yml",
    "sourceId": "SBCe2BSa6opTS5M4",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "2",
    "armorClass": 11,
    "hitPointMaximum": 45,
    "abilityScores": {
      "str": 21,
      "dex": 8,
      "con": 15,
      "int": 2,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "str": 5,
      "dex": -1,
      "con": 2,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 40
    },
    "skills": {},
    "initiative": -1,
    "senses": "Passive Perception 11",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Gore",
        "description": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Charge",
        "description": "If the rhinoceros moves at least 20 ft. straight toward a target and then hits it with a gore attack on the same turn, the target takes an extra 9 (2d8) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be knocked prone."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "riding-horse-2014": {
    "name": "Riding Horse",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/riding-horse.yml",
    "sourceId": "rz8UTUnFT87BsAFR",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 10,
    "hitPointMaximum": 13,
    "abilityScores": {
      "str": 16,
      "dex": 10,
      "con": 12,
      "int": 2,
      "wis": 11,
      "cha": 7
    },
    "savingThrows": {
      "str": 3,
      "dex": 0,
      "con": 1,
      "int": -4,
      "wis": 0,
      "cha": -2
    },
    "speeds": {
      "walk": 60
    },
    "skills": {},
    "initiative": 0,
    "senses": "Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "saber-toothed-tiger-2014": {
    "name": "Saber-Toothed Tiger",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/saber-toothed-tiger.yml",
    "sourceId": "tYYoifu9teGLetVI",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "2",
    "armorClass": 12,
    "hitPointMaximum": 52,
    "abilityScores": {
      "str": 18,
      "dex": 14,
      "con": 15,
      "int": 3,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 4,
      "dex": 2,
      "con": 2,
      "int": -4,
      "wis": 1,
      "cha": -1
    },
    "speeds": {
      "walk": 40
    },
    "skills": {
      "Perception": 3,
      "Stealth": 6
    },
    "initiative": 2,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (1d10 + 5) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The tiger has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the tiger moves at least 20 ft. straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "scorpion-2014": {
    "name": "Scorpion",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/scorpion.yml",
    "sourceId": "Y0vxQVF7w2P38FK2",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 11,
    "hitPointMaximum": 1,
    "abilityScores": {
      "str": 2,
      "dex": 11,
      "con": 8,
      "int": 1,
      "wis": 8,
      "cha": 2
    },
    "savingThrows": {
      "str": -4,
      "dex": 0,
      "con": -1,
      "int": -5,
      "wis": -1,
      "cha": -4
    },
    "speeds": {
      "walk": 10
    },
    "skills": {},
    "initiative": 0,
    "senses": "Blindsight 10 ft. · Passive Perception 9",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Sting",
        "description": "Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must make a DC 9 Constitution saving throw, taking 4 (1d8) poison damage on a failed save, or half as much damage on a successful one.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [],
    "bonusActions": [],
    "reactions": []
  },
  "sea-horse-2014": {
    "name": "Sea Horse",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/sea-horse.yml",
    "sourceId": "FWSDiq9SZsdiBAa8",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 11,
    "hitPointMaximum": 1,
    "abilityScores": {
      "str": 1,
      "dex": 12,
      "con": 8,
      "int": 1,
      "wis": 10,
      "cha": 2
    },
    "savingThrows": {
      "str": -5,
      "dex": 1,
      "con": -1,
      "int": -5,
      "wis": 0,
      "cha": -4
    },
    "speeds": {
      "swim": 20
    },
    "skills": {},
    "initiative": 1,
    "senses": "Passive Perception 10",
    "languages": "",
    "description": "",
    "actions": [],
    "traits": [
      {
        "name": "Water Breathing",
        "description": "The sea horse can breathe only underwater."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "spider-2014": {
    "name": "Spider",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/spider.yml",
    "sourceId": "28gU50HtG8Kp7uIz",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 12,
    "hitPointMaximum": 1,
    "abilityScores": {
      "str": 2,
      "dex": 14,
      "con": 8,
      "int": 1,
      "wis": 10,
      "cha": 2
    },
    "savingThrows": {
      "str": -4,
      "dex": 2,
      "con": -1,
      "int": -5,
      "wis": 0,
      "cha": -4
    },
    "speeds": {
      "walk": 20,
      "climb": 20
    },
    "skills": {
      "Stealth": 4
    },
    "initiative": 2,
    "senses": "Darkvision 30 ft. · Passive Perception 12",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must succeed on a DC 9 Constitution saving throw or take 2 (1d4) poison damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Spider Climb",
        "description": "The spider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."
      },
      {
        "name": "Web Sense",
        "description": "While in contact with a web, the spider knows the exact location of any other creature in contact with the same web."
      },
      {
        "name": "Web Walker",
        "description": "The spider ignores movement restrictions caused by webbing."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "tiger-2014": {
    "name": "Tiger",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/tiger.yml",
    "sourceId": "FayqbnjBMszO6Pat",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1",
    "armorClass": 12,
    "hitPointMaximum": 37,
    "abilityScores": {
      "str": 17,
      "dex": 15,
      "con": 14,
      "int": 3,
      "wis": 12,
      "cha": 8
    },
    "savingThrows": {
      "str": 3,
      "dex": 2,
      "con": 2,
      "int": -4,
      "wis": 1,
      "cha": -1
    },
    "speeds": {
      "walk": 40
    },
    "skills": {
      "Perception": 3,
      "Stealth": 6
    },
    "initiative": 2,
    "senses": "Darkvision 60 ft. · Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      },
      {
        "name": "Claw",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Smell",
        "description": "The tiger has advantage on Wisdom (Perception) checks that rely on smell."
      },
      {
        "name": "Pounce",
        "description": "If the tiger moves at least 20 ft. straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a DC 13 Strength saving throw or be knocked prone. If the target is prone, the tiger can make one bite attack against it as a bonus action."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "warhorse-2014": {
    "name": "Warhorse",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/warhorse.yml",
    "sourceId": "T1xZTDCGuvMBSq8d",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Large",
    "alignment": "unaligned",
    "challengeRating": "1/2",
    "armorClass": 11,
    "hitPointMaximum": 19,
    "abilityScores": {
      "str": 18,
      "dex": 12,
      "con": 13,
      "int": 2,
      "wis": 12,
      "cha": 7
    },
    "savingThrows": {
      "str": 4,
      "dex": 1,
      "con": 1,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 60
    },
    "skills": {},
    "initiative": 1,
    "senses": "Passive Perception 11",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Hooves",
        "description": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Trampling Charge",
        "description": "If the horse moves at least 20 ft. straight toward a creature and then hits it with a hooves attack on the same turn, that target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the horse can make another attack with its hooves against it as a bonus action."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "weasel-2014": {
    "name": "Weasel",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/weasel.yml",
    "sourceId": "WOdeacKCYVhgLDuN",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Tiny",
    "alignment": "unaligned",
    "challengeRating": "0",
    "armorClass": 13,
    "hitPointMaximum": 1,
    "abilityScores": {
      "str": 3,
      "dex": 16,
      "con": 8,
      "int": 2,
      "wis": 12,
      "cha": 3
    },
    "savingThrows": {
      "str": -4,
      "dex": 3,
      "con": -1,
      "int": -4,
      "wis": 1,
      "cha": -4
    },
    "speeds": {
      "walk": 30
    },
    "skills": {
      "Perception": 3,
      "Stealth": 5
    },
    "initiative": 3,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 1 piercing damage.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The weasel has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      }
    ],
    "bonusActions": [],
    "reactions": []
  },
  "wolf-2014": {
    "name": "Wolf",
    "rulesEdition": "2014",
    "sourceFile": "monsters/beast/wolf.yml",
    "sourceId": "yawTeS8u2FCfzzZH",
    "license": "CC-BY-4.0",
    "creatureType": "Beast",
    "size": "Medium",
    "alignment": "unaligned",
    "challengeRating": "1/4",
    "armorClass": 13,
    "hitPointMaximum": 11,
    "abilityScores": {
      "str": 12,
      "dex": 15,
      "con": 12,
      "int": 3,
      "wis": 12,
      "cha": 6
    },
    "savingThrows": {
      "str": 1,
      "dex": 2,
      "con": 1,
      "int": -4,
      "wis": 1,
      "cha": -2
    },
    "speeds": {
      "walk": 40
    },
    "skills": {
      "Perception": 3,
      "Stealth": 4
    },
    "initiative": 2,
    "senses": "Passive Perception 13",
    "languages": "",
    "description": "",
    "actions": [
      {
        "name": "Bite",
        "description": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.",
        "opportunityAttack": {
          "note": "5 ft"
        }
      }
    ],
    "traits": [
      {
        "name": "Keen Hearing and Smell",
        "description": "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell."
      },
      {
        "name": "Pack Tactics",
        "description": "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 ft. of the creature and the ally isn't incapacitated."
      }
    ],
    "bonusActions": [],
    "reactions": []
  }
};
