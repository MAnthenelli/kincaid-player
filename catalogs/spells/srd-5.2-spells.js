const SRD_SPELL_RECORDS = [
  {
    "name": "Aid",
    "level": 2,
    "school": "abjuration",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger"
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
    "material": "a strip of white cloth",
    "duration": "8 hours",
    "description": "Choose up to three creatures within range. Each target's Hit Point maximum and current Hit Points increase by 5 for the duration.",
    "higherLevelSlot": "Each target's Hit Points increase by 5 for each spell slot level above 2."
  },
  {
    "name": "Animal Friendship",
    "level": 1,
    "school": "enchantment",
    "classes": [
      "bard",
      "druid",
      "ranger"
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
    "material": "a morsel of food",
    "duration": "24 hours",
    "description": "Target a Beast that you can see within range. The target must succeed on a Wisdom saving throw or have the Charmed condition for the duration. If you or one of your allies deals damage to the target, the spells ends.",
    "higherLevelSlot": "You can target one additional Beast for each spell slot level above 1."
  },
  {
    "name": "Animal Messenger",
    "level": 2,
    "school": "enchantment",
    "classes": [
      "bard",
      "druid",
      "ranger"
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
    "material": "a morsel of food",
    "duration": "24 hours",
    "description": "A Tiny Beast of your choice that you can see within range must succeed on a Charisma saving throw, or it attempts to deliver a message for you (if the target's Challenge Rating isn't 0, it automatically succeeds). You specify a location you have visited and a recipient who matches a general description, such as \"a person dressed in the uniform of the town guard\" or \"a red-haired dwarf wearing a pointed hat.\" You also communicate a message of up to twenty-five words. The Beast travels for the duration toward the specified location, covering about 25 miles per 24 hours or 50 miles if the Beast can fly. When the Beast arrives, it delivers your message to the creature that you described, mimicking your communication. If the Beast doesn't reach its destination before the spell ends, the message is lost, and the Beast returns to where you cast the spell.",
    "higherLevelSlot": "The spell's duration increases by 48 hours for each spell slot level above 2."
  },
  {
    "name": "Augury",
    "level": 2,
    "school": "divination",
    "classes": [
      "cleric",
      "druid",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "castingTime": "1 minute",
    "range": "Self",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "special marked sticks, bones, cards, or other divinatory tokens worth 25+ GP",
    "duration": "Instantaneous",
    "description": "You receive an omen from an otherworldly entity about the results of a course of action that you plan to take within the next 30 minutes. The DM chooses the omen from the Omens table. \n\n| **Omen**     | **For Results That Will Be...** |\n| ------------ | ------------------------------- |\n|              |                                 |\n| Weal         | Good                            |\n| Woe          | Bad                             |\n| Weal and woe | Good and bad                    |\n| Indifference | Neither good nor bad            |\n\nThe spell doesn't account for circumstances, such as other spells, that might change the results. If you cast the spell more than once before finishing a Long Rest, there is a cumulative 25 percent chance for each casting after the first that you get no answer."
  },
  {
    "name": "Barkskin",
    "level": 2,
    "school": "transmutation",
    "classes": [
      "druid",
      "ranger"
    ],
    "actionType": "bonusAction",
    "concentration": false,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a handful of bark",
    "duration": "1 hour",
    "description": "You touch a willing creature. Until the spell ends, the target's skin assumes a bark-like appearance, and the target has an Armor Class of 17 if its AC is lower than that."
  },
  {
    "name": "Call Lightning",
    "level": 3,
    "school": "conjuration",
    "classes": [
      "druid"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "120 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "up to 10 minutes",
    "description": "A storm cloud appears at a point within range that you can see above yourself. It takes the shape of a Cylinder that is 10 feet tall with a 60-foot radius. \n\nWhen you cast the spell, choose a point you can see under the cloud. A lightning bolt shoots from the cloud to that point. Each creature within 5 feet of that point makes a Dexterity saving throw, taking 3d10 Lightning damage on a failed save or half as much damage on a successful one. \n\nUntil the spell ends, you can take a Magic action to call down lightning in that way again, targeting the same point or a different one. If you're outdoors in a storm when you cast this spell, the spell gives you control over that storm instead of creating a new one. Under such conditions, the spell's damage increases by 1d10.",
    "higherLevelSlot": "The damage increases by 1d10 for each spell slot level above 3."
  },
  {
    "name": "Charm Person",
    "level": 1,
    "school": "enchantment",
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
    "range": "30 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "1 hour",
    "description": "One Humanoid you can see within range makes a Wisdom saving throw. It does so with Advantage if you or your allies are fighting it. On a failed save, the target has the Charmed condition until the spell ends or until you or your allies damage it. The Charmed creature is Friendly to you. When the spell ends, the target knows it was Charmed by you.",
    "higherLevelSlot": "You can target one additional creature for each spell slot level above 1."
  },
  {
    "name": "Conjure Animals",
    "level": 3,
    "school": "conjuration",
    "classes": [
      "druid",
      "ranger"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "up to 10 minutes",
    "description": "You conjure nature spirits that appear as a Large pack of spectral, intangible animals in an unoccupied space you can see within range. The pack lasts for the duration, and you choose the spirits' animal form, such as wolves, serpents, or birds. \n\nYou have Advantage on Strength saving throws while you're within 5 feet of the pack, and when you move on your turn, you can also move the pack up to 30 feet to an unoccupied space you can see. Whenever the pack moves within 10 feet of a creature you can see and whenever a creature you can see enters a space within 10 feet of the pack or ends its turn there, you can force that creature to make a Dexterity saving throw. On a failed save, the creature takes 3d10 Slashing damage. A creature makes this save only once per turn.",
    "higherLevelSlot": "The damage increases by 1d10 for each spell slot level above 3."
  },
  {
    "name": "Continual Flame",
    "level": 2,
    "school": "evocation",
    "classes": [
      "cleric",
      "druid",
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
    "material": "ruby dust worth 50+ GP, which the spell consumes",
    "duration": "Until dispelled",
    "description": "A flame springs from an object that you touch. The effect casts Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. It looks like a regular flame, but it creates no heat and consumes no fuel. The flame can be covered or hidden but not smothered or quenched."
  },
  {
    "name": "Create or Destroy Water",
    "level": 1,
    "school": "transmutation",
    "classes": [
      "cleric",
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
    "material": "a mix of water and sand",
    "duration": "Instantaneous",
    "description": "You do one of the following: Create Water. You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot Cube within range, extinguishing exposed flames there. Destroy Water. You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot Cube within range.",
    "higherLevelSlot": "You create or destroy 10 additional gallons of water, or the size of the Cube increases by 5 feet, for each spell slot level above 1."
  },
  {
    "name": "Cure Wounds",
    "level": 1,
    "school": "abjuration",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger"
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
    "description": "A creature you touch regains a number of Hit Points equal to 2d8 plus your spellcasting ability modifier.",
    "higherLevelSlot": "The healing increases by 2d8 for each spell slot level above 1."
  },
  {
    "name": "Darkvision",
    "level": 2,
    "school": "transmutation",
    "classes": [
      "druid",
      "ranger",
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
    "material": "a dried carrot",
    "duration": "8 hours",
    "description": "For the duration, a willing creature you touch has Darkvision with a range of 150 feet."
  },
  {
    "name": "Daylight",
    "level": 3,
    "school": "evocation",
    "classes": [
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "sorcerer"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "1 hour",
    "description": "For the duration, sunlight spreads from a point within range and fills a 60-foot-radius Sphere. The sunlight's area is Bright Light and sheds Dim Light for an additional 60 feet. \n\nAlternatively, you cast the spell on an object that isn't being worn or carried, causing the sunlight to fill a 60-foot Emanation originating from that object. Covering that object with something opaque, such as a bowl or helm, blocks the sunlight. \n\nIf any of this spell's area overlaps with an area of Darkness created by a spell of level 3 or lower, that other spell is dispelled."
  },
  {
    "name": "Detect Magic",
    "level": 1,
    "school": "divination",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "sorcerer",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": true,
    "range": "Self",
    "components": [
      "v",
      "s"
    ],
    "duration": "up to 10 minutes",
    "description": "For the duration, you sense the presence of magical effects within 30 feet of yourself. If you sense such effects, you can take the Magic action to see a faint aura around any visible creature or object in the area that bears the magic, and if an effect was created by a spell, you learn the spell's school of magic.\n\nThe spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead."
  },
  {
    "name": "Detect Poison and Disease",
    "level": 1,
    "school": "divination",
    "classes": [
      "cleric",
      "druid",
      "paladin",
      "ranger"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": true,
    "range": "Self",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a yew leaf",
    "duration": "up to 10 minutes",
    "description": "For the duration, you sense the location of poisons, poisonous or venomous creatures, and magical contagions within 30 feet of yourself. You sense the kind of poison, creature, or contagion in each case. \n\nThe spell is blocked by 1 foot of stone, dirt, or wood; 1 inch of metal; or a thin sheet of lead."
  },
  {
    "name": "Dispel Magic",
    "level": 3,
    "school": "abjuration",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "sorcerer",
      "warlock",
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
    "description": "Choose one creature, object, or magical effect within range. Any ongoing spell of level 3 or lower on the target ends. For each ongoing spell of level 4 or higher on the target, make an ability check using your spellcasting ability (DC 10 plus that spell's level). On a successful check, the spell ends.",
    "higherLevelSlot": "You automatically end a spell on the target if the spell's level is equal to or less than the level of the spell slot you use."
  },
  {
    "name": "Druidcraft",
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
      "s"
    ],
    "duration": "Instantaneous",
    "description": "**Weather Sensor.** You create a Tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round. \n\n**Bloom.** You instantly make a flower blossom, a seed pod open, or a leaf bud bloom. \n\n**Sensory Effect.** You create a harmless sensory effect, such as falling leaves, spectral dancing fairies, a gentle breeze, the sound of an animal, or the faint odor of skunk. The effect must fit in a 5-foot Cube. \n\n**Fire Play.** You light or snuff out a candle, a torch, or a campfire."
  },
  {
    "name": "Elementalism",
    "level": 0,
    "school": "transmutation",
    "classes": [
      "druid",
      "sorcerer",
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
    "duration": "Instantaneous",
    "description": "You exert control over the elements, creating one of the following effects within range: \n\n**Beckon Air.** You create a breeze strong enough to ripple cloth, stir dust, rustle leaves, and close open doors and shutters, all in a 5-foot Cube. Doors and shutters being held open by someone or something aren't affected. \n\n**Beckon Earth.** You create a thin shroud of dust or sand that covers surfaces in a 5-foot-square area, or you cause a single word to appear in your handwriting in a patch of dirt or sand. \n\n**Beckon Fire.** You create a thin cloud of harmless embers and colored, scented smoke in a 5-foot Cube. You choose the color and scent, and the embers can light candles, torches, or lamps in that area. The smoke's scent lingers for 1 minute. \n\n**Beckon Water.** You create a spray of cool mist that lightly dampens creatures and objects in a 5-foot Cube. Alternatively, you create 1 cup of clean water either in an open container or on a surface, and the water evaporates in 1 minute. \n\n**Sculpt Element.** You cause dirt, sand, fire, smoke, mist, or water that can fit in a 1-foot Cube to assume a crude shape (such as that of a creature or an object) for 1 hour."
  },
  {
    "name": "Enhance Ability",
    "level": 2,
    "school": "transmutation",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "fur or a feather",
    "duration": "up to 1 hour",
    "description": "You touch a creature and choose Strength, Dexterity, Intelligence, Wisdom, or Charisma. For the duration, the target has Advantage on ability checks using the chosen ability.",
    "higherLevelSlot": "You can target one additional creature for each spell slot level above 2. You can choose a different ability for each target."
  },
  {
    "name": "Enlarge/Reduce",
    "level": 2,
    "school": "transmutation",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
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
    "material": "a pinch of powdered iron",
    "duration": "up to 1 minute",
    "description": "For the duration, the spell enlarges or reduces a creature or an object you can see within range (see the chosen effect below). A targeted object must be neither worn nor carried. If the target is an unwilling creature, it can make a Constitution saving throw. On a successful save, the spell has no effect. \n\nEverything that a targeted creature is wearing and carrying changes size with it. Any item it drops returns to normal size at once. A thrown weapon or piece of ammunition returns to normal size immediately after it hits or misses a target. \n\n**Enlarge.** The target's size increases by one category—from Medium to Large, for example. The target also has Advantage on Strength checks and Strength saving throws. The target's attacks with its enlarged weapons or Unarmed Strikes deal an extra 1d4 damage on a hit. \n\n**Reduce.** The target's size decreases by one category—from Medium to Small, for example. The target also has Disadvantage on Strength checks and Strength saving throws. The target's attacks with its reduced weapons or Unarmed Strikes deal 1d4 less damage on a hit (this can't reduce the damage below 1)."
  },
  {
    "name": "Entangle",
    "level": 1,
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
      "s"
    ],
    "duration": "up to 1 minute",
    "description": "Grasping plants sprout from the ground in a 20-foot square within range. For the duration, these plants turn the ground in the area into Difficult Terrain. They disappear when the spell ends. Each creature (other than you) in the area when you cast the spell must succeed on a Strength saving throw or have the Restrained condition until the spell ends. A Restrained creature can take an action to make a Strength (Athletics) check against your spell save DC. On a success, it frees itself from the grasping plants and is no longer Restrained by them."
  },
  {
    "name": "Faerie Fire",
    "level": 1,
    "school": "evocation",
    "classes": [
      "bard",
      "druid"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v"
    ],
    "duration": "up to 1 minute",
    "description": "Objects in a 20-foot Cube within range are outlined in blue, green, or violet light (your choice). Each creature in the Cube is also outlined if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed Dim Light in a 10-foot radius and can't benefit from the Invisible condition. \n\nAttack rolls against an affected creature or object have Advantage if the attacker can see it."
  },
  {
    "name": "Find Traps",
    "level": 2,
    "school": "divination",
    "classes": [
      "cleric",
      "druid",
      "ranger"
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
    "description": "You sense any trap within range that is within line of sight. A trap, for the purpose of this spell, includes any object or mechanism that was created to cause damage or other danger. Thus, the spell would sense the Alarm or Glyph of Warding spell or a mechanical pit trap, but it wouldn't reveal a natural weakness in the floor, an unstable ceiling, or a hidden sinkhole. \n\nThis spell reveals that a trap is present but not its location. You do learn the general nature of the danger posed by a trap you sense."
  },
  {
    "name": "Flame Blade",
    "level": 2,
    "school": "evocation",
    "classes": [
      "druid",
      "sorcerer"
    ],
    "actionType": "bonusAction",
    "concentration": true,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a sumac leaf",
    "duration": "up to 10 minutes",
    "description": "You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. If you let go of the blade, it disappears, but you can evoke it again as a Bonus Action. \n\nAs a Magic action, you can make a melee spell attack with the fiery blade. On a hit, the target takes Fire damage equal to 3d6 plus your spellcasting ability modifier. \n\nThe flaming blade sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.",
    "higherLevelSlot": "The damage increases by 1d6 for each spell slot level above 2."
  },
  {
    "name": "Flaming Sphere",
    "level": 2,
    "school": "conjuration",
    "classes": [
      "druid",
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
    "material": "a ball of wax",
    "duration": "up to 1 minute",
    "description": "You create a 5-foot-diameter sphere of fire in an unoccupied space on the ground within range. It lasts for the duration. Any creature that ends its turn within 5 feet of the sphere makes a Dexterity saving throw, taking 2d6 Fire damage on a failed save or half as much damage on a successful one. \n\nAs a Bonus Action, you can move the sphere up to 30 feet, rolling it along the ground. If you move the sphere into a creature's space, that creature makes the save against the sphere, and the sphere stops moving for the turn. \n\nWhen you move the sphere, you can direct it over barriers up to 5 feet tall and jump it across pits up to 10 feet wide. Flammable objects that aren't being worn or carried start burning if touched by the sphere, and it sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet.",
    "higherLevelSlot": "The damage increases by 1d6 for each spell slot level above 2."
  },
  {
    "name": "Fog Cloud",
    "level": 1,
    "school": "conjuration",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "120 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "up to 1 hour",
    "description": "You create a 20-foot-radius Sphere of fog centered on a point within range. The Sphere is Heavily Obscured. It lasts for the duration or until a strong wind (such as one created by Gust of Wind) disperses it.",
    "higherLevelSlot": "The fog's radius increases by 20 feet for each spell slot level above 1."
  },
  {
    "name": "Goodberry",
    "level": 1,
    "school": "conjuration",
    "classes": [
      "druid",
      "ranger"
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
    "material": "a sprig of mistletoe",
    "duration": "24 hours",
    "description": "Ten berries appear in your hand and are infused with magic for the duration. A creature can take a Bonus Action to eat one berry. Eating a berry restores 1 Hit Point, and the berry provides enough nourishment to sustain a creature for one day. \n\nUneaten berries disappear when the spell ends."
  },
  {
    "name": "Guidance",
    "level": 0,
    "school": "divination",
    "classes": [
      "cleric",
      "druid"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s"
    ],
    "duration": "up to 1 minute",
    "description": "You touch a willing creature and choose a skill. Until the spell ends, the creature adds 1d4 to any ability check using the chosen skill."
  },
  {
    "name": "Gust of Wind",
    "level": 2,
    "school": "evocation",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a legume seed",
    "duration": "up to 1 minute",
    "description": "A Line of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the duration. Each creature in the Line must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the Line. A creature that ends its turn in the Line must make the same save. \n\nAny creature in the Line must spend 2 feet of movement for every 1 foot it moves when moving closer to you.\n\nThe gust disperses gas or vapor, and it extinguishes candles and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them. \n\nAs a Bonus Action on your later turns, you can change the direction in which the Line blasts from you."
  },
  {
    "name": "Healing Word",
    "level": 1,
    "school": "abjuration",
    "classes": [
      "bard",
      "cleric",
      "druid"
    ],
    "actionType": "bonusAction",
    "concentration": false,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "v"
    ],
    "duration": "Instantaneous",
    "description": "A creature of your choice that you can see within range regains Hit Points equal to 2d4 plus your spellcasting ability modifier.",
    "higherLevelSlot": "The healing increases by 2d4 for each spell slot level above 1."
  },
  {
    "name": "Heat Metal",
    "level": 2,
    "school": "transmutation",
    "classes": [
      "bard",
      "druid"
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
    "material": "a piece of iron and a flame",
    "duration": "up to 1 minute",
    "description": "Choose a manufactured metal object, such as a metal weapon or a suit of Heavy or Medium metal armor, that you can see within range. You cause the object to glow red-hot. Any creature in physical contact with the object takes 2d8 Fire damage when you cast the spell. Until the spell ends, you can take a Bonus Action on each of your later turns to deal this damage again if the object is within range. \n\nIf a creature is holding or wearing the object and takes the damage from it, the creature must succeed on a Constitution saving throw or drop the object if it can. If it doesn't drop the object, it has Disadvantage on attack rolls and ability checks until the start of your next turn.",
    "higherLevelSlot": "The damage increases by 1d8 for each spell slot level above 2."
  },
  {
    "name": "Hold Person",
    "level": 2,
    "school": "enchantment",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "sorcerer",
      "warlock",
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
    "material": "a straight piece of iron",
    "duration": "up to 1 minute",
    "description": "Choose a Humanoid that you can see within range. The target must succeed on a Wisdom saving throw or have the Paralyzed condition for the duration. At the end of each of its turns, the target repeats the save, ending the spell on itself on a success.",
    "higherLevelSlot": "You can target one additional Humanoid for each spell slot level above 2."
  },
  {
    "name": "Ice Knife",
    "level": 1,
    "school": "conjuration",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "60 feet",
    "components": [
      "s",
      "m"
    ],
    "material": "a drop of water or a piece of ice",
    "duration": "Instantaneous",
    "description": "You create a shard of ice and fling it at one creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 Piercing damage. Hit or miss, the shard then explodes. The target and each creature within 5 feet of it must succeed on a Dexterity saving throw or take 2d6 Cold damage.",
    "higherLevelSlot": "The Cold damage increases by 1d6 for each spell slot level above 1."
  },
  {
    "name": "Jump",
    "level": 1,
    "school": "transmutation",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ],
    "actionType": "bonusAction",
    "concentration": false,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a grasshopper's hind leg",
    "duration": "1 minute",
    "description": "You touch a willing creature. Once on each of its turns until the spell ends, that creature can jump up to 30 feet by spending 10 feet of movement.",
    "higherLevelSlot": "You can target one additional creature for each spell slot level above 1."
  },
  {
    "name": "Lesser Restoration",
    "level": 2,
    "school": "abjuration",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger"
    ],
    "actionType": "bonusAction",
    "concentration": false,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "You touch a creature and end one condition on it: Blinded, Deafened, Paralyzed, or Poisoned."
  },
  {
    "name": "Locate Animals or Plants",
    "level": 2,
    "school": "divination",
    "classes": [
      "bard",
      "druid",
      "ranger"
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
    "material": "fur from a bloodhound",
    "duration": "Instantaneous",
    "description": "Describe or name a specific kind of Beast, Plant creature, or nonmagical plant. You learn the direction and distance to the closest creature or plant of that kind within 5 miles, if any are present."
  },
  {
    "name": "Locate Object",
    "level": 2,
    "school": "divination",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a forked twig",
    "duration": "up to 10 minutes",
    "description": "Describe or name an object that is familiar to you. You sense the direction to the object's location if that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movement. \n\nThe spell can locate a specific object known to you if you have seen it up close—within 30 feet—at least once. Alternatively, the spell can locate the nearest object of a particular kind, such as a certain kind of apparel, jewelry, furniture, tool, or weapon. \n\nThis spell can't locate an object if any thickness of lead blocks a direct path between you and the object."
  },
  {
    "name": "Longstrider",
    "level": 1,
    "school": "transmutation",
    "classes": [
      "bard",
      "druid",
      "ranger",
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
    "material": "a pinch of dirt",
    "duration": "1 hour",
    "description": "You touch a creature. The target's Speed increases by 10 feet until the spell ends.",
    "higherLevelSlot": "You can target one additional creature for each spell slot level above 1."
  },
  {
    "name": "Meld into Stone",
    "level": 3,
    "school": "transmutation",
    "classes": [
      "cleric",
      "druid",
      "ranger"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "range": "Touch",
    "components": [
      "v",
      "s"
    ],
    "duration": "8 hours",
    "description": "You step into a stone object or surface large enough to fully contain your body, merging yourself and your equipment with the stone for the duration. You must touch the stone to do so. Nothing of your presence remains visible or otherwise detectable by nonmagical senses. \n\nWhile merged with the stone, you can't see what occurs outside it, and any Wisdom (Perception) checks you make to hear sounds outside it are made with Disadvantage. You remain aware of the passage of time and can cast spells on yourself while merged in the stone. You can use 5 feet of movement to leave the stone where you entered it, which ends the spell. You otherwise can't move. \n\nMinor physical damage to the stone doesn't harm you, but its partial destruction or a change in its shape (to the extent that you no longer fit within it) expels you and deals 6d6 Force damage to you. The stone's complete destruction (or transmutation into a different substance) expels you and deals 50 Force damage to you. If expelled, you move into an unoccupied space closest to where you first entered and have the Prone condition."
  },
  {
    "name": "Mending",
    "level": 0,
    "school": "transmutation",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "castingTime": "1 minute",
    "range": "Touch",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "two lodestones",
    "duration": "Instantaneous",
    "description": "This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage. \n\nThis spell can physically repair a magic item, but it can't restore magic to such an object."
  },
  {
    "name": "Message",
    "level": 0,
    "school": "transmutation",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "120 feet",
    "components": [
      "s",
      "m"
    ],
    "material": "a copper wire",
    "duration": "1 round",
    "description": "You point toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear. You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence; 1 foot of stone, metal, or wood; or a thin sheet of lead blocks the spell."
  },
  {
    "name": "Moonbeam",
    "level": 2,
    "school": "evocation",
    "classes": [
      "druid"
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
    "material": "a moonseed leaf",
    "duration": "up to 1 minute",
    "description": "A silvery beam of pale light shines down in a 5-foot-radius, 40- foot-high Cylinder centered on a point within range. Until the spell ends, Dim Light fills the Cylinder, and you can take a Magic action on later turns to move the Cylinder up to 60 feet. When the Cylinder appears, each creature in it makes a Constitution saving throw. On a failed save, a creature takes 2d10 Radiant damage, and if the creature is shape-shifted (as a result of the Polymorph spell, for example), it reverts to its true form and can't shape-shift until it leaves the Cylinder. On a successful save, a creature takes half as much damage only. A creature also makes this save when the spell's area moves into its space and when it enters the spell's area or ends its turn there. A creature makes this save only once per turn.",
    "higherLevelSlot": "The damage increases by 1d10 for each spell slot level above 2."
  },
  {
    "name": "Pass without Trace",
    "level": 2,
    "school": "abjuration",
    "classes": [
      "druid",
      "ranger"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "ashes from a burned mistletoe",
    "duration": "up to 1 hour",
    "description": "You radiate a concealing aura in a 30-foot Emanation for the duration. While in the aura, you and each creature you choose have a +10 bonus to Dexterity (Stealth) checks and leave no tracks."
  },
  {
    "name": "Plant Growth",
    "level": 3,
    "school": "transmutation",
    "classes": [
      "bard",
      "druid",
      "ranger"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "castingTime": "Action (Overgrowth) or 8 hours (Enrichment)",
    "range": "150 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "This spell channels vitality into plants. The casting time you use determines whether the spell has the Overgrowth or the Enrichment effect below. \n\n**Overgrowth**. Choose a point within range. All normal plants in a 100-foot-radius Sphere centered on that point become thick and overgrown. A creature moving through that area must spend 4 feet of movement for every 1 foot it moves. You can exclude one or more areas of any size within the spell's area from being affected. \n\n**Enrichment**. All plants in a half-mile radius centered on a point within range become enriched for 365 days. The plants yield twice the normal amount of food when harvested. They can benefit from only one Plant Growth per year."
  },
  {
    "name": "Poison Spray",
    "level": 0,
    "school": "necromancy",
    "classes": [
      "druid",
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
    "duration": "Instantaneous",
    "description": "You spray toxic mist at a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d12 Poison damage.",
    "cantripUpgrade": "The damage increases by 1d12 when you reach levels 5 (2d12), 11 (3d12), and 17 (4d12)."
  },
  {
    "name": "Produce Flame",
    "level": 0,
    "school": "conjuration",
    "classes": [
      "druid"
    ],
    "actionType": "bonusAction",
    "concentration": false,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s"
    ],
    "duration": "10 minutes",
    "description": "A flickering flame appears in your hand and remains there for the duration. While there, the flame emits no heat and ignites nothing, and it sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. The spell ends if you cast it again. \n\nUntil the spell ends, you can take a Magic action to hurl fire at a creature or an object within 60 feet of you. Make a ranged spell attack. On a hit, the target takes 1d8 Fire damage.",
    "cantripUpgrade": "The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8)."
  },
  {
    "name": "Protection from Energy",
    "level": 3,
    "school": "abjuration",
    "classes": [
      "cleric",
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
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
    "description": "For the duration, the willing creature you touch has Resistance to one damage type of your choice: Acid, Cold, Fire, Lightning, or Thunder."
  },
  {
    "name": "Protection from Evil and Good",
    "level": 1,
    "school": "abjuration",
    "classes": [
      "cleric",
      "druid",
      "paladin",
      "warlock",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a flask of Holy Water worth 25+ GP, which the spell consumes",
    "duration": "up to 10 minutes",
    "description": "Until the spell ends, one willing creature you touch is protected against creatures that are Aberrations, Celestials, Elementals, Fey, Fiends, or Undead. The protection grants several benefits. Creatures of those types have Disadvantage on attack rolls against the target. The target also can't be possessed by or gain the Charmed or Frightened conditions from them. If the target is already possessed, Charmed, or Frightened by such a creature, the target has Advantage on any new saving throw against the relevant effect."
  },
  {
    "name": "Protection from Poison",
    "level": 2,
    "school": "abjuration",
    "classes": [
      "cleric",
      "druid",
      "paladin",
      "ranger"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s"
    ],
    "duration": "1 hour",
    "description": "You touch a creature and end the Poisoned condition on it. For the duration, the target has Advantage on saving throws to avoid or end the Poisoned condition, and it has Resistance to Poison damage."
  },
  {
    "name": "Purify Food and Drink",
    "level": 1,
    "school": "transmutation",
    "classes": [
      "cleric",
      "druid",
      "paladin"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "range": "10 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "You remove poison and rot from nonmagical food and drink in a 5- foot-radius Sphere centered on a point within range."
  },
  {
    "name": "Resistance",
    "level": 0,
    "school": "abjuration",
    "classes": [
      "cleric",
      "druid"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "Touch",
    "components": [
      "v",
      "s"
    ],
    "duration": "up to 1 minute",
    "description": "You touch a willing creature and choose a damage type: Acid, Bludgeoning, Cold, Fire, Lightning, Necrotic, Piercing, Poison, Radiant, Slashing, or Thunder. When the creature takes damage of the chosen type before the spell ends, the creature reduces the total damage taken by 1d4. A creature can benefit from this spell only once per turn."
  },
  {
    "name": "Revivify",
    "level": 3,
    "school": "necromancy",
    "classes": [
      "cleric",
      "druid",
      "paladin",
      "ranger"
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
    "material": "diamonds worth 300+ GP, which the spell consumes",
    "duration": "Instantaneous",
    "description": "You touch a creature that has died within the last minute. That creature revives with 1 Hit Point. This spell can't revive a creature that has died of old age, nor does it restore any missing body parts."
  },
  {
    "name": "Shillelagh",
    "level": 0,
    "school": "transmutation",
    "classes": [
      "druid"
    ],
    "actionType": "bonusAction",
    "concentration": false,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "mistletoe",
    "duration": "1 minute",
    "description": "A Club or Quarterstaff you are holding is imbued with nature's power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon's damage die becomes a d8. If the attack deals damage, it can be Force damage or the weapon's normal damage type (your choice).\n\nThe spell ends early if you cast it again or if you let go of the weapon.",
    "cantripUpgrade": "The weapon's damage die changes when you reach levels 5 (d10), 11 (d12), and 17 (2d6)."
  },
  {
    "name": "Sleet Storm",
    "level": 3,
    "school": "conjuration",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "150 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "a miniature umbrella",
    "duration": "up to 1 minute",
    "description": "Until the spell ends, sleet falls in a 40-foot-tall, 20-foot-radius Cylinder centered on a point you choose within range. The area is Heavily Obscured, and exposed flames in the area are doused. Ground in the Cylinder is Difficult Terrain. When a creature enters the Cylinder for the first time on a turn or starts its turn there, it must succeed on a Dexterity saving throw or have the Prone condition and lose Concentration."
  },
  {
    "name": "Spare the Dying",
    "level": 0,
    "school": "necromancy",
    "classes": [
      "cleric",
      "druid"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "15 feet",
    "components": [
      "v",
      "s"
    ],
    "duration": "Instantaneous",
    "description": "Choose a creature within range that has 0 Hit Points and isn't dead. The creature becomes Stable.",
    "cantripUpgrade": "The range doubles when you reach levels 5 (30 feet), 11 (60 feet), and 17 (120 feet)."
  },
  {
    "name": "Speak with Animals",
    "level": 1,
    "school": "divination",
    "classes": [
      "bard",
      "druid",
      "ranger",
      "warlock"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": true,
    "range": "Self",
    "components": [
      "v",
      "s"
    ],
    "duration": "10 minutes",
    "description": "For the duration, you can comprehend and verbally communicate with Beasts, and you can use any of the Influence action's skill options with them. \n\nMost Beasts have little to say about topics that don't pertain to survival or companionship, but at minimum, a Beast can give you information about nearby locations and monsters, including whatever it has perceived within the past day."
  },
  {
    "name": "Speak with Plants",
    "level": 3,
    "school": "transmutation",
    "classes": [
      "bard",
      "druid",
      "ranger"
    ],
    "actionType": "action",
    "concentration": false,
    "ritual": false,
    "range": "Self",
    "components": [
      "v",
      "s"
    ],
    "duration": "10 minutes",
    "description": "You imbue plants in an immobile 30-foot Emanation with limited sentience and animation, giving them the ability to communicate with you and follow your simple commands. You can question plants about events in the spell's area within the past day, gaining information about creatures that have passed, weather, and other circumstances. \n\nYou can also turn Difficult Terrain caused by plant growth (such as thickets and undergrowth) into ordinary terrain that lasts for the duration. Or you can turn ordinary terrain where plants are present into Difficult Terrain that lasts for the duration. \n\nThe spell doesn't enable plants to uproot themselves and move about, but they can move their branches, tendrils, and stalks for you. \n\nIf a Plant creature is in the area, you can communicate with it as if you shared a common language."
  },
  {
    "name": "Spike Growth",
    "level": 2,
    "school": "transmutation",
    "classes": [
      "druid",
      "ranger"
    ],
    "actionType": "action",
    "concentration": true,
    "ritual": false,
    "range": "150 feet",
    "components": [
      "v",
      "s",
      "m"
    ],
    "material": "seven thorns",
    "duration": "up to 10 minutes",
    "description": "The ground in a 20-foot-radius Sphere centered on a point within range sprouts hard spikes and thorns. The area becomes Difficult Terrain for the duration. When a creature moves into or within the area, it takes 2d4 Piercing damage for every 5 feet it travels. \n\nThe transformation of the ground is camouflaged to look natural. Any creature that can't see the area when the spell is cast must take a Search action and succeed on a Wisdom (Perception or Survival) check against your spell save DC to recognize the terrain as hazardous before entering it."
  },
  {
    "name": "Starry Wisp",
    "level": 0,
    "school": "evocation",
    "classes": [
      "bard",
      "druid"
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
    "description": "You launch a mote of light at one creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d8 Radiant damage, and until the end of your next turn, it emits Dim Light in a 10-foot radius and can't benefit from the Invisible condition.",
    "cantripUpgrade": "The damage increases by 1d8 when you reach levels 5 (2d8), 11 (3d8), and 17 (4d8)."
  },
  {
    "name": "Thunderwave",
    "level": 1,
    "school": "evocation",
    "classes": [
      "bard",
      "druid",
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
    "description": "You unleash a wave of thunderous energy. Each creature in a 15- foot Cube originating from you makes a Constitution saving throw. On a failed save, a creature takes 2d8 Thunder damage and is pushed 10 feet away from you. On a successful save, a creature takes half as much damage only. \n\nIn addition, unsecured objects that are entirely within the Cube are pushed 10 feet away from you, and a thunderous boom is audible within 300 feet.",
    "higherLevelSlot": "The damage increases by 1d8 for each spell slot level above 1."
  },
  {
    "name": "Water Breathing",
    "level": 3,
    "school": "transmutation",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
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
    "material": "a short reed",
    "duration": "24 hours",
    "description": "This spell grants up to ten willing creatures of your choice within range the ability to breathe underwater until the spell ends. Affected creatures also retain their normal mode of respiration."
  },
  {
    "name": "Water Walk",
    "level": 3,
    "school": "transmutation",
    "classes": [
      "cleric",
      "druid",
      "ranger",
      "sorcerer"
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
    "material": "a piece of cork",
    "duration": "1 hour",
    "description": "This spell grants the ability to move across any liquid surface—such as water, acid, mud, snow, quicksand, or lava—as if it were harmless solid ground (creatures crossing molten lava can still take damage from the heat). Up to ten willing creatures of your choice within range gain this ability for the duration. \n\nAn affected target must take a Bonus Action to pass from the liquid's surface into the liquid itself and vice versa, but if the target falls into the liquid, the target passes through the surface into the liquid below."
  },
  {
    "name": "Wind Wall",
    "level": 3,
    "school": "evocation",
    "classes": [
      "druid",
      "ranger"
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
    "material": "a fan and a feather",
    "duration": "up to 1 minute",
    "description": "A wall of strong wind rises from the ground at a point you choose within range. You can make the wall up to 50 feet long, 15 feet high, and 1 foot thick. You can shape the wall in any way you choose so long as it makes one continuous path along the ground. The wall lasts for the duration. \n\nWhen the wall appears, each creature in its area makes a Strength saving throw, taking 4d8 Bludgeoning damage on a failed save or half as much damage on a successful one. \n\nThe strong wind keeps fog, smoke, and other gases at bay. Small or smaller flying creatures or objects can't pass through the wall. Loose, lightweight materials brought into the wall fly upward. Arrows, bolts, and other ordinary projectiles launched at targets behind the wall are deflected upward and miss automatically. Boulders hurled by Giants or siege engines, and similar projectiles, are unaffected. Creatures in gaseous form can't pass through it."
  }
];
