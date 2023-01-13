const db = require('../../db');

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
  getCardController,
};
