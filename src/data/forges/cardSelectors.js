const unitTypes = require('./unitTypes');
const passiveEffects = require('./passiveEffects');
const statusEffects = require('./statusEffects');
const places = require('./places');
const elements = require('./elements');

const comparativeOperators = [
    {
        key: 'moreThan',
        text: 'more than',
        weight: 2,
    },
    {
        key: 'lessThan',
        text: 'less than',
        weight: 2,
    },
];

const operators = [
    ...comparativeOperators,
    {
        key: 'equals',
        text: '',
        weight: 1,
    },
];

function levelFilter (card, element) {
    return !element.forgeLevel || element.forgeLevel <= card.level;
}

function createMapper() {
    
}

const cardSelectors = {
    allUnits: {
        key: 'allUnits',
        costModificator: ({ cost }) => cost * 4,
    },
    hasStat: {
        key: 'hasStat',
        stat: {
            $sample: [
                {
                    stat: 'attack',
                    operator: {
                        $sampleWithKeyReplacement: {
                            list: operators,
                            keyReplace: 'operatorKey',
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
                    stat: 'hp',
                    operator: {
                        $sampleWithKeyReplacement: {
                            list: operators,
                            keyReplace: 'operatorKey',
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
                        $sampleWithKeyReplacement: {
                            list: comparativeOperators,
                            keyReplace: 'operatorKey',
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
        costModificator: ({ operator, cost }) => operator.key === 'equals' ? cost * 0.5 : cost * 2,
    },
    hasTribe: {
        key: 'hasTribe',
        tribe: {
            $filteredSample: {
                list: unitTypes,
                filters: [levelFilter],
            },
        },
        costModificator: ({ cost }) => cost * 2,
    },
    hasElement: {
        key: 'hasElement',
        element: {
            $filteredSample: {
                list: [...Object.values(elements.basic), ...Object.values(elements.complex)],
                filters: [levelFilter],
            },
        },
        costModificator: ({ cost }) => cost * 2,
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
        costModificator: ({ cost }) => cost * 2,
    },
    hasPassiveEffect: {
        key: 'hasPassiveEffect',
        passiveEffect: {
            $filteredSample: {
                list: Object.values(passiveEffects),
                filters: [levelFilter],
            },
        },
        costModificator: ({ cost }) => cost * 2,
    },
    hasStatusEffect: {
        key: 'hasStatusEffect',
        statusEffect: {
            $filteredSample: {
                list: Object.values(statusEffects),
                keyReplace: 'statusEffectKey',
                filters: [levelFilter],
            },
        },
        costModificator: ({ cost }) => cost * 2,
    },
    isInPlace: {
        key: 'isInPlace',
        place: {
            $sample: places,
        },
        costModificator: ({ cost }) => cost * 2,
    },
    // Ideas: is damaged, has a state changed, is a zombie, is a creation, is defending
};

module.exports = cardSelectors;