/* eslint-disable max-len */
const { constants } = require('../enums');

const beastRangedProfessions = [
  'spitter',
  'sprayer',
];

const beastSiegeProfessions = [
  'bombardier',
  'artillerist',
];

const passiveEffects = {
  ranged: {
    key: 'ranged',
    costModificator: ({ cost, attack, hp }) => cost
      + (attack * constants.CARD_PRICE_PER_ATTACK_POINT)
      - (hp * constants.CARD_PRICE_PER_HP_POINT) / 2,
    professions: ['hunter', 'ranger', 'archer', 'slinger', 'shooter', 'sniper', 'marksman'],
    adjectives: [
      {
        key: 'precise',
        minAttack: 3,
      },
      {
        key: 'accurate',
        minAttack: 3,
      },
      {
        key: 'sharp-eyed',
        minAttack: 3,
      },
      {
        key: 'disciplined',
        minAttack: 2,
      },
      {
        key: 'patient',
        minAttack: 2,
      },
      {
        key: 'master',
        minAttack: 6,
      },
      {
        key: 'confident',
        minAttack: 3,
      },
      {
        key: 'focused',
        minAttack: 2,
      },
      {
        key: 'inaccurate',
        maxAttack: 0,
      },
      {
        key: 'unsteady',
        maxAttack: 0,
      },
      {
        key: 'untrained',
        maxAttack: 1,
      },
      {
        key: 'uncoordinated',
        maxAttack: 0,
      },
      {
        key: 'inconsistent',
        maxAttack: 1,
      },
      {
        key: 'clumsy',
        maxAttack: 1,
      },
      {
        key: 'hesitant',
        maxAttack: 1,
      },
    ],
    unitTypes: [
      {
        key: 'insect',
        chance: 1,
        nouns: ['hornworm'],
        professions: [...beastRangedProfessions],
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
        professions: ['caster'],
      },
      {
        key: 'any',
        chance: 0.5,
      },
      {
        key: 'beast',
        chance: 0.1,
        professions: [...beastRangedProfessions],
      },
      {
        key: 'bird',
        chance: 0.1,
        professions: [...beastRangedProfessions],
      },
      {
        key: 'undead',
        chance: 0.1,
      },
      {
        key: 'dinosaur',
        chance: 0.1,
        professions: [...beastRangedProfessions],
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
        professions: [...beastRangedProfessions],
      },
      {
        key: 'hydra',
        chance: 0.1,
        professions: [...beastRangedProfessions],
      },
      {
        key: 'cyclops',
        chance: 0.1,
      },
      {
        key: 'leviathan',
        chance: 0.1,
        professions: [...beastRangedProfessions],
      },
    ],
    elements: [
      {
        key: 'tech',
        chance: 1,
        professions: ['gunner', 'sniper', 'blaster'],
      },
      {
        key: 'nature',
        chance: 1,
      },
      {
        key: 'fire',
        chance: 1,
        professions: ['firebreather', 'pyromancer', 'firethrower', 'arsonist'],
      },
      {
        key: 'water',
        chance: 1,
      },
    ]
  },
  siege: {
    key: 'siege',
    costModificator: ({ cost }) => Math.max(0, cost - 100),
    adjectives: [
      {
        key: 'demolition',
        minAttack: 2,
      },
      {
        key: 'wall-breaker',
        minAttack: 3,
      },
      {
        key: 'wrecking',
        minAttack: 2,
      },
      {
        key: 'breaching',
        minAttack: 2,
      },
      {
        key: 'siege',
        minAttack: 1,
      },
      {
        key: 'barrier-crushing',
        minAttack: 4,
      },
      {
        key: 'shattering',
        minAttack: 4,
      },
      {
        key: 'unreliable',
        maxAttack: 0,
      },
      {
        key: 'unimpressive',
        maxAttack: 0,
      },
      {
        key: 'feeble',
        maxAttack: 0,
      },
      {
        key: 'flawed',
        maxAttack: 0,
      },
    ],
    professions: ['wallcrusher', 'raider', 'specialist', 'expert'],
    unitTypes: [
      {
        key: 'wizard',
        chance: 1,
        professions: ['warcaster', 'siege-mage', ...beastRangedProfessions],
      },
      {
        key: 'giant',
        chance: 1,
        professions: ['battering-ram'],
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
    elements: [
      {
        key: 'tech',
        chance: 1,
        professions: [...beastSiegeProfessions, 'cannoneer', 'war engineer', 'siege engineer', 'mortar', 'railgun'],
      },
      {
        key: 'earth',
        chance: 1,
        professions: ['boulderthrower', 'boulderhurler', 'boulderlauncher', 'catapult', 'trebuchet'],
      },
      {
        key: 'fire',
        chance: 1,
        professions: [...beastSiegeProfessions, 'cannoneer', 'fire-catapult', 'fire-trebuchet'],
      },
    ]
  },
  taunting: {
    key: 'taunting',
    costModificator: ({ cost }) => cost + 40,
    adjectives: [
      'vanguard',
      'battlefront',
      'frontliner',
      'forerunner',
      'blitzkrieg',
      'valiant',
      'brave',
      'daring',
      'corageous',
      'resolute',
      'stalwart',
      {
        key: 'heroic',
        minAttack: 5,
        minHp: 5,
      },
    ],
    professions: [
      'vanguard',
      'defender',
      'protector',
      'guardian',
      'warden',
      {
        key: 'champion',
        minAttack: 5,
        minHp: 5,
      },
      {
        key: 'warmaster',
        minAttack: 5,
        minHp: 5,
      },
    ],
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
    adjectives: [
      'challenging',
      'provocative',
      'defiant',
      'confrontational',
      'dueling',
    ],
    professions: [
      'duelist',
      'challenger',
      'enforcer',
      'brawler',
      'instigator',
      {
        key: 'champion',
        minAttack: 5,
        minHp: 5,
      },
      {
        key: 'warmaster',
        minAttack: 5,
        minHp: 5,
      },
      {
        key: 'duelmaster',
        minAttack: 7,
        minHp: 7,
      },
      {
        key: 'executioner',
        minAttack: 7,
      },
    ],
    elements: [
      {
        key: 'light',
        chance: 1,
      },
      {
        key: 'psychic',
        chance: 1,
        professions: ['manipulator', 'trickster', 'hypnotist'],
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
        professions: ['inquisitor', 'avenger', 'punisher', 'judge', 'arbiter'],
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
  berserker: {
    key: 'berserker',
    costModificator: ({ cost }) => Math.max(0, cost - 60),
    adjectives: [
      'relentless',
      'unyielding',
      'indomitable',
      'fearless',
      'unbending',
      'reckless',
      'mad',
      'frenzied',
      'rampaging',
      'raving',
      'berserk',
      'savage',
      'ferocious',
      'furious',
      'wild',
      'untamed',
      'uncontrollable',
      'unrestrained',
      'unbridled',
      'bloodthirsty',
      'wrathful',
    ],
    professions: [
      'berserker',
      'lunatic',
      'maniac',
      'zealot',
      'marauder',
      'brute',
      'reaver',
      'raider',
    ],
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
    adjectives: [
      'fearful',
      'frightened',
      'scared',
      'afraid',
      'terrified',
      'petrified',
      'horrified',
      'panicked',
      'alarmed',
      'cautious',
      'anxious',
      'bashful',
      'shy',
      'timid',
      'hesitant',
      'nervous',
      {
        key: 'tactical',
        minAttack: 5,
        minHp: 5,
      },
      {
        key: 'strategic',
        minAttack: 5,
        minHp: 5,
      },
      {
        key: 'command',
        minAttack: 5,
        minHp: 5,
      },
    ],
    professions: [
      'coward',
      'yellowbelly',
      'wimp',
      'chickenheart',
      'milksop',
      'poltroon',
      'dastard',
      'craven',
      'runaway',
      'quitter',
      'sissy',
      'deserter',
      {
        key: 'strategist',
        minAttack: 5,
        minHp: 5,
      },
      {
        key: 'advisor',
        minAttack: 5,
        minHp: 5,
      },
      {
        key: 'analyst',
        minAttack: 5,
        minHp: 5,
      },
    ],
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
    adjectives: [
      'fearsome',
      'terrifying',
      'menacing',
      'intimidating',
      'threatening',
      'frightening',
      'dreadful',
    ],
    elements: [
      {
        key: 'shadow',
        chance: 1,
        adjectives: [
          'haunting',
          'ghastly',
          'sinister',
          'macabre',
          'bloodcurdling',
          'spine-chilling',
          'eerie',
          'nightmarish',
        ],
        professions: [
          'terror',
          'horror',
          'harbinger',
          'dreadbringer',
        ],
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
  vampiric: {
    key: 'vampiric',
    costModificator: ({ cost, attack, hp }) => cost + attack * 20 + hp * 20,
    forgeLevel: 2,
    adjectives: [
      'siphoning',
      'parasitic',
      'vampiring',
      'leeching',
      'absoribing',
      'rejuvenating',
      'revitalizing',
      'resilient',
    ],
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
    adjectives: [
      {
        key: 'deadly',
        minAttack: 1,
      },
      {
        key: 'fatal',
        minAttack: 1,
      },
      {
        key: 'lethal',
        minAttack: 1,
      },
      {
        key: 'mortal',
        minAttack: 1,
      },
      {
        key: 'ruthless',
        minAttack: 1,
      },
      {
        key: 'homicidal',
        minAttack: 1,
      },
      {
        key: 'merciless',
        minAttack: 1,
      },
      {
        key: 'murderous',
        minAttack: 1,
      },
      {
        key: 'unskilled',
        maxAttack: 1,
      },
      {
        key: 'unlucky',
        maxAttack: 1,
      },
      {
        key: 'unreliable',
        maxAttack: 1,
      },
      {
        key: 'inefficient',
        maxAttack: 1,
      },
      {
        key: 'unproductive',
        maxAttack: 1,
      },
      {
        key: 'misguided',
        maxAttack: 1,
      },
      {
        key: 'non-lethal',
        maxAttack: 1,
      },
      {
        key: 'non-fatal',
        maxAttack: 1,
      },
      {
        key: 'clumsy',
        maxAttack: 1,
      },
      {
        key: 'untrained',
        maxAttack: 1,
      },
    ],
    professions: [
      'assassin',
      'executioner',
      'slayer',
      'butcher',
      'exterminator',
      'killer',
      'annihilator',
      'destroyer',
      'operative',
      'agent',
    ],
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
  swift: {
    key: 'swift',
    costModificator: ({ cost, attack }) => cost + attack * constants.CARD_PRICE_PER_ATTACK_POINT,
    forgeLevel: 2,
    adjectives: [
      'swift',
      'quick',
      'rapid',
      'speedy',
      'fast',
      'fleet',
      'nimble',
      'agile',
      'brisk',
    ],
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
        adjectives: [
          'peregrine',
          'white-throated',
          'eurasian',
          'grey-headed',
          'brazilian',
          'northern',
          'red-breasted',
          'common',
          'golden',
          'red-tailed',
          'spur-winged',
          'eider',
          'white-rumped',
          'snowy',
        ],
        nouns: [
          'falcon',
          'hawk',
          'needletail',
          'gyrfalcon',
          'albatross',
          'bat',
          'merganser',
          'gannet',
          'swift',
          'eagle',
          'goose',
          'pigeon',
          'merlin',
          'owl',
        ],
      },
      {
        key: 'insect',
        chance: 1,
        adjectives: [
          'tiger',
          'green',
          'praying',
          'cheetah',
          'eastern',
          'hummingbird',
          'stick',
          'silver',
        ],
        nouns: [
          'dragonfly',
          'horsefly',
          'cockroach',
          'ant',
          'lacewing',
          'mantis',
          'housefly',
          'fly',
          'silverfish',
          'moth',
          'strider',
          'grasshopper',
          'aphid',
          'bee',
          'hoverfly',
          'hornet',
        ],
      },
      {
        key: 'reptile',
        chance: 1,
        adjectives: [
          'green',
          'collared',
          'wall',
          'spiny-tailed',
          'gila',
          'frilled',
          'black',
          'coachwhip',
          'snapping',
          'nile',
          'blue-tailed',
          'egg-eating',
          'horned',
          'western',
          'rainbow',
        ],
        nouns: [
          'lizard',
          'iguana',
          'racer',
          'snake',
          'monitor',
          'skink',
          'anole',
          'adder',
          'whiptail',
          'chameleon',
          {
            key: 'basilisk',
            minAttack: 5,
            minHp: 5,
          }
        ],
      },
      {
        key: 'beast',
        chance: 1,
        nouns: [
          'cheetah',
          'leopard',
          'lion',
          'tiger',
          'panther',
          'pronghorn',
          'greyhound',
          'kangaroo',
          'antelope',
          'gazelle',
          'wildebeest',
          'stork',
          'springbok',
          'hare',
          'horse',
        ],
      },
      {
        key: 'fish',
        chance: 1,
        adjectives: [
          'black',
          'yellowfin',
          'mako',
          'blue',
          'atlantic',
          'skipjack',
          'yellowtail',
          'great',
          'northern',
          'king',
          'sailfish',
        ],
        nouns: [
          'sailfish',
          'marlin',
          'swordfish',
          'tuna',
          'wahoo',
          'shark',
          'barracuda',
          'bonito',
          'dorado',
          'amberjack',
          'bonefish',
          'pike',
          'mackerel',
          'dolphin',
        ],
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
    adjectives: [
      'slow',
      'sluggish',
      'lethargic',
      'lazy',
      'slothful',
      'crawling',
      'plodding',
      'lagging',
      'dawdling',
      'idle',
      'relaxed',
    ],
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
        adjectives: [
          'aldabra',
          'ploughshare',
          'angonoka',
          'big-headed',
          'leaf-tailed',
          'matamata',
        ],
        nouns: [
          'turtle',
          'tortoise',
          'gharial',
          'gecko',
          'worm',
          'devil',
          'tuatara',
        ],
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
        adjectives: [
          'nurse',
          'cownose',
        ],
        nouns: [
          'seahorse',
          'stargazer',
          'stonefish',
          'blobfish',
          'gurnard',
          'flounder',
          'toadfish',
          'batfish',
          'sculpin',
          'robin',
          'catfish',
          'burbot',
          'ling',
          'hagfish',
          'oarfish',
          'pufferfish',
          'sunfish',
          'ray',
          'mudskipper',
          'archerfish',
        ],
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
  big: {
    key: 'big',
    costModificator: ({ cost }) => cost * 1.25,
    forgeLevel: 2,
    adjectives: [
      'big',
      'giant',
      'mighty',
      'stout',
      'towering',
      'hulking',
    ],
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
    adjectives: [
      'huge',
      'colossal',
      'massive',
      'enormous',
      'gigantic',
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
    adjectives: [
      'titan',
      'titanic',
      'immense',
      'gargantuan',
      'monstrous',
    ],
    nouns: [
      'titan',
      'colossus',
      'megalith',
    ],
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
  // building: {
  //   name: 'Building',
  //   description: 'The unit can be deployed in any zone, but after that, it can\'t be moved nor forced to move. The unit is immune to betray effect.',
  //   costModificator: ({ cost }) => cost - 100,
  // },
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
