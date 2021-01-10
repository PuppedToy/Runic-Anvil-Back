const eligibleTargetsKingdoms = {
  owner: {
    name: 'Is from owner kingdom',
  },
  ally: {
    name: 'Is from allied kingdoms',
  },
  enemy: {
    name: 'Is from enemy kingdoms',
  },
  turnToken: {
    name: 'Is from the kingdom with the turn token',
  },
  statBelowThreshold: {
    name: 'Is from a kingdom with a stat below a threshold',
  },
  statAboveThreshold: {
    name: 'Is from a kingdom with a stat above a threshold',
  },
  statEqualThreshold: {
    name: 'Is from a kingdom with a stat that equals a threshold',
  },
  statTop: {
    name: 'Is the kingdom with the highest value of a stat',
  },
  statBottom: {
    name: 'Is the kingdom with the lowest value of a stat',
  },
};

module.exports = eligibleTargetsKingdoms;
