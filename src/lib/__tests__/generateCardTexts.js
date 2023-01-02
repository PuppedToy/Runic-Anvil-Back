const {
  getKeywords,
  addWeightsToObjectListComparingWithAKeywordList,
  generateName,
} = require('../generateCardTexts');

describe('Generate card texts', () => {
  describe('Get keywords', () => {
    it('Should return an empty array if no item is passed', () => {
      expect(getKeywords()).toEqual([]);
    });

    it('Should return an empty array if an empty string is passed', () => {
      expect(getKeywords('')).toEqual([]);
    });

    it('Should return an empty array if an empty array is passed', () => {
      expect(getKeywords([])).toEqual([]);
    });

    it('Should return an empty array if an empty object is passed', () => {
      expect(getKeywords({})).toEqual([]);
    });

    it('Should return an array with the words of a string', () => {
      expect(getKeywords('This is a string')).toEqual(['this', 'is', 'a', 'string']);
    });

    it('Should return an array with the words of an array', () => {
      expect(getKeywords(['This is a string', 'This is another string'])).toEqual(['this', 'is', 'a', 'string', 'another']);
    });

    it('Should return an array with the words of an object', () => {
      expect(getKeywords({ a: 'This is a string', b: 'This is another string' })).toEqual(['this', 'is', 'a', 'string', 'another']);
    });

    it('Should return an array with the words of an object with nested objects', () => {
      expect(getKeywords({ a: 'This is a string', b: { c: 'This is another string' } })).toEqual(['this', 'is', 'a', 'string', 'another']);
    });

    it('Should return an array with the words of an object with nested arrays', () => {
      expect(getKeywords({ a: 'This is a string', b: ['This is another string'] })).toEqual(['this', 'is', 'a', 'string', 'another']);
    });
  });

  describe('Add weights to object list comparing with a keyword list', () => {
    it('Should return an empty array if no list is passed', () => {
      expect(addWeightsToObjectListComparingWithAKeywordList()).toEqual([]);
    });
  });

  describe('Generate name', () => {
    const basicCard = {
      type: 'unit',
    };

    it('Should throw an error if no card is passed', () => {
      expect(() => generateName()).toThrow();
    });

    it('Should throw an error if no card type is passed', () => {
      expect(() => generateName({})).toThrow();
    });

    it('Should throw an error if unitType does not exist', () => {
      expect(() => generateName({ type: 'unit', unitType: 'notExisting' })).toThrow();
    });

    it('Should throw an error if options is not an object', () => {
      expect(() => generateName(basicCard, 'options')).toThrow();
    });

    it('Should return a string', () => {
      expect(typeof generateName(basicCard)).toBe('string');
    });

    it('Should return a string if passed $adjective as a template', () => {
      expect(typeof generateName(basicCard, {
        test: {
          template: {
            value: '$adjective',
          },
        },
      })).toBe('string');
    });

    it('Should return a string if passed $other as a template', () => {
      expect(typeof generateName(basicCard, {
        test: {
          template: {
            value: '$other',
          },
        },
      })).toBe('string');
    });

    it('Should return a string if passed $noun as a template', () => {
      expect(typeof generateName(basicCard, {
        test: {
          template: {
            value: '$noun',
          },
        },
      })).toBe('string');
    });

    it('Should return a string if passed $main as a template', () => {
      expect(typeof generateName(basicCard, {
        test: {
          template: {
            value: '$main',
          },
        },
      })).toBe('string');
    });

    it('Should return a string if passed $profession as a template', () => {
      expect(typeof generateName(basicCard, {
        test: {
          template: {
            value: '$profession',
          },
        },
      })).toBe('string');
    });

    it('Should throw an error if passed $nonExistantMatch as a template', () => {
      expect(() => generateName(basicCard, {
        test: {
          template: {
            value: '$nonExistantMatch',
          },
        },
      })).toThrow();
    });
  });
});
