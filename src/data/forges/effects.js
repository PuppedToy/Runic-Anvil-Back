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

// function applyCardSelectorPriceFilter(price, cardSelector) {
//   switch (cardSelector.key) {
//     case 'hasStat':
//       break;
//     case 
//   }

//   return price;
// }

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
      targetCard: null,
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
      'resolute',
      'decisive',
      'corageous',
      'confident',
      'determined',
      'experienced',
      'resourceful',
      'tenacious',
      'offensive',
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
    otherNouns: [
      'army',
      'troops',
      'forces',
      'deployment',
      'banner',
      'warfare',
      'tactics',
      'strategy',
      'battle',
      'campaign',
      'command',
      'leadership',
      'mobilization',
      'formation',
      'reconnaissance',
      'logistics',
      'vanguard',
      'infantry',
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
      'productive',
      'well-connected',
      'opportunistic',
      'selfless',
      'altruistic',
      'efficient',
      'collaborative',
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
      'producer',
      'vendor',
    ],
    otherNouns: [
      'distribution',
      'inventory',
      'shipping',
      'materials',
      'packaging',
      'logistics',
      'resources',
      'supplies',
      'options',
      'efficiency',
      'development',
      'renewal',
      'sustainability',
      'ecology',
      'replenishment',
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
    price: ({ value, from }) => {
      if (from.kingdom === kingdoms.ENEMY) {
        return value * 110;
      }
      return value * 60;
    },
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
      'aggresive',
      'ruthless',
      'precise',
      'sharpshooting',
      'menacing',
      'merciless',
      'savage',
      'vengeful',
      'accurate',
      'disciplined',
      'trained',
      'skilled',
      'proficient',
      'deadly',
      'professional',
      'armed',
      'motivated',
      'independent',
    ],
    professions: [
      'warrior',
      'soldier',
      'gladiator',
      'hunter',
      'marksman',
      'combatant',
      'sniper',
      'mercenary',
      'brawler',
      'commando',
      'thug',
      'butcher',
    ],
    otherNouns: [
      'impact',
      'assault',
      'aggression',
      'damage',
      'strike',
      'attack',
      'onslaught',
      'carnage',
      'engagement',
      'skirmish',
      'firepower',
      'warfare',
      'gunplay',
      'armament',
      'force',
      'hostility',
      'violence',
      'precision',
      'accuracy',
      'targeting',
      'bullets',
      'marksmanship',
      'arms',
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
    price: ({ value }) => value * 80,
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
    adjectives: [
      'wealthy',
      'prosperous',
      'affluent',
      'successful',
      'rich',
      'savvy',
      'resourceful',
      'enterprising',
      'shrewd',
      'astute',
      'entrepreneurial',
      'ambitious',
      'money-minded',
      'opportunistic',
      'strategic',
      'thrifty',
      'calculating',
      'industrious',
      'pragmatic',
      'well-off',
      'clever',
      'self-made',
      'acquisitive',
      'accomplished',
    ],
    professions: [
      'investor',
      'analyst',
      'financier',
      'broker',
      'trader',
      'profiteer',
      'manager',
      'entrepreneur',
      'speculator',
      'banker',
      'advisor',
      'planner',
      'economist',
      'accountant',
      'officer',
      'certified',
      'actuary',
      'auditor',
      'businessman',
    ],
    otherNouns: [
      'wealth',
      'capital',
      'investment',
      'money',
      'funds',
      'business',
      'revenue',
      'profit',
      'cash',
      'commerce',
      'interest',
      'employment',
      'rental',
      'consulting',
      'trade',
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
    mods: [
      ...modifyInvestmentValueMods,
      ...toKingdomGoldMods,
      reverseGoldMod,
    ],
    price: ({ value, operation, to }) => {
      if (operation === operations.SUBTRACT && to.kingdom === kingdoms.ENEMY) {
        return value * 2;
      }
      if (operation === operations.SUBTRACT) {
        return value * -0.5;
      }
      if (operation === operations.STEAL && to.kingdom === kingdoms.ENEMY) {
        return value * 3;
      }
      if (operation === operations.STEAL) {
        return value * 0.2;
      }
      return value;
    },
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
    adjectives: [
      'wealthy',
      'prosperous',
      'affluent',
      'successful',
      'rich',
      'savvy',
      'resourceful',
      'enterprising',
      'shrewd',
      'astute',
      'entrepreneurial',
      'ambitious',
      'money-minded',
      'opportunistic',
      'strategic',
      'thrifty',
      'calculating',
      'industrious',
      'pragmatic',
      'well-off',
      'clever',
      'self-made',
      'acquisitive',
      'accomplished',
      'lucky',
      'fortunate',
      'windfall',
      'charmed',
      'favored',
    ],
    professions: [
      'investor',
      'analyst',
      'financier',
      'broker',
      'trader',
      'profiteer',
      'manager',
      'entrepreneur',
      'speculator',
      'banker',
      'advisor',
      'planner',
      'economist',
      'accountant',
      'officer',
      'certified',
      'actuary',
      'auditor',
      'businessman',
      'gambler',
    ],
    otherNouns: [
      'wealth',
      'capital',
      'investment',
      'money',
      'funds',
      'business',
      'revenue',
      'profit',
      'cash',
      'commerce',
      'interest',
      'employment',
      'rental',
      'consulting',
      'trade',
    ],
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
    price: ({ value, operation, to }) => {
      if (operation === operations.SUBTRACT && to.kingdom === kingdoms.ENEMY) {
        return value * 1.2;
      }
      if (operation === operations.SUBTRACT) {
        return value * -0.3;
      }
      if (operation === operations.STEAL && to.kingdom === kingdoms.ENEMY) {
        return value * 2;
      }
      if (operation === operations.STEAL) {
        return value * 0.2;
      }
      return value * 0.8;
    },
  },
  modifyStat: {
    key: 'modifyStat',
    target: targets.CHOSEN,
    cardSelectors: {
      targetCard: null,
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
    professions: [
      'mentor',
      'motivator',
      'coach',
      'counselor',
      'advisor',
      'guide',
      'advocate',
      'empowerer',
      'trainer',
      'teacher',
      'supporter',
      'facilitator',
      'professor',
      'scientist',
      'expert',
    ],
    adjectives: [
      'motivational',
      'inspirational',
      'uplifting',
      'encouraging',
      'supportive',
      'inspiring',
      'empowering',
      'educational',
      'knowledgeable',
      'dedicated',
      'caring',
      'influential',
      'professional',
      'dynamic',
    ],
    otherNouns: [
      'athletics',
      'fitness',
      'training',
      'demonstration',
      'practice',
      'equipment',
      'tools',
      'technique',
      'method',
    ],
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
    price: ({ value, ...card }) => (card.stats.attack || 0) * constants.CARD_PRICE_PER_ATTACK_POINT
      + (card.stats.hp || 0) * constants.CARD_PRICE_PER_ATTACK_POINT,
  },
  destroy: {
    key: 'destroy',
    forgeLevel: 2,
    banish: false,
    cardSelectors: {
      targetCard: null,
    },
    target: targets.CHOSEN,
    professions: [
      'assassin',
      'executioner',
      'exterminator',
      'hitman',
      'sniper',
      'elite',
      'mercenary',
      'champion',
      'operative',
      'butcher',
      'killer',
      'criminal',
      'horror',
      'reaper',
      'slayer',
    ],
    adjectives: [
      'destructive',
      'aggresive',
      'ruthless',
      'precise',
      'sharpshooting',
      'menacing',
      'merciless',
      'savage',
      'vengeful',
      'accurate',
      'disciplined',
      'trained',
      'skilled',
      'proficient',
      'deadly',
      'professional',
      'armed',
      'motivated',
      'independent',
    ],
    otherNouns: [
      'onslaught',
      'carnage',
      'death',
      'murder',
      'assassination',
      'efficiency',
      'hostility',
      'violence',
      'cruelty',
      'knives',
      'skulls',
      'blood',
      'horror',
    ],
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
      targetCard: null,
    },
    to: {
      kingdom: kingdoms.OWNER,
      place: {
        $sample: [places.RANGED_ZONE, places.MELEE_ZONE],
      },
    },
    professions: [
      'commander',
      'tactician',
      'strategist',
      'marshal',
      'general',
      'sargeant',
      'scout',
      'specialist',
      'officer',
      'agent',
      'operative',
      'saboteur',
      'navigator',
      'pilot',
      'counterintelligence',
      'paratrooper',
      'operator',
      'analyst',
    ],
    adjectives: [
      'tactical',
      'strategic',
      'commanding',
      'agile',
      'covert',
      'versatile',
      'mobile',
      'adaptable',
      'dynamic',
      'ingenious',
      'perceptive',
      'calculating',
      'responsive',
    ],
    otherNouns: [
      'maneuver',
      'logistics',
      'mobilization',
      'preparation',
      'reinforcement',
      'adaptability',
      'flexibility',
      'organization',
      'planning',
      'coordination',
      'reconnaissance',
      'positioning',
      'adaptation',
      'assembly',
      'infiltration',
      'communication',
      'operation',
    ],
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
      targetCard: null,
    },
    to: {
      kingdom: kingdoms.OWNER,
      place: places.HAND,
    },
    professions: [
      'infilitrator',
      'saboateur',
      'agent',
      'operative',
      'disruptor',
      'hacker',
      'interceptor',
      'chemist',
      'trapper',
    ],
    adjectives: [
      'disruptive',
      'decoying',
      'covert',
      'elusive',
      'deceptive',
      'undercover',
      'diversionary',
      'disarming',
      'specialized',
    ],
    otherNouns: [
      'intel',
      'ciphers',
      'communications',
      'signals',
      'tracking',
      'plans',
      'operation',
      'diversion',
      'sabotage',
      'smoke',
    ],
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
      targetCard: null,
    },
    professions: [
      'duelist',
      'fighter',
      'warrior',
      'champion',
      'gladiator',
      'brawler',
      'soldier',
      'combatant',
      'mercenary',
      'thug',
      'bodyguard',
      'master',
      'sheriff',
      'peacekeeper',
      'enforcer',
      'instructor',
      'rival',
      'swordmaster',
    ],
    adjectives: [
      'skillful',
      'formidable',
      'resolute',
      'unyielding',
      'masterful',
      'confident',
      'valiant',
      'competent',
      'determined',
      'corageous',
      'daring',
      'fierce',
      'honorable',
      'chivalrous',
      'exceptional',
      'battle-hardened',
      'seasoned',
      'dauntless',
      'invincible',
      'unbeatable',
      'disciplined',
      'victorious',
      'glorious',
      'legendary',
      'famous',
    ],
    otherNouns: [
      'confrontation',
      'honor',
      'valor',
      'code',
      'fencing',
      'legend',
      'glory',
      'fame',
      'victory',
      'triumph',
    ],
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
      targetCard: null,
    },
    value: {
      $range: {
        min: 1,
        max: 2,
      },
    },
    professions: [
      'medic',
      'doctor',
      'nurse',
      'surgeon',
      'paramedic',
      'therapist',
      'physician',
      'healer',
      'caretaker',
      'clinician',
      'practitioner',
      'intern',
      'pharmacist',
    ],
    adjectives: [
      'healing',
      'restorative',
      'rejuvenating',
      'regenerative',
      'curative',
      'therapeutic',
      'medicinal',
      'nurturing',
      'soothing',
      'comforting',
      'calming',
      'reassuring',
      'restful',
      'tranquil',
      'relaxing',
      'peaceful',
      'serene',
      'gentle',
      'mild',
      'pleasant',
      'quiet',
      'soft',
    ],
    otherNouns: [
      'recovery',
      'rehabilitation',
      'renewal',
      'regeneration',
      'restoration',
      'replenishment',
      'love',
      'care',
      'kindness',
    ],
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
      targetCard: null,
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
      targetCard: null,
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
      targetCard: null,
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
      targetCard: null,
    },
    statusEffect: {
      $richSample: {
        list: statusEffects,
        map: ({ key }) => key,
      },
    },
    target: targets.CHOSEN,
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
