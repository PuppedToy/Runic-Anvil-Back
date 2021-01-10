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
    costModificator: ({ cost }) => cost * 0.6,
  },
  banished: {
    name: 'Banished',
    effectType: 'trigger',
    onEffect: 'banish',
    costModificator: ({ cost }) => cost * 0.3,
  },
  discarded: {
    name: 'Discarded',
    effectType: 'trigger',
    onEffect: 'discard',
    costModificator: ({ cost }) => cost * 0.5,
  },
  moved: {
    name: 'Moved',
    effectType: 'trigger',
    onEffect: 'move',
    costModificator: ({ cost }) => cost * 3,
  },
  damaged: {
    name: 'Damage',
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
  retires: {
    name: 'Retires',
    effectType: 'trigger',
    onEffect: 'retire',
    costModificator: ({ cost }) => cost * 0.7,
  },
  attacking: {
    name: 'Attacking',
    effectType: 'trigger',
    onEffect: 'attack',
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
    costModificator: ({ cost }) => cost * 2.5,
  },
  siege: {
    name: 'Siege',
    effectType: 'stageChange',
    onEffect: 'siege',
    costModificator: ({ cost }) => cost * 1.75,
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
  receiveToken: {
    name: 'A kingdom receives the token',
    effectType: 'kingdomTrigger',
    onEffect: 'token',
    costModificator: ({ cost }) => cost * 6,
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
    costModificator: ({ cost }) => cost,
  },
};

module.exports = triggers;