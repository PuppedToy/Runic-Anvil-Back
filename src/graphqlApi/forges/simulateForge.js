const { generateForge } = require('../../lib/forge/generateForge');

async function simulateForgeGraphQL() {
  return generateForge({});
}

module.exports = simulateForgeGraphQL;
