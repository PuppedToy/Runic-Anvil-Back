const express = require('express');
const { validate, Joi } = require('express-validation');

const controller = require('./dev.controller');

const router = express.Router();

const simulateGenerateCardValidator = {
  body: Joi.object({
    level: Joi.number().integer().min(1).max(5),
  }),
};

router.post(
  '/simulate/generate-card',
  validate(simulateGenerateCardValidator),
  controller.simulateGenerateCardController,
);

module.exports = router;
