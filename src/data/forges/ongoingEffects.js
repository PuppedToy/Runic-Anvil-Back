const { constants } = require('../enums');
const passiveEffects = require('./passiveEffects');

function levelFilter (card, element) {
    return !element.forgeLevel || element.forgeLevel <= card.level;
}

const ongoingEffects = {
    statChange: {
        key: 'statChange',
        effect: {
            $sample: [
                {
                    stat: 'attack',
                    value: {
                        $exponential: {
                            min: 1,
                            max: 30,
                            probability: 0.75,
                        },
                    },
                    price: ({ value }) => value * constants.CARD_PRICE_PER_ATTACK_POINT,
                },
                {
                    stat: 'hp',
                    value: {
                        $exponential: {
                            min: 1,
                            max: 30,
                            probability: 0.75,
                        },
                    },
                    price: ({ value }) => value * constants.CARD_PRICE_PER_HP_POINT,
                },
                {
                    stat: 'cost',
                    value: {
                        $exponential: {
                            min: -25,
                            max: -10000,
                            step: -25,
                            probability: 0.9,
                        },
                    },
                    price: ({ value }) => value * -1,
                },
            ],
        },
        price: ({ value, stat }) => {
            if (stat === 'cost') {
                return value * -1;
            }
            if (stat === 'attack') {
                return value * constants.CARD_PRICE_PER_ATTACK_POINT;
            }
            if (stat === 'hp') {
                return value * constants.CARD_PRICE_PER_HP_POINT;
            }
            throw new Error(`Unknown stat: ${stat}`);
        },
    },
    givePassiveEffect: {
        key: 'givePassiveEffect',
        effect: {
            passiveEffect: {
                $filteredSample: {
                    list: Object.values(passiveEffects),
                    filters: [levelFilter],
                    keyReplace: 'ongoingPassiveEffectKey'
                },
            },
        },
        price: ({ passiveEffectCostModificator }) => {
            const averageAttackUnit = 3;
            const averageHpUnit = 3;
            const baseUnitCost = constants.CARD_PRICE_PER_ATTACK_POINT * averageAttackUnit + constants.CARD_PRICE_PER_HP_POINT * averageHpUnit;
            return passiveEffectCostModificator({
                attack: averageAttackUnit,
                hp: averageHpUnit,
                cost: baseUnitCost,
            }) - baseUnitCost;
        },
    },
};

module.exports = ongoingEffects;
