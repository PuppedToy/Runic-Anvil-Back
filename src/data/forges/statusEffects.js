/* eslint-disable max-len */

const baseStatusEffect = {
    value: {
        $exponential: {
            min: 0,
            max: 100,
            step: 1,
            probability: 0.2,
        },
    },
    target: {
        $sample: [
            {
                target: 'randomAlly',
                text: 'a random ally',
                weight: 1,
            },
            {
                target: 'randomEnemy',
                text: 'a random enemy',
                weight: 9,
            },
        ],
    },
};

const positiveStatusEffect = {
    target: {
        $sample: [
            {
                target: 'randomAlly',
                text: 'a random ally',
                weight: 9,
            },
            {
                target: 'randomEnemy',
                text: 'a random enemy',
                weight: 1,
            },
        ],
    },
};

const statusEffects = {
    exhaust: {
        statusEffect: {
            statusKey: 'exhaust',
            name: 'Exhaust',
            text: 'exhaust a $card',
        },
        ...baseStatusEffect,
    },
    root: {
        statusEffect: {
            statusKey: 'root',
            name: 'Root',
            text: 'root a $card',
        },
        ...baseStatusEffect,
    },
    stun: {
        statusEffect: {
            statusKey: 'stun',
            name: 'Stun',
            text: 'stun a $card',
        },
        ...baseStatusEffect,
    },
    silence: {
        statusEffect: {
            statusKey: 'silence',
            name: 'Silence',
            text: 'silence a $card',
        },
        ...baseStatusEffect,
    },
    decay: {
        statusEffect: {
            statusKey: 'decay',
            name: 'Decay',
            text: 'apply decay to $card',
        },
        ...baseStatusEffect,
    },
    regrow: {
        statusEffect: {
            statusKey: 'decay',
            name: 'Decay',
            text: 'apply regrowth to $card',
        },
        ...baseStatusEffect,
        ...positiveStatusEffect,
    },
};

module.exports = statusEffects;
