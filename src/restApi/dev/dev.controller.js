const { generateCard } = require('../../lib/generateCard');
const { bulkUpdate, customQuery } = require('../../db/cards');

function simulateGenerateCardController(req, res, next) {
  const { level = 1 } = req.body;

  try {
    const card = generateCard(level);

    return res.status(200).json({
      message: 'Card generated',
      card,
    });
  } catch (error) {
    return next(error);
  }
}

async function customQueryController(req, res, next) {
  const { query } = req.body;

  try {
    const result = await customQuery(query);

    return res.status(200).json({
      message: 'Query executed',
      result,
    });
  } catch (error) {
    return next(error);
  }
}

async function bulkUpdateController(req, res, next) {
  const { query, stringUpdateCardMethod } = req.body;

  try {
    const result = await bulkUpdate(query, stringUpdateCardMethod);

    return res.status(200).json({
      message: 'Cards updated',
      result,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  simulateGenerateCardController,
  customQueryController,
  bulkUpdateController,
};
