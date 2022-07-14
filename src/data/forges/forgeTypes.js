// Random thoughts: maximum 3 different kind of forges, but one of those may be
// the "passive effects" forge which can hold up to 6 passive effects or something like that.
// This will keep a maximum in how complet a card can be. Forges themselves can grow complex,
// but the card can't do too many things.

const forgeTypes = {
  units: {
    improve: {
      name: 'Improve',
      description: 'Improve any previous forge',
      condition: 'IMPROVABLE',
    },
    getType: {
      name: 'GetType',
      description: 'Get a unit type',
      condition: 'IS_HUMAN',
    },
    getElement: {
      name: 'GetElement',
      description: 'Get an element',
      condition: 'IS_NOT_ELEMENTAL',
    },
    getPassiveEffect: {
      name: 'GetPassiveEffect',
      description: 'Get a passive effect',
    },
    getTrigger: {
      name: 'GetTrigger',
      description: 'Get a "trigger: effect" kind of forge',
    },
    getAction: {
      name: 'GetAction',
      description: 'Get a "action: effect" kind of forge',
    },
    getConditionalState: {
      name: 'GetConditionalState',
      description: 'Get a "conditional state" kind of forge',
    },
  },
  weapons: {
    improve: {
      name: 'Improve',
      description: 'Improve any previous forge',
      condition: 'IMPROVABLE',
    },
    getType: {
      name: 'GetType',
      description: 'Get a unit type',
      condition: 'IS_HUMAN',
    },
    getElement: {
      name: 'GetElement',
      description: 'Get an element',
      condition: 'IS_NOT_ELEMENTAL',
    },
    getPassiveEffect: {
      name: 'GetPassiveEffect',
      description: 'Get a passive effect',
    },
    getTrigger: {
      name: 'GetTrigger',
      description: 'Get a "trigger: effect" kind of forge',
    },
    getConditionalState: {
      name: 'GetConditionalState',
      description: 'Get a "conditional state" kind of forge',
    },
  },
  spells: {
    improve: {
      name: 'Improve',
      description: 'Improve any previous forge',
      condition: 'IMPROVABLE',
    },
    getElement: {
      name: 'GetElement',
      description: 'Get an element',
      condition: 'IS_NOT_ELEMENTAL',
    },
    getEffect: {
      name: 'GetEffect',
      description: 'Get an effect',
    },
  },
};

module.exports = forgeTypes;
