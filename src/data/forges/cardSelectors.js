const { unitTypes } = require('./unitTypes');
const passiveEffects = require('./passiveEffects');
const statusEffects = require('./statusEffects');
const elements = require('./elements');
const steppedSigmoidFactory = require('../../utils/steppedSigmoidFactory');
const {
  stats, places, compareOperators, targets,
} = require('../enums');

const forgeLevelFilter = (level) => ({ forgeLevel = 0 }) => level >= forgeLevel;

const comparativeOperators = [
  {
    key: compareOperators.MORE_THAN,
    weight: 2,
  },
  {
    key: compareOperators.LESS_THAN,
    weight: 2,
  },
];

const operators = [
  ...comparativeOperators,
  {
    key: compareOperators.EQUALS,
    weight: 1,
  },
];

const statLessThanHpSigmoid = steppedSigmoidFactory([
  [1, 0],
  [3, 0.4],
  [6, 0.6],
  [10, 0.8],
  [20, 0.9],
]);

const statLessThanAttackSigmoid = steppedSigmoidFactory([
  [0, 0],
  [3, 0.4],
  [6, 0.6],
  [10, 0.8],
  [20, 0.9],
]);

const equalsAttackOrHpSigmoid = steppedSigmoidFactory([
  [4, 0.2],
  [8, 0.15],
  [30, 0.05],
]);

const statLessThanCostSigmoid = steppedSigmoidFactory([
  [0, 0],
  [300, 0.4],
  [600, 0.6],
  [1000, 0.8],
  [2000, 0.9],
  [10000, 0.95],
]);

const cardSelectors = {
  hasStat: {
    key: 'hasStat',
    stat: {
      $sample: [
        {
          stat: stats.ATTACK,
          operator: {
            $richSample: {
              list: operators,
              map: ({ key }) => key,
            },
          },
          value: {
            $exponential: {
              min: 0,
              max: 30,
              probability: 0.75,
            },
          },
        },
        {
          stat: stats.HP,
          operator: {
            $richSample: {
              list: operators,
              map: ({ key }) => key,
            },
          },
          value: {
            $exponential: {
              min: 1,
              max: 30,
              probability: 0.75,
            },
          },
        },
        {
          stat: 'cost',
          operator: {
            $richSample: {
              list: comparativeOperators,
              map: ({ key }) => key,
            },
          },
          value: {
            $exponential: {
              min: 0,
              max: 10000,
              step: 25,
              probability: 0.95,
            },
          },
        },
      ],
    },
    costModificator: ({ stat: statObject, cost }) => {
      const { stat, operator } = statObject;
      let modificator = 1;
      if ((stat === stats.HP || stat === stats.ATTACK) && operator === compareOperators.EQUALS) {
        modificator = equalsAttackOrHpSigmoid(cost);
      } else if (stat === stats.COST && operator === compareOperators.EQUALS) {
        modificator = statLessThanCostSigmoid(cost);
      } else {
        if (stat === stat.HP) {
          modificator = statLessThanHpSigmoid(cost);
        } else if (stat === stat.ATTACK) {
          modificator = statLessThanAttackSigmoid(cost);
        } else if (stat === stat.COST) {
          modificator = statLessThanCostSigmoid(cost);
        }

        if (operator === compareOperators.MORE_THAN) {
          modificator = 1 - modificator;
        }
      }

      return cost * modificator;
    },
  },
  hasTribe: {
    key: 'hasTribe',
    tribe: {
      $richSample: {
        list: Object.values(unitTypes),
        filters: [forgeLevelFilter],
        map: ({ key }) => key,
      },
    },
    costModificator: ({ cost }) => cost * 0.3,
  },
  hasElement: {
    key: 'hasElement',
    element: {
      $richSample: {
        list: [...Object.values(elements.basic)],
        filters: [forgeLevelFilter],
        map: ({ key }) => key,
      },
    },
    costModificator: ({ cost }) => cost * 0.3,
  },
  hasRarity: {
    key: 'hasRarity',
    level: {
      $exponential: {
        min: 1,
        max: 5,
        probability: 0.2,
      },
    },
    costModificator: ({ cost }) => cost * 0.5,
  },
  hasPassiveEffect: {
    key: 'hasPassiveEffect',
    passiveEffect: {
      $richSample: {
        list: Object.values(passiveEffects),
        filters: [forgeLevelFilter],
        map: ({ key }) => key,
      },
    },
    costModificator: ({ cost }) => cost * 0.3,
  },
  hasStatusEffect: {
    key: 'hasStatusEffect',
    statusEffect: {
      $richSample: {
        list: Object.values(statusEffects),
        filters: [forgeLevelFilter],
        map: ({ key }) => key,
      },
    },
    costModificator: ({ cost }) => cost * 0.5,
  },
  isInPlace: {
    key: 'isInPlace',
    place: {
      $sample: [
        places.BARRACKS,
        places.RANGED_ZONE,
        places.MELEE_ZONE,
        places.WAR_ZONE,
        places.SIEGE_ZONE,
      ],
    },
    costModificator: ({ cost }) => cost * 0.5,
  },
  // Ideas: is damaged, has a state changed, is a zombie, is a creation, is defending
};

function applyEffectPriceModifiers(price, selectors = [], target = targets.CHOSEN) {
  let endPrice = price;
  selectors.forEach((selector) => {
    const { costModificator } = cardSelectors[selector.key];
    endPrice = costModificator({ ...selector, cost: endPrice });
  });
  if (target === targets.CHOSEN_AND_ADJACENTS) {
    endPrice *= 2.5;
  } else if (target === targets.ALL) {
    endPrice *= 4;
  }
  return endPrice;
}

module.exports = {
  cardSelectors,
  modifyPriceFromSelectors: applyEffectPriceModifiers,
};
