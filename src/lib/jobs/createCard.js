const { generateCard } = require('../generateCard');
const db = require('../../db');

const MAX_ITERATIONS = 50000;

async function createCard() {
  let newCard;
  let foundCard;
  let counter = 0;
  do {
    newCard = generateCard();
    // eslint-disable-next-line no-await-in-loop
    foundCard = await db.cards.getByHash(newCard.hash);

    if (counter >= MAX_ITERATIONS) {
      throw new Error('Could not generate a card with a unique hash');
    }
    counter += 1;
  } while (foundCard);
  const createdCard = await db.cards.create(newCard);
  return createdCard;
}

module.exports = createCard;
