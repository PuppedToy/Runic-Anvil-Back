const weightedSample = require('../../utils/weightedSample');
const { unitTypes, passiveEffects } = require('../../data/forges');

// Filters
const forgeLevelFilter = (level) => ({ forgeLevel = 0 }) => level >= forgeLevel;

const forgeGenerators = [
  {
    type: 'addUnitType',
    chance: 1,
    generate: (level) => weightedSample(unitTypes, [forgeLevelFilter(level)]),
  },
  {
    type: 'addPassiveEffect',
    chance: 1,
    generate: (level) => weightedSample(passiveEffects, [forgeLevelFilter(level)]),
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
