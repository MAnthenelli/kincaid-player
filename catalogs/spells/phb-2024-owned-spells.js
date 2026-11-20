const PHB_SPELL_RECORDS = [
  {
    "name": "Aura of Vitality",
    "level": 3,
    "school": "abjuration",
    "classes": [
      "cleric",
      "druid",
      "paladin"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "Self",
    "components": [
      "v"
    ],
    "duration": "up to 1 minute",
    "description": "An aura radiates from you in a 30-foot Emanation for the duration. When you create the aura and at the start of each of your turns while it persists, you can restore 2d6 Hit Points to one creature in it."
  },
  {
    "name": "Beast Sense",
    "level": 2,
    "school": "divination",
    "classes": [
      "druid",
      "ranger"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": true,
    "range": "Touch",
    "components": [
      "s"
    ],
    "duration": "up to 1 hour",
    "description": "You touch a willing Beast. For the duration, you can perceive through the Beast’s senses as well as your own. When perceiving through the Beast’s senses, you benefit from any special senses it has."
  },
  {
    "name": "Elemental Weapon",
    "level": 3,
    "school": "transmutation",
    "classes": [
      "druid",
      "paladin",
      "ranger"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s"
    ],
    "duration": "up to 1 hour",
    "higherLevelSlot": "If you use a level 5–6 spell slot, the bonus to attack rolls increases to +2, and the extra damage increases to 2d4. If you use a level 7+ spell slot, the bonus increases to +3, and the extra damage increases to 3d4.",
    "description": "A nonmagical weapon you touch becomes a magic weapon. Choose one of the following damage types: Acid, Cold, Fire, Lightning, or Thunder. For the duration, the weapon has a +1 bonus to attack rolls and deals an extra 1d4 damage of the chosen type when it hits."
  },
  {
    "name": "Feign Death",
    "level": 3,
    "school": "necromancy",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "range": "Touch",
    "components": [
      "v",
      "s",
      "m"
    ],
    "duration": "1 hour",
    "material": "a pinch of graveyard dirt",
    "description": "You touch a willing creature and put it into a cataleptic state that is indistinguishable from death.\n\nFor the duration, the target appears dead to outward inspection and to spells used to determine the target’s status. The target has the Blinded and Incapacitated conditions, and its Speed is 0.\n\nThe target also has Resistance to all damage except Psychic damage, and it has Immunity to the Poisoned condition."
  },
  {
    "name": "Summon Beast",
    "level": 2,
    "school": "conjuration",
    "classes": [
      "druid",
      "ranger"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "90 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "duration": "up to 1 hour",
    "material": "a feather, tuft of fur, and fish tail inside a gilded acorn worth 200+ GP",
    "summonedCreature": {
      "name": "Bestial Spirit",
      "text": "Small Beast, Neutral\n\nAC 11 + the spell’s level\n\nHP 20 (Air only) or 30 (Land and Water only) + 5 for each spell level above 2\n\nSpeed 30 ft.; Climb 30 ft. (Land only); Fly 60 ft. (Air only); Swim 30 ft. (Water only)\n\nSTR 18 (modifier +4, save +4) INT 4 (modifier –3, save –3)\n\nDEX 11 (modifier +0, save +0) WIS 14 (modifier +2, save +2)\n\nCON 16 (modifier +3, save +3) CHA 5 (modifier −3, save −3)\n\nSenses Darkvision 60 ft.; Passive Perception 12\n\nLanguages Understands the languages you know\n\nCR None (XP 0; PB equals your Proficiency Bonus)\n\nTraits\nFlyby (Air Only). The spirit doesn’t provoke Opportunity Attacks when it flies out of an enemy’s reach.\n\nPack Tactics (Land and Water Only). The spirit has Advantage on an attack roll against a creature if at least one of the spirit’s allies is within 5 feet of the creature and the ally doesn’t have the Incapacitated condition.\n\nWater Breathing (Water Only). The spirit can breathe only underwater.\n\nActions\nMultiattack. The spirit makes a number of Rend attacks equal to half this spell’s level (round down).\n\nRend. Melee Attack Roll: Bonus equals your spell attack modifier, reach 5 ft. Hit: 1d8 + 4 + the spell’s level Piercing damage."
    },
    "higherLevelSlot": "Use the spell slot’s level for the spell’s level in the stat block.",
    "description": "You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range and uses the Bestial Spirit stat block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen environment, which determines certain details in its stat block. The creature disappears when it drops to 0 Hit Points or when the spell ends.\n\nThe creature is an ally to you and your allies. In combat, the creature shares your Initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its movement to avoid danger."
  },
  {
    "name": "Summon Fey",
    "level": 3,
    "school": "conjuration",
    "classes": [
      "druid",
      "ranger",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "90 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "duration": "up to 1 hour",
    "material": "a gilded flower worth 300+ GP",
    "summonedCreature": {
      "name": "Fey Spirit",
      "text": "Small Fey, Neutral\n\nAC 12 + the spell’s level\n\nHP 30 + 10 for each spell level above 3\n\nSpeed 30 ft., Fly 30 ft.\n\nImmunities Charmed\n\nSenses Darkvision 60 ft.; Passive Perception 10\n\nLanguages Sylvan, understands the languages you know\n\nCR None (XP 0; PB equals your Proficiency Bonus)\n\nActions\nMultiattack. The spirit makes a number of Fey Blade attacks equal to half this spell’s level (round down).\n\nFey Blade. Melee Attack Roll: Bonus equals your spell attack modifier, reach 5 ft. Hit: 2d6 + 3 + the spell’s level Force damage.\n\nBonus Actions\nFey Step. The spirit magically teleports up to 30 feet to an unoccupied space it can see. Then one of the following effects occurs, based on the spirit’s chosen mood:\n\nFuming. The spirit has Advantage on the next attack roll it makes before the end of this turn.\n\nMirthful. Wisdom Saving Throw: DC equals your spell save DC, one creature the spirit can see within 10 feet of itself. Failure: The target is Charmed by you and the spirit for 1 minute or until the target takes any damage.\n\nTricksy. The spirit fills a 10-foot Cube within 5 feet of it with magical Darkness, which lasts until the end of its next turn.",
      "abilities": {
        "STR": {
          "score": 13,
          "modifier": 1,
          "save": 1
        },
        "DEX": {
          "score": 16,
          "modifier": 3,
          "save": 3
        },
        "CON": {
          "score": 14,
          "modifier": 2,
          "save": 2
        },
        "INT": {
          "score": 14,
          "modifier": 2,
          "save": 2
        },
        "WIS": {
          "score": 11,
          "modifier": 0,
          "save": 0
        },
        "CHA": {
          "score": 16,
          "modifier": 3,
          "save": 3
        }
      }
    },
    "higherLevelSlot": "Use the spell slot’s level for the spell’s level in the stat block.",
    "description": "You call forth a Fey spirit. It manifests in an unoccupied space that you can see within range and uses the Fey Spirit stat block. When you cast the spell, choose a mood: Fuming, Mirthful, or Tricksy. The creature resembles a Fey creature of your choice marked by the chosen mood, which determines certain details in its stat block. The creature disappears when it drops to 0 Hit Points or when the spell ends.\n\nThe creature is an ally to you and your allies. In combat, the creature shares your Initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its movement to avoid danger."
  },
  {
    "name": "Thorn Whip",
    "level": 0,
    "school": "transmutation",
    "classes": [
      "druid"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "30 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "duration": "Instantaneous",
    "material": "the stem of a thorny plant",
    "cantripUpgrade": "The damage increases by 1d6 when you reach levels 5 (2d6), 11 (3d6), and 17 (4d6).",
    "description": "You create a vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack against the target. On a hit, the target takes 1d6 Piercing damage, and if it is Large or smaller, you can pull it up to 10 feet closer to you."
  },
  {
    "name": "Thunderclap",
    "level": 0,
    "school": "evocation",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Self",
    "components": [
      "s"
    ],
    "duration": "Instantaneous",
    "cantripUpgrade": "The damage increases by 1d6 when you reach levels 5 (2d6), 11 (3d6), and 17 (4d6).",
    "description": "Each creature in a 5-foot Emanation originating from you must succeed on a Constitution saving throw or take 1d6 Thunder damage. The spell’s thunderous sound can be heard up to 100 feet away."
  }
];
