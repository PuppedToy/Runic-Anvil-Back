const express = require('express');
const { validate, Joi } = require('../../utils/joiExtended');

const controller = require('./cards.controller');

const router = express.Router();

const getCardValidator = {
  params: Joi.object({
    cardId: Joi.string().mongoObjectId().required(),
  }),
};

router.get('/:cardId', validate(getCardValidator), controller.getCardController);

module.exports = router;
