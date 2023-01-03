const adjectives = require('../textGeneration/adjectives');
const nouns = require('../textGeneration/nouns');
const templates = require('../textGeneration/templates');

describe('Text Generation Data', () => {
  const expectedWordProperties = {
    word: expect.any(String),
    relatedWords: expect.toBeOneOf([expect.any(Array), undefined]),
    keywords: expect.toBeOneOf([expect.any(Array), undefined]),
    gender: expect.toBeOneOf([expect.any(String), undefined]),
    forgeRange: expect.toBeOneOf([expect.any(String), undefined]),
    attackRange: expect.toBeOneOf([expect.any(String), undefined]),
    profession: expect.toBeOneOf([expect.any(Boolean), undefined]),
    type: expect.toBeOneOf([expect.any(String), undefined]),
    elements: expect.toBeOneOf([expect.any(Array), undefined]),
    minRarity: expect.toBeOneOf([expect.any(Number), undefined]),
    maxForgeLevel: expect.toBeOneOf([expect.any(Number), undefined]),
    minForgeLevel: expect.toBeOneOf([expect.any(Number), undefined]),
  };

  describe('Adjectives', () => {
    it('Should be an array', () => {
      expect(Array.isArray(adjectives)).toBe(true);
    });

    it('Should match if the object contains any of the expected properties', () => {
      adjectives.forEach((adj) => {
        expect(adj).toEqual(expectedWordProperties);
      });
    });
  });

  describe('Nouns', () => {
    it('Should be an object', () => {
      expect(typeof nouns).toBe('object');
    });

    it('Should match the expected object', () => {
      const expectedNounObject = {
        main: expect.any(Object),
        other: expect.any(Object),
      };

      expect(nouns).toEqual(expectedNounObject);
    });

    it('Should match if every main noun contains any of the expected properties', () => {
      Object.values(nouns.main).forEach((nounListByCardType) => {
        nounListByCardType.forEach((noun) => {
          expect(noun).toEqual(expectedWordProperties);
        });
      });
    });

    it('Should match if every other noun contains any of the expected properties', () => {
      Object.values(nouns.other).forEach((noun) => {
        expect(noun).toEqual(expectedWordProperties);
      });
    });
  });

  describe('Templates', () => {
    const expectedTemplate = {
      type: expect.toBeOneOf(['unit', 'spell', 'weapon']),
      forgeLevel: expect.toBeOneOf([0, 1, 2, 3, 4, 5]),
      value: expect.any(String),
    };

    it('Should be an array', () => {
      expect(Array.isArray(templates)).toBe(true);
    });

    it('Should have every containing element within the following schema', () => {
      templates.forEach((template) => {
        expect(template).toEqual(expectedTemplate);
      });
    });
  });
});
