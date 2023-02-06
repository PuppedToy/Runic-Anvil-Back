const express = require('express');
const { validate, Joi } = require('../../utils/joiExtended');

const controller = require('./cards.controller');

const cardTypes = require('../../data/forges/cardTypes');
const unitTypes = require('../../data/forges/unitTypes');
const { forgeGenerators } = require('../../lib/forge/generateForge');

const router = express.Router();

const searchValidator = {
  query: Joi.object({
    name: Joi.string(),
    ignoreImage: Joi.boolean(),
    sample: Joi.boolean(),
    type: Joi.string().valid(...cardTypes),
    unitType: Joi.string().valid(...Object.keys(unitTypes)),
    forge: Joi.string().valid(...forgeGenerators.map((forge) => forge.type)),
    cost: Joi.number().integer().min(0),
    minCost: Joi.number().integer().min(0),
    maxCost: Joi.number().integer().min(0),
    attack: Joi.number().integer().min(0),
    minAttack: Joi.number().integer().min(0),
    maxAttack: Joi.number().integer().min(0),
    hp: Joi.number().integer().min(0),
    minHp: Joi.number().integer().min(0),
    maxHp: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(1),
    offset: Joi.number().integer().min(0),
    rarity: Joi.number().integer().min(0),
    minRarity: Joi.number().integer().min(0),
    maxRarity: Joi.number().integer().min(0),
    cardVersion: Joi.string().regex(/^(\^|~)?(latest|([0-9]+?\.){2}[0-9]+)$/),
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
