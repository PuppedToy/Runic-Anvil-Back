const { Joi, ...otherExpressValidationItems } = require('express-validation');

const JoiExtended = Joi.extend((joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.mongoObjectId': '"{{#label}}" must be a valid Mongo ObjectId',
  },
  rules: {
    mongoObjectId: {
      validate(value, helpers) {
        const isValid = /^[0-9a-fA-F]{24}$/.test(value);
        if (!isValid) {
          return helpers.error('string.mongoObjectId');
        }
        return value;
      },
    },
  },
}));

module.exports = {
  Joi: JoiExtended,
  ...otherExpressValidationItems,
};
