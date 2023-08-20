const actions = {
  action: {
    key: 'action',
    cardCostModificator: ({ cost, energy }) => Math.max(0, cost * 2 * energy),
    effectCostModificator: () => 0,
  },
  buy: {
    key: 'buy',
    cardCostModificator: () => 0,
    effectCostModificator: ({ cost }) => (cost >= 0 ? cost * 1.3 : cost * 0.7),
  },
  hire: {
    key: 'hire',
    cardCostModificator: ({ cost, energy }) => Math.max(0, cost * 0.1 * energy),
    effectCostModificator: ({ cost }) => (cost >= 0 ? cost * 0.7 : cost * 1.3),
  },
};

module.exports = actions;
