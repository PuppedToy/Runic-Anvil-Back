const weightedSample = require('../../utils/weightedSample');
const { randomInt } = require('../../utils/random');
const {
  cardSelectors,
  unitTypes,
  ongoingEffects,
  passiveEffects,
  triggers,
  effects,
  actions,
  elements,
} = require('../../data/forges');
const { constants } = require('../../data/enums');

// Filters
const forgeLevelFilter = (level) => ({ forgeLevel = 0 }) => level >= forgeLevel;

// Trigger
function generateTrigger(level) {
  // @TODO We've used basic triggers like: Destroyed
  // But what about "Destroyed on barracks", "Destroyed by an Insect", "Destroyed by Siege Unit",
  // "Destroyed by a spell" or "Destroyed by an ally". We can enum all possible triggers for
  // each keyword
  return weightedSample(triggers, [forgeLevelFilter(level)]);
}

function generateAction(level) {
  return weightedSample(actions, [forgeLevelFilter(level)]);
}

function cleanDefinitionObject(definitionObject) {
  const unwantedProperties = ['weight'];
  const result = { ...definitionObject };
  unwantedProperties.forEach((property) => {
    delete result[property];
  });
  return result;
}

const processOperations = {
  custom: ({ method }, previousCard) => method(previousCard),
  range: (range) => {
    if (!Object.hasOwnProperty.call(range, 'min') || !Object.hasOwnProperty.call(range, 'max')) {
      throw new Error('Range must have min and max');
    }

    return randomInt(range.min, range.max, range.step);
  },
  sample: (sample) => weightedSample(sample),
  richSample: ({ list, map, filters }) => {
    const result = weightedSample(list, filters);
    if (map) {
      return map(result);
    }
    return result;
  },
  exponential: (exponential) => {
    if (!Object.hasOwnProperty.call(exponential, 'min')) {
      throw new Error('Range must have min and max');
    }
    const { min } = exponential;
    const max = Math.abs(exponential.max) || 99999; // This is for safety purposes against infinite loops
    const step = exponential.step || 1;
    const probability = exponential.probability || 0.5;

    let result = min;
    while (Math.random() < probability && Math.abs(result) < max) {
      result += step;
    }
    return result;
  },
};

function processForge(forge) {
  if (!Array.isArray(forge) && typeof forge === 'object') {
    let resultForge = { ...forge };
    Object.entries(resultForge).forEach(([key, value]) => {
      const keyWithoutDollar = key.replace('$', '');
      if (Object.hasOwnProperty.call(processOperations, keyWithoutDollar)) {
        const previousCard = null; // @TODO
        resultForge[key] = processOperations[keyWithoutDollar](value, previousCard);
      }
      resultForge[key] = processForge(resultForge[key]);
    });
    const keys = Object.keys(resultForge);
    if (keys.length === 1 && keys[0][0] === '$') {
      return resultForge[keys[0]];
    }
    return resultForge;
  }
  return forge;
}

function generateEffect(level) {
  const effect = weightedSample(effects, [forgeLevelFilter(level)]);
  const { mods, ...defaultForge } = effect;
  const processedForge = processForge(defaultForge);

  const forge = {
    ...defaultForge,
    processedForge,
  };

  return forge;
}

function generateSelector(level) {
  const selector = weightedSample(cardSelectors, [forgeLevelFilter(level)]);

  const {
    key,
    selector: selectorDefinition,
  } = selector;

  const processedSelector = processForge(selectorDefinition);

  const forge = {
    key,
    selector: processedSelector,
  };
  return forge;
}

function generateOngoingEffect(level) {
  const ongoingEffect = weightedSample(ongoingEffects, [forgeLevelFilter(level)]);

  const {
    key,
    effect,
  } = ongoingEffect;

  const processedEffect = processForge(effect);

  const forge = {
    key,
    effect: processedEffect,
  };
  return forge;
}

function generateTarget(reversed = false) {
  const positiveTarget = 'ally';
  const negativeTarget = 'enemy';
  const neutralTarget = 'all';
  
  const random = Math.random();
  if (random < 0.05) {
    return neutralTarget;
  }
  else if (random < 0.15) {
    return reversed ? positiveTarget : negativeTarget;
  }
  return reversed ? negativeTarget : positiveTarget;
}

function getCardBaseCost(card) {
  return parseInt(
    (
      card.attack * constants.CARD_PRICE_PER_ATTACK_POINT
      + card.hp * constants.CARD_PRICE_PER_HP_POINT
    ), 10,
  );
}

function getTriggerAvailableMods(forge, card) {
  // @TODO
  return [];
}

function getActionAvailableMods(forge, card) {
  // @TODO
  return [];
}

function getEffectAvailableMods(forge, card) {
  const foundEffect = effects[forge.effect.key];
  const forgeMods = forge.mods || [];
  const effectMods = foundEffect.mods || [];
  const forgeLevel = card.level;
  // First we add any mod that is level 1, is from the correct forgeLevel and is not already in the forge
  const availableMods = effectMods.filter(
    (mod) => (!mod.modLevel || mod.modLevel === 1)
      && ((mod.forgeLevel || 0) <= forgeLevel)
      && forgeMods.every((forgeMod) => forgeMod.key !== mod.key),
  );
  forgeMods.forEach((mod) => {
    const modLevel = mod.modLevel ? mod.modLevel + 1 : null;
    const modKey = mod.key;
    // Now we add any mod with current mod key and exactly current mod level, never forgetting the forge level restriction
    effectMods.forEach((effectMod) => {
      if (effectMod.key === modKey && effectMod.modLevel === modLevel && (effectMod.forgeLevel || 0) <= forgeLevel) {
        availableMods.push(effectMod);
      }
    });
  });
  return availableMods;
}

const forgeGenerators = [
  {
    type: 'addUnitType',
    weight: 1,
    generate: (level) => {
      const sample = weightedSample(unitTypes, [forgeLevelFilter(level)]);
      return {
        ...sample,
      };
    },
    upgrade: () => null,
    apply: (forge, card) => {
      const newCard = { ...card };
      newCard.unitType = forge.key;
      return newCard;
    },
    applyCost: (baseCost, _, card) => {
      const newCard = { ...card };
      newCard.cost = baseCost;
      return newCard;
    },
    isCommanderForbidden: () => false,
  },
  {
    type: 'addElement',
    weight: 1,
    generate: (level) => {
      const sample = weightedSample(Object.values(elements.basic), [forgeLevelFilter(level)]);
      return {
        ...sample,
      };
    },
    upgrade: (forge, card) => {
      const basicElementValues = Object.values(elements.basic);
      const basicElement = basicElementValues.find((currentBasicElement) => currentBasicElement.key === card.element);
      if (!card.element) {
        throw new Error(`Card ${card.name} doesn't have an element`);
      }
      if (basicElement === null && elements.complex.some((complexElement) => complexElement.elements.includes(card.element))) {
        const forbidden = weightedSample(Object.values(elements.forbidden), [forgeLevelFilter(card.level)]);
        return {
          ...forge,
          ...forbidden,
        }
      }
      const otherBasicElements = basicElementValues.filter((currentBasicElement) => currentBasicElement.key !== card.element);
      const newBasicElement = weightedSample(otherBasicElements, [forgeLevelFilter(card.level)]);
      const complexElement = Object.values(elements.complex).find(
        (currentComplexElement) => currentComplexElement.elements.includes(card.element) && currentComplexElement.elements.includes(newBasicElement.key),
      );
      if (complexElement === null) {
        throw new Error(`Element ${card.element} doesn't have a complex element with ${newBasicElement.key}`);
      }
      const newForge = {
        ...forge,
        ...complexElement,
      };
      return {
        forge: newForge,
        mod: complexElement,
      };
    },
    apply: (forge, card) => {
      const newCard = { ...card };
      newCard.element = forge.key;
      return newCard;
    },
    applyCost: (baseCost, _, card) => {
      const newCard = { ...card };
      const foundPassiveEffect = passiveEffects[forge.key];
      newCard.cost = baseCost;
      newCard.cost = foundPassiveEffect.costModificator ? foundPassiveEffect.costModificator(newCard) : newCard.cost;
      return newCard;
    },
    isCommanderForbidden: () => false,
  },
  {
    type: 'addPassiveEffect',
    weight: 1,
    generate: (level) => {
      const sample = weightedSample(passiveEffects, [forgeLevelFilter(level)]);
      return {
        ...sample,
      };
    },
    upgrade: (forge, card) => {
      const upgradedPassiveEffects = Object.values(passiveEffects).filter(
        (passiveEffect) => passiveEffect.forgeLevel <= card.level && card.passiveEffects.includes(passiveEffect.requirement),
      );
      if (!upgradedPassiveEffects.length) {
        return null;
      }
      const chosenMod = weightedSample(upgradedPassiveEffects);
      return {
        forge: {
          ...forge,
          ...chosenMod,
        },
        mod: chosenMod,
      };
    },
    apply: (forge, card) => {
      const newCard = { ...card };
      newCard.passiveEffects = newCard.passiveEffects || [];
      newCard.passiveEffects.push(forge.key);
      return newCard;
    },
    applyCost: (baseCost, forge, card) => {
      const newCard = { ...card };
      const foundPassiveEffect = passiveEffects[forge.key];
      newCard.cost = baseCost;
      newCard.cost = foundPassiveEffect.costModificator ? foundPassiveEffect.costModificator(newCard) : newCard.cost;
      return newCard;
    },
    isCommanderForbidden: () => false,
  },
  // Basic: Trigger: effect
  {
    type: 'addEffectOnTrigger',
    weight: 1,
    generate: (level) => {
      const trigger = generateTrigger(level);
      const effect = generateEffect(level);

      return {
        trigger,
        effect,
      };
    },
    upgrade: (forge, card) => {
      if (card.level <= 0) {
        throw new Error(`Card ${card.name} doesn't have a level`);
      }
      const availableMods = [
        ...getTriggerAvailableMods(forge, card),
        ...getEffectAvailableMods(forge, card),
      ];

      if (!availableMods.length) {
        return null;
      }

      const chosenMod = weightedSample(availableMods);
      const processedMod = processForge(chosenMod);
      const newForge = {
        ...forge,
        ...processedMod,
        mods: [...forgeMods, processedMod],
      };
      return {
        forge: newForge,
        mod: processedMod,
      };
    },
    apply: (forge, card) => {
      const newCard = { ...card };
      if (!newCard.triggers) newCard.triggers = [];
      newCard.triggers.push({
        trigger: cleanDefinitionObject(forge.trigger),
        effect: cleanDefinitionObject(forge.effect),
      });
      return newCard;
    },
    applyCost: (baseCost, forge, card) => {
      const newCard = { ...card };
      const foundEffect = effects[forge.effect.key];
      const extraPrice = foundEffect.price ? foundEffect.price(forge.effect) : 0;
      const foundTrigger = triggers[forge.trigger.key];
      const extraPriceModded = parseInt(
        foundTrigger.costModificator
          ? foundTrigger.costModificator({ cost: extraPrice }) : extraPrice,
        10,
      );
      newCard.cost = baseCost + extraPriceModded;
      return newCard;
    },
    isCommanderForbidden: (forge) => {
      const foundTrigger = triggers[forge.trigger.key];
      return foundTrigger.isCommanderForbidden ? foundTrigger.isCommanderForbidden() : false;
    },
  },
  {
    type: 'addEffectOnAction',
    weight: 1,
    generate (level) {
      const action = generateAction(level);
      const effect = generateEffect(level);

      return {
        action,
        effect,
      };
    },
    upgrade (forge, card) {
      if (card.level <= 0) {
        throw new Error(`Card ${card.name} doesn't have a level`);
      }
      const availableMods = [
        ...getActionAvailableMods(forge, card),
        ...getEffectAvailableMods(forge, card),
      ];

      if (!availableMods.length) {
        return null;
      }

      const chosenMod = weightedSample(availableMods);
      const processedMod = processForge(chosenMod);
      const newForge = {
        ...forge,
        ...processedMod,
        mods: [...forgeMods, processedMod],
      };
      return {
        forge: newForge,
        mod: processedMod,
      };
    },
    apply (forge, card) {
      const newCard = { ...card };
      if (!newCard.actions) newCard.actions = [];
      newCard.actions.push({
        action: cleanDefinitionObject(forge.action),
        effect: cleanDefinitionObject(forge.effect),
      });
      return newCard;
    },
    findAction (forge, card) {
      const { actions } = card;
      const foundAction = actions.find(
        ({ action, effect }) => action.key === forge.action.key
          && effect.key === forge.effect.key,
      );
      return foundAction;
    },
    applyCost (baseCost, forge, card, forgeIndex) {
      const newCard = { ...card };
      const foundEffect = effects[forge.effect.key];
      const effectPrice = foundEffect.price ? foundEffect.price(forge.effect) : 0;
      const foundAction = actions[forge.action.key];
      const extraPriceModded = parseInt(
        foundAction.cardCostModificator
          ? foundAction.cardCostModificator({ cost: effectPrice, energy: card.energy || 1 }) : 0,
        10,
      );
      const actionPrice = parseInt(
        foundAction.effectCostModificator
          ? foundAction.effectCostModificator({ cost: effectPrice }) : effectPrice,
        10,
      );
      newCard.cost = baseCost + extraPriceModded;
      const foundForge = newCard.forges[forgeIndex];
      const newForge = {
        ...foundForge,
        cost: actionPrice,
      };
      const cardAction = this.findAction(forge, newCard);
      newCard.forges[forgeIndex] = newForge;
      cardAction.cost = actionPrice;
      return newCard;
    },
    isCommanderForbidden: () => false,
  },
  {
    type: 'addConditionalEffect',
    weight: 1,
    generate: (level) => {
      const selector = generateSelector(level);
      const ongoingEffect = generateOngoingEffect(level);
      const reverseEffect = Math.random() < 0.2;
      if (reverseEffect) {
        ongoingEffect.value *= -1;
      }
      const target = generateTarget(reverseEffect);

      return {
        selector,
        ongoingEffect,
        target,
      };
    },
    upgrade: () => {
      // @TODO
      return null;
    },
    apply: (forge, card) => {
      const newCard = { ...card };
      if (!newCard.conditionalEffects) newCard.conditionalEffects = [];
      newCard.conditionalEffects.push({
        selector: cleanDefinitionObject(forge.selector),
        ongoingEffect: cleanDefinitionObject(forge.ongoingEffect),
        target: forge.target,
      });
      return newCard;
    },
    applyCost: (baseCost, forge, card) => {
      const newCard = { ...card };
      const foundOngoingEffect = ongoingEffects[forge.ongoingEffect.key];
      let passiveEffectCostModificator = ({ cost }) => cost;
      if (foundOngoingEffect.key === 'givePassiveEffect') {
        const foundPassiveEffect = passiveEffects[forge.ongoingEffect.effect.passiveEffect.ongoingPassiveEffectKey];
        passiveEffectCostModificator = foundPassiveEffect.costModificator;
      }
      const extraPrice = foundOngoingEffect.price ? foundOngoingEffect.price({ ...forge.ongoingEffect.effect, passiveEffectCostModificator }) : 0;
      const foundSelector = cardSelectors[forge.selector.key];
      let extraPriceModded = parseInt(
        foundSelector.costModificator
          ? foundSelector.costModificator({ ...forge.selector.selector, cost: extraPrice }) : extraPrice,
        10,
      );
      if (forge.target === 'any') {
        extraPriceModded *= 0.1;
      }
      else if (forge.target === 'enemy') {
        extraPriceModded *= -1;
      }
      if (extraPriceModded < 0) {
        extraPriceModded *= 0.5;
      }
      newCard.cost = baseCost + extraPriceModded;
      return newCard;
    },
    isCommanderForbidden: () => false,
  }
];

function getCost(card) {
  let baseCost = getCardBaseCost(card);
  let newCard = { ...card };
  newCard.cost = baseCost;
  const forges = card.forges || [];
  forges.forEach((forge, forgeIndex) => {
    const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
    if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
    newCard = forgeGenerator.applyCost(baseCost, forge, card, forgeIndex);
    baseCost += newCard.cost;
  });
  return newCard.cost;
}

function canBeCommander(card) {
  const forges = card.forges || [];
  const isCommanderForbidden = forges.some((forge) => {
    const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
    if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
    return forgeGenerator.isCommanderForbidden(forge);
  });
  const interestingForgeTypes = [
    'addEffectOnTrigger',
    'addEffectOnAction',
    'addConditionalEffect',
  ]
  const hasForgesOfInterestingCommanderTypes = forges.some((forge) => interestingForgeTypes.includes(forge.type));
  const baseCost = getCardBaseCost(card);
  const cardCost = getCost(card);
  const allowed = !isCommanderForbidden && (cardCost - baseCost) <= constants.COMMANDER_DEFAULT_VALUE;
  // @TODO Should check each forge value to see if it's recommended
  const recommended = allowed && hasForgesOfInterestingCommanderTypes && (cardCost - baseCost) >= constants.RECOMMENDED_COMMANDER_LOWER_THRESHOLD;
  return {
    allowed,
    recommended,
  };
}

function generateForge(level) {
  const forgeGenerator = weightedSample(forgeGenerators);
  return {
    type: forgeGenerator.type,
    ...forgeGenerator.generate(level),
  };
}

function applyForge(forge, card) {
  const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
  if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
  if (!card) throw new Error('Card is required');
  const newCard = forgeGenerator.apply(forge, card);
  if (!newCard.rarityLevel) newCard.rarityLevel = 0;
  newCard.rarityLevel += 1;
  return newCard;
}

function applyCardCalculatedFields(card) {
  let baseCost = getCardBaseCost(card);
  const forges = card.forges || [];
  let newCard = { ...card };
  // @TODO This is an arbitrary order to apply costs. It may change
  forges.forEach((forge, forgeIndex) => {
    const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
    if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
    newCard = forgeGenerator.applyCost(baseCost, forge, card, forgeIndex);
    baseCost += newCard.cost;
  });
  const { allowed, recommended } = canBeCommander(card);
  newCard.canBeCommander = allowed;
  newCard.recommendedAsCommander = recommended;
  delete newCard.forges;
  return newCard;
}

module.exports = {
  forgeLevelFilter,
  generateTrigger,
  cleanDefinitionObject,
  generateEffect,
  generateForge,
  applyForge,
  getCost,
  canBeCommander,
  applyCardCalculatedFields,

  forgeGenerators,
};
