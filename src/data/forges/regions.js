const regions = {
    wheozThana: {
        key: 'wheozThana',
        name: 'Wheoz Thana',
        aliases: ['The Big City', 'The Science Nexus', 'The City of Tomorrow'],
        adjectives: ['thanarian', 'cityborn'],
        unitTypes: [
            'human',
            'merfolk',
            'mech',
            {
                key: 'ant',
                maxRarity: 2,
            },
            {
                key: 'dwarf',
                chance: 0.7,
            },
            {
                key: 'elf',
                chance: 0.7,
            },
            {
                key: 'orc',
                chance: 0.4,
            },
            {
                key: 'goblin',
                chance: 0.4,
            },
            {
                key: 'insect',
                chance: 0.2,
            },
            {
                key: 'spirit',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
            {
                key: 'voidspawn',
                chance: 0.1,
            },
            {
                key: 'beast',
                chance: 0.1,
            },
            {
                key: 'ape',
                chance: 0.1,
            },
            {
                key: 'bird',
                chance: 0.1,
            },
            {
                key: 'fish',
                chance: 0.1,
            },
            {
                key: 'plant',
                chance: 0.1,
            },
            {
                key: 'giant',
                chance: 0.1,
            },
            {
                key: 'legendary',
                chance: 0.1,
            },
        ],
        elements: [
            'tech',
            {
                key: 'time',
                chance: 0.5,
            },
            {
                key: 'psychic',
                chance: 0.5,
            },
            {
                key: 'light',
                chance: 0.2,
            },
            {
                key: 'shadow',
                chance: 0.2,
            },
            {
                key: 'toxic',
                chance: 0.2,
            },
            {
                key: 'fire',
                chance: 0.1,
            },
            {
                key: 'earth',
                chance: 0.1,
            },
            {
                key: 'water',
                chance: 0.1,
            },
            {
                key: 'air',
                chance: 0.1,
            },
            {
                key: 'nature',
                chance: 0.1,
            },
        ],
        locations: ['Thanarian University'],
    },
    alphatownRuins: {
        key: 'alphatownRuins',
        name: 'Alphatown Ruins',
        aliases: ['The Punished City', 'The Void Ruins', 'The Dead City', 'Ruins of Void', 'Voidspring Ruins'],
        adjectives: ['alpharian', 'voidtouched', 'ruined', 'punished'],
        elements: [
            'shadow',
            'nature',
        ],
        unitTypes: [
            'undead',
            'ghost',
            'voidspawn',
            'god',
            'insect',
            {
                key: 'humanoid',
                chance: 0.1,
            },
            {
                key: 'ooze',
                chance: 0.1,
            },
        ],
    },
    oseshire: {
        key: 'oseshire',
        name: 'Oseshire',
        adjectives: ['sheiran'],
        unitTypes: [
            'human',
            {
                key: 'bird',
                chance: 0.4,
                maxRarity: 2,
            },
            {
                key: 'insect',
                chance: 0.4,
                maxRarity: 2,
            },
            {
                key: 'elf',
                chance: 0.5,
            },
            {
                key: 'dwarf',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 2,
            },
        ],
        elements: ['none'],
    },
    zraross: {
        key: 'zraross',
        name: 'Zraross',
        aliases: ['Realm of the Lost', 'World of Worlds', 'Unstable Multiverse', 'Chaotic Realm', 'The Lost Realm', 'The Forgotten Realm'],
        adjectives: ['zrarossian', 'lost', 'forgotten', 'dimensional', 'chaosborn'],
        unitTypes: ['any'],
        elements: ['any'],
    },
    yoseForest: {
        key: 'yoseForest',
        name: 'Yose Forest',
        description: 'A forest filled with plain living creatures. Very few of them are intelligent.',
        aliases: ['Elven Forest', 'The Wild Forest'],
        adjectives: ['yosian', 'forestal'],
        elements: [
            'nature',
            'earth',
            {
                key: 'air',
                chance: 0.6,
            },
            {
                key: 'water',
                chance: 0.3,
            },
            {
                key: 'light',
                chance: 0.3,
            },
            {
                key: 'toxic',
                chance: 0.1,
            },
        ],
        unitTypes: [
            {
                key: 'elf',
                maxRarity: 5,
            },
            {
                key: 'ape',
                maxRarity: 5,
            },
            {
                key: 'plant',
                maxRarity: 5,
            },
            {
                key: 'nymph',
                chance: 0.5,
                maxRarity: 5,
            },
            {
                key: 'fairy',
                maxRarity: 5,
                chance: 0.4,
            },
            {
                key: 'unicorn',
                maxRarity: 5,
                chance: 0.1,
            },
            'bird',
            'insect',
            'beast',
            'reptile',
            {
                key: 'fish',
                chance: 0.4,
            },
            {
                key: 'ooze',
                maxRarity: 4,
                chance: 0.1,
            },
        ],
        maxRarity: 2,
    },
    nisetCoast: {
        key: 'nisetCoast',
        name: 'Niset Coast',
        description: 'A coast filled with merfolk and other water creatures.',
        aliases: ['Merfolk City', 'Underwater City'],
        adjectives: ['Nisetian'],
        elements: [
            'water',
            {
                key: 'earth',
                chance: 0.5,
            },
            {
                key: 'nature',
                chance: 0.5,
            },
            {
                key: 'time',
                chance: 0.2,
            },
        ],
        unitTypes: [
            'fish',
            {
                key: 'merfolk',
                maxRarity: 5,
            },
            {
                key: 'plant',
                chance: 0.2,
                maxRarity: 5,
            },
            {
                key: 'bird',
                chance: 0.2,
            },
            {
                key: 'reptile',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
            },
            {
                key: 'elemental',
                chance: 0.1,
            },
        ],
        maxRarity: 2,
    },
    drepmontPeaks: {
        key: 'drepmontPeaks',
        name: 'Drepmont Peaks',
        description: 'A mountain range filled with dwarves and other earth creatures.',
        aliases: ['Dwarven Mountains', 'The Mountain Range', 'The Mountain Peaks'],
        adjectives: ['Drepmontian'],
        elements: [
            'earth',
            {
                key: 'tech',
                chance: 0.5,
            },
            {
                key: 'light',
                chance: 0.2,
            }
        ],
        unitTypes: [
            'insect',
            {
                key: 'dwarf',
                maxRarity: 5,
            },
            {
                key: 'beast',
                chance: 0.5,
            },
            {
                key: 'golem',
                maxRarity: 5,
                chance: 0.5,
            },
            {
                key: 'plant',
                chance: 0.2,
                maxRarity: 5,
            },
            {
                key: 'mech',
                chance: 0.2,
                maxRarity: 5,
            },
            {
                key: 'bird',
                chance: 0.2,
            },
            {
                key: 'ape',
                chance: 0.2,
            },
            {
                key: 'reptile',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
            },
            {
                key: 'elemental',
                chance: 0.1,
            },
        ],
        maxRarity: 2,
    },
    chisonBurrows: {
        key: 'chisonBurrows',
        name: 'Chison Burrows',
        aliases: ['Hive City', 'The Nest'],
        adjectives: ['Chisonian'],
        elements: [
            'earth',
            'air',
            'shadow',
            'nature',
            'toxic', 
            {
                key: 'psychic',
                chance: 0.2,
            },
        ],
        unitTypes: [
            'insect',
            {
                key: 'beast',
                chance: 0.4,
                maxRarity: 2,
            },
            {
                key: 'reptile',
                chance: 0.4,
                maxRarity: 2,
            },
            {
                key: 'golem',
                chance: 0.1,
                maxRarity: 2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    ontmouthDepths: {
        key: 'ontmouthDepths',
        name: 'Ontmouth Depths',
        aliases: ['The Deepest Ocean', 'The Water Core', 'Infinity Waters', 'The Infinity Abyss'],
        adjectives: ['Ontmouthian'],
        elements: [
            'water',
            'shadow',
            {
                key: 'nature',
                chance: 0.5,
            }, {
                key: 'toxic',
                chance: 0.2,
            }
        ],
        unitTypes: [
            'fish',
            'dragon',
            'imp',
            'demon',
            'supreme',
            'voidspawn',
            {
                key: 'golem',
                chance: 0.2,
            },
            {
                key: 'ghost',
                chance: 0.2,
            },
            {
                key: 'elemental',
                chance: 0.4,
            },
            {
                key: 'merfolk',
                chance: 0.2,
            },
            {
                key: 'djinn',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
            {
                key: 'dragonling',
                chance: 0.4,
            },
            {
                key: 'chimera',
                chance: 0.2,
            },
            {
                key: 'insect',
                chance: 0.1,
            },
            {
                key: 'beast',
                chance: 0.1,
            },
            {
                key: 'reptile',
                chance: 0.1,
            },
        ],
    },
    akarith: {
        key: 'akarith',
        name: 'Akarith',
        aliases: ['The Sky Citadel', 'The Sky Fortress', 'Angel Nest', 'Heaven Citadel', 'Home of Gods', 'Cloud Fortress'],
        adjectives: ['Akarithian'],
        elements: [
            'air',
            'light',
            'water',
            {
                key: 'fire',
                chance: 0.5,
            },
            {
                key: 'psychic',
                chance: 0.2,
            },
        ],
        unitTypes: [
            'bird',
            'spirit',
            'phoenix',
            'angel',
            'dragon',
            'god',
            {
                key: 'dragonling',
                chance: 0.4,
            },
            {
                key: 'elemental',
                chance: 0.4,
            },
            {
                key: 'djinn',
                chance: 0.2,
            },
            {
                key: 'insect',
                chance: 0.2,
            },
            {
                key: 'fairy',
                chance: 0.2,
            },
            {
                key: 'unicorn',
                chance: 0.1,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    yhekaCaves: {
        key: 'yhekaCaves',
        name: 'Yheka Caves',
        aliases: ['Endless Caves'],
        adjectives: ['Yhekan'],
        elements: [
            'earth',
            'shadow',
            {
                key: 'fire',
                chance: 0.2,
            },
            {
                key: 'air',
                chance: 0.2,
            },
        ],
        unitTypes: [
            'goblin',
            'giant',
            'voidspawn',
            'dragon',
            'demon',
            {
                key: 'elemental',
                chance: 0.4,
            },
            {
                key: 'ghost',
                chance: 0.4,
            },
            {
                key: 'golem',
                chance: 0.4,
            },
            {
                key: 'dwarf',
                chance: 0.2,
            },
            {
                key: 'djinn',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    bluutwell: {
        key: 'bluutwell',
        name: 'Bluutwell',
        aliases: ['Helldoor', 'The Gates of Hell', 'The Underworld'],
        adjectives: ['Bluutwellian', 'Damned'],
        elements: [
            'shadow',
            'fire',
            {
                key: 'water',
                chance: 0.2,
            },
            {
                key: 'nature',
                chance: 0.2,
            },
        ],
        unitTypes: [
            'undead',
            'imp',
            'ghost',
            'djinn',
            'voidspawn',
            'chimera',
            'dragon',
            'demon',
            'supreme',
            {
                key: 'orc',
                chance: 0.5,
            },
            {
                key: 'goblin',
                chance: 0.5,
            },
            {
                key: 'human',
                chance: 0.3,
            },
            {
                key: 'elf',
                chance: 0.3,
            },
            {
                key: 'dwarf',
                chance: 0.3,
            },
            {
                key: 'dragonling',
                chance: 0.1,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    zhaatinCaves: {
        key: 'zhaatinCaves',
        name: 'Zhaatin Caves',
        aliases: ['Crystal Caves', 'Endless Dream', 'Crystal Dream'],
        adjectives: ['Zhaatinian', 'Crystalline'],
        elements: [
            'earth',
            'light',
            'psychic',
            {
                key: 'time',
                chance: 0.2,
            },
            {
                key: 'shadow',
                chance: 0.1,
            },
            {
                key: 'toxic',
                chance: 0.1,
            },
        ],
        unitTypes: [
            'beast',
            'insect',
            'bird',
            'spirit',
            'unicorn',
            'dragon',
            {
                key: 'dragonling',
                chance: 0.2,
            },
            {
                key: 'undead',
                chance: 0.2,
            },
            {
                key: 'golem',
                chance: 0.2,
            },
            {
                key: 'angel',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    khuyhull: {
        key: 'khuyhull',
        name: 'Khuyhull',
        aliases: ['Ancient Forest', 'Timeless Forest'],
        adjectives: ['Khuyhullian'],
        elements: [
            'nature',
            'air',
            'earth',
            'water',
            'fire',
            'toxic',
            'time',
        ],
        unitTypes: [
            'bird',
            'insect',
            'beast',
            'plant',
            'giant',
            'undead',
            'reptile',
            'spirit',
            'dragon',
            'voidspawn',
            'ape',
            'ooze',
            'primordial',
        ],
    },
    xahphiaLake: {
        key: 'xahphiaLake',
        name: 'Xahphia Lake',
        aliases: ['Mirage Lake', 'Mirror Lake', 'The Lake of Illusions'],
        adjectives: ['Xahphian'],
        elements: [
            'water',
            'psychic',
            {
                key: 'air',
                chance: 0.2,
            },
            {
                key: 'time',
                chance: 0.2,
            },
        ],
        unitTypes: [
            'djinn',
            'spirit',
            'unicorn',
            'dragon',
            {
                key: 'fish',
                chance: 0.5,
            },
            {
                key: 'bird',
                chance: 0.5,
            },
            {
                key: 'elemental',
                chance: 0.4,
            },
            {
                key: 'dragonling',
                chance: 0.2,
            },
            {
                key: 'golem',
                chance: 0.2,
            },
            {
                key: 'undead',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    vluehham: {
        key: 'vluehham',
        name: 'Vluehham',
        aliases: ['Corrupted Valley', 'Polluted Lands'],
        adjectives: ['Vluehhamian'],
        elements: [
            'toxic',
            'shadow',
            {
                key: 'air',
                chance: 0.3,
            },
            {
                key: 'time',
                chance: 0.3,
            },
            {
                key: 'tech',
                chance: 0.3,
            },
            {
                key: 'light',
                chance: 0.1,
            },
        ],
        unitTypes: [
            'human',
            'reptile',
            'undead',
            'ooze',
            'golem',
            'plant',
            'djinn',
            'spirit',
            'chimera',
            'voidspawn',
            'legendary',
            'supreme',
            {
                key: 'mech',
                chance: 0.7,
            },
            {
                key: 'insect',
                maxRarity: 3,
            },
            {
                key: 'bird',
                chance: 0.4,
                maxRarity: 3,
            },
            {
                key: 'dragonling',
                chance: 0.4,
            },
            {
                key: 'beast',
                chance: 0.2,
                maxRarity: 3,
            },
            {
                key: 'ape',
                chance: 0.2,
                maxRarity: 3,
            },
            {
                key: 'elemental',
                chance: 0.4,
            },
            {
                key: 'elf',
                chance: 0.1,
            },
            {
                key: 'merfolk',
                chance: 0.1,
            },
            {
                key: 'dwarf',
                chance: 0.1,
            },
            {
                key: 'orc',
                chance: 0.3,
            },
            {
                key: 'goblin',
                chance: 0.3,
            },
            {
                key: 'unicorn',
                chance: 0.1,
            },
            {
                key: 'giant',
                chance: 0.1,
            },
            {
                key: 'spirit',
                chance: 0.1,
            },
            {
                key: 'cyclops',
                chance: 0.1,
            },
            {
                key: 'phoenix',
                chance: 0.1,
            },
        ],
    },
    slotgasWastelands: {
        key: 'slotgasWastelands',
        name: 'Slotgas Wastelands',
        aliases: ['The Sand City', 'The Wastelands', 'The Barren Lands'],
        adjectives: ['Slotgasian', 'Sanddweller'],
        elements: [
            'earth',
            'air',
            'time',
            'tech',
            'psychic',
        ],
        unitTypes: [
            'beast',
            'dwarf',
            'orc',
            'golem',
            'dragon',
            'voidspawn',
            {
                key: 'insect',
                chance: 0.2,
                maxRarity: 3,
            },
            {
                key: 'reptile',
                chance: 0.2,
                maxRarity: 3,
            },
            {
                key: 'ape',
                chance: 0.2,
                maxRarity: 3,
            },
            {
                key: 'bird',
                chance: 0.2,
                maxRarity: 3,
            },
            {
                key: 'elemental',
                chance: 0.4,
            },
            {
                key: 'dragonling',
                chance: 0.4,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    luhamPools: {
        key: 'luhamPools',
        name: 'Luham Pools',
        aliases: ['The Magma City', 'Lava Pools', 'Luham Hell'],
        adjectives: ['Luhamian'],
        elements: [
            'fire',
            'earth',
            {
                key: 'toxic',
                chance: 0.5,
            },
            {
                key: 'tech',
                chance: 0.2,
            },
        ],
        unitTypes: [
            'fish',
            'merfolk',
            'phoenix',
            'dragon',
            'voidspawn',
            {
                key: 'elemental',
                chance: 0.4,
            },
            {
                key: 'dragonling',
                chance: 0.4,
            },
            {
                key: 'insect',
                chance: 0.2,
                maxRarity: 3,
            },
            {
                key: 'golem',
                chance: 0.2,
            },
            {
                key: 'mech',
                chance: 0.2,
            },
            {
                key: 'cyclops',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    biville: {
        key: 'biville',
        name: 'Biville',
        aliases: ['The Flower Forest', 'The Flower City', 'The Pollen Forest'],
        adjectives: ['Bivillian', 'Flowerborn'],
        elements: [
            'nature',
            'air',
            {
                key: 'time',
                chance: 0.5,
            },
            {
                key: 'psychic',
                chance: 0.5,
            },
        ],
        unitTypes: [
            'bee',
            'flower',
            'elf',
            'giant',
            'dragon',
            'supreme',
            'walker',
            {
                key: 'bird',
                chance: 0.5,
            },
            {
                key: 'plant',
                chance: 0.5,
            },
            {
                key: 'insect',
                chance: 0.2,
            },
            {
                key: 'beast',
                chance: 0.2,
            },
            {
                key: 'ape',
                chance: 0.2,
            },
            {
                key: 'fairy',
                chance: 0.2,
            },
            {
                key: 'dragonling',
                chance: 0.2,
            },
            {
                key: 'cyclops',
                chance: 0.2,
            },
            {
                key: 'unicorn',
                chance: 0.1,
            },
            {
                key: 'elemental',
                chance: 0.1,
            },
            {
                key: 'golem',
                chance: 0.1,
            },
            {
                key: 'dinosaur',
                chance: 0.1,
            },
        ],
    },
    uryburn: {
        key: 'uryburn',
        name: 'Uryburn',
        aliases: ['Eclipse City', 'Evernight'],
        adjectives: ['Uryburnian', 'Eclipsian'],
        elements: [
            'shadow',
            'light',
            {
                key: 'time',
                chance: 0.5,
            },
            {
                key: 'psychic',
                chance: 0.2,
            },
        ],
        unitTypes: [
            'wolf',
            'fish',
            'elf',
            'dwarf',
            'legendary',
            'supreme',
            'walker',
            {
                key: 'elemental',
                chance: 0.4,
            },
            {
                key: 'dragonling',
                chance: 0.4,
            },
            {
                key: 'djinn',
                chance: 0.2,
            },
            {
                key: 'beast',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    neothana: {
        key: 'neothana',
        name: 'Neothana',
        aliases: ['The City in the Future', 'The New Hope'],
        adjectives: ['Neothanian'],
        elements: [
            'tech',
            'time',
            'psychic',
        ],
        unitTypes: [
            'human',
            'elf',
            'dwarf',
            'merfolk',
            'mech',
            'goblin',
            'orc',
            'god',
            {
                key: 'dragon',
                chance: 0.5,
            },
            {
                key: 'giant',
                chance: 0.5,
            },
            {
                key: 'golem',
                chance: 0.5,
            },
            {
                key: 'ape',
                chance: 0.5,
            },
            {
                key: 'plant',
                chance: 0.2,
            },
            {
                key: 'bird',
                chance: 0.2,
            },
            {
                key: 'insect',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
};

module.exports = regions;