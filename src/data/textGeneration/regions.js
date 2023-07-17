const regions = [
    {
        key: 'wheozThana',
        name: 'Wheoz Thana',
        aliases: ['The Big City', 'The Science Nexus', 'The City of Tomorrow'],
        localNames: ['Thanarian'],
        unitTypes: ['human', 'dwarf', 'elf', 'orc', 'goblin', 'god'],
        elements: ['none', 'time', 'psychic', 'tech'],
        buildings: ['Thanarian University'],
        professions: ['scientist', 'professor', 'engineer'],
    },
    {
        key: 'oseshire',
        name: 'Oseshire',
        localNames: ['Sheiran'],
        unitTypes: ['human'],
        elements: ['none'],
        professions: ['farmer', 'villager'],
    },
    {
        key: 'yoseForest',
        name: 'Yose Forest',
        description: 'A forest filled with plain living creatures. Very few of them are intelligent.',
        aliases: ['The Wild Forest'],
        localNames: ['Yosian'],
        elements: ['none', 'nature', 'air', 'earth', 'water'],
        unitTypes: [
            {
                key: 'elf',
                maxRarity: 5,
            },
            {
                key: 'tree',
                maxRarity: 5,
            },
            'bird',
            'ape',
            'insect',
            'beast',
            'reptile',
            'fish',
        ],
        maxRarity: 2,
    },
    {
        key: 'chisonPlains',
        name: 'Chison Plains',
        aliases: ['Hive City', 'The Nest'],
        localNames: ['Chisonian'],
        elements: ['none', 'nature', 'earth', 'air', 'shadow', 'toxic', 'psychic'],
        unitTypes: [
            'insect',
            {
                key: 'ooze',
                chance: 0.2,
                maxRarity: 4,
            },
        ],
    },
    {
        key: 'ontmouthDepths',
        name: 'Ontmouth Depths',
        aliases: ['The Deepest Ocean', 'The Water Core', 'Infinity Waters', 'The Infinity Abyss'],
        elements: ['water', 'shadow'],
        unitTypes: [
            'fish',
            'elemental',
            'golem',
            'spirit',
            'merfolk',
            'ooze',
            'dragonling',
            'djinn',
            'shade',
            'chimera',
            'kraken',
            'leviathan',
            'dragon',
            'demon',
            'god',
            'walker',
        ],
    },
    {
        key: ''
    }
];

module.exports = regions;
