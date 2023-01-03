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
    text: 'has its $stat.name below $threshold',
  },
  statAboveThreshold: {
    name: 'Has a stat above a threshold',
    text: 'has its $stat.name above $threshold',
  },
  statEqualThreshold: {
    name: 'Has a stat that equals a threshold',
    text: 'has its $stat.name being $threshold',
  },
  statTop: {
    name: 'Is the card with the highest value of a stat',
    text: 'has the highest $stat.name',
  },
  statBottom: {
    name: 'Is the card with the lowest value of a stat',
    text: 'has the lowest $stat.name',
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
    text: 'is from $kingdom.text',
  },
  name: {
    name: 'Matches a specific name',
    text: 'is called $name',
  },
  forgeOrigin: {
    name: 'Has a forge origin (starting blank card)',
    text: 'is from origin $origin',
  },
  cardType: {
    name: 'Has a card type',
    text: 'is of type $cardType',
  },
};

module.exports = eligibleTargetsCards;
