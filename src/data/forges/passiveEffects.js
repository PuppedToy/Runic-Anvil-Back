/* eslint-disable max-len */
const { constants } = require('../enums');

const passiveEffects = {
  ranged: {
    key: 'ranged',
    costModificator: ({ cost, attack, hp }) => cost
      + (attack * constants.CARD_PRICE_PER_ATTACK_POINT)
      - (hp * constants.CARD_PRICE_PER_HP_POINT) / 2,
    unitTypes: [
      {
        key: 'insect',
        chance: 1,
      },
      {
        key: 'elf',
        chance: 1,
      },
      {
        key: 'centaur',
        chance: 1,
      },
      {
        key: 'wizard',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
      {
        key: 'beast',
        chance: 0.1,
      },
      {
        key: 'bird',
        chance: 0.1,
      },
      {
        key: 'undead',
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
        key: 'minotaur',
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
        key: 'cyclops',
        chance: 0.1,
      },
      {
        key: 'leviathan',
        chance: 0.1,
      },
    ],
  },
  siege: {
    key: 'siege',
    costModificator: ({ cost }) => Math.max(0, cost - 100),
    unitTypes: [
      {
        key: 'wizard',
        chance: 1,
      },
      {
        key: 'giant',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
      {
        key: 'reptile',
        chance: 0.1,
      },
      {
        key: 'bird',
        chance: 0.1,
      },
      {
        key: 'undead',
        chance: 0.1,
      },
      {
        key: 'spirit',
        chance: 0.1,
      },
    ],
  },
  // building: {
  //   name: 'Building',
  //   description: 'The unit can be deployed in any zone, but after that, it can\'t be moved nor forced to move. The unit is immune to betray effect.',
  //   costModificator: ({ cost }) => cost - 100,
  // },
  taunting: {
    key: 'taunting',
    costModificator: ({ cost }) => cost + 40,
    elements: [
      {
        key: 'earth',
        chance: 1,
      },
      {
        key: 'nature',
        chance: 0.5,
      },
      {
        key: 'light',
        chance: 0.5,
      },
      {
        key: 'psychic',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      },
    ],
    unitTypes: [
      {
        key: 'giant',
        chance: 1,
      },
      {
        key: 'dragon',
        chance: 1,
      },
      {
        key: 'tree',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
      {
        key: 'reptile',
        chance: 0.1,
      },
      {
        key: 'goblin',
        chance: 0.1,
      },
      {
        key: 'fairy',
        chance: 0.1,
      },
      {
        key: 'shade',
        chance: 0.1,
      },
      {
        key: 'harpy',
        chance: 0.1,
      },
    ]
  },
  challenger: {
    key: 'challenger',
    costModificator: ({ cost }) => cost + 100,
    forgeLevel: 2,
    elements: [
      {
        key: 'light',
        chance: 1,
      },
      {
        key: 'psychic',
        chance: 1,
      },
      {
        key: 'earth',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      },
    ],
    unitTypes: [
      {
        key: 'ape',
        chance: 1,
      },
      {
        key: 'orc',
        chance: 1,
      },
      {
        key: 'angel',
        chance: 1,
      },
      {
        key: 'minotaur',
        chance: 1,
      },
      {
        key: 'dragon',
        chance: 1,
      },
      {
        key: 'god',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
      {
        key: 'bird',
        chance: 0.1,
      },
      {
        key: 'reptile',
        chance: 0.1,
      },
      {
        key: 'undead',
        chance: 0.1,
      },
      {
        key: 'giant',
        chance: 0.1,
      },
      {
        key: 'shade',
        chance: 0.1,
      },
    ],
  },
  // wall: {
  //   name: 'Wall',
  //   description: 'Every wall is also considered a building. Walls will grant cover to any unit behind them and they are stacked. Every keep has by default two walls.',
  //   costModificator: ({ cost }) => cost,
  // },
  // civic: {
  //   name: 'Civic',
  //   description: 'This unit can\'t go to war nor defend unless there are no walls left.',
  //   costModificator: ({ cost }) => cost - 100,
  // },
  // heavy: {
  //   name: 'Heavy',
  //   description: 'This unit can\'t be forced to move.',
  //   costModificator: ({ cost }) => cost + 25,
  // },
  // technician: {
  //   name: 'Technician',
  //   description: 'The unit is considered civic and heavy. If somehow, it is moved out of barracks, it will be forced immediately to move to barracks if possible, forcing any non-technician to move to the closest available zone.',
  //   costModificator: ({ cost }) => cost - 200,
  //   forgeLevel: 2,
  // },
  // stealth: {
  //   name: 'Stealth',
  //   description: 'At deployment, the unit is not revealed. Whenever this unit is engaged in combat or triggers one triggerable effect, the unit is revealed and loses Stealth. While in stealth and siege, this unit ignores the first wall.',
  //   costModificator: ({ cost }) => cost + 100,
  //   forgeLevel: 2,
  // },
  berserker: {
    key: 'berserker',
    costModificator: ({ cost }) => Math.max(0, cost - 60),
    elements: [
      {
        key: 'fire',
        chance: 1,
      },
      {
        key: 'earth',
        chance: 0.5,
      },
      {
        key: 'air',
        chance: 0.5,
      },
      {
        key: 'tech',
        chance: 0.5,
      },
      {
        key: 'nature',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      },
    ],
    unitTypes: [
      {
        key: 'ape',
        chance: 1,
      },
      {
        key: 'insect',
        chance: 1,
      },
      {
        key: 'dinosaur',
        chance: 1,
      },
      {
        key: 'behemoth',
        chance: 1,
      },
      {
        key: 'orc',
        chance: 1,
      },
      {
        key: 'walker',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
      {
        key: 'reptile',
        chance: 0.1,
      },
      {
        key: 'tree',
        chance: 0.1,
      },
      {
        key: 'fairy',
        chance: 0.1,
      },
      {
        key: 'angel',
        chance: 0.1,
      },
    ],
  },
  fearful: {
    key: 'fearful',
    costModificator: ({ cost }) => Math.max(0, cost - 40),
    forgeLevel: 2,
    elements: [
      {
        key: 'water',
        chance: 1,
      },
      {
        key: 'nature',
        chance: 0.5,
      },
      {
        key: 'toxic',
        chance: 0.5,
      },
      {
        key: 'shadow',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      }
    ],
    unitTypes: [
      {
        key: 'insect',
        chance: 1,
      },
      {
        key: 'fish',
        chance: 1,
      },
      {
        key: 'spirit',
        chance: 1,
      },
      {
        key: 'fairy',
        chance: 1,
      },
      {
        key: 'unicorn',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
      {
        key: 'orc',
        chance: 0.1,
      },
      {
        key: 'tree',
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
      {
        key: 'god',
        chance: 0.1,
      },
    ],
  },
  fearsome: {
    key: 'fearsome',
    costModificator: ({ cost }) => cost + 60,
    forgeLevel: 2,
    elements: [
      {
        key: 'shadow',
        chance: 1,
      },
      {
        key: 'psychic',
        chance: 0.5,
      },
      {
        key: 'light',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      },
    ],
    unitTypes: [
      {
        key: 'undead',
        chance: 1,
      },
      {
        key: 'reptile',
        chance: 1,
      },
      {
        key: 'shade',
        chance: 1,
      },
      {
        key: 'kraken',
        chance: 1,
      },
      {
        key: 'hydra',
        chance: 1,
      },
      {
        key: 'behemoth',
        chance: 1,
      },
      {
        key: 'leviathan',
        chance: 1,
      },
      {
        key: 'dragon',
        chance: 1,
      },
      {
        key: 'angel',
        chance: 1,
      },
      {
        key: 'demon',
        chance: 1,
      },
      {
        key: 'god',
        chance: 1,
      },
      {
        key: 'walker',
        chance: 1,
      },
      {
        key: 'minotaur',
        chance: 0.7,
      },
      {
        key: 'robot',
        chance: 0.7,
      },
      {
        key: 'djinn',
        chance: 0.7,
      },
      {
        key: 'chimera',
        chance: 0.7,
      },
      {
        key: 'giant',
        chance: 0.7,
      },
      {
        key: 'cyclops',
        chance: 0.7,
      },
      {
        key: 'voidling',
        chance: 0.7,
      },
      {
        key: 'any',
        chance: 0.3,
      },
    ],
  },
  // versatile: {
  //   name: 'Versatile',
  //   description: 'This unit is considered both melee and ranged.',
  //   costModificator: ({ cost }) => cost + 200,
  //   forgeLevel: 2,
  // },
  // reinforcement: {
  //   name: 'Reinforcement',
  //   description: 'The unit can be deployed before war or siege starts -both attacking or defending-. If at war phase, it will join the attack as the last unit of their layer.',
  //   costModificator: ({ cost }) => cost + 100,
  // },
  // invisible: {
  //   name: 'Invisible',
  //   description: 'This unit can\'t be eligible as target for any effect unless the effect specifies it can. This unit can\'t be blocked.',
  //   costModificator: ({ cost }) => cost + 200,
  //   forgeLevel: 3,
  // },
  vampiric: {
    key: 'vampiric',
    costModificator: ({ cost, attack, hp }) => cost + attack * 20 + hp * 20,
    forgeLevel: 2,
    elements: [
      {
        key: 'nature',
        chance: 1,
      },
      {
        key: 'water',
        chance: 0.5,
      },
      {
        key: 'shadow',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      },
    ],
    unitTypes: [
      {
        key: 'insect',
        chance: 1,
      },
      {
        key: 'spirit',
        chance: 1,
      },
      {
        key: 'ooze',
        chance: 1,
      },
      {
        key: 'demon',
        chance: 1,
      },
      {
        key: 'god',
        chance: 0.5,
      },
      {
        key: 'undead',
        chance: 0.5,
      },
      {
        key: 'tree',
        chance: 0.5,
      },
      {
        key: 'reptile',
        chance: 0.5,
      },
      {
        key: 'wizard',
        chance: 0.5,
      },
      {
        key: 'djinn',
        chance: 0.5,
      },
      {
        key: 'shade',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      },
    ]
  },
  deadly: {
    key: 'deadly',
    costModificator: ({ cost, attack }) => cost + (attack > 0 ? 300 : 100) - (attack * constants.CARD_PRICE_PER_ATTACK_POINT) / 2,
    forgeLevel: 3,
    elements: [
      {
        key: 'toxic',
        chance: 1,
      },
      {
        key: 'shadow',
        chance: 0.5,
      },
      {
        key: 'tech',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      },
    ],
    unitTypes: [
      {
        key: 'reptile',
        chance: 1,
      },
      {
        key: 'insect',
        chance: 1,
      },
      {
        key: 'robot',
        chance: 1,
      },
      {
        key: 'elf',
        chance: 1,
      },
      {
        key: 'demon',
        chance: 1,
      },
      {
        key: 'tree',
        chance: 0.5,
      },
      {
        key: 'golem',
        chance: 0.5,
      },
      {
        key: 'djinn',
        chance: 0.5,
      },
      {
        key: 'wizard',
        chance: 0.5,
      },
      {
        key: 'harpy',
        chance: 0.5,
      },
      {
        key: 'goblin',
        chance: 0.5,
      },
      {
        key: 'dragon',
        chance: 0.5,
      },
      {
        key: 'god',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      },
    ],
  },
  // barrier: {
  //   name: 'Barrier',
  //   description: 'The unit is immune to the next damage received. The unit loses barrier as soon as some damage is prevented.',
  //   costModificator: ({ cost, attack }) => cost + attack * 15,
  // },
  // warrior: {
  //   name: 'Warrior',
  //   description: 'When fighting, the unit and its opponent will strike until one of them is destroyed.',
  //   costModificator: ({ cost }) => cost + 50,
  // },
  swift: {
    key: 'swift',
    costModificator: ({ cost, attack }) => cost + attack * constants.CARD_PRICE_PER_ATTACK_POINT,
    forgeLevel: 2,
    elements: [
      {
        key: 'air',
        chance: 1
      },
      {
        key: 'time',
        chance: 1
      },
      {
        key: 'light',
        chance: 0.5,
      },
      {
        key: 'tech',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      },
      {
        key: 'earth',
        chance: 0,
      },
    ],
    unitTypes: [
      {
        key: 'bird',
        chance: 1,
      },
      {
        key: 'insect',
        chance: 1,
      },
      {
        key: 'reptile',
        chance: 1,
      },
      {
        key: 'beast',
        chance: 1,
      },
      {
        key: 'fish',
        chance: 1,
      },
      {
        key: 'elf',
        chance: 1,
      },
      {
        key: 'merfolk',
        chance: 1,
      },
      {
        key: 'fairy',
        chance: 1,
      },
      {
        key: 'harpy',
        chance: 1,
      },
      {
        key: 'dragonling',
        chance: 1,
      },
      {
        key: 'phoenix',
        chance: 1,
      },
      {
        key: 'shade',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
      {
        key: 'tree',
        chance: 0.1,
      },
      {
        key: 'giant',
        chance: 0.1,
      },
      {
        key: 'ooze',
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
        key: 'walker',
        chance: 0.1,
      },
    ],
  },
  slow: {
    key: 'slow',
    costModificator: ({ cost, attack, hp }) => cost - attack * Math.floor(constants.CARD_PRICE_PER_ATTACK_POINT / 2) - hp * Math.floor(constants.CARD_PRICE_PER_HP_POINT / 2),
    forgeLevel: 2,
    elements: [
      {
        key: 'earth',
        chance: 1,
      },
      {
        key: 'tech',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.2,
      },
      {
        key: 'air',
        chance: 0,
      },
      {
        key: 'time',
        chance: 0,
      },
    ],
    unitTypes: [
      {
        key: 'reptile',
        chance: 1,
      },
      {
        key: 'tree',
        chance: 1,
      },
      {
        key: 'giant',
        chance: 1,
      },
      {
        key: 'ooze',
        chance: 1,
      },
      {
        key: 'behemoth',
        chance: 1,
      },
      {
        key: 'leviathan',
        chance: 1,
      },
      {
        key: 'walker',
        chance: 1,
      },
      {
        key: 'fish',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
      {
        key: 'bird',
        chance: 0.1,
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
        key: 'fairy',
        chance: 0.1,
      },
      {
        key: 'harpy',
        chance: 0.1,
      },
      {
        key: 'phoenix',
        chance: 0.1,
      },
      {
        key: 'shade',
        chance: 0.1,
      },
      {
        key: 'unicorn',
        chance: 0.1,
      },
    ],
  },
  // haste: {
  //   name: 'Haste',
  //   description: 'When deployed, this unit can be placed in any of the keep zones.',
  //   costModificator: ({ cost }) => cost + 100,
  // },
  // vigorous: {
  //   name: 'Vigorous',
  //   description: 'At war, this unit will strike again in an extra round, after the war is resolved.',
  //   costModificator: ({ cost }) => cost + 25,
  // },
  big: {
    key: 'big',
    costModificator: ({ cost }) => cost * 1.25,
    forgeLevel: 2,
    elements: [
      {
        key: 'water',
        chance: 1,
      },
      {
        key: 'earth',
        chance: 1,
      },
      {
        key: 'nature',
        chance: 0.5,
      },
      {
        key: 'air',
        chance: 0.5,
      },
      {
        key: 'any',
        chance: 0.1,
      }
    ],
    unitTypes: [
      {
        key: 'tree',
        chance: 1,
      },
      {
        key: 'dinosaur',
        chance: 1,
      },
      {
        key: 'giant',
        chance: 1,
      },
      {
        key: 'cyclops',
        chance: 1,
      },
      {
        key: 'kraken',
        chance: 1,
      },
      {
        key: 'hydra',
        chance: 1,
      },
      {
        key: 'behemoth',
        chance: 1,
      },
      {
        key: 'leviathan',
        chance: 1,
      },
      {
        key: 'dragon',
        chance: 1,
      },
      {
        key: 'walker',
        chance: 1,
      },
      {
        key: 'ooze',
        chance: 0.5,
      },
      {
        key: 'golem',
        chance: 0.5,
      },
      {
        key: 'fish',
        chance: 0.5,
      },
      {
        key: 'demon',
        chance: 0.5,
      },
      {
        key: 'god',
        chance: 0.5,
      },
      {
        key: 'beast',
        chance: 0.5,
      },
      {
        key: 'ape',
        chance: 0.3,
      },
      {
        key: 'voidling',
        chance: 0.3,
      },
      {
        key: 'angel',
        chance: 0.3,
      },
      {
        key: 'reptile',
        chance: 0.3,
      },
      {
        key: 'phoenix',
        chance: 0.3,
      },
      {
        key: 'dragonling',
        chance: 0.3,
      },
      {
        key: 'robot',
        chance: 0.3,
      },
      {
        key: 'insect',
        chance: 0.1,
      },
      {
        key: 'unicorn',
        chance: 0.1,
      },
      {
        key: 'bird',
        chance: 0.1,
      },
      {
        key: 'undead',
        chance: 0.1,
      },
      {
        key: 'chimera',
        chance: 0.1,
      },
      {
        key: 'orc',
        chance: 0.1,
      },
      {
        key: 'elemental',
        chance: 0.1,
      },
      {
        key: 'harpy',
        chance: 0.1,
      },
      {
        key: 'minotaur',
        chance: 0.1,
      },
      {
        key: 'any',
        chance: 0,
      }
    ],
  },
  huge: {
    key: 'huge',
    requirement: 'big',
    costModificator: ({ cost }) => cost * 1.5,
    forgeLevel: 3,
    unitTypes: [
      {
        key: 'tree',
        chance: 1,
      },
      {
        key: 'dinosaur',
        chance: 1,
      },
      {
        key: 'kraken',
        chance: 1,
      },
      {
        key: 'hydra',
        chance: 1,
      },
      {
        key: 'behemoth',
        chance: 1,
      },
      {
        key: 'leviathan',
        chance: 1,
      },
      {
        key: 'dragon',
        chance: 1,
      },
      {
        key: 'walker',
        chance: 1,
      },
      {
        key: 'ooze',
        chance: 0.5,
      },
      {
        key: 'cyclops',
        chance: 0.5,
      },
      {
        key: 'giant',
        chance: 0.3,
      },
      {
        key: 'golem',
        chance: 0.3,
      },
      {
        key: 'fish',
        chance: 0.3,
      },
      {
        key: 'god',
        chance: 0.3,
      },
      {
        key: 'demon',
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
        key: 'voidling',
        chance: 0.1,
      },
      {
        key: 'reptile',
        chance: 0.1,
      },
      {
        key: 'robot',
        chance: 0.1,
      },
      {
        key: 'bird',
        chance: 0.1,
      },
      {
        key: 'undead',
        chance: 0.1,
      },
      {
        key: 'chimera',
        chance: 0.1,
      },
      {
        key: 'elemental',
        chance: 0.1,
      },
      {
        key: 'harpy',
        chance: 0.1,
      },
      {
        key: 'minotaur',
        chance: 0.1,
      },
      {
        key: 'any',
        chance: 0,
      }
    ],
  },
  titan: {
    key: 'titan',
    requirement: 'huge',
    costModificator: ({ cost }) => cost * 2,
    forgeLevel: 4,
    unitTypes: [
      {
        key: 'tree',
        chance: 1,
      },
      {
        key: 'kraken',
        chance: 1,
      },
      {
        key: 'behemoth',
        chance: 1,
      },
      {
        key: 'leviathan',
        chance: 1,
      },
      {
        key: 'dragon',
        chance: 1,
      },
      {
        key: 'walker',
        chance: 1,
      },
      {
        key: 'dinosaur',
        chance: 0.5,
      },
      {
        key: 'hydra',
        chance: 0.5,
      },
      {
        key: 'ooze',
        chance: 0.5,
      },
      {
        key: 'cyclops',
        chance: 0.3,
      },
      {
        key: 'god',
        chance: 0.3,
      },
      {
        key: 'golem',
        chance: 0.1,
      },
      {
        key: 'demon',
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
        key: 'voidling',
        chance: 0.1,
      },
      {
        key: 'reptile',
        chance: 0.1,
      },
      {
        key: 'robot',
        chance: 0.1,
      },
      {
        key: 'any',
        chance: 0,
      }
    ],
  },
  pierce: {
    key: 'pierce',
    costModificator: ({ cost, attack }) => cost + attack * (constants.CARD_PRICE_PER_ATTACK_POINT / 2),
    elements: [
      {
        key: 'nature',
        chance: 1,
      },
      {
        key: 'earth',
        chance: 1,
      },
      {
        key: 'toxic',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.3,
      },
    ],
    unitTypes: [
      {
        key: 'any',
        chance: 1,
      },
      {
        key: 'giant',
        chance: 0.3,
      },
      {
        key: 'behemoth',
        chance: 0.3,
      },
      {
        key: 'leviathan',
        chance: 0.3,
      },
    ],
  },
  splash: {
    key: 'splash',
    requirement: 'pierce',
    costModificator: ({ cost, attack }) => cost + attack * constants.CARD_PRICE_PER_ATTACK_POINT,
    forgeLevel: 3,
    elements: [
      {
        key: 'water',
        chance: 1,
      },
      {
        key: 'fire',
        chance: 1,
      },
      {
        key: 'toxic',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.3,
      },
    ],
  },
  // scout: {
  //   name: 'Scout',
  //   description: 'When defending, if the unit is covered by the frontmost wall, reveal any stealth units attacking.',
  //   costModificator: ({ cost }) => cost + 150,
  // },
  // spinner: {
  //   name: 'Spinner',
  //   description: 'At war, this unit also damages the last enemy unit that has fought.',
  //   costModificator: ({ cost, attack }) => cost + attack * 20,
  // },
  // burst: {
  //   name: 'Burst',
  //   description: 'At war, this unit damages to any unit adjacent in the queue to itself and its opponent.',
  //   costModificator: ({ cost }) => cost,
  // },
  // exhausted: {
  //   name: 'Exhausted',
  //   description: 'An exhausted unit can\'t move or fight like an action unless forced by any other effect. At the end of the turn, this effect disappears from the unit.',
  //   costModificator: ({ cost }) => cost - 100,
  // },
  // flash: {
  //   name: 'Flash',
  //   description: 'Deploying this card does not rotate the "turn token", which means that the player can still play cards until this token is rotated.',
  //   costModificator: ({ cost }) => cost + 50,
  // },
};

module.exports = passiveEffects;
