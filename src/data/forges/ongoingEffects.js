const { constants, stats } = require('../enums');
const passiveEffects = require('./passiveEffects');
const { ongoingEffects: ongoingEffectMods } = require('./mods');

const {
    addOrUpdateCardSelectorOngoingEffectMod,
    ongoingStatMods,
} = ongoingEffectMods;

function levelFilter (card, element) {
    return !element.forgeLevel || element.forgeLevel <= card.level;
}

const ongoingEffects = {
    modifyStat: {
        key: 'modifyStat',
        cardSelectors: {
            modifiedCard: null,
        },
        stats: {
            $sample: [
                {
                    [stats.ATTACK]: 1
                },
                {
                    [stats.HP]: 1
                },
                {
                    [stats.COST]: -40
                },
            ],
        },
        mods: [
            ...ongoingStatMods,
            addOrUpdateCardSelectorOngoingEffectMod,
        ],
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
        cardSelectors: {
            modifiedCard: null,
        },
        passiveEffect: {
            $richSample: {
                list: Object.values(passiveEffects),
                filters: [levelFilter],
                map: element => element.key,
            },
        },
        mods: [
            addOrUpdateCardSelectorOngoingEffectMod,
        ],
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
