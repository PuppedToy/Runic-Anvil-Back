const createCard = require('./createCard');
const { addImageToCard, addImageToAnyCard } = require('./addImageToCard');
const db = require('../../db');

const DEFAULT_IMAGE = '/pics/__default/00000.png';

async function generateFullCard() {
  const newCard = await createCard();
  const cardWithImage = await addImageToCard(newCard);
  return cardWithImage;
}

async function generateCards(n) {
  const cards = [];
  for (let i = 0; i < n; i += 1) {
    console.log(`Generating card ${i + 1} of ${n}`);
    // eslint-disable-next-line no-await-in-loop
    const card = await generateFullCard();
    cards.push(card);
  }
  return cards;
}

async function generateCardsWithoutImage(n) {
  const cards = [];
  for (let i = 0; i < n; i += 1) {
    console.log(`[NOIMG] Generating card ${i + 1} of ${n}`);
    // eslint-disable-next-line no-await-in-loop
    const card = await createCard({ image: DEFAULT_IMAGE });
    cards.push(card);
  }
  return cards;
}

function cacheCosts() {
  return db.cards.cacheCosts()
}

function removeImageless() {
  return db.cards.removeImageless()
}

function regenerateHashes() {
  return db.cards.regenerateHashes()  
}

function checkCommanders() {
  return db.cards.checkCommanders()
}

module.exports = {
  generateFullCard,
  generateCards,
  generateCardsWithoutImage,
  createCard,
  addImageToCard,
  addImageToAnyCard,
  cacheCosts,
  removeImageless,
  regenerateHashes,
  checkCommanders,
};
