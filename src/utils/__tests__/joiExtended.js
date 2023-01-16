const { Joi } = require('../joiExtended');

describe('Joi Extended', () => {
  it('Should still validate normal things like string', () => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { error } = schema.validate({ name: 'foo' });

    expect(error).toBeUndefined();
  });

  it('Should validate a valid Mongo ObjectId', () => {
    const schema = Joi.object({
      id: Joi.string().mongoObjectId().required(),
    });

    const { error } = schema.validate({ id: '507f191e810c19729de860ea' });

    expect(error).toBeUndefined();
  });

  it('Should not validate an invalid Mongo ObjectId', () => {
    const schema = Joi.object({
      id: Joi.string().mongoObjectId().required(),
    });

    const { error } = schema.validate({ id: '507f191e810c19729de860za' });

    expect(error).not.toBeUndefined();
  });
});
