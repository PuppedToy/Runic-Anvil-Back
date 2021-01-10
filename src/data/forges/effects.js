// TODO:
// 1. Review every passive / effect / trigger to see if they apply to weapons or spells
// 2. Create the forge tree for the effects.
// 3. Assign a cost/modificator for each effect
const effects = {
  deploy: {
    name: 'Deploy',
    description: 'Put a card from hand into game. The owner must pay for its cost.',
  },
  destroy: {
    name: 'Destroy',
    description: 'Sends a unit from game to graveyard. When one unit\'s hit points are below 1, the unit is destroyed.',
  },
  draw: {
    name: 'Draw',
    description: 'Takes one card from the top of the deck into the hand. All players draw a card at the beginning of their turns by default.',
  },
  invest: {
    name: 'Invest',
    description: 'Increases the amount of gold the owner receives at the beginning of the turn. Every player invests 100 gold every turn by default.',
  },
  move: {
    name: 'Move',
    description: 'The unit is changed to another zone. This effect can be applied to any mobile unit after the combat phase. The phase where the units can be moved is the move phase.',
  },
  retire: {
    name: 'Retire',
    description: 'The retired unit is forced to move to the barracks and gets the "exhausted" effect. Any player can retire any unit before the war phase ends as a default action.',
  },
  taxes: {
    name: 'Taxes',
    description: 'There are two kind of taxes, which might be separated into different keywords in the future.\nEnd turn taxes are applied at the end of the turn after any other effect resolves. They reduce the amount of gold a player has and depends on the size of such amount. Taxes are zero for sums of less than 100 gold and work with thresholds.\nInvestment taxes are applied to the investment a player has. They limit the amount of extra gold a player can get each turn, making it less valuable at higher amounts.',
  },
  forge: {
    name: 'Forge',
    description: 'The main mechanic of the game. This means that 3 mechanics will be revealed and 1 might be chosen to be applied to some specific card.',
  },
  upgrade: {
    name: 'Upgrade',
    description: 'A card is upgraded when rarity is increased. When rarity is increased, card will be forged as many times as new rarity requires. After the card is forged, if it reaches the next rarity forge threshold, the card is upgraded automatically.',
  },
  unforge: {
    name: 'Unforge',
    description: 'The active loses the last forge and downgrades if a lower rarity cap is reached.',
  },
  downgrade: {
    name: 'Downgrade',
    description: 'A card is upgraded when rarity is decreased. When rarity is decreased, card will be unforged as many times as new rarity requires. If the card is unforged and reaches a lower rarity threshold, the card is downgraded automatically.',
  },
  drain: {
    name: 'Drain',
    description: 'The active loses all its forges and returns to basic rarity, losing also any downside associated with the forges.',
  },
  discover: {
    name: 'Discover',
    description: 'Owner chooses a card between 3 options - 3 randomized cards are created, player chooses one and the other 2 are destroyed. Any filter can be applied, such as: discover a card with [keyword], discover a card with [rarity], discover a cart with such cost, or such attack...',
  },
  summon: {
    name: 'Summon',
    description: 'Creates one new unit without applying it\'s deploy effect.',
  },
  unsummon: {
    name: 'Unsummon',
    description: 'Puts a creature in play into the player hand',
  },
  resurrect: {
    name: 'Resurrect',
    description: 'Returns one unit from graveyard to barracks. This unit does not trigger any deployed effect.',
  },
  banish: {
    name: 'Banish',
    description: 'Makes a unit or weapon disappear from the game',
  },
  discard: {
    name: 'Discard',
    description: 'The player that discards loses one card at random.',
  },
  betray: {
    name: 'Betray',
    description: 'The unit affected by this effect changes its owner after the turn ends and goes to its melee zone.',
  },
  heal: {
    name: 'Heal',
    description: 'Increases the unit hit points unless the unit\'s maximum hit points are reached.',
  },
  stun: {
    name: 'Stun',
    description: 'The unit can\'t move or fight this turn.',
  },
  silence: {
    name: 'Silence',
    description: 'The unit text is ignored',
  },
  reveal: {
    name: 'Reveal',
    description: 'The active loses stealth',
  },
  steal: {
    name: 'Steal',
    description: 'The target player loses an amount of gold -if the player has less gold, it loses the amount it has- and the owner receives the amount lost.',
  },
  collect: {
    name: 'Collect',
    description: 'The owner earns an amount of gold',
  },
  extend: {
    name: 'Extend',
    description: 'The target zone increases the number of units that can hold inside',
  },
  collapse: {
    name: 'Collapse',
    description: 'The target zone decreases the number of units that can hold inside',
  },
  disarm: {
    name: 'Disarm',
    description: 'Remove a weapon from a creature and put it in the floor. Whenever the phase ends, a random creature in that zone will pick it',
  },
  cast: {
    name: 'Cast',
    description: 'Creates a spell with some conditions and deploys it',
  },
  mutate: {
    name: 'Mutate',
    description: 'Adds and/or removes stats from a creature or weapon',
  },
};

module.exports = effects;
