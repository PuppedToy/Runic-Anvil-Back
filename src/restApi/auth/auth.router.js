const express = require('express');
const { validate, Joi } = require('express-validation');

const controller = require('./auth.controller');

const router = express.Router();

const loginValidator = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

router.post('/login', validate(loginValidator), controller.loginController);

module.exports = router;
