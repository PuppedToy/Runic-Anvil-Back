const { generateCard } = require('../generateCard');
const db = require('../../db');

const MAX_ITERATIONS = 100;

async function createCard(options = {}) {
  let newCard;
  let foundCard;
  let counter = 0;
  do {
    let { level } = options;
    if (level === undefined || level === null || level < 0) {
      const rnd = Math.random();
      if (rnd < 10) {
        level = 0;
      } else if (rnd < 50) {
        level = 1;
      } else if (rnd < 70) {
        level = 2;
      } else if (rnd < 85) {
        level = 3;
      } else if (rnd < 93) {
        level = 4;
      } else if (rnd < 98) {
        level = 5;
      } else {
        level = 6;
      }
      level = 0;
      level = Math.floor(Math.random() * 6);
    }
    console.log(`Creating level ${level} card`);
    newCard = generateCard(level);

    // eslint-disable-next-line no-await-in-loop
    foundCard = await db.cards.getByHashOrName(newCard.hash, newCard.name);

    if (counter >= MAX_ITERATIONS) {
      console.error('Could not generate a card with a unique hash');
      break;
    }
    counter += 1;
  } while (foundCard);
  if (foundCard) {
    return null;
  }
  if (options.image) {
    newCard.image = options.image;
  }
  const createdCard = await db.cards.create(newCard);
  return createdCard;
}

module.exports = createCard;
