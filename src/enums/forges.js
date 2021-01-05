/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// General TODO and WARNING:
// We need to ensure any effect that might chain only applies a max number of times (maybe 1, 2 or 5)
// Example:
// Unit 1: Whenever a friendly unit activates a triggereable effect, trigger a triggereable effect of a friendly unit
// Unit 2: Quick action: earn 4$

const forgeTypes = {
  EFFECT: 'EFFECT',
  PASSIVE_EFFECT: 'PASSIVE_EFFECT',
  TRIGGER: 'TRIGGER',
  TRIGGERABLE_EFFECT: 'TRIGGERABLE_EFFECT',
};

// Although any passive effect is considered a tribe itself, tribes are also filters for some triggers and effects of the game
// These tribes may also have slight modificators to their stats or forge chances. We'll see
const unitTypes = {
  // Default
  human: {
    name: 'Human',
  },

  bird: {
    name: 'Bird',
    forgeLevel: 1,
  },
  insect: {
    name: 'Insect',
    forgeLevel: 1,
  },
  ape: {
    name: 'Ape',
    forgeLevel: 1,
  },
  beast: {
    name: 'Beast',
    forgeLevel: 1,
  },
  reptile: {
    name: 'Reptile',
    forgeLevel: 1,
  },
  fish: {
    name: 'Fish',
    forgeLevel: 1,
  },
  tree: {
    name: 'Tree',
    forgeLevel: 2,
  },
  fungus: {
    name: 'Fungus',
    forgeLevel: 2,
  },
  drone: {
    name: 'Drone',
    forgeLevel: 2,
  },
  dinosaur: {
    name: 'Dinosaur',
    forgeLevel: 2,
  },
  mutant: {
    name: 'Mutant',
    forgeLevel: 2,
  },
  elemental: {
    name: 'Elemental',
    forgeLevel: 3,
  },
  spirit: {
    name: 'Spirit',
    forgeLevel: 3,
  },
  ooze: {
    name: 'Ooze',
    forgeLevel: 3,
  },
  zombie: {
    name: 'Zombie',
    forgeLevel: 3,
  },
  shade: {
    name: 'Shade',
    forgeLevel: 3,
  },
  golem: {
    name: 'Golem',
    forgeLevel: 3,
  },
  fairy: {
    name: 'Fairy',
    forgeLevel: 3,
  },
  chimera: {
    name: 'Chimera',
    forgeLevel: 3,
  },
  kraken: {
    name: 'Kraken',
    forgeLevel: 4,
  },
  dragon: {
    name: 'Dragon',
    forgeLevel: 4,
  },
  angel: {
    name: 'Angel',
    forgeLevel: 4,
  },
  demon: {
    name: 'Demon',
    forgeLevel: 4,
  },
  demigod: {
    name: 'Demigod',
    forgeLevel: 4,
  },
  god: {
    name: 'God',
    forgeLevel: 5,
  },
};

const passiveEffects = {
  ranged: {
    name: 'Ranged',
    description: 'When defending, if the ranged unit is covered by the frontmost wall, they won\'t receive combat damage. If the ranged unit is not covered by a wall, they won\'t do any combat damage. These rules only apply when the attacker is melee.\nWhen at war, ranged units attack after melee units and before siege units.\nWhen attacking, ranged units can only be blocked if every melee attacker has been blocked by another unit.',
    costModificator: ({ cost }) => cost + 100,
  },
  siege: {
    name: 'Siege',
    description: 'Siege units deal half of their damage to any non-wall or non-building card and double damage to any wall or building card. In the war phase, siege units attack after ranged layer -at siege layer- and when sieging, they can\'t be blocked unless any other taunt, berserker, melee and ranged unit have been blocked.',
    costModificator: ({ cost }) => cost - 50,
  },
  building: {
    name: 'Building',
    description: 'The unit can be deployed in any zone, but after that, it can\'t be moved nor forced to move. The unit is immune to betray effect.',
    costModificator: ({ cost }) => cost - 100,
  },
  taunting: {
    name: 'Taunting',
    description: 'This unit must strike in taunt layer at war, it must be blocked first and must block first, before any other non-taunt unit is assigned a blocker.',
    costModificator: ({ cost }) => cost + 50,
  },
  wall: {
    name: 'Wall',
    description: 'Every wall is also considered a building. Walls will grant cover to any unit behind them and they are stacked. Every keep has by default two walls.',
    costModificator: ({ cost }) => cost,
  },
  challenger: {
    name: 'Challenger',
    description: 'When sieging, this unit chooses who blocks it, if eligible.',
    costModificator: ({ cost }) => cost + 100,
  },
  civic: {
    name: 'Civic',
    description: 'This unit can\'t go to war nor defend unless there are no walls left.',
    costModificator: ({ cost }) => cost - 100,
  },
  heavy: {
    name: 'Heavy',
    description: 'This unit can\'t be forced to move.',
    costModificator: ({ cost }) => cost + 25,
  },
  technician: {
    name: 'Technician',
    description: 'The unit is considered civic and heavy. If somehow, it is moved out of barracks, it will be forced immediately to move to barracks if possible, forcing any non-technician to move to the closest available zone.',
    costModificator: ({ cost }) => cost - 200,
    forgeLevel: 2,
  },
  stealth: {
    name: 'Stealth',
    description: 'At deployment, the unit is not revealed. Whenever this unit is engaged in combat or triggers one triggerable effect, the unit is revealed and loses Stealth. While in stealth and siege, this unit ignores the first wall.',
    costModificator: ({ cost }) => cost + 100,
    forgeLevel: 2,
  },
  berserker: {
    name: 'Berserker',
    description: 'This unit will go to war every turn and will attack before any unit, including taunts. At the move phase, if the unit is not at the melee zone, it will move itself to the melee zone. A berserker unit is not affected by any retire effect.',
    costModificator: ({ cost }) => cost - 50,
  },
  fearful: {
    name: 'Fearful',
    description: 'This unit will attack always the last, even after the ranged and siege units. When defending, this unit can\'t block.',
    costModificator: ({ cost }) => cost - 100,
  },
  fearsome: {
    name: 'Fearsome',
    description: 'At war, this unit\'s opponent will go last in their rotation and every enemy unit will shift their opponents.',
    costModificator: ({ cost }) => cost + 75,
  },
  versatile: {
    name: 'Versatile',
    description: 'This unit is considered both melee and ranged.',
    costModificator: ({ cost }) => cost + 200,
    forgeLevel: 2,
  },
  reinforcement: {
    name: 'Reinforcement',
    description: 'The unit can be deployed before war or siege starts -both attacking or defending-. If at war phase, it will join the attack as the last unit of their layer.',
    costModificator: ({ cost }) => cost + 100,
  },
  invisible: {
    name: 'Invisible',
    description: 'This unit can\'t be eligible as target for any effect unless the effect specifies it can. This unit can\'t be blocked.',
    costModificator: ({ cost }) => cost + 200,
    forgeLevel: 3,
  },
  vampiric: {
    name: 'Vampiric',
    description: 'After dealing damage and surviving, this unit heals the amount dealt.',
    costModificator: ({ cost }) => cost + 100,
  },
  deadly: {
    name: 'Deadly',
    description: 'This unit destroys any unit that receives combat damage from it.',
    costModificator: ({ cost }) => cost + 400,
  },
  barrier: {
    name: 'Barrier',
    description: 'The unit is immune to the next damage received. The unit loses barrier as soon as some damage is prevented.',
    costModificator: ({ cost, attack }) => cost + attack * 15,
  },
  warrior: {
    name: 'Warrior',
    description: 'When fighting, the unit and its opponent will strike until one of them is destroyed.',
    costModificator: ({ cost }) => cost + 50,
  },
  swift: {
    name: 'Swift',
    description: 'In combat, the unit will strike first and, if the opponent is destroyed, it won\'t receive combat damage.',
    costModificator: ({ cost, attack }) => cost + attack * 40,
    forgeLevel: 2,
  },
  slow: {
    name: 'Slow',
    description: 'This unit can only move to a zone if it is adjacent. In combat, the unit will strike last and, if it is destroyed, it won\'t do any combat damage.',
    costModificator: ({ cost, defense }) => cost + Math.min(-300 + defense * 20, -100),
    forgeLevel: 2,
  },
  haste: {
    name: 'Haste',
    description: 'When deployed, this unit can be placed in any of the keep zones.',
    costModificator: ({ cost }) => cost + 100,
  },
  vigorous: {
    name: 'Vigorous',
    description: 'At war, this unit will strike again in an extra round, after the war is resolved.',
    costModificator: ({ cost }) => cost + 25,
  },
  big: {
    name: 'Big',
    description: 'At war, the unit will strike against two opponents at the same time.\nWhen sieging, the unit can only be blocked by two units, dealing damage to both of them.\nWhen defending, the unit can choose to block two units, dealing damage to both of them.',
    costModificator: ({ cost }) => cost * 1.25,
    costPriority: 2,
  },
  huge: {
    name: 'Huge',
    description: 'Same as big, but with 3 units.',
    referTo: 'big',
    costModificator: ({ cost }) => cost * 1.5,
    costPriority: 2,
    forgeLevel: 2,
  },
  titan: {
    name: 'Titan',
    description: 'Same as big, but with 4 units.',
    referTo: 'big',
    costModificator: ({ cost }) => cost * 2,
    costPriority: 2,
    forgeLevel: 3,
  },
  scout: {
    name: 'Scout',
    description: 'When defending, if the unit is covered by the frontmost wall, reveal any stealth units attacking.',
    costModificator: ({ cost }) => cost + 150,
  },
  pierce: {
    name: 'Pierce',
    description: 'At war, this unit spends its extra attack to damage the next enemy unit in the queue.\nAt siege, this unit spends its extra attack to damage the closest wall.',
    costModificator: ({ cost, attack }) => cost + attack * 20,
  },
  spinner: {
    name: 'Spinner',
    description: 'At war, this unit also damages the last enemy unit that has fought.',
    costModificator: ({ cost, attack }) => cost + attack * 20,
  },
  burst: {
    name: 'Burst',
    description: 'At war, this unit damages to any unit adjacent in the queue to itself and its opponent.',
    costModificator: ({ cost }) => cost,
  },
  splash: {
    name: 'Splash',
    description: 'At war, this unit also damages to the enemy units adjacent in the queue to the opponent.',
    costModificator: ({ cost, attack }) => cost + attack * 30,
    forgeLevel: 2,
  },
  exhausted: {
    name: 'Exhausted',
    description: 'An exhausted unit can\'t move or fight like an action unless forced by any other effect. At the end of the turn, this effect disappears from the unit.',
    costModificator: ({ cost }) => cost - 100,
  },
  flash: {
    name: 'Flash',
    description: 'Deploying this card does not rotate the "turn token", which means that the player can still play cards until this token is rotated.',
    costModificator: ({ cost }) => cost + 50,
  },
};

// TODO:
// 1. Review every passive / effect / trigger to see if they apply to weapons or spells
// 2. Create the forge tree for the effects.
// 3. Assign a cost/modificator for each effect

// More effect ideas
// Disarm
// Give stats
// Cast? (Its deploy for spells) --> Do spells go to graveyard or banish? Maybe a spell graveyard?
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
};

// Triggers cost modificator act over the associated effect total cost
// Every trigger will have a forge to apply its effect before and after its keyword is applied
const triggers = {
  deployed: {
    name: 'Deployed',
    onEffect: 'deploy',
  },
  destroyed: {
    name: 'Destroyed',
    onEffect: 'destroy',
    costModificator: ({ cost }) => cost * 0.9,
  },
  resurrected: {
    name: 'Resurrected',
    onEffect: 'resurrect',
    costModificator: ({ cost }) => cost * 0.6,
  },
  banished: {
    name: 'Banished',
    onEffect: 'banish',
    costModificator: ({ cost }) => cost * 0.3,
  },
  discarded: {
    name: 'Discarded',
    onEffect: 'discard',
    costModificator: ({ cost }) => cost * 0.5,
  },
  moved: {
    name: 'Moved',
    onEffect: 'move',
    costModificator: ({ cost }) => cost * 3,
  },
  damaged: {
    name: 'Damage',
    onEffect: 'damage',
    costModificator: ({ cost }) => cost * 1.2,
  },
  dealingDamage: {
    name: 'Dealing damage',
    onEffect: 'dealingDamage',
    costModificator: ({ cost }) => cost * 1.3,
  },
  attacking: {
    name: 'Attacking',
    onEffect: 'attack',
    costModificator: ({ cost }) => cost * 1.75,
  },
  defending: {
    name: 'Defending',
    onEffect: 'defend',
    costModificator: ({ cost }) => cost * 1.75,
  },
  war: {
    name: 'War',
    effectType: 'stageChange',
    onEffect: 'war',
    costModificator: ({ cost }) => cost * 2.5,
  },
  siege: {
    name: 'Siege',
    effectType: 'stageChange',
    onEffect: 'siege',
    costModificator: ({ cost }) => cost * 1.75,
  },
  // More ideas
  // For a unit:
  // Retires
  // Triggers
  //
  //
  // Game phases:
  // Beginning of a player's turn
  // End of a player's turn
  //
  //
  // A player invests
  // A player receives a token
  // Draw a card
  // Money is earnt
  // An eligible card triggers one of the above effects
  //
};

const triggerableEffect = {
  action: {
    name: 'Action',
    description: 'Actions can be triggered only before the attack phase and it exhaust the card that uses the action.',
    costModificator: ({ cost }) => cost * 2,
  },
  quickAction: {
    name: 'Quick action',
    description: 'Quick actions can be triggered once per turn at any point and without cost',
    costModificator: ({ cost }) => cost * 3,
  },
  hire: {
    name: 'Hire',
    description: 'The owner must pay a price to activate the effect of the card, and the card is exhausted when using this effect. These are actions with price.',
    costModificator: ({ cost }) => cost * 0.5,
  },
  buy: {
    name: 'Buy',
    description: 'The owner must pay a price to activate the effect of the card and it can be played any number of times.',
    costModificator: ({ cost }) => cost * 1.2,
  },
};

// Targets
// 1. Choose one
// 2. Choose many
// 3. Random one
// 4. Random many
// 5. Every eligible target

// Eligible targets (cards)
// 0. Self
// 1. All
// 2. All that posses one passive effect
// 3. All from a tribe
// 4. All that posses a triggereable effect
// 5. All that have a variable above, below or equal a threshold:
// 5.a. Cost
// 5.b. Attack
// 5.c. Max health
// 5.d. Health
// 5.e. Missing health
// 5.f. Rarity
// 5.g. Name length
// 6. All that are in a zone
// 6.a. Barracks
// 6.b. Inside kingdom
// 6.c. Melee zone
// 6.d. War zone
// 6.e. Sieging
// 6.f. Graveyard
// 6.g. Deck
// 6.h. Hand
// 7. All from an eligible kingdom
// 8. All with a specific name
// 9. All from a forge origin (starting blank card)
// 10. All holding a siege
// 11. The many that have the most or least of one variable
// 12. All that are from a card type (spell, weapon or creature)

// Eligible Kingdoms
// 1. All from owner kingdom
// 2. All from allied kingdoms
// 3. All from enemy kingdoms
// 4. All from the kingdom with the turn token
// 5. All from any kingdom with a variable above, below or equal a threshold:
// 5.a. Invested money
// 5.b. Money
// 5.c. Wall health
// 5.d. Deployed (eligible) cards
// 5.g. (eligible) Cards in graveyard
// 5.h. (eligible) Cards in deck
// 5.i. Spells casted
// 5.j. Time spent
// 6. All from the kingdoms with the most or least of one variable

// Extras for both kingdoms and cards
// EXTRA A: All that meet 1 of many of the above conditions
// EXTRA B: All that meet many of the above conditions
// EXTRA C: All that does NOT meet the conditions

// Condition ideas
// 1. There are more, less or equal than a threshold of eligible cards
// 2. There are more, less or equal than a threshold of eligible kingdoms
// 3. The total amount of one variable is more, less or equal than a trheshold in the game:
// 3.a. Any of the (eligible) cards variables
// 3.b. Any of the (eligible) kingdms variables
// 4. Turn count is more, less or equal a threshold

// Compounded effect ideas
// 1. Grant a passive effect to (eligible) cards
// 2. Remove a passive effect from (eligible) cards
// 3. Apply an effect to (eligible) cards

// EXTRA A: Any of the above may be done if a condition is met (we have to define condition yet). Eligible cards follow conditions actually, but there may be other conditions

// General forge ideas
// TODO

const forges = {
  // TODO
};

module.exports = forges;
