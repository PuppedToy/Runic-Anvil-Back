const weightedSample = require('../../utils/weightedSample');
const { unitTypes } = require('../../data/forges');

function generateUnitType() {
  return weightedSample(unitTypes);
}

const forges = [
  {
    chance: 1,
    generate: () => generateUnitType(),
  },
];

function generateForge() {
  return weightedSample(forges);
}

module.exports = generateForge;
