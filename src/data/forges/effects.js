// @TODO:
// 1. Review every passive / effect / trigger to see if they apply to weapons or spells
// 2. Create the forge tree for the effects.
// 3. Assign a cost/modificator for each effect

/*
 * Modify a stat of a card @TODO
 * Deploy @TODO
 * Summon / Cast @TODO
 * Destroy / Banish @TODO
 * Draw / Discard @TODO
 * Move @TODO
 * Deal damage @TODO
 * Retire / Recall @TODO
 * Duel @TODO
 * Give turn token / Advance / Delay turn @TODO
 * Modify investment @TODO
 * Modify currency (earn / collect / give / steal) @TODO
 * Modify zone size @TODO
 * Mutate / Transform / Upgrade / Downgrade / Forge / Unforge / Drain @TODO
 * Create / Discover @TODO
 * Give status @TODO
 * Heal @TODO
 * Random effect @TODO
 * Reveal / Disarm @TODO
 * Confuse / Betray @TODO
 * Give energy / Exhaust @TODO
 * Grant state until condition @TODO
 */

// @TODO Note, for balance and fun purposes I will add a ridiculous amount of range for effects
// In the future, tweak them for match their rarity

const { constants, places, kingdoms, targets, operations, stats } = require('../enums');
const statusEffects = require('./statusEffects');
const { randomInt } = require('../../utils/random');

/** PIECES */

/****/

// Here I will define every mod and I will try to reuse them
/** MODS */

const deployValueLevel1Mod = {
  id: 'value',
  modLevel: 1,
  value: {
    $range: {
      min: 250,
      max: 500,
      step: 50,
    },
  },
};

const deployValueLevel2Mod = {
  id: 'value',
  modLevel: 2,
  value: {
    $range: {
      min: 550,
      max: 900,
      step: 50,
    },
  },
};

const deployValueLevel3Mod = {
  id: 'value',
  modLevel: 3,
  value: {
    $exponential: {
      min: 1000,
      max: 10000,
      step: 100,
      probability: 0.75,
    },
  },
};

const deployValueMods = [
  deployValueLevel1Mod,
  deployValueLevel2Mod,
  deployValueLevel3Mod,
];

const drawValueLevel1Mod = {
  id: 'value',
  modLevel: 1,
  value: 2
};

const drawValueLevel2Mod = {
  id: 'value',
  modLevel: 2,
  value: {
    $range: {
      min: 3,
      max: 4,
    },
  },
};

const drawValueLevel3Mod = {
  id: 'value',
  modLevel: 3,
  value: {
    $exponential: {
      min: 5,
      max: 10,
      step: 1,
      probability: 0.75,
    },
  },
};

const drawValueMods = [
  drawValueLevel1Mod,
  drawValueLevel2Mod,
  drawValueLevel3Mod,
];

const dealDamageValueLevel1Mod = {
  id: 'value',
  modLevel: 1,
  value: {
    $range: {
      min: 3,
      max: 4,
    },
  },
};

const dealDamageValueLevel2Mod = {
  id: 'value',
  modLevel: 2,
  value: {
    $range: {
      min: 5,
      max: 7,
    },
  },
};

const dealDamageValueLevel3Mod = {
  id: 'value',
  modLevel: 2,
  value: {
    $exponential: {
      min: 8,
      max: 100,
      step: 1,
      probability: 0.75,
    },
  },
};

const dealDamageValueMods = [
  dealDamageValueLevel1Mod,
  dealDamageValueLevel2Mod,
  dealDamageValueLevel3Mod,
];

const modifyInvestmentValueLevel1Mod = {
  id: 'value',
  modLevel: 1,
  value: {
    $range: {
      min: 75,
      max: 200,
      step: 25,
    },
  },
};

const modifyInvestmentValueLevel2Mod = {
  id: 'value',
  modLevel: 2,
  value: {
    $range: {
      min: 250,
      max: 500,
      step: 50,
    },
  },
};


const modifyInvestmentValueLevel3Mod = {
  id: 'value',
  modLevel: 3,
  value: {
    $exponential: {
      min: 600,
      max: 10000,
      step: 50,
      probability: 0.75,
    },
  },
};

const modifyInvestmentValueMods = [
  modifyInvestmentValueLevel1Mod,
  modifyInvestmentValueLevel2Mod,
  modifyInvestmentValueLevel3Mod,
];

const modifyCurrencyValueLevel1Mod = {
  id: 'value',
  modLevel: 1,
  value: {
    $range: {
      min: 200,
      max: 400,
      step: 25,
    },
  },
};

const modifyCurrencyValueLevel2Mod = {
  id: 'value',
  modLevel: 2,
  value: {
    $range: {
      min: 450,
      max: 900,
      step: 50,
    },
  },
};

const modifyCurrencyValueLevel3Mod = {
  id: 'value',
  modLevel: 3,
  value: {
    $exponential: {
      min: 1000,
      max: 100000,
      step: 100,
      probability: 0.75,
    },
  },
};

const modifyCurrencyValueMods = [
  modifyCurrencyValueLevel1Mod,
  modifyCurrencyValueLevel2Mod,
  modifyCurrencyValueLevel3Mod,
];

const generateStatMethod = (minIncrement, maxIncrement) => ({ [stats.ATTACK]: attack = 0, [stats.HP]: hp = 0 }) => {
  const totalIncrement = randomInt(minIncrement, maxIncrement);
  const random = Math.random();
  let attackIncrement = 0;
  let hpIncrement = 0;
  if (random < 0.3) {
    attackIncrement = totalIncrement;
  }
  else if (random < 0.6) {
    hpIncrement = totalIncrement;
  }
  else {
    attackIncrement = randomInt(1, totalIncrement - 1);
    hpIncrement = totalIncrement - attackIncrement;
  }
  const result = {};
  if (attackIncrement > 0) {
    result[stats.ATTACK] = attack + (attack >= 0 ? attackIncrement : -attackIncrement);
  }
  if (hpIncrement > 0) {
    result[stats.HP] = hp + (hp >= 0 ? hpIncrement : -hpIncrement);
  }
  return result;
};

const statValueLevel1Mod = {
  id: 'value',
  modLevel: 1,
  stats: {
    $custom: {
      method: generateStatMethod(3, 5),
    },
  },
};

const statValueLevel2Mod = {
  id: 'value',
  modLevel: 2,
  stats: {
    $custom: {
      method: generateStatMethod(6, 10),
    },
  },
};

const statValueLevel3Mod = {
  id: 'value',
  modLevel: 3,
  stats: {
    $custom: {
      method: generateStatMethod(12, 30),
    },
  },
};

const reverseStatsMod = {
  id: 'reverse',
  stats: {
    $custom: {
      method: ({ [stats.ATTACK]: attack = 0, [stats.HP]: hp = 0 }) => {
        const result = {};
        if (attack > 0) {
          result[stats.ATTACK] = -attack;
        }
        if (hp > 0) {
          result[stats.HP] = -hp;
        }
        return result;
      },
    },
  }
};

const statMods = [
  statValueLevel1Mod,
  statValueLevel2Mod,
  statValueLevel3Mod,
  reverseStatsMod,
];

const resurrectValueLevel1Mod = {
  id: 'value',
  modLevel: 1,
  forgeLevel: 4,
  value: 2,
};

const resurrectValueLevel2Mod = {
  id: 'value',
  modLevel: 2,
  value: 3,
};

const resurrectValueMods = [
  resurrectValueLevel1Mod,
  resurrectValueLevel2Mod,
];

const discardValueLevel1Mod = {
  id: 'value',
  modLevel: 1,
  value: 2,
};

const discardValueLevel2Mod = {
  id: 'value',
  modLevel: 2,
  value: {
    $exponential: {
      min: 3,
      max: 10,
      step: 1,
      probability: 0.25,
    },
  },
};

const discardValueMods = [
  discardValueLevel1Mod,
  discardValueLevel2Mod,
];

const fromDeckMod = {
  id: 'fromPlace',
  modLevel: 1,
  from: {
    place: 'deck',
  },
};

const toRangedOrMeleeMod = {
  id: 'toPlace',
  modLevel: 1,
  to: {
    place: {
      $sample: [
        'rangedZone',
        'meleeZone',
      ],
    },
  },
};

const toWarOrSiegeMod = {
  id: 'toPlace',
  modLevel: 2,
  to: {
    place: {
      $sample: [
        'warZone',
        'siegeZone',
      ],
    },
  },
};

const deployToPlaceMods = [
  toRangedOrMeleeMod,
  toWarOrSiegeMod,
];

const toWarOrBarracksMod = {
  id: 'toPlace',
  modLevel: 1,
  to: {
    place: {
      $sample: [places.WAR_ZONE, places.BARRACKS],
    },
  },
};

const toSiegeMod = {
  id: 'toPlace',
  modLevel: 2,
  to: {
    place: places.SIEGE_ZONE,
  },
};

const moveToPlaceMods = [
  toWarOrBarracksMod,
  toSiegeMod,
];

const toPlaceDeckModForgeLevel3 = {
  id: 'toPlace',
  modLevel: 1,
  forgeLevel: 3,
  to: {
    place: places.DECK,
  },
};

const { BARRACKS, ...allPlacesButBarracks } = places;
const toPlaceAnyButBarracksMod = {
  id: 'toPlace',
  modLevel: 1,
  to: {
    place: {
      $sample: [...allPlacesButBarracks],
    },
  },
};

const toKingdomAllyMod = {
  id: 'toKingdom',
  modLevel: 1,
  to: {
    kingdom: kingdoms.ALLY,
  },
  selector: 'toKingdom',
};

const toKingdomOwnerMod = {
  id: 'toKingdom',
  modLevel: 1,
  to: {
    kingdom: kingdoms.OWNER,
  },
  selector: 'toKingdom',
};

const toKingdomAllyLevel2Mod = {
  id: 'toKingdom',
  modLevel: 2,
  to: {
    kingdom: kingdoms.ALLY,
  },
  selector: 'toKingdom',
};

const toKingdomEnemeyLevel2Mod = {
  id: 'toKingdom',
  modLevel: 2,
  to: {
    kingdom: kingdoms.ENEMY,
  },
};

const toKingdomAllyModForgeLevel3 = {
  id: 'toKingdom',
  modLevel: 1,
  forgeLevel: 3,
  to: {
    kingdom: kingdoms.ALLY,
  },
  selector: 'toKingdom',
};

const toKingdomEnemyLevel2ModForgeLevel4 = {
  id: 'toKingdom',
  modLevel: 2,
  forgeLevel: 4,
  to: {
    kingdom: kingdoms.ENEMY,
  },
};

const toKingdomEnemySubtractMod = {
  id: 'toKingdom',
  modLevel: 2,
  to: {
    kingdom: kingdoms.ENEMY,
  },
  operations: operations.SUBTRACT,
  selector: 'toKingdom',
};

const toKingdomEnemyStealMod = {
  id: 'toKingdom',
  modLevel: 3,
  to: {
    kingdom: kingdoms.ENEMY,
  },
  operations: operations.STEAL,
  selector: 'toKingdom',
};

const toKingdomGoldMods = [
  toKingdomAllyMod,
  toKingdomEnemySubtractMod,
  toKingdomEnemyStealMod,
];

const reverseGoldMod = {
  id: 'reverse',
  forgeLevel: 4,
  to: {
    $custom: {
      method: ({ to }) => {
        if (to.kingdom === kingdoms.ALLY) {
          return kingdoms.ENEMY;
        }
        else if (to.kingdom === kingdoms.ENEMY) {
          return Math.random() > 0.5 ? kingdoms.ALLY : kingdoms.OWNER;
        }
      }
    }
  },
  operation: {
    $custom: {
      method: ({ operation }) => {
        if (operation === operations.ADD) {
          return operations.SUBTRACT;
        }
        else if (operation === operations.SUBTRACT || operation === operations.STEAL) {
          return operations.ADD;
        }
      }
    },
  },
};

const fromKingdomAllyMod = {
  id: 'fromKingdom',
  modLevel: 1,
  from: {
    kingdom: kingdoms.ALLY,
  },
  selector: 'fromKingdom',
};

const fromKingdomEnemyModForgeLevel3 = {
  id: 'fromKingdom',
  modLevel: 1,
  forgeLevel: 3,
  from: {
    kingdom: kingdoms.ENEMY,
  },
  selector: 'fromKingdom',
};

const fromKingdomEnemyLevel2Mod = {
  id: 'fromKingdom',
  modLevel: 2,
  from: {
    kingdom: kingdoms.ENEMY,
  },
  selector: 'fromKingdom',
};

const banishMod = {
  id: 'banish',
  modLevel: 1,
  banish: true,
};

const banishModForgeLevel4 = {
  id: 'banish',
  modLevel: 1,
  forgeLevel: 4,
  banish: true,
};

// @TODO const targetMod

const improveTargetMod = {
  id: 'improveTarget',
  modLevel: 1,
  // @TODO
};

const addSelectorMod = {
  id: 'addSelector',
  modLevel: 1,
  // @TODO selector
  // selector: createNewSelector(), // This should have somehow the list of available selectors
};

/****/

// So I have to identify which options may have a selector and store it somewhere. This might get tricky.

const effects = {
  deploy: {
    key: 'deploy',
    from: {
      kingdom: kingdoms.OWNER,
      place: places.HAND,
    },
    to: {
      kingdom: kingdoms.OWNER,
      place: places.BARRACKS,
    },
    target: targets.CHOSEN,
    selectors: {
      base: null,
    },
    value: {
      $range: {
        min: 100,
        max: 200,
        step: 25,
      },
    },
    mods: [
      ...deployValueMods,
      fromDeckMod,
      ...deployToPlaceMods,
      toKingdomAllyMod,
      fromKingdomEnemyModForgeLevel3,
      addSelectorMod,
    ],
    price: ({ value }) => value * 0.5,
  },
  draw: {
    key: 'draw',
    from: {
      kingdom: kingdoms.OWNER,
      place: places.DECK,
    },
    value: 1,
    mods: [
      ...drawValueMods,
      fromKingdomEnemyModForgeLevel3,
    ],
    price: () => 50,
  },
  dealDamage: {
    key: 'dealDamage',
    target: targets.CHOSEN,
    selectors: {
      base: null,
    },
    value: {
      $range: {
        min: 1,
        max: 2,
      },
    },
    mods: [
      ...dealDamageValueMods,
      improveTargetMod,
      addSelectorMod,
    ],
    price: ({ value }) => value * 50,
  },
  modifyInvestment: {
    key: 'modifyInvestment',
    to: {
      kingdom: kingdoms.OWNER,
    },
    operation: operations.ADD,
    value: {
      $range: {
        min: 10,
        max: 50,
        step: 10,
      },
    },
    mods: [
      ...modifyInvestmentValueMods,
      ...toKingdomGoldMods,
      reverseGoldMod,
    ],
    price: ({ value }) => value,
  },
  modifyCurrency: {
    key: 'modifyCurrency',
    to: {
      kingdom: kingdoms.OWNER,
    },
    operation: operations.ADD,
    value: {
      $range: {
        min: 1,
        max: 2,
      },
    },
    mods: [
      ...modifyCurrencyValueMods,
      ...toKingdomGoldMods,
      reverseGoldMod,
    ],
    price: ({ value }) => value * 0.8,
  },
  modifyStat: {
    key: 'modifyStat',
    target: targets.CHOSEN,
    selectors: {
      base: null,
    },
    stats: {
      $sample: [
        {
          [stats.ATTACK]: {
            $range: {
              min: 1,
              max: 2,
            },
          },
        },
        {
          [stats.HP]: {
            $range: {
              min: 1,
              max: 2,
            },
          },
        },
        {
          [stats.ATTACK]: 1,
          [stats.HP]: 1,
        },
      ],
    },
    mods: [
      ...statMods,
      improveTargetMod,
      addSelectorMod,
    ],
    price: ({ value, stat }) => value * (stat === stats.ATTACK ? constants.CARD_PRICE_PER_ATTACK_POINT : constants.CARD_PRICE_PER_HP_POINT),
  },
  destroy: {
    key: 'destroy',
    forgeLevel: 2,
    banish: false,
    selectors: {
      base: null,
    },
    target: targets.CHOSEN,
    mods: [
      banishModForgeLevel4,
      improveTargetMod,
      addSelectorMod,
    ],
    price: () => 400,
  },
  move: {
    key: 'move',
    target: targets.CHOSEN,
    selector: {
      base: null,
    },
    to: {
      kingdom: kingdoms.OWNER,
      place: {
        $sample: [places.RANGED_ZONE, places.MELEE_ZONE],
      },
    },
    mods: [
      ...moveToPlaceMods,
      toKingdomAllyModForgeLevel3,
      improveTargetMod,
      addSelectorMod,
    ],
    price: ({ place }) => {
      let result = 25;

      if (place === places.BARRACKS || place === places.WAR_ZONE) {
        result = 50;
      }
      else if (place === places.SIEGE_ZONE) {
        result = 100;
      }

      return result;
    },
  },
  recall: {
    key: 'recall',
    forgeLevel: 2,
    target: targets.CHOSEN,
    selector: {
      base: null,
    },
    to: {
      kingdom: kingdoms.OWNER,
      place: places.HAND,
    },
    mods: [
      toKingdomAllyModForgeLevel3,
      toKingdomEnemyLevel2ModForgeLevel4,
      toPlaceDeckModForgeLevel3,
      improveTargetMod,
      addSelectorMod,
    ],
    price: () => 200,
  },
  fight: {
    key: 'fight',
    target: targets.CHOSEN,
    selector: {
      base: null,
    },
    mods: [
      improveTargetMod,
      addSelectorMod,
    ],
    price: () => 50,
    isCommanderForbidden: () => true,
  },
  heal: {
    key: 'heal',
    target: targets.CHOSEN,
    selectors: {
      base: null,
    },
    value: {
      $range: {
        min: 1,
        max: 2,
      },
    },
    mods: [
      ...dealDamageValueMods,
      improveTargetMod,
      addSelectorMod,
    ],
    price: ({ value }) => value * 50,
  },
  betray: {
    key: 'betray',
    forgeLevel: 4,
    target: targets.CHOSEN,
    selector: {
      base: null,
    },
    to: {
      kingdom: kingdoms.OWNER,
    },
    mods: [
      toKingdomAllyMod,
      improveTargetMod,
      addSelectorMod,
    ],
    price: () => 600,
  },
  resurrect: {
    key: 'resurrect',
    forgeLevel: 2,
    selectors: {
      base: null,
    },
    from: {
      kingdom: kingdoms.OWNER,
    },
    to: {
      kingdom: kingdoms.OWNER,
      place: places.BARRACKS,
    },
    value: 1,
    mods: [
      ...resurrectValueMods,
      fromKingdomAllyMod,
      fromKingdomEnemyLevel2Mod,
      toKingdomAllyMod,
      toKingdomEnemeyLevel2Mod,
      toPlaceAnyButBarracksMod,
      addSelectorMod,
    ],
    price: () => 300,
  },
  discard: {
    key: 'discard',
    forgeLevel: 2,
    banish: false,
    selectors: {
      base: null,
    },
    to: {
      kingdom: kingdoms.ENEMY,
    },
    value: 1,
    mods: [
      ...discardValueMods,
      toKingdomOwnerMod,
      toKingdomAllyLevel2Mod,
      banishMod,
      addSelectorMod,
    ],
    price: () => 50,
  },
  summon: {
    key: 'summon',
    name: 'Summon',
    description: 'Summon a card to the target place',
    text: 'summon $card in $place',
    default: {
      target: 'random',
      value: {
        // $range: {
        //   min: 50,
        //   max: 149,
        // },
        $exponential: {
          min: 50,
          max: 10000,
          step: 10,
          probability: 0.94,
        },
      },
      place: {
        place: 'cardLocation',
        text: 'this card\'s location',
      },
      textContext: {
        card: 'a $target $value cost card',
      },
    },
    price: ({ value }) => value,
  },
  create: {
    key: 'create',
    name: 'Create',
    description: 'Create a card and shuffle it into the deck',
    text: 'create $card',
    default: {
      target: 'random',
      value: {
        // $range: {
        //   min: 50,
        //   max: 149,
        // },
        $exponential: {
          min: 50,
          max: 10000,
          step: 10,
          probability: 0.94,
        },
      },
      textContext: {
        card: 'a $target $value cost card',
      },
    },
    price: ({ value }) => value * 0.1,
  },
  addStatusEffect: {
    key: 'addStatusEffect',
    name: 'Add status effect',
    description: 'Add a status effect to the target card',
    text: '$statusEffect.text',
    default: {
      $sample: statusEffects,
    },
    price: ({ statusEffect, card, value = 1 }) => {
      let basePrice = 0;
      let basePriceMod = 1;

      if (card.target === 'randomEnemy') {
        basePriceMod = -1;
      }

      if (statusEffect.statusKey === 'exhaust') {
        basePrice = -30;
      }
      if (statusEffect.statusKey === 'rooted') {
        basePrice = -40;
      }
      if (statusEffect.statusKey === 'stunned') {
        basePrice = -50;
      }
      if (statusEffect.statusKey === 'decay') {
        basePrice = -50;
      }
      if (statusEffect.statusKey === 'silenced') {
        if (value === 0) {
          return -100 * basePriceMod;
        }
        else {
          basePrice = -50;
        }
      }
      if (statusEffect.statusKey === 'regrowth') {
        basePrice = 50;
      }
      if (statusEffect.statusKey === 'daze') {
        basePrice = -10;
      }

      return basePrice * basePriceMod * value;
    },
  },
};

module.exports = effects;
