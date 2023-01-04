const simulateCardGraphQL = require('../generateCard');

describe('Generate Card API methods', () => {
  it('Should be a function', () => {
    expect(typeof simulateCardGraphQL).toBe('function');
  });

  it('Should not throw error when called', () => {
    expect(() => simulateCardGraphQL({ level: 1 })).not.toThrow();
  });
});
