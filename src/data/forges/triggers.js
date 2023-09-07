const triggers = {
  deployed: {
    key: 'deployed',
    isCommanderForbidden: () => true,
  },
  destroyed: {
    key: 'destroyed',
    costModificator: ({ cost }) => cost * 0.9,
    isCommanderForbidden: () => true,
  },
  resurrected: {
    key: 'resurrected',
    costModificator: ({ cost }) => cost * 0.3,
    isCommanderForbidden: () => true,
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
    key: 'moved',
    costModificator: ({ cost }) => cost * 3,
    isCommanderForbidden: () => true,
  },
  damaged: {
    key: 'damaged',
    costModificator: ({ cost }) => cost * 1.2,
    isCommanderForbidden: () => true,
  },
  dealingDamage: {
    key: 'dealingDamage',
    costModificator: ({ cost }) => cost * 1.3,
    isCommanderForbidden: () => true,
  },
  // retires: {
  //   name: 'Retires',
  //   effectType: 'trigger',
  //   onEffect: 'retire',
  //   costModificator: ({ cost }) => cost * 0.7,
  // },
  fighting: {
    key: 'fighting',
    costModificator: ({ cost }) => cost * 2,
    isCommanderForbidden: () => true,
  },
  defending: {
    key: 'defending',
    costModificator: ({ cost }) => cost * 1.75,
    isCommanderForbidden: () => true,
  },
  war: {
    key: 'war',
    costModificator: ({ cost }) => cost * 1.5,
    isCommanderForbidden: () => true,
  },
  siege: {
    key: 'siege',
    costModificator: ({ cost }) => cost * 0.8,
    isCommanderForbidden: () => true,
  },
  turnBeginning: {
    key: 'turnBeginning',
    costModificator: ({ cost }) => cost * 2.5,
    isCommanderForbidden: () => false,
  },
  turnEnd: {
    key: 'turnEnd',
    costModificator: ({ cost }) => cost * 3,
    isCommanderForbidden: () => false,
  },
  invest: {
    key: 'invest',
    costModificator: ({ cost }) => cost * 4,
    isCommanderForbidden: () => false,
  },
  draw: {
    key: 'draw',
    costModificator: ({ cost }) => cost * 4,
    isCommanderForbidden: () => false,
  },
  earn: {
    key: 'earn',
    costModificator: ({ cost }) => cost * 3,
    isCommanderForbidden: () => false,
  },
  otherTrigger: {
    key: 'otherTrigger',
    costModificator: ({ cost }) => cost * 8,
    isCommanderForbidden: () => false,
  },
  healed: {
    key: 'healed',
    costModificator: ({ cost }) => cost * 1.1,
    isCommanderForbidden: () => true,
  },
  wallDamage: {
    key: 'wallDamage',
    costModificator: ({ cost }) => cost * 0.3,
    isCommanderForbidden: () => true,
  },
  wallDamaged: {
    key: 'wallDamaged',
    costModificator: ({ cost }) => cost * 1,
    isCommanderForbidden: () => false,
  },
  statChange: {
    key: 'statChange',
    costModificator: ({ cost }) => cost * 1.1,
    isCommanderForbidden: () => true,
  },
  feared: {
    key: 'feared',
    costModificator: ({ cost }) => cost * 0.1,
    isCommanderForbidden: () => true,
  },
  challenged: {
    key: 'challenged',
    costModificator: ({ cost }) => cost * 0.1,
    isCommanderForbidden: () => true,
  },
};

module.exports = triggers;
