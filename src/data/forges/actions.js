const actions = {
    action: {
        key: 'action',
        name: 'Action',
        effectType: 'action',
        description: 'The default option. Consumes 1 energy',
        text: 'Action',
        cardCostModificator: ({ cost, energy }) => Math.max(0, cost * 2 * energy),
        effectCostModificator: () => 0,
    },
    buy: {
        key: 'buy',
        name: 'Buy',
        effectType: 'action',
        description: 'The default payed action. It does not consume energy',
        text: 'Buy ($actionCost)',
        cardCostModificator: () => 0,
        effectCostModificator: ({ cost }) => cost >= 0 ? cost * 1.3 : cost * 0.7,
    },
    hire: {
        key: 'hire',
        name: 'Hire',
        effectType: 'action',
        description: 'Same as buy, but consuming energy',
        text: 'Hire ($actionCost)',
        cardCostModificator: ({ cost, energy }) => Math.max(0, cost * 0.1 * energy),
        effectCostModificator: ({ cost }) => cost >= 0 ? cost * 0.7 : cost * 1.3,
    },
};

module.exports = actions;