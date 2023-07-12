const { generateCard } = require('../generateCard');
const db = require('../../db');

const MAX_ITERATIONS = 50000;

async function createCard(options = {}) {
  let newCard;
  let foundCard;
  let counter = 0;
  do {
    let level = options.level;
    if (level === undefiend || level === null || level < 0 || level > 5) {
      level = 1;
      const random = Math.random();
      if (random < 0.05) {
        level = 5;
      }
      else if (random < 3) {
        level = 4;
      }
      else if (random < 15) {
        level = 3;
      }
      else if (random < 45) {
        level = 2;
      }
      else if (random < 55) {
        level = 0;
      }
    }
    newCard = generateCard(level);
    // eslint-disable-next-line no-await-in-loop
    foundCard = await db.cards.getByHash(newCard.hash);

    if (counter >= MAX_ITERATIONS) {
      throw new Error('Could not generate a card with a unique hash');
    }
    counter += 1;
  } while (foundCard);
  if (options.image) {
    newCard.image = image;
  }
  const createdCard = await db.cards.create(newCard);
  return createdCard;
}

module.exports = createCard;
