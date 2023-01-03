const { generateCard } = require('../generateCard');

describe('Generate Card', () => {
  it('Should return an object', () => {
    expect(typeof generateCard()).toBe('object');
  });

  it('Should return an object if passed a level', () => {
    expect(typeof generateCard(1)).toBe('object');
  });

  it('The generated card should have the expected properties', () => {
    const expectedProperties = [
      'attack',
      'hp',
      'type',
      'unitType',
      'level',
      'forge',
    ];

    const card = generateCard();
    expect(card).toHaveProperty(...expectedProperties);
  });

  it('Should throw an error if level is negative', () => {
    expect(() => generateCard(-1)).toThrow();
  });
});
