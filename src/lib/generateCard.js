const { randomInt, randomFloat } = require('../utils/random');
const { generateForge } = require('./forge/generateForge');
const { generateName } = require('./generateCardTexts');

function generateUnit(level = 1) {
  const baseCard = {
    attack: randomInt(0, 6),
    hp: randomInt(1, 6),
    type: 'unit',
    unitType: 'human',
    level,
  };
  const { card, forge } = generateForge(level, baseCard);
  card.forge = forge;

  card.cost = parseInt((card.attack * 30 + card.hp * 50) * randomFloat(0.9, 1.1), 10);
  card.name = generateName(card);
  return card;
}

const generateCard = generateUnit;

module.exports = { generateCard };
