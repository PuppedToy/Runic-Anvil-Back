const { generateCard } = require('../generateCard');
const db = require('../../db');

const MAX_ITERATIONS = 50000;

async function createCard(options = {}) {
  let newCard;
  let foundCard;
  let counter = 0;
  do {
    let level = options.level;
    if (level === undefined || level === null || level < 0) {
      level = 2;
      const random = Math.random();
      if (random < 0.05) {
        level = 6;
      }
      else if (random < 0.3) {
        level = 5;
      }
      else if (random < 0.15) {
        level = 4;
      }
      else if (random < 0.45) {
        level = 3;
      }
      else if (random < 0.55) {
        level = 1;
      }
    }
    console.log(`Creating level ${level} card`);
    newCard = generateCard(level);
    // eslint-disable-next-line no-await-in-loop
    foundCard = await db.cards.getByHash(newCard.hash);

    if (counter >= MAX_ITERATIONS) {
      throw new Error('Could not generate a card with a unique hash');
    }
    counter += 1;
  } while (foundCard);
  if (options.image) {
    newCard.image = options.image;
  }
  const createdCard = await db.cards.create(newCard);
  return createdCard;
}

module.exports = createCard;
