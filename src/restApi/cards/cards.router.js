const express = require('express');
const { validate, Joi } = require('../../utils/joiExtended');

const controller = require('./cards.controller');

const router = express.Router();

const searchValidator = {
  query: Joi.object({
    name: Joi.string(),
  }),
};

const getCardValidator = {
  params: Joi.object({
    cardId: Joi.string().mongoObjectId().required(),
  }),
};

router.get('/search', validate(searchValidator), controller.searchController);
router.get('/:cardId', validate(getCardValidator), controller.getCardController);

module.exports = router;
