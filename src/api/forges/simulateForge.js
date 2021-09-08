const generateForge = require('../../lib/forge/generateForge');

async function simulateForgeGraphQL({ level }) {
  return generateForge(level);
}

module.exports = simulateForgeGraphQL;
