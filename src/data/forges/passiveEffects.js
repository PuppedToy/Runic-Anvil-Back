/* eslint-disable max-len */

const passiveEffects = {
  ranged: {
    name: 'Ranged',
    description: 'When defending, if the ranged unit is covered by the frontmost wall, they won\'t receive combat damage. If the ranged unit is not covered by a wall, they won\'t do any combat damage. These rules only apply when the attacker is melee.\nWhen at war, ranged units attack after melee units and before siege units.\nWhen attacking, ranged units can only be blocked if every melee attacker has been blocked by another unit.',
    costModificator: ({ cost }) => cost + 100,
  },
  // siege: {
  //   name: 'Siege',
  //   description: 'Siege units deal half of their damage to any non-wall or non-building card and double damage to any wall or building card. In the war phase, siege units attack after ranged layer -at siege layer- and when sieging, they can\'t be blocked unless any other taunt, berserker, melee and ranged unit have been blocked.',
  //   costModificator: ({ cost }) => cost - 50,
  // },
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
  // wall: {
  //   name: 'Wall',
  //   description: 'Every wall is also considered a building. Walls will grant cover to any unit behind them and they are stacked. Every keep has by default two walls.',
  //   costModificator: ({ cost }) => cost,
  // },
  challenger: {
    name: 'Challenger',
    description: 'When sieging, this unit chooses who blocks it, if eligible.',
    costModificator: ({ cost }) => cost + 100,
  },
  // civic: {
  //   name: 'Civic',
  //   description: 'This unit can\'t go to war nor defend unless there are no walls left.',
  //   costModificator: ({ cost }) => cost - 100,
  // },
  // heavy: {
  //   name: 'Heavy',
  //   description: 'This unit can\'t be forced to move.',
  //   costModificator: ({ cost }) => cost + 25,
  // },
  // technician: {
  //   name: 'Technician',
  //   description: 'The unit is considered civic and heavy. If somehow, it is moved out of barracks, it will be forced immediately to move to barracks if possible, forcing any non-technician to move to the closest available zone.',
  //   costModificator: ({ cost }) => cost - 200,
  //   forgeLevel: 2,
  // },
  // stealth: {
  //   name: 'Stealth',
  //   description: 'At deployment, the unit is not revealed. Whenever this unit is engaged in combat or triggers one triggerable effect, the unit is revealed and loses Stealth. While in stealth and siege, this unit ignores the first wall.',
  //   costModificator: ({ cost }) => cost + 100,
  //   forgeLevel: 2,
  // },
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
  // versatile: {
  //   name: 'Versatile',
  //   description: 'This unit is considered both melee and ranged.',
  //   costModificator: ({ cost }) => cost + 200,
  //   forgeLevel: 2,
  // },
  // reinforcement: {
  //   name: 'Reinforcement',
  //   description: 'The unit can be deployed before war or siege starts -both attacking or defending-. If at war phase, it will join the attack as the last unit of their layer.',
  //   costModificator: ({ cost }) => cost + 100,
  // },
  // invisible: {
  //   name: 'Invisible',
  //   description: 'This unit can\'t be eligible as target for any effect unless the effect specifies it can. This unit can\'t be blocked.',
  //   costModificator: ({ cost }) => cost + 200,
  //   forgeLevel: 3,
  // },
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
  // barrier: {
  //   name: 'Barrier',
  //   description: 'The unit is immune to the next damage received. The unit loses barrier as soon as some damage is prevented.',
  //   costModificator: ({ cost, attack }) => cost + attack * 15,
  // },
  // warrior: {
  //   name: 'Warrior',
  //   description: 'When fighting, the unit and its opponent will strike until one of them is destroyed.',
  //   costModificator: ({ cost }) => cost + 50,
  // },
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
  // haste: {
  //   name: 'Haste',
  //   description: 'When deployed, this unit can be placed in any of the keep zones.',
  //   costModificator: ({ cost }) => cost + 100,
  // },
  // vigorous: {
  //   name: 'Vigorous',
  //   description: 'At war, this unit will strike again in an extra round, after the war is resolved.',
  //   costModificator: ({ cost }) => cost + 25,
  // },
  // big: {
  //   name: 'Big',
  //   description: 'At war, the unit will strike against two opponents at the same time.\nWhen sieging, the unit can only be blocked by two units, dealing damage to both of them.\nWhen defending, the unit can choose to block two units, dealing damage to both of them.',
  //   costModificator: ({ cost }) => cost * 1.25,
  //   costPriority: 2,
  // },
  // huge: {
  //   name: 'Huge',
  //   description: 'Same as big, but with 3 units.',
  //   referTo: 'big',
  //   costModificator: ({ cost }) => cost * 1.5,
  //   costPriority: 2,
  //   forgeLevel: 2,
  // },
  // titan: {
  //   name: 'Titan',
  //   description: 'Same as big, but with 4 units.',
  //   referTo: 'big',
  //   costModificator: ({ cost }) => cost * 2,
  //   costPriority: 2,
  //   forgeLevel: 3,
  // },
  // scout: {
  //   name: 'Scout',
  //   description: 'When defending, if the unit is covered by the frontmost wall, reveal any stealth units attacking.',
  //   costModificator: ({ cost }) => cost + 150,
  // },
  // pierce: {
  //   name: 'Pierce',
  //   description: 'At war, this unit spends its extra attack to damage the next enemy unit in the queue.\nAt siege, this unit spends its extra attack to damage the closest wall.',
  //   costModificator: ({ cost, attack }) => cost + attack * 20,
  // },
  // spinner: {
  //   name: 'Spinner',
  //   description: 'At war, this unit also damages the last enemy unit that has fought.',
  //   costModificator: ({ cost, attack }) => cost + attack * 20,
  // },
  // burst: {
  //   name: 'Burst',
  //   description: 'At war, this unit damages to any unit adjacent in the queue to itself and its opponent.',
  //   costModificator: ({ cost }) => cost,
  // },
  // splash: {
  //   name: 'Splash',
  //   description: 'At war, this unit also damages to the enemy units adjacent in the queue to the opponent.',
  //   costModificator: ({ cost, attack }) => cost + attack * 30,
  //   forgeLevel: 2,
  // },
  // exhausted: {
  //   name: 'Exhausted',
  //   description: 'An exhausted unit can\'t move or fight like an action unless forced by any other effect. At the end of the turn, this effect disappears from the unit.',
  //   costModificator: ({ cost }) => cost - 100,
  // },
  // flash: {
  //   name: 'Flash',
  //   description: 'Deploying this card does not rotate the "turn token", which means that the player can still play cards until this token is rotated.',
  //   costModificator: ({ cost }) => cost + 50,
  // },
};

module.exports = passiveEffects;
