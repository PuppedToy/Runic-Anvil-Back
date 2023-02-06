const express = require('express');
const { validate, Joi } = require('../../utils/joiExtended');

const controller = require('./dev.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

const simulateGenerateCardValidator = {
  body: Joi.object({
    level: Joi.number().integer().min(1).max(5),
  }),
};

const customQueryValidator = {
  body: Joi.object({
    query: Joi.object().required(),
  }),
};

const bulkUpdateValidator = {
  body: Joi.object({
    query: Joi.object().required(),
    stringUpdateCardMethod: Joi.string().regex(/^\s*function\s+updateCard\s*?\(\w+\)\s*\{[^ä]+\}\s*$/).required(),
  }),
};

router.post(
  '/simulate/generate-card',
  validate(simulateGenerateCardValidator),
  controller.simulateGenerateCardController,
);

router.post(
  '/custom-query',
  validate(customQueryValidator),
  controller.customQueryController,
);

router.put(
  '/bulk-update',
  validate(bulkUpdateValidator),
  controller.bulkUpdateController,
);

module.exports = router;
