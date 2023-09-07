/* @TODO List
 * Modify zone size
 * Mutate / Transform / Upgrade / Downgrade / Forge / Unforge / Drain @TODO
 * Random effect
 * Reveal / Disarm
 * Give energy / Exhaust
 * Grant state until condition
 */

const {
  constants, places, kingdoms, targets, operations, stats, creations,
} = require('../enums');
const statusEffects = require('./statusEffects');
const { effects: effectMods } = require('./mods');
const { modifyPriceFromSelectors } = require('./cardSelectors');

const {
  improveTargetMods,
  addOrUpdateCardSelectorEffectMod,
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
      addOrUpdateCardSelectorEffectMod,
    ],
    adjectives: [
      'commanding',
      'tactical',
      'coordinated',
      'strategic',
    ],
    professions: [
      'strategist',
      'tactician',
      'organizer',
      'supervisor',
      'facilitator',
      'operator',
      'arranger',
      {
        key: 'commander',
        minHp: 4,
      },
      {
        key: 'general',
        minHp: 4,
      },
      {
        key: 'captain',
        minHp: 4,
      },
      {
        key: 'lieutenant',
        minHp: 3,
      },
    ],
    elements: [
      {
        key: 'earth',
        chance: 1,
      },
      {
        key: 'tech',
        chance: 1,
      },
      {
        key: 'time',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
      {
        key: 'fire',
        chance: 0.1,
      },
    ],
    price: ({
      value, from, to, selectors,
    }) => {
      let result = value * 0.5;

      if (from.place === places.DECK) {
        result += value * 0.1;
      }

      if (to.place === places.RANGED_ZONE) {
        result += value * 0.1;
      } else if (to.place === places.MELEE_ZONE) {
        result += value * 0.4;
      } else if (to.place === places.WAR_ZONE || to.place === places.WAR_ZONE) {
        result += value * 0.6;
      }

      if (from.kingdom === kingdoms.ENEMY && from.place === places.DECK) {
        result += value * 0.2;
      } else if (from.kingdom === kingdoms.ENEMY && from.place === places.HAND) {
        result += value * 0.4;
      }

      return modifyPriceFromSelectors(result, selectors);
    },
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
    adjectives: [
      'resourceful',
      'contributive',
      'supportive',
      'helpful',
      'generous',
    ],
    professions: [
      'provider',
      'supplier',
      'contributor',
      'benefactor',
      'patron',
      'sponsor',
      'backer',
      'donor',
      'nurturer',
    ],
    elements: [
      {
        key: 'water',
        chance: 1,
      },
      {
        key: 'nature',
        chance: 1,
      },
      {
        key: 'time',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
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
    adjectives: [
      'destructive',
    ],
    professions: [
      'warrior',
      'soldier',
    ],
    elements: [
      {
        key: 'fire',
        chance: 1,
      },
      {
        key: 'shadow',
        chance: 1,
      },
      {
        key: 'toxic',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    mods: [
      ...dealDamageValueMods,
      ...improveTargetMods,
      addOrUpdateCardSelectorEffectMod,
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
    elements: [
      {
        key: 'tech',
        chance: 1,
      },
      {
        key: 'psychic',
        chance: 1,
      },
      {
        key: 'time',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
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
    elements: [
      {
        key: 'tech',
        chance: 1,
      },
      {
        key: 'psychic',
        chance: 1,
      },
      {
        key: 'time',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
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
        key: 'tech',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    mods: [
      ...statMods,
      ...improveTargetMods,
      addOrUpdateCardSelectorEffectMod,
    ],
    price: ({ value, stat }) => value * (stat === stats.ATTACK
      ? constants.CARD_PRICE_PER_ATTACK_POINT : constants.CARD_PRICE_PER_HP_POINT),
  },
  destroy: {
    key: 'destroy',
    forgeLevel: 2,
    banish: false,
    cardSelectors: {
      destroyedCard: null,
    },
    target: targets.CHOSEN,
    elements: [
      {
        key: 'shadow',
        chance: 1,
      },
      {
        key: 'toxic',
        chance: 1,
      },
      {
        key: 'tech',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    mods: [
      banishModForgeLevel4,
      ...improveTargetMods,
      addOrUpdateCardSelectorEffectMod,
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
      addOrUpdateCardSelectorEffectMod,
    ],
    elements: [
      {
        key: 'air',
        chance: 1,
      },
      {
        key: 'water',
        chance: 1,
      },
      {
        key: 'psychic',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    price: ({ place }) => {
      let result = 25;

      if (place === places.BARRACKS || place === places.WAR_ZONE) {
        result = 50;
      } else if (place === places.SIEGE_ZONE) {
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
      addOrUpdateCardSelectorEffectMod,
    ],
    elements: [
      {
        key: 'light',
        chance: 1,
      },
      {
        key: 'toxic',
        chance: 1,
      },
      {
        key: 'air',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    price: () => 200,
  },
  fight: {
    key: 'fight',
    target: targets.CHOSEN,
    cardSelectors: {
      foughtCard: null,
    },
    elements: [
      {
        key: 'light',
        chance: 1,
      },
      {
        key: 'fire',
        chance: 1,
      },
      {
        key: 'nature',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    mods: [
      ...improveTargetMods,
      addOrUpdateCardSelectorEffectMod,
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
    elements: [
      {
        key: 'light',
        chance: 1,
      },
      {
        key: 'water',
        chance: 1,
      },
      {
        key: 'time',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    mods: [
      ...dealDamageValueMods,
      ...improveTargetMods,
      addOrUpdateCardSelectorEffectMod,
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
    elements: [
      {
        key: 'shadow',
        chance: 1,
      },
      {
        key: 'psychic',
        chance: 1,
      },
      {
        key: 'light',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    mods: [
      toKingdomAllyMod,
      ...improveTargetMods,
      addOrUpdateCardSelectorEffectMod,
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
    elements: [
      {
        key: 'shadow',
        chance: 1,
      },
      {
        key: 'nature',
        chance: 1,
      },
      {
        key: 'tech',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    mods: [
      ...resurrectValueMods,
      fromKingdomAllyMod,
      fromKingdomEnemyLevel2Mod,
      toKingdomAllyMod,
      toKingdomEnemyLevel2Mod,
      toPlaceAnyButBarracksMod,
      addOrUpdateCardSelectorEffectMod,
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
    elements: [
      {
        key: 'air',
        chance: 1,
      },
      {
        key: 'toxic',
        chance: 1,
      },
      {
        key: 'psychic',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    mods: [
      ...discardValueMods,
      fromKingdomOwnerMod,
      fromKingdomAllyLevel2Mod,
      toDeckMod,
      toOwnerOrAllyLevel2Mod,
      addOrUpdateCardSelectorEffectMod,
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
    elements: [
      {
        key: 'nature',
        chance: 1,
      },
      {
        key: 'time',
        chance: 1,
      },
      {
        key: 'fire',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    mods: [
      ...summonValueMods,
      randomCreationMod,
      // mod to create enhanced versions of cards
      toKingdomAllyMod,
      toKingdomEnemyLevel2Mod,
      toPlaceAnyIngameButBarracksMod,
      addOrUpdateCardSelectorEffectMod,
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
    elements: [
      {
        key: 'nature',
        chance: 1,
      },
      {
        key: 'water',
        chance: 1,
      },
      {
        key: 'tech',
        chance: 1,
      },
      {
        key: 'any',
        chance: 0.5,
      },
    ],
    mods: [
      ...createValueMods,
      randomCreationMod,
      discoverMod,
      // mod to create enhanced versions of cards
      toKingdomAllyMod,
      toKingdomEnemyLevel2Mod,
      toPlaceHandMod,
      addOrUpdateCardSelectorEffectMod,
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
      addOrUpdateCardSelectorEffectMod,
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
