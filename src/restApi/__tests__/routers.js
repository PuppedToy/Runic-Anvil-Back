const restApiIndex = require('..');
const authRouter = require('../auth/auth.router');

describe('Rest API Routers', () => {
  it('Should be an express router', () => {
    expect(restApiIndex).toBeInstanceOf(Function);
  });

  it('Should have each module as express routers', () => {
    expect(authRouter).toBeInstanceOf(Function);
  });
});
