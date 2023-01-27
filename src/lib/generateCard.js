const { randomInt, randomFloat } = require('../utils/random');
const { generateForge, applyForge } = require('./forge/generateForge');
const { generateName } = require('./generateCardTexts');

function generateUnit(level = 1) {
  if (level < 0) throw new Error('Level must be positive');

  let card = {
    attack: randomInt(0, 6),
    hp: randomInt(1, 6),
    type: 'unit',
    unitType: 'human',
  };
  card.cost = parseInt((card.attack * 30 + card.hp * 50) * randomFloat(0.9, 1.1), 10);

  const forges = [];
  for (let accumulator = 0; accumulator < level; accumulator += 1) {
    const forge = generateForge(level);
    forges.push(forge);
    card = applyForge(forge, card);
  }

  card.forges = forges;
  card.name = generateName(card);
  return card;
}

const generateCard = generateUnit;

module.exports = { generateCard };
