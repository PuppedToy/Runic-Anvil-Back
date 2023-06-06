const { generateImage } = require('../generateCardImage');
const db = require('../../db');

async function addImageToCard(card) {
  const { generationData, result } = await generateImage(card);
  const image = result;

  const updatedCard = await db.cards.update(card._id, {
    image,
    imageGenerationData: generationData,
  });

  return updatedCard;
}

async function addImageToAnyCard() {
  const card = await db.cards.findOneWithoutImage();
  if (!card) {
    return null;
  }

  return addImageToCard(card);
}

module.exports = {
  addImageToCard,
  addImageToAnyCard,
};
