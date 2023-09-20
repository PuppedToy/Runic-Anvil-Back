module.exports = {
  constants: {
    DB_VERSION: 1,
    CARD_VERSION: '1.0.1',
    COST_CACHE_VERSION: '1.0.1.0',
    CARD_PRICE_PER_ATTACK_POINT: 40,
    CARD_PRICE_PER_HP_POINT: 40,
    COMMANDER_DEFAULT_VALUE: 100,
    RECOMMENDED_COMMANDER_LOWER_THRESHOLD: 80,
    STAT_THRESHOLDS: [5, 10, 15],
    FLAVOR_UPGRADE_CHANCE: 0.5,
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
    RANDOM: 'random',
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
