module.exports = {
  constants: {
    DB_VERSION: 1,
    CARD_VERSION: '0.3.0',
    COST_CACHE_VERSION: '0.3.0.1',
    CARD_PRICE_PER_ATTACK_POINT: 40,
    CARD_PRICE_PER_HP_POINT: 40,
    COMMANDER_DEFAULT_VALUE: 100,
    RECOMMENDED_COMMANDER_LOWER_THRESHOLD: 80,
    STAT_THRESHOLDS: [5, 10, 15],
    FLAVOR_UPGRADE_CHANCE: 0.5,
  },
  packs: {
    getRandomCardRarity(rarityProbabilities) {
      const random = Math.random();
      let sum = 0;
      const probabiltyEntries = Object.entries(rarityProbabilities);
      for (let i = 0; i < probabiltyEntries.length; i += 1) {
        const rarity = probabiltyEntries[i][0];
        const probability = probabiltyEntries[i][1];
        sum += probability;
        if (random <= sum) {
          return parseInt(rarity, 10);
        }
      }
      throw new Error('Rarity probabilities do not sum to 1');
    },
    default: {
      size: 5,
      rarityProbabilities: {
        0: 0.2,
        1: 0.4,
        2: 0.2,
        3: 0.135,
        4: 0.05,
        5: 0.015,
      },
    },
  },
  kingdoms: {
    OWNER: 'owner',
    ALLY: 'ally',
    ENEMY: 'enemy',
  },
  places: {
    NONE: 'none',
    HAND: 'hand',
    DECK: 'deck',
    BARRACKS: 'barracks',
    RANGED_ZONE: 'rangedZone',
    MELEE_ZONE: 'meleeZone',
    WAR_ZONE: 'warZone',
    SIEGE_ZONE: 'siegeZone',
  },
  targets: {
    CHOSEN: 'chosen',
    CHOSEN_AND_ADJACENTS: 'chosenAndAdjacents',
    ALL: 'all',
  },
  operations: {
    ADD: 'add',
    SUBTRACT: 'subtract',
    STEAL: 'steal',
  },
  compareOperators: {
    MORE_THAN: 'moreThan',
    LESS_THAN: 'lessThan',
    EQUALS: 'equals',
  },
  stats: {
    ATTACK: 'attack',
    HP: 'hp',
    COST: 'cost',
  },
  creations: {
    SPECIFIC: 'specific',
    RANDOM: 'random',
    DISCOVER: 'discover',
  },
};
