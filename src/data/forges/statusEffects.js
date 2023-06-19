/* eslint-disable max-len */

const baseStatusEffect = {
    value: {
        $exponential: {
            min: 1,
            max: 100,
            step: 1,
            probability: 0.2,
        },
    },
    card: {
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
    card: {
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
            statusKey: 'exhausted',
            name: 'Exhausted',
            text: 'exhaust $card',
        },
        ...baseStatusEffect,
        value: {
            $exponential: {
                min: 0,
                max: 100,
                step: 1,
                probability: 0.2,
            },
        },
    },
    root: {
        statusEffect: {
            statusKey: 'rooted',
            name: 'Rooted',
            text: 'root $card',
        },
        ...baseStatusEffect,
    },
    stun: {
        statusEffect: {
            statusKey: 'stunned',
            name: 'Stunned',
            text: 'stun $card',
        },
        ...baseStatusEffect,
    },
    silence: {
        statusEffect: {
            statusKey: 'silenced',
            name: 'Silenced',
            text: 'silence $card',
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
    regrowth: {
        statusEffect: {
            statusKey: 'regrowth',
            name: 'Regrowth',
            text: 'apply regrowth to $card',
        },
        ...baseStatusEffect,
        ...positiveStatusEffect,
    },
};

module.exports = statusEffects;
