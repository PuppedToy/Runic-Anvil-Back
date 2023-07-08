module.exports = {
  constants: {
    DB_VERSION: 1,
    CARD_VERSION: '1.0.0',
    COST_CACHE_VERSION: '1.0.0.0',
    CARD_PRICE_PER_ATTACK_POINT: 40,
    CARD_PRICE_PER_HP_POINT: 40,
    COMMANDER_DEFAULT_VALUE: 100,
    RECOMMENDED_COMMANDER_LOWER_THRESHOLD: 80,
  },
  kingdoms: {
    OWNER: 'owner',
  },
  places: {
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
  },
};
