const weightedSample = require('../../utils/weightedSample');
const { unitTypes } = require('../../data/forges');

const forgeLevelFilter = (level) => ({ forgeLevel }) => level >= forgeLevel;

const forgeGenerators = [
  {
    type: 'addUnitType',
    chance: 1,
    generate: (level) => weightedSample(unitTypes, [forgeLevelFilter(level)]),
  },
];

function generateForge(level) {
  const forgeGenerator = weightedSample(forgeGenerators);
  return {
    type: forgeGenerator.type,
    ...forgeGenerator.generate(level),
  };
}

module.exports = generateForge;
