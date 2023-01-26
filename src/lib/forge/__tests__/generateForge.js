const {
  forgeLevelFilter,
  generateTrigger,
  processText,
  processValue,
  generateEffect,
  generateForge,
  applyForge,

  forgeGenerators,
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
    it('Should return an object when called generate for any element', () => {
      forgeGenerators.forEach((generator) => {
        expect(generator).toHaveProperty('generate');
        expect(typeof generator.generate(1)).toBe('object');
      });
    });

    it('Should have the apply property and it should be a method', () => {
      forgeGenerators.forEach((generator) => {
        expect(generator).toHaveProperty('apply');
        expect(typeof generator.apply).toBe('function');
      });
    });

    describe('addUnitType', () => {
      const forgeGenerator = forgeGenerators.find((generator) => generator.type === 'addUnitType');

      it('Should add the proprety unitType to a card based on the forge key', () => {
        const forge = { key: 'test' };
        const card = { foo: 'bar' };
        const expectedCard = { foo: 'bar', unitType: 'test' };
        expect(forgeGenerator.apply(forge, card)).toEqual(expectedCard);
      });
    });

    describe('addPassiveEffect', () => {
      const forgeGenerator = forgeGenerators.find((generator) => generator.type === 'addPassiveEffect');

      it('Should add the proprety passiveEffects if the card does not have it', () => {
        const forge = { key: 'test' };
        const card = { foo: 'bar' };
        const expectedCard = { foo: 'bar', passiveEffects: ['test'] };
        expect(forgeGenerator.apply(forge, card)).toEqual(expectedCard);
      });

      it('Should add new values to the property passiveEffects if the card has it', () => {
        const forge = { key: 'test' };
        const card = { foo: 'bar', passiveEffects: ['test2'] };
        const expectedCard = { foo: 'bar', passiveEffects: ['test2', 'test'] };
        expect(forgeGenerator.apply(forge, card)).toEqual(expectedCard);
      });
    });

    describe('addEffectOnTrigger', () => {
      const forgeGenerator = forgeGenerators.find((generator) => generator.type === 'addEffectOnTrigger');

      it('Should add the proprety triggers if the card does not have it', () => {
        const forge = {
          key: 'test',
          trigger: {
            key: 'footrigger',
          },
          effect: {
            key: 'fooeffect',
          },
        };
        const card = { foo: 'bar' };
        const expectedCard = {
          foo: 'bar',
          triggers: [{
            trigger: {
              key: 'footrigger',
            },
            effect: {
              key: 'fooeffect',
            },
          }],
        };
        expect(forgeGenerator.apply(forge, card)).toEqual(expectedCard);
      });

      it('Should add new values to the property triggers if the card has it', () => {
        const forge = {
          key: 'test',
          trigger: {
            key: 'footrigger',
          },
          effect: {
            key: 'fooeffect',
          },
        };
        const card = { foo: 'bar', triggers: [{ bar: 'baz' }] };
        const expectedCard = {
          foo: 'bar',
          triggers: [
            {
              bar: 'baz',
            },
            {
              trigger: {
                key: 'footrigger',
              },
              effect: {
                key: 'fooeffect',
              },
            },
          ],
        };
        expect(forgeGenerator.apply(forge, card)).toEqual(expectedCard);
      });
    });
  });

  describe('Apply Forge', () => {
    const baseCard = {
      name: 'foo',
    };

    it('Should throw an error if called with no params', () => {
      expect(() => applyForge()).toThrow();
    });

    it('Should throw an error if called with unknown forge', () => {
      expect(() => applyForge({ type: 'unknown' }, baseCard)).toThrow();
    });

    it('Should throw an error if called with no card', () => {
      expect(() => applyForge({ type: 'addUnitType' })).toThrow();
    });

    it('Should merge texts if the forge has text', () => {
      const forge = {
        type: 'addUnitType',
        text: 'bar',
      };
      const card = {
        ...baseCard,
        text: 'foo.',
      };
      const expectedCardText = 'foo.\nbar.';

      const newCard = applyForge(forge, card);
      expect(newCard).toHaveProperty('text', expectedCardText);
    });

    it('Should create text field if the card does not have text', () => {
      const forge = {
        type: 'addUnitType',
        text: 'bar',
      };
      const card = {
        ...baseCard,
      };
      const expectedCardText = 'bar.';

      const newCard = applyForge(forge, card);
      expect(newCard).toHaveProperty('text', expectedCardText);
    });

    it('Should not create text field if the forge does not have text', () => {
      const forge = {
        type: 'addUnitType',
      };
      const card = {
        ...baseCard,
      };

      const newCard = applyForge(forge, card);
      expect(newCard).not.toHaveProperty('text');
    });

    it('Should leave text field untouched if the forge does not have text', () => {
      const forge = {
        type: 'addUnitType',
      };
      const card = {
        ...baseCard,
        text: 'foo.',
      };
      const expectedCardText = 'foo.';

      const newCard = applyForge(forge, card);
      expect(newCard).toHaveProperty('text', expectedCardText);
    });

    it('Should create the rarityLevel if the card does not have it', () => {
      const forge = {
        type: 'addUnitType',
      };
      const card = {
        ...baseCard,
      };
      const expectedRarityLevel = 1;

      const newCard = applyForge(forge, card);
      expect(newCard).toHaveProperty('rarityLevel', expectedRarityLevel);
    });

    it('Should increment the rarityLevel if the card has it', () => {
      const forge = {
        type: 'addUnitType',
      };
      const card = {
        ...baseCard,
        rarityLevel: 3,
      };
      const expectedRarityLevel = 4;

      const newCard = applyForge(forge, card);
      expect(newCard).toHaveProperty('rarityLevel', expectedRarityLevel);
    });
  });

  it('Should return an object', () => {
    expect(typeof generateForge(1)).toBe('object');
  });
});
