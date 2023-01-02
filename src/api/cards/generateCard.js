const generateCard = require('../../lib/generateCard');

async function simulateCardGraphQL({ level }) {
  return generateCard(level);
}

module.exports = simulateCardGraphQL;
