const { generateImage } = require('../generateCardImage');
const db = require('../../db');

async function createCardJob() {
  const card = await db.cards.findOneWithoutImage();
  if (!card) {
    return null;
  }

  const { generationData, result } = await generateImage(card);
  const updatedCard = await db.cards.update(card.id, {
    image: result,
    imageGenerationData: generationData,
  });

  return updatedCard;
}

module.exports = createCardJob;
