const { unitTypes } = require('./unitTypes');
const passiveEffects = require('./passiveEffects');
const statusEffects = require('./statusEffects');
const elements = require('./elements');
const { stats, places } = require('../enums');

const forgeLevelFilter = (level) => ({ forgeLevel = 0 }) => level >= forgeLevel;

const comparativeOperators = [
    {
        key: 'moreThan',
        weight: 2,
    },
    {
        key: 'lessThan',
        weight: 2,
    },
];

const operators = [
    ...comparativeOperators,
    {
        key: 'equals',
        weight: 1,
    },
];

const cardSelectors = {
    hasStat: {
        key: 'hasStat',
        stat: {
            $sample: [
                {
                    stat: stats.ATTACK,
                    operator: {
                        $richSample: {
                            list: operators,
                            map: ({ key }) => key,
                        },
                    },
                    value: {
                        $exponential: {
                            min: 0,
                            max: 30,
                            probability: 0.75,
                        },
                    },
                },
                {
                    stat: stats.HP,
                    operator: {
                        $richSample: {
                            list: operators,
                            map: ({ key }) => key,
                        },
                    },
                    value: {
                        $exponential: {
                            min: 1,
                            max: 30,
                            probability: 0.75,
                        },
                    },
                },
                {
                    stat: 'cost',
                    operator: {
                        $richSample: {
                            list: comparativeOperators,
                            map: ({ key }) => key,
                        },
                    },
                    value: {
                        $exponential: {
                            min: 0,
                            max: 10000,
                            step: 25,
                            probability: 0.95,
                        },
                    },
                },
            ],
        },
        costModificator: ({ operator, cost }) => operator.key === 'equals' ? cost * 0.5 : cost * 0.5,
    },
    hasTribe: {
        key: 'hasTribe',
        tribe: {
            $richSample: {
                list: Object.values(unitTypes),
                filters: [forgeLevelFilter],
                map: ({ key }) => key,
            },
        },
        costModificator: ({ cost }) => cost * 0.5,
    },
    hasElement: {
        key: 'hasElement',
        element: {
            $richSample: {
                list: [...Object.values(elements.basic)],
                filters: [forgeLevelFilter],
                map: ({ key }) => key,
            },
        },
        costModificator: ({ cost }) => cost * 0.5,
    },
    hasRarity: {
        key: 'hasRarity',
        level: {
            $exponential: {
                min: 1,
                max: 5,
                probability: 0.2,
            },
        },
        costModificator: ({ cost }) => cost * 0.5,
    },
    hasPassiveEffect: {
        key: 'hasPassiveEffect',
        passiveEffect: {
            $richSample: {
                list: Object.values(passiveEffects),
                filters: [forgeLevelFilter],
                map: ({ key }) => key,
            },
        },
        costModificator: ({ cost }) => cost * 0.5,
    },
    hasStatusEffect: {
        key: 'hasStatusEffect',
        statusEffect: {
            $richSample: {
                list: Object.values(statusEffects),
                filters: [forgeLevelFilter],
                map: ({ key }) => key,
            },
        },
        costModificator: ({ cost }) => cost * 0.5,
    },
    isInPlace: {
        key: 'isInPlace',
        place: {
            $sample: [
                places.BARRACKS,
                places.RANGED_ZONE,
                places.MELEE_ZONE,
                places.WAR_ZONE,
                places.SIEGE_ZONE,
            ],
        },
        costModificator: ({ cost }) => cost * 0.5,
    },
    // Ideas: is damaged, has a state changed, is a zombie, is a creation, is defending
};

module.exports = cardSelectors;