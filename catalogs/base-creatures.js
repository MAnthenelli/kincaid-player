const OTHER_BASE_CREATURES = {
  "cat-2024": {
    "name": "Cat",
    "rulesEdition": "2024",
    "sourceFile": "2024 PHB, Appendix B",
    "sourcePage": 6,
    "armorClass": 12,
    "hitPointMaximum": 2,
    "abilityScores": {
      "str": 3,
      "int": 3,
      "dex": 15,
      "wis": 12,
      "con": 10,
      "cha": 7
    },
    "savingThrows": {
      "str": -4,
      "int": -4,
      "dex": 4,
      "wis": 1,
      "con": 0,
      "cha": -2
    },
    "initiative": "+2 (12)",
    "skills": "Perception +3, Stealth +4",
    "senses": "Darkvision 60 ft.; Passive Perception 13",
    "speeds": {
      "walk": 40,
      "climb": 40
    },
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
    "size": "Tiny",
    "challengeRating": "0",
    "creatureType": "Beast",
    "alignment": "Unaligned",
    "languages": [],
    "bonusActions": [],
    "reactions": []
  },
  "spider-2024": {
    "name": "Spider",
    "rulesEdition": "2024",
    "sourceFile": "2024 PHB, Appendix B",
    "sourcePage": 34,
    "armorClass": 12,
    "hitPointMaximum": 1,
    "abilityScores": {
      "str": 2,
      "int": 1,
      "dex": 14,
      "wis": 10,
      "con": 8,
      "cha": 2
    },
    "savingThrows": {
      "str": -4,
      "int": -5,
      "dex": 2,
      "wis": 0,
      "con": -1,
      "cha": -4
    },
    "initiative": "+2 (12)",
    "skills": "Stealth +4",
    "senses": "Darkvision 30 ft.; Passive Perception 10",
    "speeds": {
      "walk": 20,
      "climb": 20
    },
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
    "size": "Tiny",
    "challengeRating": "0",
    "creatureType": "Beast",
    "alignment": "Unaligned",
    "languages": [],
    "bonusActions": [],
    "reactions": []
  },
  "giant-spider-2024": {
    "name": "Giant Spider",
    "rulesEdition": "2024",
    "sourceFile": "2024 PHB, Appendix B",
    "sourcePage": 16,
    "armorClass": 14,
    "hitPointMaximum": 26,
    "abilityScores": {
      "str": 14,
      "int": 2,
      "dex": 16,
      "wis": 11,
      "con": 12,
      "cha": 4
    },
    "savingThrows": {
      "str": 2,
      "int": -4,
      "dex": 3,
      "wis": 0,
      "con": 1,
      "cha": -3
    },
    "initiative": "+3 (13)",
    "skills": "Perception +4, Stealth +7",
    "senses": "Darkvision 60 ft.; Passive Perception 14",
    "speeds": {
      "walk": 30,
      "climb": 30
    },
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
    "size": "Large",
    "challengeRating": "1",
    "creatureType": "Beast",
    "alignment": "Unaligned",
    "languages": [],
    "bonusActions": [],
    "reactions": []
  },
  "rat-2024": {
    "name": "Rat",
    "rulesEdition": "2024",
    "sourceFile": "2024 PHB, Appendix B",
    "sourcePage": 28,
    "armorClass": 10,
    "hitPointMaximum": 1,
    "abilityScores": {
      "str": 2,
      "int": 2,
      "dex": 11,
      "con": 9,
      "wis": 10,
      "cha": 4
    },
    "savingThrows": {
      "str": -4,
      "int": -4,
      "dex": 0,
      "con": -1,
      "wis": 0,
      "cha": -3
    },
    "initiative": "+0 (10)",
    "skills": "Perception +2",
    "senses": "Darkvision 30 ft.; Passive Perception 12",
    "speeds": {
      "walk": 20,
      "climb": 20
    },
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
    "abilitySource": "SRD 5.2.1, p. 359 (the PHB print is clipped)",
    "size": "Tiny",
    "challengeRating": "0",
    "creatureType": "Beast",
    "alignment": "Unaligned",
    "languages": [],
    "bonusActions": [],
    "reactions": []
  }
};
