const { constants, stats } = require('../enums');
const passiveEffects = require('./passiveEffects');
const { ongoingEffects: ongoingEffectMods } = require('./mods');

const {
  addOrUpdateCardSelectorOngoingEffectMod,
  ongoingStatMods,
} = ongoingEffectMods;

function levelFilter(card, element) {
  return !element.forgeLevel || element.forgeLevel <= card.level;
}

const ongoingEffects = {
  modifyStat: {
    key: 'modifyStat',
    cardSelectors: {
      modifiedCard: null,
    },
    stats: {
      $sample: [
        {
          [stats.ATTACK]: 1,
        },
        {
          [stats.HP]: 1,
        },
        {
          [stats.COST]: -40,
        },
      ],
    },
    mods: [
      ...ongoingStatMods,
      addOrUpdateCardSelectorOngoingEffectMod,
    ],
    price: (forge) => {
      const forgeStats = forge.stats;
      let result = 0;
      Object.entries(forgeStats).forEach(([stat, value]) => {
        if (Number.isNaN(value)) {
          return;
        }
        if (stat === 'cost') {
          result += value * -1;
        } else if (stat === 'attack') {
          result += value * constants.CARD_PRICE_PER_ATTACK_POINT;
        } else if (stat === 'hp') {
          result += value * constants.CARD_PRICE_PER_HP_POINT;
        } else {
          throw new Error(`Unknown stat: ${stat}`);
        }
      });
      return result;
    },
  },
  givePassiveEffect: {
    key: 'givePassiveEffect',
    cardSelectors: {
      modifiedCard: null,
    },
    passiveEffect: {
      $richSample: {
        list: Object.values(passiveEffects),
        filters: [levelFilter],
        map: (element) => element.key,
      },
    },
    mods: [
      addOrUpdateCardSelectorOngoingEffectMod,
    ],
    price: ({ passiveEffectCostModificator }) => {
      const averageAttackUnit = 3;
      const averageHpUnit = 3;
      const baseUnitCost = constants.CARD_PRICE_PER_ATTACK_POINT
        * averageAttackUnit + constants.CARD_PRICE_PER_HP_POINT * averageHpUnit;
      return passiveEffectCostModificator({
        attack: averageAttackUnit,
        hp: averageHpUnit,
        cost: baseUnitCost,
      }) - baseUnitCost;
    },
  },
};

module.exports = ongoingEffects;
