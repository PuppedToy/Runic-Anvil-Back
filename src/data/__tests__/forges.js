const forgesDataIndex = require('../forges');

const cardElements = require('../forges/cardElements');
const cardStats = require('../forges/cardStats');
const cardTypes = require('../forges/cardTypes');
const conditions = require('../forges/conditions');
const effects = require('../forges/effects');
const eligibleTargetsCards = require('../forges/eligibleTargetsCards');
const eligibleTargetsKingdoms = require('../forges/eligibleTargetsKingdoms');
const forgeTypes = require('../forges/forgeTypes');
const kingdomStats = require('../forges/kingdomStats');
const passiveEffects = require('../forges/passiveEffects');
const targetTypes = require('../forges/targetTypes');
const triggerableEffects = require('../forges/triggerableEffects');
const triggers = require('../forges/triggers');
const unitTypes = require('../forges/unitTypes');
const zones = require('../forges/zones');

describe('Forges Data', () => {
  const cardExample = {
    cost: 100,
    attack: 2,
  };

  it('Should have an object index', () => {
    expect(typeof forgesDataIndex).toBe('object');
  });

  describe('Simple array data', () => {
    it('Card stats should be an array', () => {
      expect(Array.isArray(cardStats)).toBe(true);
    });

    it('Card types should be an array', () => {
      expect(Array.isArray(cardTypes)).toBe(true);
    });

    it('Kingdom stats should be an array', () => {
      expect(Array.isArray(kingdomStats)).toBe(true);
    });

    it('Zones should be an array', () => {
      expect(Array.isArray(zones)).toBe(true);
    });
  });

  describe('Card Elements', () => {
    it('Should be an object', () => {
      expect(typeof cardElements).toBe('object');
    });

    it('Should have every element matching the expected object', () => {
      const expectedCardElementsObject = {
        name: expect.any(String),
        keywords: expect.any(Array),
      };

      Object.values(cardElements).forEach((element) => {
        expect(element).toEqual(expectedCardElementsObject);
      });
    });
  });

  describe('Conditions', () => {
    it('Should be an object', () => {
      expect(typeof conditions).toBe('object');
    });

    it('Should have every card condition matching the expected object', () => {
      const expectedCardConditionsObject = {
        name: expect.any(String),
        arguments: expect.any(Object),
        description: expect.any(String),
        text: expect.any(String),
      };
      Object.values(conditions.cards).forEach((condition) => {
        expect(condition).toEqual(expectedCardConditionsObject);
      });
    });
  });

  describe('Effects', () => {
    it('Should be an object', () => {
      expect(typeof effects).toBe('object');
    });

    it('Should have every card condition matching the expected object', () => {
      const expectedEffectObject = {
        name: expect.any(String),
        description: expect.any(String),
        text: expect.any(String),
        default: expect.any(Object),
        mods: expect.toBeOneOf([expect.any(Array), undefined]),
      };
      Object.values(effects).forEach((effect) => {
        expect(effect).toEqual(expectedEffectObject);
      });
    });

    it('Should have the expected result when calling the plural draw method with amount > 1', () => {
      const pluralDraw = effects.draw.default.textContext.plural({ amount: 2 });
      expect(pluralDraw).toBe('s');
    });

    it('Should have the expected result when calling the plural draw method with amount = 1', () => {
      const pluralDraw = effects.draw.default.textContext.plural({ amount: 1 });
      expect(pluralDraw).toBe('');
    });
  });

  describe('Eligible Targets Cards', () => {
    it('Should be an object', () => {
      expect(typeof eligibleTargetsCards).toBe('object');
    });

    it('Should have every eligible target matching the expected object', () => {
      const expectedEligibleTargetObject = {
        name: expect.any(String),
        text: expect.any(String),
        generate: expect.toBeOneOf([expect.any(Function), undefined]),
      };
      Object.values(eligibleTargetsCards).forEach((target) => {
        expect(target).toEqual(expectedEligibleTargetObject);
      });
    });

    it('Should have every generate method returning an object', () => {
      Object.values(eligibleTargetsCards).forEach((target) => {
        if (target.generate) {
          expect(typeof target.generate()).toBe('object');
        }
      });
    });
  });

  describe('Eligible Targets Kingdoms', () => {
    it('Should be an object', () => {
      expect(typeof eligibleTargetsKingdoms).toBe('object');
    });

    it('Should have every eligible target matching the expected object', () => {
      const expectedEligibleTargetObject = {
        name: expect.any(String),
      };
      Object.values(eligibleTargetsKingdoms).forEach((target) => {
        expect(target).toEqual(expectedEligibleTargetObject);
      });
    });
  });

  describe('Forge Types', () => {
    it('Should be an object', () => {
      expect(typeof forgeTypes).toBe('object');
    });

    it('Should have every forge type matching the expected object', () => {
      const expectedForgeTypeObject = {
        name: expect.any(String),
        description: expect.any(String),
        condition: expect.toBeOneOf([expect.any(String), undefined]),
      };
      Object.values(forgeTypes.units).forEach((type) => {
        expect(type).toEqual(expectedForgeTypeObject);
      });
      Object.values(forgeTypes.weapons).forEach((type) => {
        expect(type).toEqual(expectedForgeTypeObject);
      });
      Object.values(forgeTypes.spells).forEach((type) => {
        expect(type).toEqual(expectedForgeTypeObject);
      });
    });
  });

  describe('Passive Effects', () => {
    it('Should be an object', () => {
      expect(typeof passiveEffects).toBe('object');
    });

    it('Should have every passive effect matching the expected object', () => {
      const expectedPassiveEffectObject = {
        name: expect.any(String),
        description: expect.any(String),
        costModificator: expect.any(Function),
        forgeLevel: expect.toBeOneOf([expect.any(Number), undefined]),
        costPriority: expect.toBeOneOf([expect.any(Number), undefined]),
        referTo: expect.toBeOneOf([expect.any(String), undefined]),
      };
      Object.values(passiveEffects).forEach((effect) => {
        expect(effect).toEqual(expectedPassiveEffectObject);
      });
    });

    it('Should return a number when calling the costModificator method for each passive effect', () => {
      Object.values(passiveEffects).forEach((passiveEffect) => {
        expect(typeof passiveEffect.costModificator(cardExample)).toBe('number');
      });
    });
  });

  describe('Target types', () => {
    it('Should be an object', () => {
      expect(typeof targetTypes).toBe('object');
    });

    it('Should have every target type matching the expected object', () => {
      const expectedTargetTypeObject = {
        name: expect.any(String),
        description: expect.any(String),
      };
      Object.values(targetTypes).forEach((targetType) => {
        expect(targetType).toEqual(expectedTargetTypeObject);
      });
    });
  });

  describe('Triggerable effects', () => {
    it('Should be an object', () => {
      expect(typeof triggerableEffects).toBe('object');
    });

    it('Should have every triggerable effect matching the expected object', () => {
      const expectedTriggerableEffectObject = {
        name: expect.any(String),
        description: expect.any(String),
        costModificator: expect.any(Function),
      };
      Object.values(triggerableEffects).forEach((effect) => {
        expect(effect).toEqual(expectedTriggerableEffectObject);
      });
    });

    it('Should return a number when calling the costModificator method for each passive effect', () => {
      Object.values(triggerableEffects).forEach((passiveEffect) => {
        expect(typeof passiveEffect.costModificator(cardExample)).toBe('number');
      });
    });
  });

  describe('Triggers', () => {
    it('Should be an object', () => {
      expect(typeof triggers).toBe('object');
    });

    it('Should have every trigger matching the expected object', () => {
      const expectedTriggerObject = {
        name: expect.any(String),
        description: expect.toBeOneOf([expect.any(String), undefined]),
        effectType: expect.any(String),
        onEffect: expect.toBeOneOf([expect.any(String), undefined]),
        costModificator: expect.toBeOneOf([expect.any(Function), undefined]),
        weight: expect.toBeOneOf([expect.any(Number), undefined]),
      };
      Object.values(triggers).forEach((trigger) => {
        expect(trigger).toEqual(expectedTriggerObject);
      });
    });

    it('Should return a number when calling the costModificator method for each trigger', () => {
      Object.values(triggers).forEach((trigger) => {
        if (trigger.costModificator) {
          expect(typeof trigger.costModificator(cardExample)).toBe('number');
        }
      });
    });
  });

  describe('Unit Types', () => {
    it('Should be an object', () => {
      expect(typeof unitTypes).toBe('object');
    });

    it('Should have every unit type matching the expected object', () => {
      const expectedUnitTypeObject = {
        name: expect.any(String),
        forgeLevel: expect.toBeOneOf([expect.any(Number), undefined]),
      };
      Object.values(unitTypes).forEach((type) => {
        expect(type).toEqual(expectedUnitTypeObject);
      });
    });
  });
});
