// SRD 5.2 cantrips and level 1 spells absent from the character spell catalog.
const MAGIC_INITIATE_SRD = [
  {
    "name": "Acid Splash",
    "level": 0,
    "school": "evocation",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "You create an acidic bubble at a point within range, where it explodes in a 5-foot-radius Sphere. Each creature in that Sphere must succeed on a Dexterity saving throw or take 1d6 Acid damage.",
    "cantripUpgrade": "The damage increases by 1d6 when you reach levels 5 (2d6), 11 (3d6), and 17 (4d6)."
  },
  {
    "name": "Alarm",
    "level": 1,
    "school": "abjuration",
    "classes": [
      "ranger",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "castingTime": "1 minute",
    "range": "30 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a bell and silver wire",
    "duration": "8 hours",
    "description": "You set an alarm against intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot Cube. Until the spell ends, an alarm alerts you whenever a creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is audible or mental: \n\n Audible Alarm. The alarm produces the sound of a handbell for 10 seconds within 60 feet of the warded area. \n\n Mental Alarm. You are alerted by a mental ping if you are within 1 mile of the warded area. This ping awakens you if you're asleep."
  },
  {
    "name": "Bane",
    "level": 1,
    "school": "enchantment",
    "classes": [
      "bard",
      "cleric",
      "warlock"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "30 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a drop of blood",
    "duration": "up to 1 minute",
    "description": "Up to three creatures of your choice that you can see within range must each make a Charisma saving throw. Whenever a target that fails this save makes an attack roll or a saving throw before the spell ends, the target must subtract 1d4 from the attack roll or save.",
    "higherLevelSlot": "You can target one additional creature for each spell slot level above 1."
  },
  {
    "name": "Bless",
    "level": 1,
    "school": "enchantment",
    "classes": [
      "cleric",
      "paladin"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "30 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a Holy Symbol, worth 5+ GP",
    "duration": "up to 1 minute",
    "description": "You bless up to three creatures within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target adds 1d4 to the attack roll or save.",
    "higherLevelSlot": "You can target one additional creature for each spell slot level above 1."
  },
  {
    "name": "Burning Hands",
    "level": 1,
    "school": "evocation",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "A thin sheet of flames shoots forth from you. Each creature in a 15- foot Cone makes a Dexterity saving throw, taking 3d6 Fire damage on a failed save or half as much damage on a successful one. Flammable objects in the Cone that aren't being worn or carried start burning.",
    "higherLevelSlot": "The damage increases by 1d6 for each spell slot level above 1."
  },
  {
    "name": "Chill Touch",
    "level": 0,
    "school": "necromancy",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "Channeling the chill of the grave, make a melee spell attack against a target within reach. On a hit, the target takes 1d10 Necrotic damage, and it can't regain Hit Points until the end of your next turn.",
    "cantripUpgrade": "The damage increases by 1d10 when you reach levels 5 (2d10), 11 (3d10), and 17 (4d10)."
  },
  {
    "name": "Chromatic Orb",
    "level": 1,
    "school": "evocation",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "90 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a diamond worth 50+ GP",
    "duration": "Instantaneous",
    "description": "You hurl an orb of energy at a target within range. Choose Acid, Cold, Fire, Lightning, Poison, or Thunder for the type of orb you create, and then make a ranged spell attack against the target. On a hit, the target takes 3d8 damage of the chosen type. If you roll the same number on two or more of the d8s, the orb leaps to a different target of your choice within 30 feet of the target. Make an attack roll against the new target, and make a new damage roll. The orb can't leap again unless you cast the spell with a level 2+ spell slot.",
    "higherLevelSlot": "The damage increases by 1d8 for each spell slot level above 1. The orb can leap a maximum number of times equal to the level of the slot expended, and a creature can be targeted only once by each casting of this spell."
  },
  {
    "name": "Color Spray",
    "level": 1,
    "school": "illusion",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a pinch of colorful sand",
    "duration": "Instantaneous",
    "description": "You launch a dazzling array of flashing, colorful light. Each creature in a 15-foot Cone originating from you must succeed on a Constitution saving throw or have the Blinded condition until the end of your next turn."
  },
  {
    "name": "Command",
    "level": 1,
    "school": "enchantment",
    "classes": [
      "bard",
      "cleric",
      "paladin"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v"
    ],
    "duration": "Instantaneous",
    "description": "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. Choose the command from these options: \n\n**Approach.** The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you. \n\n**Drop.** The target drops whatever it is holding and then ends its turn. \n\n**Flee.** The target spends its turn moving away from you by the fastest available means. \n\nGrovel. The target has the Prone condition and then ends its turn. \n\n**Halt.** On its turn, the target doesn't move and takes no action or Bonus Action.",
    "higherLevelSlot": "You can affect one additional creature for each spell slot level above 1."
  },
  {
    "name": "Comprehend Languages",
    "level": 1,
    "school": "divination",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "range": "Self",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a pinch of soot and salt",
    "duration": "1 hour",
    "description": "For the duration, you understand the literal meaning of any language that you hear or see signed. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text. This spell doesn't decode symbols or secret messages."
  },
  {
    "name": "Dancing Lights",
    "level": 0,
    "school": "illusion",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "120 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a bit of phosphorus",
    "duration": "up to 1 minute",
    "description": "You create up to four torch-size lights within range, making them appear as torches, lanterns, or glowing orbs that hover for the duration. Alternatively, you combine the four lights into one glowing Medium form that is vaguely humanlike. Whichever form you choose, each light sheds Dim Light in a 10-foot radius. \n\nAs a Bonus Action, you can move the lights up to 60 feet to a space within range. A light must be within 20 feet of another light created by this spell, and a light vanishes if it exceeds the spell's range."
  },
  {
    "name": "Detect Evil and Good",
    "level": 1,
    "school": "divination",
    "classes": [
      "cleric",
      "paladin"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s"
    ],
    "duration": "up to 10 minutes",
    "description": "For the duration, you sense the location of any Aberration, Celestial, Elemental, Fey, Fiend, or Undead within 30 feet of yourself. You also sense whether the Hallow spell is active there and, if so, where. \n\nThe spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead."
  },
  {
    "name": "Disguise Self",
    "level": 1,
    "school": "illusion",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s"
    ],
    "duration": "1 hour",
    "description": "You make yourself—including your clothing, armor, weapons, and other belongings on your person—look different until the spell ends. You can seem 1 foot shorter or taller and can appear heavier or lighter. You must adopt a form that has the same basic arrangement of limbs as you have. Otherwise, the extent of the illusion is up to you. \n\nThe changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing. \n\nTo discern that you are disguised, a creature must take the Study action to inspect your appearance and succeed on an Intelligence (Investigation) check against your spell save DC."
  },
  {
    "name": "Expeditious Retreat",
    "level": 1,
    "school": "transmutation",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "actionType": "bonusAction",
    "concentration": true,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s"
    ],
    "duration": "up to 10 minutes",
    "description": "You take the Dash action, and until the spell ends, you can take that action again as a Bonus Action."
  },
  {
    "name": "False Life",
    "level": 1,
    "school": "necromancy",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a drop of alcohol",
    "duration": "Instantaneous",
    "description": "You gain 2d4 + 4 Temporary Hit Points.",
    "higherLevelSlot": "You gain 5 additional Temporary Hit Points for each spell slot level above 1."
  },
  {
    "name": "Feather Fall",
    "level": 1,
    "school": "transmutation",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "actionType": "reaction",
    "concentration": false,
    "ritual": false,
    "castingTrigger": "which you take when you or a creature you can see within 60 feet of you falls",
    "range": "60 feet",
    "components": [
      "v",
      "m"
    ],
    "material": "a small feather or piece of down",
    "duration": "1 minute",
    "description": "Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If a creature lands before the spell ends, the creature takes no damage from the fall, and the spell ends for that creature."
  },
  {
    "name": "Fire Bolt",
    "level": 0,
    "school": "evocation",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "120 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "You hurl a mote of fire at a creature or an object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 Fire damage. A flammable object hit by this spell starts burning if it isn't being worn or carried.",
    "cantripUpgrade": "The damage increases by 1d10 when you reach levels 5 (2d10), 11 (3d10), and 17 (4d10)."
  },
  {
    "name": "Floating Disk",
    "level": 1,
    "school": "conjuration",
    "classes": [
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "range": "30 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a drop of mercury",
    "duration": "1 hour",
    "description": "This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground. \n\nThe disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. It can move across uneven terrain, up or down stairs, slopes and the like, but it can't cross an elevation change of 10 feet or more. For example, the disk can't move across a 1O-foot-deep pit, nor could it leave such a pit if it was created at the bottom. \n\nIf you move more than 100 feet from the disk (typically because it can't move around an obstacle to follow you), the spell ends."
  },
  {
    "name": "Grease",
    "level": 1,
    "school": "conjuration",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a bit of pork rind or butter",
    "duration": "1 minute",
    "description": "Nonflammable grease covers the ground in a 10-foot square centered on a point within range and turns it into Difficult Terrain for the duration. \n\nWhen the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or have the Prone condition. A creature that enters the area or ends its turn there must also succeed on that save or fall Prone."
  },
  {
    "name": "Guiding Bolt",
    "level": 1,
    "school": "evocation",
    "classes": [
      "cleric"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "120 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "1 round",
    "description": "You hurl a bolt of light toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 4d6 Radiant damage, and the next attack roll made against it before the end of your next turn has Advantage.",
    "higherLevelSlot": "The damage increases by 1d6 for each spell slot level above 1."
  },
  {
    "name": "Hideous Laughter",
    "level": 1,
    "school": "enchantment",
    "classes": [
      "bard",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "30 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a tart and a feather",
    "duration": "up to 1 minute",
    "description": "One creature of your choice that you can see within range makes a Wisdom saving throw. On a failed save, it has the Prone and Incapacitated conditions for the duration. During that time, it laughs uncontrollably if it's capable of laughter, and it can't end the Prone condition on it self. \n\nAt the end of each of its turns and each time it takes damage, it makes another Wisdom saving throw. The target has Advantage on the save if the save is triggered by damage. On a successful save, the spell ends.",
    "higherLevelSlot": "You can target one additional creature for each spell slot level about 1."
  },
  {
    "name": "Identify",
    "level": 1,
    "school": "divination",
    "classes": [
      "bard",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "castingTime": "1 minute",
    "range": "Touch",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a pearl worth 100+ GP",
    "duration": "Instantaneous",
    "description": "You touch an object throughout the spell's casting. If the object is a magic item or some other magical object, you learn its properties and how to use them, whether it requires Attunement, and how many charges it has, if any. You learn whether any ongoing spells are affecting the item and what they are. If the item was created by a spell, you learn that spell's name. \n\nIf you instead touch a creature throughout the casting, you learn which ongoing spells, if any, are currently affecting it."
  },
  {
    "name": "Illusory Script",
    "level": 1,
    "school": "illusion",
    "classes": [
      "bard",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "castingTime": "1 minute",
    "range": "Touch",
    "components": [
      "s",
      "m"
    ],
    "material": "ink worth 10+ GP, which the spell consumes",
    "duration": "10 days",
    "description": "You write on parchment, paper, or another suitable material and imbue it with an illusion that lasts for the duration. To you and any creatures you designate when you cast the spell, the writing appears normal, seems to be written in your hand, and conveys whatever meaning you intended when you wrote the text. To all others, the writing appears as if it were written in an unknown or magical script that is unintelligible. Alternatively, the illusion can alter the meaning, handwriting, and language of the text, though the language must be one you know. If the spell is dispelled, the original script and the illusion both disappear. \n\nA creature that has Truesight can read the hidden message."
  },
  {
    "name": "Inflict Wounds",
    "level": 1,
    "school": "necromancy",
    "classes": [
      "cleric"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "A creature you touch makes a Constitution saving throw, taking 2d10 Necrotic damage on a failed save or half as much damage on a successful one.",
    "higherLevelSlot": "The damage increases by 1d10 for each spell slot level above 1."
  },
  {
    "name": "Light",
    "level": 0,
    "school": "evocation",
    "classes": [
      "bard",
      "cleric",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "m"
    ],
    "material": "a firefly or phosphorescent moss",
    "duration": "1 hour",
    "description": "You touch one Large or smaller object that isn't being worn or carried by someone else. Until the spell ends, the object sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. The light can be colored as you like. \n\nCovering the object with something opaque blocks the light. The spell ends if you cast it again."
  },
  {
    "name": "Mage Armor",
    "level": 1,
    "school": "abjuration",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a piece of cured leather",
    "duration": "8 hours",
    "description": "You touch a willing creature who isn't wearing armor. Until the spell ends, the target's base AC becomes 13 plus its Dexterity modifier. The spell ends early if the target dons armor."
  },
  {
    "name": "Mage Hand",
    "level": 0,
    "school": "conjuration",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "30 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "1 minute",
    "description": "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again. When you cast the spell, you can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. \n\nAs a Magic action on your later turns, you can control the hand thus again. As part of that action, you can move the hand up to 30 feet.\n\nThe hand can't attack, activate magic items, or carry more than 10 pounds."
  },
  {
    "name": "Magic Missile",
    "level": 1,
    "school": "evocation",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "120 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "You create three glowing darts of magical force. Each dart strikes a creature of your choice that you can see within range. A dart deals 1d4 + 1 Force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.",
    "higherLevelSlot": "The spell creates one more dart for each spell slot level above 1."
  },
  {
    "name": "Minor Illusion",
    "level": 0,
    "school": "illusion",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "30 feet",
    "components": [
      "s",
      "m"
    ],
    "material": "a bit of fleece",
    "duration": "1 minute",
    "description": "You create a sound or an image of an object within range that lasts for the duration. See the descriptions below for the effects of each. The illusion ends if you cast this spell again. If a creature takes a Study action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature. \n\n**Sound.** If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends. \n\n**Image.** If you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than a 5- foot Cube. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, since things can pass through it."
  },
  {
    "name": "Prestidigitation",
    "level": 0,
    "school": "transmutation",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "10 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "Up to 1 hour",
    "description": "You create a magical effect within range. Choose the effect from the options below. If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time. \n\n**Sensory Effect**. You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor. \n\n**Fire Play**. You instantaneously light or snuff out a candle, a torch, or a small campfire. \n\n**Clean or Soil**. You instantaneously clean or soil an object no larger than 1 cubic foot. \n\n**Minor Sensation**. You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour. \n\n**Magic Mark**. You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour. \n\n**Minor Creation**. You create a nonmagical trinket or an illusory image that can fit in your hand. It lasts until the end of your next turn. A trinket can deal no damage and has no monetary worth."
  },
  {
    "name": "Ray of Frost",
    "level": 0,
    "school": "evocation",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 Cold damage, and its Speed is reduced by 10 feet until the start of your next turn.",
    "cantripUpgrade": "The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8)."
  },
  {
    "name": "Ray of Sickness",
    "level": 1,
    "school": "necromancy",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "You shoot a greenish ray at a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 Poison damage and has the Poisoned condition until the end of your next turn.",
    "higherLevelSlot": "The damage increases by 1d8 for each spell slot level above 1."
  },
  {
    "name": "Sacred Flame",
    "level": 0,
    "school": "evocation",
    "classes": [
      "cleric"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 Radiant damage. The target gains no benefit from Half Cover or Three-Quarters Cover for this save.",
    "cantripUpgrade": "The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8)."
  },
  {
    "name": "Sanctuary",
    "level": 1,
    "school": "abjuration",
    "classes": [
      "cleric"
    ],
    "actionType": "bonusAction",
    "concentration": false,
    "ritual": false,
    "range": "30 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a shard of glass from a mirror",
    "duration": "1 minute",
    "description": "You ward a creature within range. Until the spell ends, any creature who targets the warded creature with an attack roll or a damaging spell must succeed on a Wisdom saving throw or either choose a new target or lose the attack or spell. This spell doesn't protect the warded creature from areas of effect. \n\nThe spell ends if the warded creature makes an attack roll, casts a spell, or deals damage."
  },
  {
    "name": "Shield",
    "level": 1,
    "school": "abjuration",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "reaction",
    "concentration": false,
    "ritual": false,
    "castingTrigger": "which you take when you are hit by an attack roll or targeted by the Magic Missile spell",
    "range": "Self",
    "components": [
      "v",
      "s"
    ],
    "duration": "1 round",
    "description": "An imperceptible barrier of magical force protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from Magic Missile."
  },
  {
    "name": "Shield of Faith",
    "level": 1,
    "school": "abjuration",
    "classes": [
      "cleric",
      "paladin"
    ],
    "actionType": "bonusAction",
    "concentration": true,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a prayer scroll",
    "duration": "up to 10 minutes",
    "description": "A shimmering field surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration."
  },
  {
    "name": "Shocking Grasp",
    "level": 0,
    "school": "evocation",
    "classes": [
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "Lightning springs from you to a creature that you try to touch. Make a melee spell attack against the target. On a hit, the target takes 1d8 Lightning damage, and it can't make Opportunity Attacks until the start of its next turn.",
    "cantripUpgrade": "The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8)."
  },
  {
    "name": "Silent Image",
    "level": 1,
    "school": "illusion",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a bit of fleece",
    "duration": "up to 10 minutes",
    "description": "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot Cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, smell, or other sensory effects. \n\nAs a Magic action, you can cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking. \n\nPhysical interaction with the image reveals it to be an illusion, since things can pass through it. A creature that takes a Study action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image."
  },
  {
    "name": "Sleep",
    "level": 1,
    "school": "enchantment",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a pinch of sand or rose petals",
    "duration": "up to 1 minute",
    "description": "Each creature of your choice in a 5-foot-radius Sphere centered on a point within range must succeed on a Wisdom saving throw or have the Incapacitated condition until the end of its next turn, at which point it must repeat the save. If the target fails the second save, the target has the Unconscious condition for the duration. The spell ends on a target if it takes damage or someone within 5 feet of it takes an action to shake it out of the spell's effect.\n\nCreatures that don't sleep, such as elves, or that have Immunity to the Exhaustion condition automatically succeed on saves against this spell."
  },
  {
    "name": "Thaumaturgy",
    "level": 0,
    "school": "transmutation",
    "classes": [
      "cleric"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "30 feet",
    "components": [
      "v"
    ],
    "duration": "Up to 1 minute",
    "description": "You manifest a minor wonder within range. You create one of the effects below within range. If you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time. \n\n**Altered Eyes**. You alter the appearance of your eyes for 1 minute. \n\n**Booming Voice**. Your voice booms up to three times as loud as normal for 1 minute. For the duration, you have Advantage on Charisma (Intimidation) checks. \n\n**Fire Play**. You cause flames to flicker, brighten, dim, or change color for 1 minute. \n\n**Invisible Hand**. You instantaneously cause an unlocked door or window to fly open or slam shut. \n\n**Phantom Sound**. You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers. \n\n**Tremors**. You cause harmless tremors in the ground for 1 minute."
  },
  {
    "name": "True Strike",
    "level": 0,
    "school": "divination",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Self",
    "components": [
      "s",
      "m"
    ],
    "material": "a weapon with which you have proficiency and that is worth 1+ CP",
    "duration": "Instantaneous",
    "description": "Guided by a flash of magical insight, you make one attack with the weapon used in the spell's casting. The attack uses your spellcasting ability for the attack and damage rolls instead of using Strength or Dexterity. If the attack deals damage, it can be Radiant damage or the weapon's normal damage type (your choice).",
    "cantripUpgrade": "Whether you deal Radiant damage or the weapon's normal damage type, the attack deals extra Radiant damage when you reach levels 5 (1d6), 11 (2d6), and 17 (3d6)."
  },
  {
    "name": "Unseen Servant",
    "level": 1,
    "school": "conjuration",
    "classes": [
      "bard",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "range": "60 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a bit of string and of wood",
    "duration": "1 hour",
    "description": "This spell creates an Invisible, mindless, shapeless, Medium force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 1 Hit Point, and a Strength of 2, and it can't attack. If it drops to 0 Hit Points, the spell ends. \n\nOnce on each of your turns as a Bonus Action, you can mentally command the servant to move up to 15 feet and interact with an object. The servant can perform simple tasks that a human could do, such as fetching things, cleaning, mending, folding clothes, lighting fires, serving food, and pouring drinks. Once you give the command, the servant performs the task to the best of its ability until it completes the task, then waits for your next command. \n\nIf you command the servant to perform a task that would move it more than 60 feet away from you, the spell ends."
  }
];
