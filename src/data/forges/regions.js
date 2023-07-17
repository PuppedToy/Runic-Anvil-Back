const regions = [
    {
        key: 'wheozThana',
        name: 'Wheoz Thana',
        aliases: ['The Big City', 'The Science Nexus', 'The City of Tomorrow'],
        localNames: ['Thanarian'],
        unitTypes: [
            'human',
            'wizard',
            'robot',
            'god',
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
                key: 'golem',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
            {
                key: 'voidling',
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
                key: 'tree',
                chance: 0.1,
            },
            {
                key: 'dinosaur',
                chance: 0.1,
            },
            {
                key: 'giant',
                chance: 0.1,
            },
            {
                key: 'dragonling',
                chance: 0.1,
            },
            {
                key: 'chimera',
                chance: 0.1,
            },
            {
                key: 'phoenix',
                chance: 0.1,
            },
            {
                key: 'kraken',
                chance: 0.1,
            },
            {
                key: 'hydra',
                chance: 0.1,
            },
            {
                key: 'unicorn',
                chance: 0.1,
            },
            {
                key: 'cyclops',
                chance: 0.1,
            },
            {
                key: 'behemoth',
                chance: 0.1,
            },
            {
                key: 'leviathan',
                chance: 0.1,
            },
            {
                key: 'dragon',
                chance: 0.1,
            },
            {
                key: 'angel',
                chance: 0.1,
            },
            {
                key: 'demon',
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
        professions: ['scientist', 'professor', 'engineer'],
    },
    {
        key: 'oseshire',
        name: 'Oseshire',
        localNames: ['Sheiran'],
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
        professions: ['farmer', 'villager'],
    },
    {
        key: 'zraross',
        name: 'Zraross',
        aliases: ['Realm of the Lost', 'World of Worlds', 'Unstable Multiverse', 'Chaotic Realm', 'The Lost Realm', 'The Forgotten Realm'],
        localNames: ['Zrarossian', 'One of the Lost'],
        unitTypes: ['any'],
        elements: ['any'],
    },
    {
        key: 'yoseForest',
        name: 'Yose Forest',
        description: 'A forest filled with plain living creatures. Very few of them are intelligent.',
        aliases: ['Elven Forest', 'The Wild Forest'],
        localNames: ['Yosian'],
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
                key: 'centaur',
                maxRarity: 5,
                chance: 0.2,
            },
            {
                key: 'tree',
                maxRarity: 5,
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
                key: 'fairy',
                chance: 0.4,
            },
            {
                key: 'unicorn',
                chance: 0.1,
            },
            {
                key: 'ooze',
                chance: 0.1,
            }
        ],
        maxRarity: 2,
    },
    {
        key: 'nisetCoast',
        name: 'Niset Coast',
        description: 'A coast filled with merfolk and other water creatures.',
        aliases: ['Merfolk City', 'Underwater City'],
        localNames: ['Nisetian'],
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
                key: 'tree',
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
            },
        ],
        maxRarity: 2,
    },
    {
        key: 'drepmontPeaks',
        name: 'Drepmont Peaks',
        description: 'A mountain range filled with dwarves and other earth creatures.',
        aliases: ['Dwarven Mountains', 'The Mountain Range', 'The Mountain Peaks'],
        localNames: ['Drepmontian'],
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
                key: 'minotaur',
                maxRarity: 5,
                chance: 0.2,
            },
            {
                key: 'golem',
                maxRarity: 5,
                chance: 0.5,
            },
            {
                key: 'tree',
                chance: 0.2,
                maxRarity: 5,
            },
            {
                key: 'robot',
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
                key: 'fairy',
                chance: 0.2,
            },
        ],
        maxRarity: 2,
    },
    {
        key: 'chisonBurrows',
        name: 'Chison Burrows',
        aliases: ['Hive City', 'The Nest'],
        localNames: ['Chisonian'],
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
    {
        key: 'ontmouthDepths',
        name: 'Ontmouth Depths',
        aliases: ['The Deepest Ocean', 'The Water Core', 'Infinity Waters', 'The Infinity Abyss'],
        localNames: ['Ontmouthian'],
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
            'shade',
            'kraken',
            'leviathan',
            'dragon',
            'demon',
            'god',
            'walker',
            {
                key: 'golem',
                chance: 0.2,
            },
            {
                key: 'spirit',
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
    {
        key: 'akarith',
        key: 'Akarith',
        aliases: ['The Sky City', 'The Floating City', 'The City of the Gods', 'The City of the Sky', 'The City of the Clouds'],
        localNames: ['Akarithian'],
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
            'walker',
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
                key: 'fairy',
                chance: 0.2,
            },
            {
                key: 'insect',
                chance: 0.2,
            },
            {
                key: 'unicorn',
                chance: 0.1,
            },
            {
                key: 'harpy',
                chance: 0.1,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    {
        key: 'yhekaCaves',
        name: 'Yheka Caves',
        aliases: ['Endless Caves'],
        localNames: ['Yhekan'],
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
            'harpy',
            'cyclops',
            'voidling',
            'dragon',
            'demon',
            'walker',
            {
                key: 'elemental',
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
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    {
        key: 'bluutwell',
        name: 'Bluutwell',
        aliases: ['Helldoor', 'The Gates of Hell', 'The Underworld'],
        localNames: ['Bluutwellian', 'Damned'],
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
            'spirit',
            'djinn',
            'shade',
            'voidling',
            'chimera',
            'dragon',
            'demon',
            'god',
            'walker',
            {
                key: 'orc',
                chance: 0.5,
            },
            {
                key: 'goblin',
                chance: 0.5,
            },
            {
                key: 'harpy',
                chance: 0.3,
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
                key: 'wizard',
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
    {
        key: 'zhaatinCaves',
        name: 'Zhaatin Caves',
        aliases: ['Crystal Caves', 'Endless Dream', 'Crystal Dream'],
        localNames: ['Zhaatinian', 'Crystalline'],
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
            'fairy',
            'unicorn',
            'dragon',
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
                key: 'djinn',
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
    {
        key: 'khuyhull',
        name: 'Khuyhull',
        aliases: ['Ancient Forest', 'Timeless Forest'],
        localNames: ['Khuyhullian'],
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
            'tree',
            'reptile',
            'elemental',
            'dinosaur',
            'centaur',
            'minotaur',
            'cyclops',
            'unicorn',
            'hydra',
            'behemoth',
            'dragon',
            'walker',
            {
                key: 'dragonling',
                chance: 0.4,
            },
            {
                key: 'ape',
                chance: 0.2,
            },
            {
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    {
        key: 'xahphiaLake',
        name: 'Xahphia Lake',
        aliases: ['Mirage Lake', 'Mirror Lake', 'The Lake of Illusions'],
        localNames: ['Xahphian'],
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
            'wizard',
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
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    {
        key: 'vluehham',
        name: 'Vluehham',
        aliases: ['Corrupted Valley', 'Polluted Lands'],
        localNames: ['Vluehhamian'],
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
            'tree',
            'djinn',
            'spirit',
            'chimera',
            'voidling',
            'dragon',
            'angel',
            'demon',
            'god',
            'walker',
            {
                key: 'robot',
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
                key: 'shade',
                chance: 0.4,
            },
            {
                key: 'elemental',
                chance: 0.4,
            },
            {
                key: 'harpy',
                chance: 0.2,
            },
            {
                key: 'hydra',
                chance: 0.2,
            },
            {
                key: 'behemoth',
                chance: 0.2,
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
                key: 'minotaur',
                chance: 0.1,
            },
            {
                key: 'centaur',
                chance: 0.1,
            },
            {
                key: 'fairy',
                chance: 0.1,
            },
            {
                key: 'cyclops',
                chance: 0.1,
            },
            {
                key: 'dinosaur',
                chance: 0.1,
            },
            {
                key: 'phoenix',
                chance: 0.1,
            },
        ],
    },
    {
        key: 'slotgasWastelands',
        name: 'Slotgas Wastelands',
        aliases: ['The Sand City', 'The Wastelands', 'The Barren Lands'],
        localNames: ['Slotgasian', 'Sanddweller'],
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
            'wizard',
            'dragon',
            'behemoth',
            'walker',
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
                key: 'minotaur',
                chance: 0.2,
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
    {
        key: 'luhamPools',
        name: 'Luham Pools',
        aliases: ['The Magma City', 'Lava Pools', 'Luham Hell'],
        localNames: ['Luhamian'],
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
            'kraken',
            'phoenix',
            'leviathan',
            'dragon',
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
                key: 'insect',
                chance: 0.2,
                maxRarity: 3,
            },
            {
                key: 'golem',
                chance: 0.2,
            },
            {
                key: 'robot',
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
    {
        key: 'biville',
        name: 'Biville',
        aliases: ['The Flower Forest', 'The Flower City', 'The Pollen Forest'],
        localNames: ['Bivillian', 'Flowerborn'],
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
            'insect',
            'tree',
            'elf',
            'giant',
            'dragon',
            'god',
            'walker',
            {
                key: 'bird',
                chance: 0.5,
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
                key: 'elemental',
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
                key: 'golem',
                chance: 0.1,
            },
            {
                key: 'dinosaur',
                chance: 0.1,
            },
        ],
    },
    {
        key: 'uryburn',
        name: 'Uryburn',
        aliases: ['Eclipse City', 'Evernight'],
        localNames: ['Uryburnian', 'Eclipsian'],
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
            'beast',
            'fish',
            'elf',
            'dwarf',
            'harpy',
            'shade',
            'hydra',
            'dragon',
            'angel',
            'demon',
            'god',
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
                key: 'ooze',
                chance: 0.1,
                maxRarity: 4,
            },
        ],
    },
    {
        key: 'neothana',
        name: 'Neothana',
        aliases: ['The City in the Future', 'The New Hope'],
        localNames: ['Neothanian'],
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
            'robot',
            'wizard',
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
                key: 'tree',
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
];

module.exports = regions;
