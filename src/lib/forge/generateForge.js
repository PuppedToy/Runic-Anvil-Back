const weightedSample = require('../../utils/weightedSample');
const deepMerge = require('../../utils/deepMerge');
const { randomInt, exponential } = require('../../utils/random');
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

function generateRegionalObjectWithWeightsBasedOnProperty(card, collectionObject, property) {
  const collectionWithWeights = Object.values(collectionObject);
  const cardRegion = regions.find(region.key === card.region);
  if (cardRegion === null) {
    throw new Error(`Region ${card.region} not found`);
  }
  collectionWithWeights.forEach(currentValue => {
    const regionalProperty = cardRegion[property].find(item => item.key === currentValue.key);
    if (regionalProperty) {
      currentValue.weight = regionalProperty.chance;
    }
    else {
      currentValue.weight = 0;
    }
  });

  return collectionWithWeights.filter(currentValue => currentValue.weight);
}

function generateUnitTypesWithWeights(card) {
  return generateRegionalObjectWithWeightsBasedOnProperty(card, 'unitTypes', unitTypes);
}

function generateElementsWithWeights(card) {
  return generateRegionalObjectWithWeightsBasedOnProperty(card, 'elements', elements.basic);
}

function generateObjectWeightsBasedOnElementAndUnitType(card, collection) {
  const valuesWithWeights = Object.values(collection);
  valuesWithWeights.forEach(currentValue => {
    let elementWeight = 0;
    let unitTypeWeight = 0;
    const hasElement = Boolean(card.element);
    const hasUnitType = (card.unitTypes || []).length > 0;
    let total = 0;
    let anyChance = 1;
    if (hasElement) {
      const cardElement = elements[card.element];
      elementWeight = 0;
      (currentValue.elements || []).forEach(currentElement => {
        if (
          cardElement.key === currentElement.key
          || (cardElement.elements || []).includes(currentElement.key)
        ) {
          total++;
          elementWeight += currentElement.chance;
        }
        if (currentElement.key === 'any') {
          anyChance = currentElement.chance;
        }
      });
      if (total === 0) {
        elementWeight = anyChance;
      }
      else {
        elementWeight /= total;
      }
    }
    total = 0;
    anyChance = 1;
    if (hasUnitType) {
      (currentValue.unitTypes || []).forEach(currentUnitType => {
        if (card.unitTypes.includes(currentUnitType.key)) {
          total++;
          unitTypeWeight += currentUnitType.chance;
        }
        if (currentUnitType.key === 'any') {
          anyChance = currentUnitType.chance;
        }
      });
      if (total === 0) {
        unitTypeWeight = anyChance;
      }
      else {
        unitTypeWeight /= total;
      }
    }
    let weight = 0;
    total = 0;
    if (!hasElement && !hasUnitType) {
      weight = 1;
    }
    else {
      if (hasElement) {
        total++;
        weight += elementWeight;
      }
      if (hasUnitType) {
        total++;
        weight += unitTypeWeight;
      }
      weight /= total;
    }
    currentValue.weight = weight;
  });
  return valuesWithWeights.filter(currentValue => currentValue.weight);
}

// Trigger
function generateTrigger(card) {
  // @TODO We've used basic triggers like: Destroyed
  // But what about "Destroyed on barracks", "Destroyed by an Insect", "Destroyed by Siege Unit",
  // "Destroyed by a spell" or "Destroyed by an ally". We can enum all possible triggers for
  // each keyword
  return weightedSample(triggers, [forgeLevelFilter(card.level)]);
}

function generateAction(card) {
  return weightedSample(actions, [forgeLevelFilter(card.level)]);
}

function cleanDefinitionObject(definitionObject, customUnwantedProperties = []) {
  const unwantedProperties = ['weight', ...customUnwantedProperties];
  const result = { ...definitionObject };
  unwantedProperties.forEach((property) => {
    delete result[property];
  });
  return result;
}

const processOperations = {
  custom: ({ method }, previousCard, forge) => method(previousCard, forge),
  range: (rangeDefinition) => {
    if (!Object.hasOwnProperty.call(rangeDefinition, 'min') || !Object.hasOwnProperty.call(rangeDefinition, 'max')) {
      throw new Error('Range must have min and max');
    }

    return randomInt(rangeDefinition.min, rangeDefinition.max, rangeDefinition.step);
  },
  sample: (list) => weightedSample(list),
  richSample: ({ list, map, filters }) => {
    const result = weightedSample(list, filters);
    if (map) {
      return map(result);
    }
    return result;
  },
  exponential: (exponentialDefinition) => {
    if (!Object.hasOwnProperty.call(exponentialDefinition, 'min')) {
      throw new Error('Range must have min and max');
    }
    const { min } = exponentialDefinition;
    const max = Math.abs(exponentialDefinition.max) || 99999; // This is for safety purposes against infinite loops
    const step = exponentialDefinition.step || 1;
    const probability = exponentialDefinition.probability || 0.5;

    return exponential(min, max, step, probability);
  },
};

function processForge(forge, card, upgradingForge) {
  if (!Array.isArray(forge) && typeof forge === 'object') {
    let resultForge = { ...forge };
    Object.entries(resultForge).forEach(([key, value]) => {
      const keyWithoutDollar = key.replace('$', '');
      if (Object.hasOwnProperty.call(processOperations, keyWithoutDollar)) {
        resultForge[key] = processOperations[keyWithoutDollar](value, card, upgradingForge);
      }
      resultForge[key] = processForge(resultForge[key], card, upgradingForge);
    });
    const keys = Object.keys(resultForge);
    if (keys.length === 1 && keys[0][0] === '$') {
      return resultForge[keys[0]];
    }
    return resultForge;
  }
  return forge;
}

function generateEffect(card) {
  const effectsWithWeights = generateObjectWeightsBasedOnElementAndUnitType(card, effects);
  const effect = weightedSample(Object.values(effectsWithWeights), [forgeLevelFilter(card.level)]);
  const cleanEffect = cleanDefinitionObject(effect, ['mods', 'elements', 'unitTypes']);
  const processedForge = processForge(cleanEffect, card);

  const forge = {
    ...processedForge,
  };

  return forge;
}

function generateOngoingEffect(card) {
  const ongoingEffect = weightedSample(Object.values(ongoingEffects), [forgeLevelFilter(card.level)]);
  const { mods, ...defaultForge } = ongoingEffect;
  const processedForge = processForge(defaultForge, card);

  const forge = {
    ...processedForge,
  };

  return forge;
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

function getOngoingEffectAvailableMods(forge, card) {
  const foundOngoingEffect = ongoingEffects[forge.ongoingEffect.key];
  const forgeMods = forge.mods || [];
  const ongoingEffectMods = foundOngoingEffect.mods || [];
  const forgeLevel = card.level;
  // First we add any mod that is level 1, is from the correct forgeLevel and is not already in the forge
  const availableMods = ongoingEffectMods.filter(
    (mod) => (!mod.modLevel || mod.modLevel === 1)
      && ((mod.forgeLevel || 0) <= forgeLevel)
      && forgeMods.every((forgeMod) => forgeMod.key !== mod.key),
  );
  forgeMods.forEach((mod) => {
    const modLevel = mod.modLevel ? mod.modLevel + 1 : null;
    const modKey = mod.key;
    // Now we add any mod with current mod key and exactly current mod level, never forgetting the forge level restriction
    ongoingEffectMods.forEach((effectMod) => {
      if (effectMod.key === modKey && effectMod.modLevel === modLevel && (effectMod.forgeLevel || 0) <= forgeLevel) {
        availableMods.push(effectMod);
      }
    });
  });
  return availableMods;
}

function mergeMod(forge, mod) {
  const modCopy = { ...mod };
  delete modCopy.modLevel;
  delete modCopy.id;
  const { cardSelector, kingdomSelector } = modCopy;
  delete modCopy.cardSelector;
  delete modCopy.kingdomSelector;
  const mergedForge = deepMerge(forge, modCopy);
  if (cardSelector) {
    mergedForge.cardSelectors = {
      [cardSelector]: null,
      ...mergedForge.cardSelectors,
    };
  }
  if (kingdomSelector) {
    mergedForge.kingdomSelectors = {
      [kingdomSelector]: null,
      ...mergedForge.kingdomSelectors,
    };
  }
  return mergedForge;
}

const forgeGenerators = [
  {
    type: 'addStat',
    weight: 1,
    generate (card) {
      const min = 2 + Math.round(card.level * 1.55);
      const max = 4 + Math.round(card.level * 2);
      const statAmount = randomInt(min, max);
      const attack = randomInt(0, statAmount);
      const hp = statAmount - attack;
      return {
        attack,
        hp,
      };
    },
    upgrade () {
      null;
    },
    apply (forge, card) {
      const newCard = { ...card };
      newCard.attack += forge.attack;
      newCard.hp += forge.hp;
      return newCard;
    },
    applyCost (baseCost, forge, card) {
      const newCard = { ...card };
      return newCard;
    },
    isCommanderForbidden () {
      false;
    },
  },
  {
    type: 'addUnitType',
    weight: 1,
    generate (card) {
      const isBaseHuman = card.unitTypes.length === 1 && card.unitTypes[0] !== 'human';
      if (
        card.unitTypes.length >= 3
        || (card.unitTypes.length === 2 && Math.random() < 0.2)
        || (card.unitTypes.length === 1 && !isBaseHuman && Math.random() < 0.5)
      ) {
        return null;
      }
      const removeHumanity = isBaseHuman && Math.random() < 0.9;
      const unitTypesWithWeights = generateUnitTypesWithWeights(card);
      const sample = weightedSample(unitTypesWithWeights, [forgeLevelFilter(card.level)]);
      if (sample === null || card.unitTypes.includes(sample.key)) {
        return null;
      }
      return {
        ...sample,
        removeHumanity,
      };
    },
    upgrade () {
      return null;
    },
    apply (forge, card) {
      const newCard = { ...card };
      const newUnitTypes = [...card.unitTypes, forge.key];
      if (forge.removeHumanity) {
        newUnitTypes.splice(newUnitTypes.indexOf('human'), 1);
      }
      return newCard;
    },
    applyCost (baseCost, _, card) {
      const newCard = { ...card };
      newCard.cost = baseCost;
      return newCard;
    },
    isCommanderForbidden () {
      return false;
    },
  },
  {
    type: 'addElement',
    weight: 1,
    generate (card) {
      if (card.element) {
        return null;
      }
      const elementsWithWeights = generateElementsWithWeights(card);
      const sample = weightedSample(elementsWithWeights, [forgeLevelFilter(card.level)]);
      if (sample === null) {
        console.log(`No element found for card ${JSON.stringify(card, null, 2)}`);
        return null;
      }
      const cleanSample = cleanDefinitionObject(sample);
      return {
        ...cleanSample,
      };
    },
    upgrade (forge, card) {
      console.log(`Upgrading element ${card.element}`);
      if (elements.complex[card.element]) {
        console.log(`Element ${card.element} is complex`);
        return null;
      }
      if (!card.element) {
        throw new Error(`Card ${card.name} doesn't have an element`);
      }
      const basicElementWithWeights = generateObjectWeightsBasedOnElementAndUnitType(card, elements.basic);
      const otherBasicElements = basicElementWithWeights.filter((currentBasicElement) => currentBasicElement.key !== card.element);
      const newBasicElement = weightedSample(otherBasicElements, [forgeLevelFilter(card.level)]);
      console.log(`Mixing with ${newBasicElement.key}`);
      const complexElement = Object.values(elements.complex).find(
        (currentComplexElement) => currentComplexElement.elements.includes(card.element) && currentComplexElement.elements.includes(newBasicElement.key),
      );
      console.log(`Result element: ${complexElement.key}`);
      if (complexElement === null) {
        throw new Error(`Element ${card.element} doesn't have a complex element with ${newBasicElement.key}`);
      }
      const newForge = {
        ...forge,
        ...complexElement,
      };
      console.log(`Result forge: ${JSON.stringify(newForge, null, 2)}`);
      return {
        forge: newForge,
        mod: complexElement,
      };
    },
    apply (forge, card) {
      const newCard = { ...card };
      newCard.element = forge.key;
      return newCard;
    },
    applyCost (baseCost, _, card) {
      const newCard = { ...card };
      const foundPassiveEffect = passiveEffects[forge.key];
      newCard.cost = baseCost;
      newCard.cost = foundPassiveEffect.costModificator ? foundPassiveEffect.costModificator(newCard) : newCard.cost;
      return newCard;
    },
    isCommanderForbidden () {
      return false; 
    },
  },
  {
    type: 'addPassiveEffect',
    weight: 1,
    generate (card) {
      const passiveEffectsWithWeights = generateObjectWeightsBasedOnElementAndUnitType(card, passiveEffects);
      if (!passiveEffectsWithWeights.length) {
        return null;
      }
      const sample = weightedSample(passiveEffectsWithWeights, [forgeLevelFilter(card.level)]);
      if (card.passiveEffects && card.passiveEffects.includes(sample.key)) {
        return null;
      }
      const cleanSample = cleanDefinitionObject(sample, ['elements', 'unitTypes']);
      return {
        ...cleanSample,
      };
    },
    upgrade (forge, card) {
      const passiveEffectsWithWeights = generateObjectWeightsBasedOnElementAndUnitType(card, passiveEffects);
      const upgradedPassiveEffects = Object.values(passiveEffectsWithWeights).filter(
        (passiveEffect) => passiveEffect.forgeLevel <= card.level && card.passiveEffects.includes(passiveEffect.requirement),
      );
      if (!upgradedPassiveEffects.length) {
        return null;
      }
      const chosenMod = weightedSample(upgradedPassiveEffects);
      if (Math.random() < chosenMod.weight) {
        return null;
      }
      const cleanMod = cleanDefinitionObject(chosenMod, ['elements', 'unitTypes']);
      return {
        forge: {
          ...forge,
          ...cleanMod,
        },
        mod: cleanMod,
      };
    },
    apply (forge, card) {
      const newCard = { ...card };
      newCard.passiveEffects = newCard.passiveEffects || [];
      newCard.passiveEffects.push(forge.key);
      return newCard;
    },
    applyMod (mod, forge, card) {
      const newCard = { ...card };
      if (mod.requirement) {
        newCard.passiveEffects = newCard.passiveEffects.filter((passiveEffect) => passiveEffect !== mod.requirement);
      }
      return this.apply(forge, newCard);
    },
    applyCost (baseCost, forge, card) {
      const newCard = { ...card };
      const foundPassiveEffect = passiveEffects[forge.key];
      newCard.cost = baseCost;
      newCard.cost = foundPassiveEffect.costModificator ? foundPassiveEffect.costModificator(newCard) : newCard.cost;
      return newCard;
    },
    isCommanderForbidden () {
      return false;
    },
  },
  {
    type: 'addEffectOnTrigger',
    weight: 1,
    generate (card) {
      const trigger = generateTrigger(card);
      const effect = generateEffect(card);
      if (card.triggers && card.triggers.some(
        ({ trigger: currentTrigger, effect: currentEffect }) => 
          currentTrigger.key === trigger.key
          && currentEffect.key === effect.key
      )) {
        return null;
      }

      return {
        trigger,
        effect,
      };
    },
    upgrade (forge, card) {
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
      // @TODO for now we assume an effect mod. But in future, there will be others
      const processedEffectMod = processForge(chosenMod, card, forge);
      const newForge = {
        ...forge,
        effect: mergeMod(forge.effect, processedEffectMod),
      };
      return {
        forge: newForge,
        mod: processedEffectMod,
      };
    },
    apply (forge, card) {
      const newCard = { ...card };
      if (!newCard.triggers) newCard.triggers = [];
      newCard.triggers.push({
        trigger: cleanDefinitionObject(forge.trigger),
        effect: cleanDefinitionObject(forge.effect),
      });
      return newCard;
    },
    applyMod (mod, forge, card) {
      const newCard = { ...card };
      const foundTriggerIndex = newCard.triggers.findIndex(
        ({ trigger, effect }) => 
          trigger.key === forge.trigger.key
          && effect.key === forge.effect.key,
      );
      if (foundTriggerIndex === -1) {
        throw new Error(`Trigger ${forge.trigger.key} not found`);
      }
      newCard.triggers.splice(foundTriggerIndex, 1);
      return this.apply(forge, newCard);
    },
    applyCost (baseCost, forge, card) {
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
    isCommanderForbidden (forge) {
      const foundTrigger = triggers[forge.trigger.key];
      return foundTrigger.isCommanderForbidden ? foundTrigger.isCommanderForbidden() : false;
    },
  },
  {
    type: 'addEffectOnAction',
    weight: 1,
    generate (card) {
      const action = generateAction(card);
      const effect = generateEffect(card);
      if (card.actions && card.actions.some(
        ({ action: currentAction, effect: currentEffect }) => 
        currentAction.key === action.key
          && currentEffect.key === effect.key
      )) {
        return null;
      }

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
      // @TODO for now we assume an effect mod. But in future, there will be others
      const processedEffectMod = processForge(chosenMod, card, forge);
      const newForge = {
        ...forge,
        effect: mergeMod(forge.effect, processedEffectMod),
      };
      return {
        forge: newForge,
        mod: processedEffectMod,
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
    applyMod (mod, forge, card) {
      const newCard = { ...card };
      const foundActionIndex = newCard.actions.findIndex(
        ({ action, effect }) =>
          action.key === forge.action.key
          && effect.key === forge.effect.key,
      );
      if (foundActionIndex === -1) {
        throw new Error(`Action ${forge.action.key} not found`);
      }
      newCard.actions.splice(foundActionIndex, 1);
      return this.apply(forge, newCard);
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
    type: 'addOngoingEffect',
    weight: 1,
    generate (card) {
      const sample = generateOngoingEffect(card);
      if (card.ongoingEffects && card.ongoingEffects.some(
        ({ key }) => key === sample.key,
      )) {
        return null;
      }

      return {
        ongoingEffect: {
          ...sample,
        },
      };
    },
    upgrade (forge, card) {
      if (card.level <= 0) {
        throw new Error(`Card ${card.name} doesn't have a level`);
      }
      const availableMods = [
        ...getOngoingEffectAvailableMods(forge, card),
      ];

      if (!availableMods.length) {
        return null;
      }

      const chosenMod = weightedSample(availableMods);
      const processedEffectMod = processForge(chosenMod, card, forge);
      const newForge = {
        ...forge,
        ongoingEffect: mergeMod(forge.ongoingEffect, processedEffectMod),
      };
      return {
        forge: newForge,
        mod: processedEffectMod,
      };
    },
    apply (forge, card) {
      const newCard = { ...card };
      if (!newCard.ongoingEffects) newCard.ongoingEffects = [];
      newCard.ongoingEffects.push({
        ...cleanDefinitionObject(forge.ongoingEffect),
      });
      return newCard;
    },
    applyMod (mod, forge, card) {
      const newCard = { ...card };
      const foundOngoingEffect = newCard.ongoingEffects.findIndex(
        ({ key }) => key === forge.ongoingEffect.key,
      );
      if (foundOngoingEffect === -1) {
        throw new Error(`Trigger ${forge.ongoingEffect.key} not found`);
      }
      newCard.ongoingEffects.splice(foundOngoingEffect, 1);
      return this.apply(forge, newCard);
    },
    applyCost (baseCost, forge, card) {
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
    isCommanderForbidden () {
      return false;
    },
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
    'addOngoingEffects',
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

function generateForge(card) {
  const MAX_ITERATIONS = 10000;
  let forgeGenerator;
  let forge = null;
  for(let i = 0; !forge && i < MAX_ITERATIONS; i++) {
    forgeGenerator = weightedSample(forgeGenerators);
    forge = forgeGenerator.generate(card);
  }
  return {
    type: forgeGenerator.type,
    ...forge,
  };
}

function applyForge(forge, card) {
  const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
  if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
  if (!card) throw new Error('Card is required');
  const newCard = forgeGenerator.apply(forge, card);
  if (!newCard.forges) {
    newCard.forges = [];
  }
  newCard.forges.push(forge);
  return newCard;
}

function applyMod(mod, forgeIndex, forge, card) {
  const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
  if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
  let newCard;
  if (!forge.mods) {
    forge.mods = [];
  }
  forge.mods.push(mod);
  if (forgeGenerator.applyMod) {
    newCard = forgeGenerator.applyMod(mod, forge, card);
  } else {
    newCard = forgeGenerator.apply(forge, card);
  }
  newCard.forges[forgeIndex] = forge;
  return newCard;
}

function upgradeRandomForge(card) {
  const remainingForges = [...card.forges];
  console.log(`Remaining forges: ${JSON.stringify(remainingForges, null, 2)}`);
  while (remainingForges.length) {
    const chosenForgeIndex = randomInt(0, remainingForges.length - 1);
    const chosenForge = remainingForges[chosenForgeIndex];
    console.log(`Evaluating forge [${chosenForgeIndex}] ${JSON.stringify(chosenForge, null, 2)}`);
    remainingForges.splice(chosenForgeIndex, 1);
    const forgeGenerator = forgeGenerators.find((generator) => generator.type === chosenForge.type);
    if (!forgeGenerator) throw new Error(`Forge generator not found for type ${chosenForge.type}`);
    const upgradeResult = forgeGenerator.upgrade(chosenForge, card);
    if (!upgradeResult) {
      continue;
    }
    const { mod, forge: upgradedForge } = upgradeResult;
    console.log(`Found mod ${JSON.stringify(mod, null, 2)}`);
    const forgeIndex = card.forges.findIndex((forge) => forge === chosenForge);
    const newCard = applyMod(mod, forgeIndex, upgradedForge, card);
    return newCard;
  }
  return null;
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
  upgradeRandomForge,
  getCost,
  canBeCommander,
  applyCardCalculatedFields,

  forgeGenerators,
};
