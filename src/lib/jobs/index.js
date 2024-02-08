const { readdir, rm } = require('fs').promises;

const createCard = require('./createCard');
const { addImageToCard, addImageToAnyCard } = require('./addImageToCard');
const db = require('../../db');

const DEFAULT_IMAGE = '/pics/__default/00000.png';

async function generateFullCard(options) {
  const newCard = await createCard(options);
  if (newCard === null) return null;
  const cardWithImage = await addImageToCard(newCard);
  return cardWithImage;
}

async function generateCards(n, options) {
  const cards = [];
  for (let i = 0; i < n; i += 1) {
    console.log(`Generating card ${i + 1} of ${n}`);
    // eslint-disable-next-line no-await-in-loop
    const card = await generateFullCard(options);
    if (card !== null) {
      cards.push(card);
    }
  }
  return cards;
}

async function generateCardsWithoutImage(n, { level }) {
  const cards = [];
  for (let i = 0; i < n; i += 1) {
    console.log(`[NOIMG] Generating card ${i + 1} of ${n}`);
    // eslint-disable-next-line no-await-in-loop
    const card = await createCard({ image: DEFAULT_IMAGE, level });
    if (card !== null) {
      cards.push(card);
    }
  }
  return cards;
}

function cacheCosts() {
  return db.cards.cacheCosts();
}

function removeImageless() {
  return db.cards.removeImageless();
}

function regenerateHashes() {
  return db.cards.regenerateHashes();
}

function checkCommanders() {
  return db.cards.checkCommanders();
}

async function cleanImages() {
  const picDirName = `${__dirname}/../../../pics`;
  console.log(picDirName);

  const [imagesToDelete, cards] = await Promise.all([
    await readdir(picDirName),
    await db.cards.getAllCards(),
  ]);

  ['.gitignore', '__default'].forEach((dir) => {
    const index = imagesToDelete.findIndex((image) => image === dir);
    if (index >= 0) {
      imagesToDelete.splice(index, 1);
    }
  });

  // @TODO this selects all cards
  cards.forEach((card) => {
    const imageIndex = imagesToDelete.findIndex((foundImage) => {
      const splits = card.image.split('/');
      const cardImage = splits[splits.length - 2];
      return foundImage === cardImage;
    });
    if (imageIndex >= 0) {
      imagesToDelete.splice(imageIndex, 1);
    }
  });

  const deletingDirPromises = [];
  imagesToDelete.forEach((imageDirectory) => {
    console.log(`Deleting image ${imageDirectory}`);
    deletingDirPromises.push(rm(`${picDirName}/${imageDirectory}`, { recursive: true }));
  });
  await Promise.all(deletingDirPromises);
  console.log(`Deleted ${imagesToDelete.length} images`);
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
  cleanImages,
};
