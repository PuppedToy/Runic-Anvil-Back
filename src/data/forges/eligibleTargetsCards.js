const unitTypes = require('./unitTypes');
const passiveEffects = require('./passiveEffects');
const triggerableEffects = require('./triggerableEffects');
const zones = require('./zones');
const weightedSample = require('../../utils/weightedSample');

const eligibleTargetsCards = {
  self: {
    name: 'Self',
    text: 'itself',
  },
  all: {
    name: 'All',
    text: 'every card',
  },
  passiveEffect: {
    name: 'Has a passive effect',
    generate: () => {
      const chosenPassiveEffect = weightedSample(passiveEffects);
      return {
        passiveEffect: chosenPassiveEffect,
      };
    },
    text: 'a $passiveEffect.name unit',
  },
  tribe: {
    name: 'Is from a tribe',
    generate: () => {
      const chosenUnitType = weightedSample(unitTypes);
      return {
        tribe: chosenUnitType,
      };
    },
    text: 'a $tribe.name',
  },
  triggereableEffect: {
    name: 'Has a triggereable effect',
    generate: () => {
      const chosenTriggerableEffects = weightedSample(triggerableEffects);
      return {
        triggerableEffect: chosenTriggerableEffects,
      };
    },
    text: 'a unit with $triggerableEffect.name',
  },
  statBelowThreshold: {
    name: 'Has a stat below a threshold',
  },
  statAboveThreshold: {
    name: 'Has a stat above a threshold',
  },
  statEqualThreshold: {
    name: 'Has a stat that equals a threshold',
  },
  statTop: {
    name: 'Is the card with the highest value of a stat',
  },
  statBottom: {
    name: 'Is the card with the lowest value of a stat',
  },
  inZone: {
    name: 'Is in a zone',
    generate: () => {
      const chosenZone = weightedSample(zones);
      return {
        zone: chosenZone,
      };
    },
    text: 'a card in $zone',
  },
  fromKingdom: {
    name: 'Is from a kingdom',
  },
  name: {
    name: 'Matches a specific name',
  },
  forgeOrigin: {
    name: 'Has a forge origin (starting blank card)',
  },
  cardType: {
    name: 'Has a card type',
  },
};

module.exports = eligibleTargetsCards;
