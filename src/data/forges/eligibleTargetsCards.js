const eligibleTargetsCards = {
  self: {
    name: 'Self',
  },
  all: {
    name: 'All',
  },
  passiveEffect: {
    name: 'Has a passive effect',
  },
  tribe: {
    name: 'Is from a tribe',
  },
  triggereableEffect: {
    name: 'Has a triggereable effect',
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
