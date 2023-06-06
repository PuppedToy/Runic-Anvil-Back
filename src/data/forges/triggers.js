// Triggers cost modificator act over the associated effect total cost
// Every trigger will have a forge to apply its effect before and after its keyword is applied
const triggers = {
  deployed: {
    name: 'Deployed',
    effectType: 'trigger',
    onEffect: 'deploy',
  },
  destroyed: {
    name: 'Destroyed',
    effectType: 'trigger',
    onEffect: 'destroy',
    costModificator: ({ cost }) => cost * 0.9,
  },
  resurrected: {
    name: 'Resurrected',
    effectType: 'trigger',
    onEffect: 'resurrect',
    costModificator: ({ cost }) => cost * 0.3,
  },
  // banished: {
  //   name: 'Banished',
  //   effectType: 'trigger',
  //   onEffect: 'banish',
  //   costModificator: ({ cost }) => cost * 0.3,
  // },
  // discarded: {
  //   name: 'Discarded',
  //   effectType: 'trigger',
  //   onEffect: 'discard',
  //   costModificator: ({ cost }) => cost * 0.2,
  // },
  moved: {
    name: 'Moved',
    effectType: 'trigger',
    onEffect: 'move',
    costModificator: ({ cost }) => cost * 3,
  },
  damaged: {
    name: 'Damaged',
    effectType: 'trigger',
    onEffect: 'damage',
    costModificator: ({ cost }) => cost * 1.2,
  },
  dealingDamage: {
    name: 'Dealing damage',
    effectType: 'trigger',
    onEffect: 'dealingDamage',
    costModificator: ({ cost }) => cost * 1.3,
  },
  // retires: {
  //   name: 'Retires',
  //   effectType: 'trigger',
  //   onEffect: 'retire',
  //   costModificator: ({ cost }) => cost * 0.7,
  // },
  fighting: {
    name: 'Fighting',
    effectType: 'trigger',
    onEffect: 'fight',
    costModificator: ({ cost }) => cost * 1.75,
  },
  defending: {
    name: 'Defending',
    effectType: 'trigger',
    onEffect: 'defend',
    costModificator: ({ cost }) => cost * 1.75,
  },
  war: {
    name: 'War',
    effectType: 'stageChange',
    onEffect: 'war',
    costModificator: ({ cost }) => cost * 1.5,
  },
  siege: {
    name: 'Siege',
    effectType: 'stageChange',
    onEffect: 'siege',
    costModificator: ({ cost }) => cost * 1.1,
  },
  turnBeginning: {
    name: 'Beginning of the turn',
    effectType: 'stageChange',
    onEffect: 'turnBeginning',
    costModificator: ({ cost }) => cost * 2.5,
  },
  turnEnd: {
    name: 'End of the turn',
    effectType: 'stageChange',
    onEffect: 'turnEnd',
    costModificator: ({ cost }) => cost * 3,
  },
  invest: {
    name: 'A kingdom invests',
    effectType: 'kingdomTrigger',
    onEffect: 'invest',
    costModificator: ({ cost }) => cost * 4,
  },
  draw: {
    name: 'A kingdom draws a card',
    effectType: 'kingdomTrigger',
    onEffect: 'draw',
    costModificator: ({ cost }) => cost * 4,
  },
  earn: {
    name: 'A kingdom earns money',
    effectType: 'kingdomTrigger',
    onEffect: 'earn',
    costModificator: ({ cost }) => cost * 4,
  },
  otherTrigger: {
    name: 'Another card trigger',
    description: 'Another card triggers any of the trigger effects',
    effectType: 'otherTrigger',
    costModificator: ({ cost }) => cost * 8,
  },
  healed: {
    name: 'Healed',
    effectType: 'trigger',
    onEffect: 'heal',
    costModificator: ({ cost }) => cost * 1.1,
  },
  wallDamage: {
    name: 'Damage a wall',
    effectType: 'trigger',
    onEffect: 'wallDamage',
    costModificator: ({ cost }) => cost * 0.5,
  },
  wallDamaged: {
    name: 'Our wall is damaged',
    effectType: 'trigger',
    onEffect: 'wallDamage',
    costModificator: ({ cost }) => cost * 1,
  },
  statChange: {
    name: 'On stat change',
    effectType: 'trigger',
    onEffect: 'statChange',
    costModificator: ({ cost }) => cost * 1.1,
  },
  feared: {
    name: 'Feared',
    effectType: 'trigger',
    onEffect: 'fear',
    costModificator: ({ cost }) => cost * 0.1,
  },
  challenged: {
    name: 'Challenged',
    effectType: 'trigger',
    onEffect: 'challenged',
    costModificator: ({ cost }) => cost * 0.1,
  },
};

module.exports = triggers;
