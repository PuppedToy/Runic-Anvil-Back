const { generateCard } = require('../generateCard');
const db = require('../../db');

async function createCard() {
  const newCard = generateCard();
  const createdCard = await db.cards.create(newCard);
  return createdCard;
}

module.exports = createCard;
