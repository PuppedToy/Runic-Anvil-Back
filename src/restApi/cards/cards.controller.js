const { packs: packDefinitions } = require('../../data/enums');
const db = require('../../db');
const { applyCardCalculatedFields } = require('../../lib/forge/generateForge');

async function searchController(req, res, next) {
  try {
    const { data, pagination } = await db.cards.search(req.query);

    if (data.length === 0) {
      res.status(404).json({ message: 'Cards not found' });
      return;
    }

    res.status(200).json({
      message: 'Cards found',
      data: data.map((card) => applyCardCalculatedFields(card)),
      pagination,
    });
  } catch (error) {
    next(error);
  }
}

async function getCardController(req, res, next) {
  try {
    const { cardId } = req.params;
    const card = await db.cards.getById(cardId);
    if (card) {
      res.status(200).json({
        message: 'Card found',
        data: applyCardCalculatedFields(card),
      });
    } else {
      res.status(404).json({ message: 'Card not found' });
    }
  } catch (error) {
    next(error);
  }
}

async function getPackController(req, res, next) {
  try {
    const { type } = req.params;
    const { amount = 1 } = req.query;
    const packPromises = [];
    let hasMinimumRarity = false;
    const packDefinition = packDefinitions[type];
    if (type === 'default') {
      for (let i = 0; i < packDefinition.size * amount; i += 1) {
        let rarity = packDefinitions.getRandomCardRarity(packDefinition.rarityProbabilities);
        if (rarity > 1) {
          hasMinimumRarity = true;
        }
        if (i % packDefinition.size === packDefinition.size - 1 && !hasMinimumRarity) {
          rarity = 2;
        }
        packPromises.push(db.cards.search({
          rarity,
          limit: 1,
          sample: true,
        }));
      }
    }
    const rawCards = await Promise.all(packPromises);
    const cards = rawCards.map((card) => applyCardCalculatedFields(card.data[0]));
    const packs = [];
    for (let i = 0; i < amount; i += 1) {
      packs.push(cards.slice(i * packDefinition.size, (i + 1) * packDefinition.size));
    }
    res.status(200).json({
      message: 'Packs created',
      data: packs,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  searchController,
  getCardController,
  getPackController,
};
