const simulateForgeGraphQL = require('../simulateForge');

describe('Simulate Forge API methods', () => {
  it('Should be a function', () => {
    expect(typeof simulateForgeGraphQL).toBe('function');
  });

  it('Should not throw error when called', () => {
    expect(() => simulateForgeGraphQL({ level: 1 })).not.toThrow();
  });
});
