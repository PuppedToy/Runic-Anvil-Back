const mockStart = jest.fn();
const mockRequestQuery = jest.fn(() => ({
  promise: Promise.resolve(['foo']),
}));

jest.mock('../stableDiffusion', () => ({
  start: mockStart,
  requestQuery: mockRequestQuery,
}));

const {
  getCardImageKeywords,
  generatePrompt,
  generateImage,
} = require('../generateCardImage');

describe('Generate card image', () => {
  describe('Get card image keywords', () => {
    it('Should return empty array if no card is passed', () => {
      expect(getCardImageKeywords()).toEqual([]);
    });

    it('Should return the expected array if a simple card is passed', () => {
      const card = {
        a: 'foo',
        key: 'key1',
      };
      const expectedResult = ['key1'];
      expect(getCardImageKeywords(card)).toEqual(expectedResult);
    });

    it('Should return the expected array if a card with id and _id is passed', () => {
      const card = {
        id: {
          key: 'idkey',
        },
        _id: {
          key: '_idkey',
        },
        key: 'key1',
      };
      const expectedResult = ['key1'];
      expect(getCardImageKeywords(card)).toEqual(expectedResult);
    });

    it('Should return the expected array if a complex card is passed', () => {
      const card = {
        a: 'foo',
        b: {
          key: 4,
        },
        key: 'key1',
        bar: ['bar1', 'bar2'],
        foo: {
          key: 'fookey',
        },
      };
      const expectedResult = ['key1', 'fookey'];
      expect(getCardImageKeywords(card)).toEqual(expectedResult);
    });
  });

  describe('Generate prompt', () => {
    it('Should throw if no card is passed', () => {
      expect(() => generatePrompt()).toThrow();
    });

    it('Should return a string with the expected match if a card with name is passed', () => {
      const card = {
        name: 'MyCard',
      };
      expect(generatePrompt(card)).toMatch(/Epic drawing of a MyCard/);
    });
  });

  describe('Generate image', () => {
    const baseCard = {
      name: 'MyCard',
    };
    it('Throw if no card is passed', async () => {
      await expect(generateImage()).rejects.toThrow();
    });

    it('Should call start in stableDiffusion', async () => {
      await generateImage(baseCard);
      expect(mockStart).toHaveBeenCalled();
    });

    it('Should call requestQuery in stableDiffusion', async () => {
      await generateImage(baseCard);
      expect(mockRequestQuery).toHaveBeenCalled();
    });

    it('Should return the expected object', async () => {
      const expectedGeneratedImageData = {
        generationData: {
          prompt: expect.any(String),
          seed: expect.any(Number),
          ckpt: expect.any(String),
          quantity: 1,
        },
        result: 'foo',
      };
      const generatedImageData = await generateImage(baseCard);
      expect(generatedImageData).toEqual(expectedGeneratedImageData);
    });
  });
});
