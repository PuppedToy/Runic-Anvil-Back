const unitTypeGroups = {
  humanoid: {
    key: 'humanoid',
    types: [
      'human',
      'dwarf',
      'elf',
      'orc',
      'merfolk',
      'goblin',
    ],
  },
  tree: {
    key: 'tree',
    types: [
      'treant',
      'ent',
    ],
  },
  legendary: {
    key: 'legendary',
    types: [
      'dragon',
      'demon',
      'angel',
    ],
  },
  supreme: {
    key: 'supreme',
    types: [
      'god',
      'primordial',
    ],
  },
};

// All forge 0 units are considered basic regoinless cards
const unitTypes = {
  human: {
    key: 'human',
  },
  dwarf: {
    key: 'dwarf',
  },
  elf: {
    key: 'elf',
  },
  orc: {
    key: 'orc',
  },
  merfolk: {
    key: 'merfolk',
  },
  goblin: {
    key: 'goblin',
  },
  bird: {
    key: 'bird',
    evolutions: [
      {
        key: 'griffin',
        forgeLevel: 2,
      },
      {
        key: 'phoenix',
        forgeLevel: 3,
      },
    ],
  },
  insect: {
    key: 'insect',
    evolutions: [
      'ant',
      'bee',
      {
        key: 'spider',
        forgeLevel: 2,
      },
      {
        key: 'scorpion',
        forgeLevel: 2,
      },
    ],
  },
  ape: {
    key: 'ape',
    evolutions: [
      'gorilla',
      {
        key: 'yeti',
        forgeLevel: 2,
      },
    ],
  },
  beast: {
    key: 'beast',
    evolutions: [
      'wolf',
      {
        key: 'dinosaur',
        forgeLevel: 2,
      },
      {
        key: 'chimera',
        forgeLevel: 2,
      },
      {
        key: 'hydra',
        forgeLevel: 3,
      },
      {
        key: 'behemoth',
        forgeLevel: 3,
      },
      {
        key: 'unicorn',
        forgeLevel: 3,
      },
    ],
  },
  reptile: {
    key: 'reptile',
    evolutions: [
      'turtle',
      {
        key: 'dragonling',
        forgeLevel: 2,
      },
      {
        key: 'basilisk',
        forgeLevel: 3,
      },
    ],
  },
  fish: {
    key: 'fish',
    forgeLevel: 1,
    evolutions: [
      'shark',
      {
        key: 'whale',
        forgeLevel: 2,
      },
      {
        key: 'kraken',
        forgeLevel: 3,
      },
      {
        key: 'leviathan',
        forgeLevel: 3,
      },
    ],
  },
  plant: {
    key: 'plant',
    evolutions: [
      'mushroom',
      'flower',
      {
        key: 'treant',
        forgeLevel: 2,
      },
      {
        key: 'ent',
        forgeLevel: 3,
      },
    ],
  },
  undead: {
    key: 'undead',
    forgeLevel: 1,
    // evolutions: [
    //   'skeleton',
    //   'zombie',
    //   'ghoul',
    // ],
  },
  mech: {
    key: 'mech',
    forgeLevel: 1,
    evolutions: [
      'golem',
      'robot',
      {
        key: 'droid',
        forgeLevel: 3,
      },
    ],
  },
  imp: {
    key: 'imp',
    forgeLevel: 1,
  },
  fairy: {
    key: 'fairy',
    forgeLevel: 1,
  },
  elemental: {
    key: 'elemental',
    forgeLevel: 1,
  },
  spirit: {
    key: 'spirit',
    forgeLevel: 1,
    evolutions: [
      'ghost',
      'nymph',
      {
        key: 'djinn',
        forgeLevel: 3,
      },
    ],
  },
  giant: {
    key: 'giant',
    forgeLevel: 1,
    evolutions: [
      // 'troll',
      // 'ogre',
      'cyclops',
    ],
  },
  ooze: {
    key: 'ooze',
    forgeLevel: 1,
  },
  dragon: {
    key: 'dragon',
    forgeLevel: 4,
  },
  demon: {
    key: 'demon',
    forgeLevel: 4,
  },
  angel: {
    key: 'angel',
    forgeLevel: 4,
  },
  god: {
    key: 'god',
    forgeLevel: 5,
  },
  primordial: {
    key: 'primordial',
    forgeLevel: 5,
  },
  voidspawn: {
    key: 'voidspawn',
    // 7 because it is forbidden
    forgeLevel: 7,
    evolutions: [
      'voidlord',
      'walker',
    ],
  },
};

module.exports = {
  unitTypes,
  unitTypeGroups,
};
