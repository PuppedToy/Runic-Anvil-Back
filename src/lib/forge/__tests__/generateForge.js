const {
  forgeLevelFilter,
  generateTrigger,
  processText,
  processValue,
  generateEffect,
  forgeGenerators,
  generateForge,
} = require('../generateForge');

describe('Forge generation', () => {
  describe('Forge Level Filter', () => {
    it('Should return a function', () => {
      expect(typeof forgeLevelFilter(1)).toBe('function');
    });
    it('Should return true if forgeLevel is below level', () => {
      expect(forgeLevelFilter(1)({ forgeLevel: 0 })).toBe(true);
    });
    it('Should return false if forgeLevel is above level', () => {
      expect(forgeLevelFilter(1)({ forgeLevel: 2 })).toBe(false);
    });
  });

  describe('Generate Trigger', () => {
    it('Should return an object', () => {
      expect(typeof generateTrigger(1)).toBe('object');
    });
  });

  describe('Process Text', () => {
    it('Should return a string', () => {
      expect(typeof processText('test', {})).toBe('string');
    });

    it('Should throw an error if called with no params', () => {
      expect(() => processText()).toThrow();
    });

    it('Should throw an error if called with a double dollar', () => {
      expect(() => processText('$$')).toThrow();
    });

    it('Should throw an error if called with empty string', () => {
      expect(() => processText('')).toThrow();
    });

    it('Should return the expected result if found one $ variable', () => {
      expect(processText('test $test', { test: 'test' })).toBe('test test');
    });

    it('Should return the expected result if found multiple $ variables', () => {
      expect(processText('test $test $test', { test: 'test' })).toBe('test test test');
    });

    it('Should return the expected result if found multiple $ variables with different values', () => {
      expect(processText('test $test $test2', { test: 'test', test2: 'test2' })).toBe('test test test2');
    });

    it('Should return the expected result if found multiple $ variables with different values and a number', () => {
      expect(processText('test $test $test2 $test3', { test: 'test', test2: 'test2', test3: 1 })).toBe('test test test2 1');
    });

    it('Should return the expected result if found multiple $ variables with different values and a number and a function', () => {
      expect(processText('test $test $test2 $test3 $test4', {
        test: 'test',
        test2: 'test2',
        test3: 1,
        test4: () => 'test4',
      })).toBe('test test test2 1 test4');
    });

    it('Should return the expected result if found multiple $ variables with different values and a number and a function and an object', () => {
      expect(processText('test $test $test2 $test3 $test4 $test5', {
        test: 'test',
        test2: 'test2',
        test3: 1,
        test4: () => 'test4',
        test5: { text: 'test5' },
      })).toBe('test test test2 1 test4 test5');
    });

    it('Should return the expected result if found multiple $ variables with different values and a number and a function with params', () => {
      expect(processText('test $test $test2 $test3 $test4', {
        test: 'test',
        test2: 'test2',
        test3: 1,
        test4: ({ test }) => `${test}${test}4`,
      })).toBe('test test test2 1 testtest4');
    });

    it('Should throw an error if context does not have a variable name', () => {
      expect(() => processText('test $test', {})).toThrow();
    });

    it('Should throw an error if context object does not have text field', () => {
      expect(() => processText('test $test', { test: {} })).toThrow();
    });

    it('Should not throw an error if context object does have text field', () => {
      expect(() => processText('test $test', { test: { text: 'test' } })).not.toThrow();
    });

    it('Should throw an error if replacement results in the same text as before', () => {
      expect(() => processText('test $test', { test: '$test' })).toThrow();
    });
  });

  describe('Process Value', () => {
    it('Should return a number', () => {
      expect(typeof processValue(1)).toBe('number');
    });

    it('Should return a number if passed an object with correct range property', () => {
      expect(typeof processValue({ range: { min: 1, max: 3 } })).toBe('number');
    });

    it('Should return an object if passed an object without range property', () => {
      expect(typeof processValue({})).toBe('object');
    });

    it('Should return a string if passed a string', () => {
      expect(typeof processValue('test')).toBe('string');
    });

    it('Should throw an error if passed an object with a range that does not have a min', () => {
      expect(() => processValue({ range: { max: 3 } })).toThrow();
    });

    it('Should throw an error if passed an object with a range that does not have a max', () => {
      expect(() => processValue({ range: { min: 3 } })).toThrow();
    });
  });

  describe('Generate Effect', () => {
    it('Should return an object', () => {
      expect(typeof generateEffect(1)).toBe('object');
    });
  });

  describe('Forge Generators', () => {
    const expectedBaseCard = {
      name: 'foo',
    };
    const baseCard = {
      name: 'foo',
    };

    it('Should return an object with properties forge and card when called generate for any element', () => {
      forgeGenerators.forEach((generator) => {
        expect(generator).toHaveProperty('generate');
        const generated = generator.generate(1, baseCard);
        expect(generated).toHaveProperty('forge');
        expect(generated).toHaveProperty('card');
      });
    });

    it('Should not modify the baseCard object for any element', () => {
      forgeGenerators.forEach((generator) => {
        generator.generate(1, baseCard);
        expect(baseCard).toEqual(expectedBaseCard);
      });
    });
  });

  it('Should return an object with type, forge and card properties', () => {
    const generated = generateForge(1, { name: 'foo' });
    expect(generated).toHaveProperty('type');
    expect(generated).toHaveProperty('forge');
    expect(generated).toHaveProperty('card');
    expect(generated.card).toHaveProperty('name', 'foo');
  });
});
