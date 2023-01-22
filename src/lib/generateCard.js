const { randomInt, randomFloat } = require('../utils/random');
const { generateForge } = require('./forge/generateForge');
const { generateName } = require('./generateCardTexts');

function generateUnit(level = 1) {
  // @TODO level should mean the number of times the card is forged
  // There should be no maximum of forges

  const baseCard = {
    attack: randomInt(0, 6),
    hp: randomInt(1, 6),
    type: 'unit',
    unitType: 'human',
  };
  const { card, forge } = generateForge(baseCard);
  // I think I should create a new method apply forge instead of all this
  card.forge = forge;

  card.cost = parseInt((card.attack * 30 + card.hp * 50) * randomFloat(0.9, 1.1), 10);
  card.name = generateName(card);
  return card;
}

const generateCard = generateUnit;

module.exports = { generateCard };
