const { generateCard } = require('../../lib/generateCard');

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

module.exports = {
  simulateGenerateCardController,
};
