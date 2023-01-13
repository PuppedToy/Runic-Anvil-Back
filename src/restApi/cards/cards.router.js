const express = require('express');
const { validate, Joi } = require('express-validation');

const controller = require('./cards.controller');

const router = express.Router();

const getCardValidator = {
  params: Joi.object({
    cardId: Joi.string().required(),
  }),
};

router.get('/:cardId', validate(getCardValidator), controller.getCardController);

module.exports = router;
