// Although any passive effect is considered a tribe itself,
// tribes are also filters for some triggers and effects of the game
// These tribes may also have slight modificators to their
// stats or forge weights. We'll see

const unitTypes = {
  // Default
  human: {
    name: 'Human',
  },

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
  spirit: {
    name: 'Spirit',
    forgeLevel: 3,
  },
  ooze: {
    name: 'Ooze',
    forgeLevel: 3,
  },
  undead: {
    name: 'Undead',
    forgeLevel: 3,
  },
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
};

module.exports = unitTypes;
