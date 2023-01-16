const db = require('../../db');

async function searchController(req, res, next) {
  try {
    const { data, pagination } = await db.cards.search(req.query);

    if (data.length === 0) {
      res.status(404).json({ message: 'Cards not found' });
      return;
    }

    res.status(200).json({
      message: 'Cards found',
      data,
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
        data: card,
      });
    } else {
      res.status(404).json({ message: 'Card not found' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  searchController,
  getCardController,
};
