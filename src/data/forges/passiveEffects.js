/* eslint-disable max-len */
const { constants } = require('../enums');

const passiveEffects = {
  ranged: {
    key: 'ranged',
    costModificator: ({ cost, attack, hp }) => cost
      + (attack * constants.CARD_PRICE_PER_ATTACK_POINT)
      - (hp * constants.CARD_PRICE_PER_HP_POINT) / 2,
  },
  siege: {
    key: 'siege',
    costModificator: ({ cost }) => Math.max(0, cost - 100),
  },
  // building: {
  //   name: 'Building',
  //   description: 'The unit can be deployed in any zone, but after that, it can\'t be moved nor forced to move. The unit is immune to betray effect.',
  //   costModificator: ({ cost }) => cost - 100,
  // },
  taunting: {
    key: 'taunting',
    costModificator: ({ cost }) => cost + 40,
  },
  challenger: {
    key: 'challenger',
    costModificator: ({ cost }) => cost + 100,
    forgeLevel: 2,
  },
  // wall: {
  //   name: 'Wall',
  //   description: 'Every wall is also considered a building. Walls will grant cover to any unit behind them and they are stacked. Every keep has by default two walls.',
  //   costModificator: ({ cost }) => cost,
  // },
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
    key: 'berserker',
    costModificator: ({ cost }) => Math.max(0, cost - 60),
  },
  fearful: {
    key: 'fearful',
    costModificator: ({ cost }) => Math.max(0, cost - 40),
    forgeLevel: 2,
  },
  fearsome: {
    key: 'fearsome',
    costModificator: ({ cost }) => cost + 60,
    forgeLevel: 2,
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
    key: 'vampiric',
    costModificator: ({ cost, attack, hp }) => cost + attack * 20 + hp * 20,
    forgeLevel: 2,
  },
  deadly: {
    key: 'deadly',
    costModificator: ({ cost, attack }) => cost + (attack > 0 ? 300 : 100) - (attack * constants.CARD_PRICE_PER_ATTACK_POINT) / 2,
    forgeLevel: 3,
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
    key: 'swift',
    costModificator: ({ cost, attack }) => cost + attack * constants.CARD_PRICE_PER_ATTACK_POINT,
    forgeLevel: 2,
  },
  slow: {
    key: 'slow',
    costModificator: ({ cost, attack, hp }) => cost - attack * Math.floor(constants.CARD_PRICE_PER_ATTACK_POINT / 2) - hp * Math.floor(constants.CARD_PRICE_PER_HP_POINT / 2),
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
  big: {
    key: 'big',
    costModificator: ({ cost }) => cost * 1.25,
    forgeLevel: 2,
  },
  huge: {
    key: 'huge',
    requirement: 'big',
    costModificator: ({ cost }) => cost * 1.5,
    forgeLevel: 3,
  },
  titan: {
    key: 'titan',
    requirement: 'huge',
    costModificator: ({ cost }) => cost * 2,
    forgeLevel: 4,
  },
  pierce: {
    key: 'pierce',
    costModificator: ({ cost, attack }) => cost + attack * (constants.CARD_PRICE_PER_ATTACK_POINT / 2),
  },
  splash: {
    key: 'splash',
    requirement: 'pierce',
    costModificator: ({ cost, attack }) => cost + attack * constants.CARD_PRICE_PER_ATTACK_POINT,
    forgeLevel: 3,
  },
  // scout: {
  //   name: 'Scout',
  //   description: 'When defending, if the unit is covered by the frontmost wall, reveal any stealth units attacking.',
  //   costModificator: ({ cost }) => cost + 150,
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
