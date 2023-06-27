const unitTypes = require('./unitTypes');
const passiveEffects = require('./passiveEffects');
const statusEffects = require('./statusEffects');
const places = require('./places');

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

const cardSelectors = {
    allUnits: {
        key: 'allUnits',
        text: '$target units',
        selector: {
        },
        costModificator: ({ cost }) => cost * 4,
    },
    hasStat: {
        key: 'hasStat',
        text: '$target units with $selector.operator $selector.value $selector.stat',
        selector: {
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
        text: '$target $selector.tribe.name units',
        selector: {
            tribe: {
                $filteredSample: {
                    list: unitTypes,
                    keyReplace: 'tribeKey',
                    filters: [levelFilter],
                },
            },
            costModificator: ({ cost }) => cost * 2,
        },
    },
    // @TODO hasElement
    // @TODO hasRarity
    hasPassiveEffect: {
        key: 'hasPassiveEffect',
        text: '$target $selector.passiveEffect.name units',
        selector: {
            passiveEffect: {
                $filteredSample: {
                    list: Object.values(passiveEffects),
                    keyReplace: 'selectorPassiveEffectKey',
                    filters: [levelFilter],
                },
            },
        },
        costModificator: ({ cost }) => cost * 2,
    },
    hasStatusEffect: {
        key: 'hasStatusEffect',
        text: '$target units with $selector.statusEffect.statusKey',
        selector: {
            statusEffect: {
                $filteredSample: {
                    list: Object.values(statusEffects),
                    keyReplace: 'statusEffectKey',
                    filters: [levelFilter],
                },
            },
        },
        costModificator: ({ cost }) => cost * 2,
    },
    isInPlace: {
        key: 'isInPlace',
        text: '$target units in $selector.place',
        selector: {
            place: {
                $sampleWithKeyReplacement: {
                    list: places,
                    keyReplace: 'placeKey',
                },
            },
        },
        costModificator: ({ cost }) => cost * 2,
    }
    // Ideas: is damaged, has a state changed, is a zombie, is a creation, is defending
};

module.exports = cardSelectors;