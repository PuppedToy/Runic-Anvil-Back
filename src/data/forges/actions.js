const actions = {
    action: {
        key: 'action',
        name: 'Action',
        effectType: 'action',
        description: 'The default option. Consumes 1 energy',
        text: 'Action',
        cardCostModificator: ({ cost, energy }) => cost * 2.5 * energy,
        effectCostModificator: () => 0,
    },
    buy: {
        key: 'buy',
        name: 'Buy',
        effectType: 'action',
        description: 'The default payed action. It does not consume energy',
        text: 'Buy ($actionCost)',
        cardCostModificator: () => 0,
        effectCostModificator: ({ cost }) => cost * 1.1,
    },
    hire: {
        key: 'hire',
        name: 'Hire',
        effectType: 'action',
        description: 'Same as buy, but consuming energy',
        text: 'Hire ($actionCost)',
        cardCostModificator: ({ cost, energy }) => cost * 0.1 * energy,
        effectCostModificator: ({ cost }) => cost * 0.7,
    },
};

module.exports = actions;