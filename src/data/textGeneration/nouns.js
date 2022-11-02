const nouns = {
  main: {
    human: [
      {
        value: 'warrior',
        attackRange: '2-x',
        profession: true,
      },
      {
        value: 'warmaster',
        attackRange: '3-x',
        profession: true,
      },
      {
        value: 'battlemaster',
        attackRange: '3-x',
        profession: true,
      },
      {
        value: 'engineer',
        keywords: ['summon', 'building', 'civic'],
        attackRange: '0-2',
        profession: true,
      },
      {
        value: 'architect',
        keywords: ['summon', 'building', 'civic'],
        attackRange: '0-1',
        profession: true,
      },
      {
        value: 'specialist',
        keywords: ['summon', 'civic'],
        attackRange: '0-2',
        profession: true,
      },
      {
        value: 'berserker',
        attackRange: '2-x',
        profession: true,
        keywords: ['berserk'],
      },
      {
        value: 'mercenary',
        attackRange: '2-x',
        profession: true,
      },
      {
        value: 'guard',
        attackRange: '2-6',
        profession: true,
      },
      {
        value: 'knight',
        attackRange: '2-x',
        profession: true,
      },
      {
        value: 'defender',
        attackRange: '2-x',
        keywords: ['shield', 'armor', 'barrier', 'cast'],
        profession: true,
      },
      {
        value: 'protector',
        keywords: ['shield', 'armor', 'barrier', 'cast'],
        elements: ['any'],
        profession: true,
      },
      {
        value: 'warden',
        attackRange: '2-x',
        keywords: ['shield', 'armor', 'barrier', 'cast'],
        profession: true,
      },
      {
        value: 'warder',
        attackRange: '2-x',
        keywords: ['shield', 'armor', 'barrier', 'cast'],
        profession: true,
      },
      {
        value: 'sentinel',
        attackRange: '2-x',
        keywords: ['shield', 'armor', 'barrier', 'cast'],
        profession: true,
      },
      {
        value: 'champion',
        attackRange: '5-x',
        profession: true,
      },
      {
        value: 'villager',
        attackRange: '0-2',
        profession: true,
      },
      {
        value: 'fool',
        attackRange: '0',
        profession: true,
      },
      {
        value: 'taskmaster',
        attackRange: '1-4',
        profession: true,
      },
      {
        value: 'slave',
        attackRange: '0-2',
        profession: true,
      },
      {
        value: 'suspect',
        attackRange: '0-2',
        profession: true,
      },
      {
        value: 'prisoner',
        profession: true,
      },
      {
        value: 'peon',
        attackRange: '0-3',
        profession: true,
      },
      {
        value: 'grunt',
        attackRange: '1-4',
        profession: true,
      },
      {
        value: 'janitor',
        attackRange: '0-1',
        keywords: ['civic'],
        profession: true,
      },
      {
        value: 'cleaner',
        attackRange: '0-1',
        keywords: ['civic'],
        profession: true,
      },
      {
        value: 'dancer',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
      },
      {
        value: 'performer',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
      },
      {
        value: 'actor',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
        gender: 'male',
      },
      {
        value: 'actress',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
        gender: 'female',
      },
      {
        value: 'painter',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
      },
      {
        value: 'singer',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
      },
      {
        value: 'juggler',
        attackRange: '0-1',
        keywords: ['buff', 'civic'],
        profession: true,
      },
      {
        value: 'puppeteer',
        attackRange: '0-1',
        keywords: ['summon', 'civic'],
        profession: true,
      },
      {
        value: 'bard',
        keywords: ['buff', 'heal'],
        profession: true,
      },
      {
        value: 'peasant',
        attackRange: '0-2',
        keywords: ['civic'],
        profession: true,
      },
      {
        value: 'plumber',
        attackRange: '0-2',
        keywords: ['civic'],
        elements: ['water'],
        profession: true,
      },
      {
        value: 'gardener',
        attackRange: '0-2',
        keywords: ['civic'],
        elements: ['earth'],
        profession: true,
      },
      {
        value: 'farmer',
        attackRange: '0-2',
        keywords: ['civic'],
        elements: ['earth'],
        profession: true,
      },
      {
        value: 'informant',
        attackRange: '0-2',
        keywords: ['civic'],
        profession: true,
      },
      {
        value: 'noble',
        keywords: ['earn', 'buff'],
        minRarity: 2,
        profession: true,
      },
      {
        value: 'lord',
        keywords: ['earn', 'buff'],
        minRarity: 3,
        profession: true,
      },
      {
        value: 'teacher',
        attackRange: '0-2',
        keywords: ['summon', 'buff', 'civic'],
        profession: true,
      },
      {
        value: 'blacksmith',
        attackRange: '1-3',
        keywords: ['weapon', 'buff', 'civic'],
        profession: true,
      },
      {
        value: 'librarian',
        attackRange: '0-2',
        keywords: ['invest', 'discover', 'civic'],
        profession: true,
      },
      {
        value: 'banker',
        attackRange: '0-2',
        keywords: ['invest', 'earn', 'civic'],
        profession: true,
      },
      {
        value: 'investor',
        attackRange: '0-2',
        keywords: ['invest', 'civic'],
        profession: true,
      },
      {
        value: 'shopkeeper',
        attackRange: '0-2',
        keywords: ['invest', 'earn', 'discover', 'summon', 'civic'],
        profession: true,
      },
      {
        value: 'merchant',
        keywords: ['invest', 'earn', 'discover', 'summon', 'civic'],
        profession: true,
      },
      {
        value: 'trader',
        keywords: ['invest', 'earn', 'discover', 'summon', 'civic'],
        profession: true,
      },
      {
        value: 'importer',
        attackRange: '0-2',
        keywords: ['invest', 'earn', 'discover', 'summon', 'civic'],
        profession: true,
      },
      {
        value: 'auctioneer',
        attackRange: '0-2',
        keywords: ['invest', 'earn', 'civic'],
        profession: true,
      },
      {
        value: 'hoarder',
        keywords: ['invest', 'earn'],
        profession: true,
      },
      {
        value: 'doctor',
        attackRange: '0-2',
        keywords: ['heal', 'damage'],
        profession: true,
      },
      {
        value: 'alchemist',
        keywords: ['heal', 'damage'],
        elements: ['none', 'blood', 'toxic', 'life', 'death'],
        profession: true,
      },
      {
        value: 'acolyte',
        elements: ['any'],
        profession: true,
      },
      {
        value: 'cook',
        attackRange: '0-2',
        keywords: ['heal', 'damage', 'civic'],
        profession: true,
      },
      {
        value: 'chef',
        attackRange: '0-2',
        keywords: ['heal', 'damage', 'civic'],
        profession: true,
      },
      {
        value: 'baker',
        attackRange: '0-2',
        keywords: ['heal', 'damage', 'civic'],
        profession: true,
      },
      {
        value: 'brewmaster',
        attackRange: '0-2',
        keywords: ['heal', 'damage', 'civic'],
        profession: true,
      },
      {
        value: 'bomber',
        attackRange: '0-2',
        keywords: ['damage'],
        profession: true,
      },
      {
        value: 'trapper',
        keywords: ['secret', 'surprise'],
        profession: true,
      },
      {
        value: 'leader',
        keywords: ['summon', 'buff'],
        profession: true,
      },
      {
        value: 'centurion',
        keywords: ['summon', 'buff'],
        profession: true,
      },
      {
        value: 'officer',
        keywords: ['summon', 'buff'],
        profession: true,
      },
      {
        value: 'marshal',
        keywords: ['summon', 'buff'],
        maxForgeLevel: 1,
        profession: true,
      },
      {
        value: 'sergeant',
        keywords: ['buff'],
        maxForgeLevel: 1,
        profession: true,
      },
      {
        value: 'quartermaster',
        keywords: ['buff'],
        maxForgeLevel: 2,
        profession: true,
      },
      {
        value: 'commander',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 1,
        maxForgeLevel: 3,
        profession: true,
      },
      {
        value: 'captain',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 2,
        maxForgeLevel: 3,
        profession: true,
      },
      {
        value: 'chief',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 2,
        maxForgeLevel: 4,
        profession: true,
      },
      {
        value: 'colonel',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 3,
        maxForgeLevel: 4,
        profession: true,
      },
      {
        value: 'lieutenant',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 3,
        profession: true,
      },
      {
        value: 'general',
        attackRange: '2-x',
        keywords: ['buff'],
        minForgeLevel: 4,
        profession: true,
      },
      {
        value: 'diver',
        profession: true,
      },
      {
        value: 'explorer',
        attackRange: '0-2',
        keywords: ['scout'],
        profession: true,
      },
      {
        value: 'gossiper',
        attackRange: '0-1',
        keywords: ['scout', 'civic'],
        profession: true,
      },
      {
        value: 'seer',
        attackRange: '1-3',
        keywords: ['cast', 'scout', 'secret', 'civic'],
        profession: true,
      },
      {
        value: 'seeker',
        attackRange: '1-3',
        keywords: ['cast', 'scout', 'secret', 'civic'],
        profession: true,
      },
      {
        value: 'sailor',
        keywords: ['scout'],
        profession: true,
      },
      {
        value: 'scout',
        keywords: ['scout'],
        profession: true,
      },
      {
        value: 'spy',
        keywords: ['scout', 'secret'],
        profession: true,
      },
      {
        value: 'operative',
        keywords: ['scout', 'secret'],
        profession: true,
      },
      {
        value: 'archer',
        attackRange: '2-x',
        keywords: ['ranged'],
        profession: true,
      },
      {
        value: 'hunter',
        attackRange: '1-x',
        keywords: ['ranged', 'stealth', 'secret'],
        profession: true,
      },
      {
        value: 'infiltrator',
        keywords: ['stealth'],
        profession: true,
      },
      {
        value: 'scoundrel',
        keywords: ['stealth'],
        profession: true,
      },
      {
        value: 'assasssin',
        keywords: ['stealth', 'damage'],
        profession: true,
      },
      {
        value: 'gnome',
      },
      {
        value: 'elf',
      },
      {
        value: 'dwarf',
      },
      {
        value: 'goblin',
      },
      {
        value: 'gremlin',
      },
      {
        value: 'orc',
      },
      {
        value: 'giant',
        keywords: ['big', 'huge', 'titan'],
      },
      {
        value: 'titan',
        keywords: ['titan'],
      },
      {
        value: 'raider',
        profession: true,
      },
      {
        value: 'wizard',
        profession: true,
        keywords: ['cast', 'summon'],
        elemnts: ['any'],
      },
      {
        value: 'summoner',
        profession: true,
        keywords: ['cast', 'summon'],
        elemnts: ['any'],
      },
      {
        value: 'sorcerer',
        profession: true,
        gender: 'male',
        keywords: ['cast', 'summon'],
        elemnts: ['any'],
      },
      {
        value: 'sorceress',
        profession: true,
        gender: 'female',
        keywords: ['cast', 'summon'],
        elemnts: ['any'],
      },
      {
        value: 'mage',
        profession: true,
        keywords: ['cast', 'summon'],
        elemnts: ['any'],
      },
      {
        value: 'caster',
        profession: true,
        keywords: ['cast', 'summon'],
        elemnts: ['any'],
      },
      {
        value: 'pyromancer',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['fire'],
      },
      {
        value: 'cryomancer',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['ice'],
      },
      {
        value: 'druid',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['earth', 'water', 'air', 'life'],
      },
      {
        value: 'priest',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['life'],
      },
      {
        value: 'necromancer',
        profession: true,
        keywords: ['cast', 'summon'],
        elements: ['death'],
      },
      {
        value: 'arcanist',
        profession: true,
        keywords: ['cast', 'summon'],
        elemnts: ['any'],
      },
      {
        value: 'herald',
        attackRange: '2-x',
        keywords: ['cast', 'scout'],
        elements: ['any'],
        profession: true,
      },
    ],
    bird: {
      name: 'Bird',
      forgeLevel: 1,
    },
    insect: {
      name: 'Insect',
      forgeLevel: 1,
    },
    ape: {
      name: 'Ape',
      forgeLevel: 1,
    },
    beast: {
      name: 'Beast',
      forgeLevel: 1,
    },
    reptile: {
      name: 'Reptile',
      forgeLevel: 1,
    },
    fish: {
      name: 'Fish',
      forgeLevel: 1,
    },
    tree: {
      name: 'Tree',
      forgeLevel: 2,
    },
    fungus: {
      name: 'Fungus',
      forgeLevel: 2,
    },
    drone: {
      name: 'Drone',
      forgeLevel: 2,
    },
    dinosaur: {
      name: 'Dinosaur',
      forgeLevel: 2,
    },
    mutant: {
      name: 'Mutant',
      forgeLevel: 2,
    },
    elemental: {
      name: 'Elemental',
      forgeLevel: 3,
    },
    spirit: [
      {
        value: 'soul',
        elements: ['life', 'air'],
      },
      {
        value: 'spirit',
        elements: ['life', 'air'],
      },
    ],
    ooze: {
      name: 'Ooze',
      forgeLevel: 3,
    },
    undead: [
      {
        value: 'zombie',
        elements: ['death'],
      },
      {
        value: 'ghoul',
        elements: ['death'],
      },
      {
        value: 'skeleton',
      },
    ],
    shade: {
      name: 'Shade',
      forgeLevel: 3,
    },
    golem: {
      name: 'Golem',
      forgeLevel: 3,
    },
    fairy: {
      name: 'Fairy',
      forgeLevel: 3,
    },
    chimera: {
      name: 'Chimera',
      forgeLevel: 3,
    },
    kraken: {
      name: 'Kraken',
      forgeLevel: 4,
    },
    dragon: {
      name: 'Dragon',
      forgeLevel: 4,
    },
    angel: {
      name: 'Angel',
      forgeLevel: 4,
    },
    demon: {
      name: 'Demon',
      forgeLevel: 4,
    },
    demigod: {
      name: 'Demigod',
      forgeLevel: 4,
    },
    god: {
      name: 'God',
      forgeLevel: 5,
    },
    primordial: {
      name: 'Primordial',
      forgeLevel: 5,
    },
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
  ],
};

module.exports = nouns;
