const restApiIndex = require('..');

describe('Rest API', () => {
  it('Should be an express router', () => {
    expect(restApiIndex).toBeInstanceOf(Function);
  });
});
