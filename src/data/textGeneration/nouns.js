const nounsOld = {
  main: {
    generic: [
      {
        word: 'warrior',
        attackRange: '2-x',
        profession: true,
      },
      {
        word: 'warmaster',
        attackRange: '3-x',
        profession: true,
      },
      {
        word: 'battlemaster',
        attackRange: '3-x',
        profession: true,
      },
      {
        word: 'engineer',
        keywords: ['create', 'summon', 'building', 'civic'],
        attackRange: '0-2',
        profession: true,
      },
      {
        word: 'architect',
        keywords: ['create', 'summon', 'building', 'civic'],
        attackRange: '0-1',
        profession: true,
      },
      {
        word: 'specialist',
        keywords: ['summon', 'civic'],
        attackRange: '0-2',
        profession: true,
      },
      {
        word: 'mercenary',
        attackRange: '2-x',
        profession: true,
      },
      {
        word: 'guard',
        attackRange: '2-6',
        profession: true,
      },
      {
        word: 'knight',
        attackRange: '2-x',
        profession: true,
      },
      {
        word: 'defender',
        attackRange: '2-x',
        keywords: ['shield', 'armor', 'barrier', 'cast'],
        profession: true,
      },
      {
        word: 'protector',
        keywords: ['shield', 'armor', 'barrier', 'cast'],
        elements: ['any'],
        profession: true,
      },
      {
        word: 'warden',
        attackRange: '2-x',
        keywords: ['shield', 'armor', 'barrier', 'cast'],
        profession: true,
      },
      {
        word: 'warder',
        attackRange: '2-x',
        keywords: ['shield', 'armor', 'barrier', 'cast'],
        profession: true,
      },
      {
        word: 'sentinel',
        attackRange: '2-x',
        keywords: ['shield', 'armor', 'barrier', 'cast'],
        profession: true,
      },
      {
        word: 'champion',
        attackRange: '5-x',
        profession: true,
      },
      {
        word: 'villager',
        attackRange: '0-2',
        profession: true,
      },
      {
        word: 'fool',
        attackRange: '0',
        profession: true,
      },
      {
        word: 'taskmaster',
        attackRange: '1-4',
        profession: true,
      },
      {
        word: 'slave',
        attackRange: '0-2',
        profession: true,
      },
      {
        word: 'suspect',
        attackRange: '0-2',
        profession: true,
      },
      {
        word: 'prisoner',
        profession: true,
      },
      {
        word: 'peon',
        attackRange: '0-3',
        profession: true,
      },
      {
        word: 'grunt',
        attackRange: '1-4',
        profession: true,
      },
      {
        word: 'janitor',
        attackRange: '0-1',
        keywords: ['civic'],
        profession: true,
      },
      {
        word: 'cleaner',
        attackRange: '0-1',
        keywords: ['civic'],
        profession: true,
      },
      {
        word: 'gardener',
        attackRange: '0-2',
        keywords: ['civic'],
        elements: ['earth'],
        profession: true,
      },
      {
        word: 'farmer',
        attackRange: '0-2',
        keywords: ['civic'],
        elements: ['earth'],
        profession: true,
      },
      {
        word: 'hoarder',
        keywords: ['invest', 'earn'],
        profession: true,
      },
      {
        word: 'berserker',
        attackRange: '2-x',
        profession: true,
        keywords: ['berserker'],
      },
      {
        word: 'trapper',
        keywords: ['secret', 'surprise'],
        profession: true,
      },
      {
        word: 'leader',
        keywords: ['summon', 'buff'],
        profession: true,
      },
      {
        word: 'explorer',
        attackRange: '0-2',
        keywords: ['scout'],
        profession: true,
      },
      {
        word: 'seer',
        attackRange: '1-3',
        keywords: ['cast', 'scout', 'secret', 'civic'],
        profession: true,
      },
      {
        word: 'seeker',
        attackRange: '1-3',
        keywords: ['cast', 'scout', 'secret', 'civic'],
        profession: true,
      },
      {
        word: 'scout',
        keywords: ['scout'],
        profession: true,
      },
      {
        word: 'hunter',
        attackRange: '1-x',
        keywords: ['ranged', 'stealth', 'secret'],
        profession: true,
      },
      {
        word: 'infiltrator',
        keywords: ['stealth'],
        profession: true,
      },
      {
        word: 'scoundrel',
        keywords: ['stealth'],
        profession: true,
      },
      {
        word: 'assasssin',
        keywords: ['stealth', 'damage'],
        profession: true,
      },
      {
        word: 'giant',
        keywords: ['big', 'huge', 'titan'],
      },
      {
        word: 'titan',
        keywords: ['titan'],
      },
      {
        word: 'raider',
        profession: true,
      },
    ],
    human: [
      {
        word: 'dancer',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
      },
      {
        word: 'performer',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
      },
      {
        word: 'actor',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
        gender: 'male',
      },
      {
        word: 'actress',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
        gender: 'female',
      },
      {
        word: 'painter',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
      },
      {
        word: 'singer',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
      },
      {
        word: 'juggler',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
      },
      {
        word: 'puppeteer',
        attackRange: '0-1',
        keywords: ['summon', 'civic'],
        profession: true,
      },
      {
        word: 'bard',
        keywords: ['buff', 'heal'],
        profession: true,
      },
      {
        word: 'peasant',
        attackRange: '0-2',
        keywords: ['civic'],
        profession: true,
      },
      {
        word: 'plumber',
        attackRange: '0-2',
        keywords: ['civic'],
        elements: ['water'],
        profession: true,
      },
      {
        word: 'informant',
        attackRange: '0-2',
        keywords: ['civic'],
        profession: true,
      },
      {
        word: 'noble',
        keywords: ['earn', 'buff'],
        minRarity: 2,
        profession: true,
      },
      {
        word: 'lord',
        keywords: ['earn', 'buff'],
        minRarity: 3,
        profession: true,
      },
      {
        word: 'teacher',
        attackRange: '0-2',
        keywords: ['summon', 'buff', 'civic'],
        profession: true,
      },
      {
        word: 'blacksmith',
        attackRange: '1-3',
        keywords: ['weapon', 'buff', 'civic'],
        profession: true,
      },
      {
        word: 'librarian',
        attackRange: '0-2',
        keywords: ['invest', 'discover', 'civic'],
        profession: true,
      },
      {
        word: 'banker',
        attackRange: '0-2',
        keywords: ['invest', 'earn', 'civic'],
        profession: true,
      },
      {
        word: 'investor',
        attackRange: '0-2',
        keywords: ['invest', 'civic'],
        profession: true,
      },
      {
        word: 'shopkeeper',
        attackRange: '0-2',
        keywords: ['invest', 'earn', 'discover', 'summon', 'civic'],
        profession: true,
      },
      {
        word: 'merchant',
        keywords: ['invest', 'earn', 'discover', 'summon', 'civic'],
        profession: true,
      },
      {
        word: 'trader',
        keywords: ['invest', 'earn', 'discover', 'summon', 'civic'],
        profession: true,
      },
      {
        word: 'importer',
        attackRange: '0-2',
        keywords: ['invest', 'earn', 'discover', 'summon', 'civic'],
        profession: true,
      },
      {
        word: 'auctioneer',
        attackRange: '0-2',
        keywords: ['invest', 'earn', 'civic'],
        profession: true,
      },
      {
        word: 'doctor',
        attackRange: '0-2',
        keywords: ['heal', 'damage'],
        profession: true,
      },
      {
        word: 'alchemist',
        keywords: ['heal', 'damage'],
        elements: ['none', 'blood', 'toxic', 'life', 'death'],
        profession: true,
      },
      {
        word: 'acolyte',
        elements: ['any'],
        profession: true,
      },
      {
        word: 'cook',
        attackRange: '0-2',
        keywords: ['heal', 'damage', 'civic'],
        profession: true,
      },
      {
        word: 'chef',
        attackRange: '0-2',
        keywords: ['heal', 'damage', 'civic'],
        profession: true,
      },
      {
        word: 'baker',
        attackRange: '0-2',
        keywords: ['heal', 'damage', 'civic'],
        profession: true,
      },
      {
        word: 'brewmaster',
        attackRange: '0-2',
        keywords: ['heal', 'damage', 'civic'],
        profession: true,
      },
      {
        word: 'bomber',
        attackRange: '0-2',
        keywords: ['damage'],
        profession: true,
      },
      {
        word: 'centurion',
        keywords: ['summon', 'buff'],
        profession: true,
      },
      {
        word: 'officer',
        keywords: ['summon', 'buff'],
        profession: true,
      },
      {
        word: 'marshal',
        keywords: ['summon', 'buff'],
        maxForgeLevel: 1,
        profession: true,
      },
      {
        word: 'sergeant',
        keywords: ['buff'],
        maxForgeLevel: 1,
        profession: true,
      },
      {
        word: 'quartermaster',
        keywords: ['buff'],
        maxForgeLevel: 2,
        profession: true,
      },
      {
        word: 'commander',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 1,
        maxForgeLevel: 3,
        profession: true,
      },
      {
        word: 'captain',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 2,
        maxForgeLevel: 3,
        profession: true,
      },
      {
        word: 'chief',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 2,
        maxForgeLevel: 4,
        profession: true,
      },
      {
        word: 'colonel',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 3,
        maxForgeLevel: 4,
        profession: true,
      },
      {
        word: 'lieutenant',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 3,
        profession: true,
      },
      {
        word: 'general',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 4,
        profession: true,
      },
      {
        word: 'diver',
        profession: true,
      },
      {
        word: 'gossiper',
        attackRange: '0-1',
        keywords: ['scout', 'civic'],
        profession: true,
      },
      {
        word: 'sailor',
        keywords: ['scout'],
        profession: true,
      },
      {
        word: 'spy',
        keywords: ['scout', 'secret'],
        profession: true,
      },
      {
        word: 'operative',
        keywords: ['scout', 'secret'],
        profession: true,
      },
      {
        word: 'archer',
        attackRange: '2-x',
        keywords: ['ranged'],
        profession: true,
      },
      {
        word: 'gnome',
      },
      {
        word: 'elf',
      },
      {
        word: 'dwarf',
      },
      {
        word: 'goblin',
      },
      {
        word: 'gremlin',
      },
      {
        word: 'orc',
      },
      {
        word: 'wizard',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['any'],
      },
      {
        word: 'summoner',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['any'],
      },
      {
        word: 'sorcerer',
        profession: true,
        gender: 'male',
        keywords: ['cast', 'summon'],
        elements: ['any'],
      },
      {
        word: 'sorceress',
        profession: true,
        gender: 'female',
        keywords: ['cast', 'summon'],
        elements: ['any'],
      },
      {
        word: 'mage',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['any'],
      },
      {
        word: 'caster',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['any'],
      },
      {
        word: 'pyromancer',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['fire'],
      },
      {
        word: 'cryomancer',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['ice'],
      },
      {
        word: 'druid',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['earth', 'water', 'air', 'life'],
      },
      {
        word: 'priest',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['life'],
      },
      {
        word: 'necromancer',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['death'],
      },
      {
        word: 'arcanist',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['any'],
      },
      {
        word: 'herald',
        attackRange: '2-x',
        keywords: ['cast', 'scout'],
        elements: ['any'],
        profession: true,
      },
    ],
    bird: [
      {
        word: 'raven',
      },
      {
        word: 'crow',
      },
      {
        word: 'eagle',
      },
      {
        word: 'hawk',
      },
      {
        word: 'falcon',
      },
      {
        word: 'owl',
      },
      {
        word: 'parrot',
      },
      {
        word: 'peacock',
      },
      {
        word: 'pheasant',
      },
      {
        word: 'swan',
      },
      {
        word: 'goose',
      },
      {
        word: 'duck',
      },
      {
        word: 'gull',
      },
      {
        word: 'pigeon',
      },
      {
        word: 'sparrow',
      },
      {
        word: 'robin',
      },
      {
        word: 'canary',
      },
      {
        word: 'vulture',
      },
      {
        word: 'turkey',
      },
      {
        word: 'quail',
      },
      {
        word: 'dove',
      },
      {
        word: 'woodpecker',
      },
      {
        word: 'hummingbird',
      },
      {
        word: 'pelican',
      },
      {
        word: 'stork',
      },
      {
        word: 'crane',
      },
      {
        word: 'flamingo',
      },
      {
        word: 'ostrich',
      },
      {
        word: 'emu',
      },
      {
        word: 'kiwi',
      },
      {
        word: 'penguin',
      },
      {
        word: 'dodo',
      },
      {
        word: 'phoenix',
      },
      {
        word: 'scavenger',
        profession: true,
      },
      {
        word: 'migrant',
        profession: true,
      },
      {
        word: 'songster',
        profession: true,
      },
      {
        word: 'dancer',
        profession: true,
      },
      {
        word: 'fisherman',
        profession: true,
      },
      {
        word: 'diver',
        profession: true,
      },
      {
        word: 'hoverer',
        profession: true,
      },
      {
        word: 'nectarivore',
        profession: true,
      },
      {
        word: 'frugivore',
        profession: true,
      },
      {
        word: 'seed-cracker',
        profession: true,
      },
      {
        word: 'stalker',
        profession: true,
      },
      {
        word: 'wader',
        profession: true,
      },
      {
        word: 'resident',
        profession: true,
      },
      {
        word: 'nester',
        profession: true,
      },
      {
        word: 'digger',
        profession: true,
      },
      {
        word: 'sandpiper',
        profession: true,
      },
      {
        word: 'hummingbird',
        profession: true,
      },
    ],
    insect: [
      {
        word: 'ant',
      },
      {
        word: 'bee',
      },
      {
        word: 'beetle',
      },
      {
        word: 'butterfly',
      },
      {
        word: 'caterpillar',
      },
      {
        word: 'cockroach',
      },
      {
        word: 'cricket',
      },
      {
        word: 'dragonfly',
      },
      {
        word: 'flea',
      },
      {
        word: 'fly',
      },
      {
        word: 'grasshopper',
      },
      {
        word: 'ladybug',
      },
      {
        word: 'louse',
      },
      {
        word: 'mantis',
      },
      {
        word: 'moth',
      },
      {
        word: 'mosquito',
      },
      {
        word: 'scorpion',
      },
      {
        word: 'spider',
      },
      {
        word: 'termite',
      },
      {
        word: 'wasp',
      },
      {
        word: 'worm',
      },
      {
        word: 'cicada',
      },
      {
        word: 'snail',
      },
      {
        word: 'slug',
      },
      {
        word: 'pollinator',
        attackRange: '0-1',
        profession: true,
      },
      {
        word: 'queen',
        profession: true,
      },
      {
        word: 'drone',
        profession: true,
      },
      {
        word: 'forager',
        attackRange: '0-1',
        profession: true,
      },
      {
        word: 'leaf-cutter',
        attackRange: '1-3',
        profession: true,
      },
      {
        word: 'brood-tender',
        attackRange: '0-2',
        profession: true,
      },
      {
        word: 'parasite',
        attackRange: '2-x',
        profession: true,
      },
      {
        word: 'decomposer',
        profession: true,
      },
      {
        word: 'symbiont',
        profession: true,
      },
      {
        word: 'weaver',
        profession: true,
      },
    ],
    ape: [
      {
        word: 'ape',
      },
      {
        word: 'chimpanzee',
      },
      {
        word: 'gorilla',
      },
      {
        word: 'baboon',
      },
      {
        word: 'monkey',
      },
      {
        word: 'lemur',
      },
      {
        word: 'orangutan',
      },
      {
        word: 'gibbon',
      },
      {
        word: 'mandrill',
      },
      {
        word: 'marmoset',
      },
      {
        word: 'tamarin',
      },
      {
        word: 'macaque',
      },
    ],
    beast: [
      {
        word: 'bear',
      },
      {
        word: 'boar',
      },
      {
        word: 'buffalo',
      },
      {
        word: 'bull',
      },
      {
        word: 'camel',
      },
      {
        word: 'cow',
      },
      {
        word: 'deer',
      },
      {
        word: 'elk',
      },
      {
        word: 'gazelle',
      },
      {
        word: 'goat',
      },
      {
        word: 'hippo',
      },
      {
        word: 'horse',
      },
      {
        word: 'kangaroo',
      },
      {
        word: 'lion',
      },
      {
        word: 'lynx',
      },
      {
        word: 'moose',
      },
      {
        word: 'ox',
      },
      {
        word: 'pig',
      },
      {
        word: 'rhino',
      },
      {
        word: 'sheep',
      },
      {
        word: 'tiger',
      },
      {
        word: 'wolf',
      },
      {
        word: 'zebra',
      },
      {
        word: 'antelope',
      },
      {
        word: 'cheetah',
      },
      {
        word: 'cougar',
      },
      {
        word: 'panther',
      },
      {
        word: 'leopard',
      },
      {
        word: 'jaguar',
      },
      {
        word: 'bobcat',
      },
      {
        word: 'puma',
      },
    ],
    reptile: [
      {
        word: 'alligator',
      },
      {
        word: 'crocodile',
      },
      {
        word: 'gecko',
      },
      {
        word: 'iguana',
      },
      {
        word: 'lizard',
      },
      {
        word: 'snake',
      },
      {
        word: 'turtle',
      },
      {
        word: 'chameleon',
      },
      {
        word: 'komodo',
      },
      {
        word: 'rattlesnake',
      },
      {
        word: 'cobra',
      },
      {
        word: 'viper',
      },
      {
        word: 'python',
      },
      {
        word: 'boa',
      },
      {
        word: 'anaconda',
      },
      {
        word: 'basilisk',
      },
      {
        word: 'burrower',
        profession: true,
      },
      {
        word: 'constrictor',
        profession: true,
      },
      {
        word: 'poisoner',
        profession: true,
      },
    ],
    fish: [
      {
        word: 'fish',
      },
      {
        word: 'shark',
      },
      {
        word: 'whale',
      },
      {
        word: 'dolphin',
      },
      {
        word: 'eel',
      },
      {
        word: 'ray',
      },
      {
        word: 'stingray',
      },
      {
        word: 'orca',
      },
      {
        word: 'seal',
      },
      {
        word: 'sealion',
      },
      {
        word: 'walrus',
      },
      {
        word: 'squid',
      },
      {
        word: 'octopus',
      },
      {
        word: 'jellyfish',
      },
      {
        word: 'crab',
      },
      {
        word: 'lobster',
      },
      {
        word: 'shrimp',
      },
      {
        word: 'prawn',
      },
      {
        word: 'oyster',
      },
      {
        word: 'clam',
      },
      {
        word: 'scallop',
      },
      {
        word: 'mussel',
      },
      {
        word: 'coral',
      },
      {
        word: 'starfish',
      },
      {
        word: 'sponge',
      },
      {
        word: 'urchin',
      },
      {
        word: 'schooler',
        profession: true,
      },
      {
        word: 'angler',
        profession: true,
      },
    ],
    treant: [], /* {
      name: 'treant',
      forgeLevel: 2,
    }, */
    fungus: [], /* {
      name: 'Fungus',
      forgeLevel: 2,
    }, */
    drone: [], /* {
      name: 'Drone',
      forgeLevel: 2,
    }, */
    dinosaur: [], /* {
      name: 'Dinosaur',
      forgeLevel: 2,
    }, */
    mutant: [], /* {
      name: 'Mutant',
      forgeLevel: 2,
    }, */
    elemental: [], /* {
      name: 'Elemental',
      forgeLevel: 3,
    }, */
    spirit: [
      {
        word: 'soul',
        elements: ['life', 'air'],
      },
      {
        word: 'spirit',
        elements: ['life', 'air'],
      },
    ],
    ooze: [], /* {
      name: 'Ooze',
      forgeLevel: 3,
    }, */
    undead: [
      {
        word: 'zombie',
        elements: ['death'],
      },
      {
        word: 'ghoul',
        elements: ['death'],
      },
      {
        word: 'skeleton',
      },
    ],
    shade: [], /* {
      name: 'Shade',
      forgeLevel: 3,
    }, */
    golem: [], /* {
      name: 'Golem',
      forgeLevel: 3,
    }, */
    fairy: [], /* {
      name: 'Fairy',
      forgeLevel: 3,
    }, */
    chimera: [], /* {
      name: 'Chimera',
      forgeLevel: 3,
    }, */
    kraken: [], /* {
      name: 'Kraken',
      forgeLevel: 4,
    }, */
    dragon: [], /* {
      name: 'Dragon',
      forgeLevel: 4,
    }, */
    angel: [], /* {
      name: 'Angel',
      forgeLevel: 4,
    }, */
    demon: [], /* {
      name: 'Demon',
      forgeLevel: 4,
    }, */
    demigod: [], /* {
      name: 'Demigod',
      forgeLevel: 4,
    }, */
    god: [], /* {
      name: 'God',
      forgeLevel: 5,
    }, */
    primordial: [], /* {
      name: 'Primordial',
      forgeLevel: 5,
    }, */
  },
  other: [
    {
      word: 'exctinction',
      forgeRange: '2-5',
    },
    {
      word: 'alacrity',
      forgeRange: '2-5',
    },
    {
      word: 'souls',
      forgeRange: '2-5',
    },
    {
      word: 'happiness',
      forgeRange: '2-5',
    },
    {
      word: 'hunger',
      forgeRange: '2-5',
    },
    {
      word: 'thirst',
      forgeRange: '2-5',
    },
    {
      word: 'fear',
      forgeRange: '2-5',
    },
    {
      word: 'rage',
      forgeRange: '2-5',
    },
    {
      word: 'love',
      forgeRange: '2-5',
    },
    {
      word: 'hate',
      forgeRange: '2-5',
    },
    {
      word: 'lust',
      forgeRange: '2-5',
    },
    {
      word: 'greed',
      forgeRange: '2-5',
    },
    {
      word: 'gluttony',
      forgeRange: '2-5',
    },
    {
      word: 'envy',
      forgeRange: '2-5',
    },
    {
      word: 'sloth',
      forgeRange: '2-5',
    },
    {
      word: 'wrath',
      forgeRange: '2-5',
    },
    {
      word: 'pride',
      forgeRange: '2-5',
    },
    {
      word: 'justice',
      forgeRange: '2-5',
    },
    {
      word: 'peace',
      forgeRange: '2-5',
    },
    {
      word: 'war',
      forgeRange: '2-5',
    },
    {
      word: 'chaos',
      forgeRange: '2-5',
    },
    {
      word: 'order',
      forgeRange: '2-5',
    },
    {
      word: 'balance',
      forgeRange: '2-5',
    },
    {
      word: 'life',
      forgeRange: '2-5',
    },
    {
      word: 'death',
      forgeRange: '2-5',
    },
    {
      word: 'time',
      forgeRange: '2-5',
    },
    {
      word: 'space',
      forgeRange: '2-5',
    },
    {
      word: 'reality',
      forgeRange: '2-5',
    },
  ],
};

const warriorUnitTypes = [
  'human',
  'bird',
  'insect',
  'ape',
  'beast',
  'dwarf',
  'elf',
  'orc',
  'goblin',
  'undead',
  'giant',
  'fairy',
  'harpy',
  'merfolk',
  'centaur',
  'minotaur',
  'dragonling',
  'robot',
  'shade',
  'phoenix',
  'unicorn',
  'cyclops',
];

const warriorPassiveEffects = [
  'none',
  'ranged',
  'siege',
  'taunting',
  'challenger',
  'berserker',
  'fearsome',
  'vampiric',
  'deadly',
  'swift',
  'slow',
  'big',
  'huge',
  'pierce',
  'splash',
];

const engineerUnitTypes = [
  'human',
  'dwarf',
  'elf',
  'goblin',
  'fairy',
  'merfolk',
  'centaur',
  'wizard',
  'robot',
  'djinn',
];

// @TODO Do all the list! Define each tribe with lore
const nouns = [
  {
    word: 'warrior',
    minAttack: 2,
    profession: true,
    unitTypes: warriorUnitTypes,
    passiveEffects: warriorPassiveEffects,
    elements: 'all',
    effectKeywords: ['dealDamage', 'fight', 'destroy'],
  },
  {
    word: 'warmaster',
    minRarity: 2,
    minAttack: 3,
    profession: true,
    unitTypes: warriorUnitTypes,
    passiveEffects: warriorPassiveEffects,
    elements: 'all',
    effectKeywords: ['dealDamage', 'fight', 'destroy'],
    // Warmaster are sorta battlecries and morale boosters
    // So ongoing stat change is also their thing
    // Also, if they give passive any warriorPassiveEffects to
    // other units, they are in theme.
  },
  {
    word: 'battlemaster',
    minRarity: 2,
    minAttack: 3,
    profession: true,
    unitTypes: warriorUnitTypes,
    passiveEffects: warriorPassiveEffects,
    elements: 'all',
    effectKeywords: ['dealDamage', 'fight', 'destroy'],
  },
  {
    word: 'engineer',
    minRarity: 2,
    profession: true,
    unitTypes: engineerUnitTypes,
    passiveEffects: 'all',
    // @TODO Will they only summon and create tech stuff?
    // Are creations bound to the caster element by default?
    elements: ['tech'],
    effectKeywords: ['summon', 'create'],
  }
];

module.exports = nouns;
