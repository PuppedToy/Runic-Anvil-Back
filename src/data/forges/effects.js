/* @TODO List
 * Modify zone size
 * Mutate / Transform / Upgrade / Downgrade / Forge / Unforge / Drain @TODO
 * Random effect
 * Reveal / Disarm
 * Give energy / Exhaust
 * Grant state until condition
 */

const { constants, places, kingdoms, targets, operations, stats, creations } = require('../enums');
const statusEffects = require('./statusEffects');
const { effects: effectMods, common: commonMods } = require('./mods');
const {
  improveTargetMods,
  addOrUpdateCardSelectorMod,
} = commonMods;
const {
  deployValueMods,
  drawValueMods,
  dealDamageValueMods,
  modifyInvestmentValueMods,
  modifyCurrencyValueMods,
  statMods,
  resurrectValueMods,
  summonValueMods,
  createValueMods,
  discardValueMods,
  fromDeckMod,
  deployToPlaceMods,
  moveToPlaceMods,
  toPlaceDeckModForgeLevel3,
  toPlaceAnyButBarracksMod,
  toPlaceAnyIngameButBarracksMod,
  toPlaceHandMod,
  toDeckMod,
  toOwnerOrAllyLevel2Mod,
  toKingdomAllyMod,
  fromKingdomOwnerMod,
  fromKingdomAllyLevel2Mod,
  toKingdomEnemyLevel2Mod,
  toKingdomAllyModForgeLevel3,
  toKingdomEnemyLevel2ModForgeLevel4,
  toKingdomGoldMods,
  reverseGoldMod,
  fromKingdomAllyMod,
  fromKingdomEnemyModForgeLevel3,
  fromKingdomEnemyLevel2Mod,
  banishModForgeLevel4,
  randomCreationMod,
  discoverMod,
} = effectMods;

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
    cardSelectors: {
      deployedCard: null,
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
      addOrUpdateCardSelectorMod,
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
    cardSelector: {
      damagedCard: null,
    },
    value: {
      $range: {
        min: 1,
        max: 2,
      },
    },
    mods: [
      ...dealDamageValueMods,
      ...improveTargetMods,
      addOrUpdateCardSelectorMod,
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
        min: 50,
        max: 175,
        step: 25,
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
    cardSelectors: {
      modifiedCard: null,
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
      ...improveTargetMods,
      addOrUpdateCardSelectorMod,
    ],
    price: ({ value, stat }) => value * (stat === stats.ATTACK ? constants.CARD_PRICE_PER_ATTACK_POINT : constants.CARD_PRICE_PER_HP_POINT),
  },
  destroy: {
    key: 'destroy',
    forgeLevel: 2,
    banish: false,
    cardSelectors: {
      destroyedCard: null,
    },
    target: targets.CHOSEN,
    mods: [
      banishModForgeLevel4,
      ...improveTargetMods,
      addOrUpdateCardSelectorMod,
    ],
    price: () => 400,
  },
  move: {
    key: 'move',
    target: targets.CHOSEN,
    cardSelectors: {
      movedCard: null,
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
      ...improveTargetMods,
      addOrUpdateCardSelectorMod,
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
    cardSelectors: {
      recalledCard: null,
    },
    to: {
      kingdom: kingdoms.OWNER,
      place: places.HAND,
    },
    mods: [
      toKingdomAllyModForgeLevel3,
      toKingdomEnemyLevel2ModForgeLevel4,
      toPlaceDeckModForgeLevel3,
      ...improveTargetMods,
      addOrUpdateCardSelectorMod,
    ],
    price: () => 200,
  },
  fight: {
    key: 'fight',
    target: targets.CHOSEN,
    cardSelectors: {
      foughtCard: null,
    },
    mods: [
      ...improveTargetMods,
      addOrUpdateCardSelectorMod,
    ],
    price: () => 50,
    isCommanderForbidden: () => true,
  },
  heal: {
    key: 'heal',
    target: targets.CHOSEN,
    cardSelectors: {
      healedCard: null,
    },
    value: {
      $range: {
        min: 1,
        max: 2,
      },
    },
    mods: [
      ...dealDamageValueMods,
      ...improveTargetMods,
      addOrUpdateCardSelectorMod,
    ],
    price: ({ value }) => value * 50,
  },
  betray: {
    key: 'betray',
    forgeLevel: 4,
    target: targets.CHOSEN,
    cardSelectors: {
      betrayedCard: null,
    },
    to: {
      kingdom: kingdoms.OWNER,
    },
    mods: [
      toKingdomAllyMod,
      ...improveTargetMods,
      addOrUpdateCardSelectorMod,
    ],
    price: () => 600,
  },
  resurrect: {
    key: 'resurrect',
    forgeLevel: 2,
    cardSelectors: {
      resurrectedCard: null,
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
      toKingdomEnemyLevel2Mod,
      toPlaceAnyButBarracksMod,
      addOrUpdateCardSelectorMod,
    ],
    price: () => 300,
  },
  discard: {
    key: 'discard',
    forgeLevel: 2,
    cardSelectors: {
      discardedCard: null,
    },
    kingdomSelectors: {
      fromKingdom: null,
    },
    from: {
      kingdom: kingdoms.ENEMY,
      place: places.HAND,
    },
    to: {
      kingdom: kingdoms.ENEMY,
      place: places.NONE,
    },
    value: 1,
    mods: [
      ...discardValueMods,
      fromKingdomOwnerMod,
      fromKingdomAllyLevel2Mod,
      toDeckMod,
      toOwnerOrAllyLevel2Mod,
      addOrUpdateCardSelectorMod,
    ],
    price: () => 50,
  },
  summon: {
    key: 'summon',
    forgeLevel: 2,
    creation: creations.SPECIFIC,
    value: {
      $range: {
        min: 40,
        max: 160,
        step: 40,
      },
    },
    to: {
      kingdom: kingdoms.OWNER,
      place: places.BARRACKS,
    },
    mods: [
      ...summonValueMods,
      randomCreationMod,
      // mod to create enhanced versions of cards
      toKingdomAllyMod,
      toKingdomEnemyLevel2Mod,
      toPlaceAnyIngameButBarracksMod,
      addOrUpdateCardSelectorMod,
    ],
    price: ({ value }) => value,
  },
  create: {
    key: 'create',
    creation: creations.SPECIFIC,
    to: {
      kingdom: kingdoms.OWNER,
      place: places.DECK,
    },
    value: {
      $range: {
        min: 80,
        max: 300,
        step: 40,
      },
    },
    mods: [
      ...createValueMods,
      randomCreationMod,
      discoverMod,
      // mod to create enhanced versions of cards
      toKingdomAllyMod,
      toKingdomEnemyLevel2Mod,
      toPlaceHandMod,
      addOrUpdateCardSelectorMod,
    ],
    price: ({ value }) => value * 0.1,
  },
  addStatusEffect: {
    key: 'addStatusEffect',
    cardSelectors: {
      statusedCard: null,
    },
    statusEffect: {
      $richSample: {
        list: statusEffects,
        map: ({ key }) => key,
      },
    },
    value: 1,
    duration: 1, // @TODO If regrowth or decay, -1
    mods: [
      // @TODO value and duration mods
      ...improveTargetMods,
      addOrUpdateCardSelectorMod,
    ],
    price: ({ statusEffect, value = 1 }) => {
      let result = 50;
      if (statusEffect === 'stun') {
        result = 100;
      }

      return result * value;
    },
  },
};

module.exports = effects;
