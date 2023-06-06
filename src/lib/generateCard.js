const { randomInt } = require('../utils/random');
const { generateForge, applyForge } = require('./forge/generateForge');
const { generateName } = require('./generateCardTexts');

function exponential(min, range, probability = 0.5) {
  let result = min;
  while (Math.random() < probability && result < range) {
    result += 1;
  }
  return result;
}

function generateUnit(level = 1) {
  if (level < 0) throw new Error('Level must be positive');

  const minAttack = randomInt(0, 4);
  const minHp = randomInt(1, 4);

  let card = {
    attack: exponential(minAttack, 50, 0.6),
    hp: exponential(minHp, 50, 0.6),
    type: 'unit',
    unitType: 'human',
  };

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
