const weightedSample = require('../../utils/weightedSample');
const deepMerge = require('../../utils/deepMerge');
const { randomInt, exponential } = require('../../utils/random');
const {
  unitTypes,
  ongoingEffects,
  passiveEffects,
  triggers,
  effects,
  actions,
  elements,
  regions,
} = require('../../data/forges');
const { constants } = require('../../data/enums');

// Filters
const forgeLevelFilter = (maxLevel, minLevel = 0) => (
  { forgeLevel = 0 },
) => maxLevel >= forgeLevel && minLevel <= forgeLevel;

/* eslint-disable no-param-reassign */
function generateRegionalObjectWithWeightsBasedOnProperty(region, collectionObject, property) {
  const collectionWithWeights = Object.values(collectionObject);
  const anyRegionalProperty = region[property].find((item) => item.key === 'any' || item === 'any');
  collectionWithWeights.forEach((currentValue) => {
    let regionalProperty = region[property].find((item) => item === currentValue.key
      || item.key === currentValue.key);
    if (!regionalProperty && currentValue.parent) {
      regionalProperty = region[property].find((item) => item === currentValue.parent
        || item.key === currentValue.parent);
    }
    if (regionalProperty) {
      currentValue.weight = regionalProperty.chance || 1;
    } else if (anyRegionalProperty) {
      currentValue.weight = anyRegionalProperty.chance || 1;
    } else {
      currentValue.weight = 0;
    }
  });

  return collectionWithWeights.filter((currentValue) => currentValue.weight);
}

function generateUnitTypesWithWeights(region, optionalCollection) {
  return generateRegionalObjectWithWeightsBasedOnProperty(region, optionalCollection || unitTypes, 'unitTypes');
}

function generateElementsWithWeights(region) {
  return generateRegionalObjectWithWeightsBasedOnProperty(region, elements.basic, 'elements');
}

function generateObjectWeightsBasedOnElementAndUnitType(card, collection) {
  const valuesWithWeights = Object.values(collection);
  valuesWithWeights.forEach((currentValue) => {
    let elementWeight = 0;
    let unitTypeWeight = 0;
    const hasElement = Boolean(card.element);
    const hasUnitType = (card.unitTypes || []).length > 0;
    let total = 0;
    let anyChance = 1;
    if (hasElement) {
      const cardElement = elements.complex[card.element] || elements.basic[card.element];
      elementWeight = 0;
      (currentValue.elements || []).forEach((currentElement) => {
        if (
          cardElement.key === currentElement.key
          || (cardElement.elements || []).includes(currentElement.key)
        ) {
          total += 1;
          elementWeight += currentElement.chance;
        }
        if (currentElement.key === 'any') {
          anyChance = currentElement.chance;
        }
      });
      if (total === 0) {
        elementWeight = anyChance;
      } else {
        elementWeight /= total;
      }
    }
    total = 0;
    anyChance = 1;
    if (hasUnitType) {
      (currentValue.unitTypes || []).forEach((currentUnitType) => {
        if (card.unitTypes.includes(currentUnitType.key)) {
          total += 1;
          unitTypeWeight += currentUnitType.chance;
        }
        if (currentUnitType.key === 'any') {
          anyChance = currentUnitType.chance;
        }
      });
      if (total === 0) {
        unitTypeWeight = anyChance;
      } else {
        unitTypeWeight /= total;
      }
    }
    let weight = 0;
    total = 0;
    if (!hasElement && !hasUnitType) {
      weight = 1;
    } else {
      if (hasElement) {
        total += 1;
        weight += elementWeight;
      }
      if (hasUnitType) {
        total += 1;
        weight += unitTypeWeight;
      }
      weight /= total;
    }
    currentValue.weight = weight;
  });
  const result = valuesWithWeights.filter((currentValue) => currentValue.weight);
  return result;
}
/* eslint-enable no-param-reassign */

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
  if (!definitionObject) return null;
  const unwantedProperties = ['weight', 'adjectives', 'main', ...customUnwantedProperties];
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
    if (map && result) {
      return map(result);
    }
    return result;
  },
  exponential: (exponentialDefinition) => {
    if (!Object.hasOwnProperty.call(exponentialDefinition, 'min')) {
      throw new Error('Range must have min and max');
    }
    const { min } = exponentialDefinition;
    const max = Math.abs(exponentialDefinition.max) || 99999;
    const step = exponentialDefinition.step || 1;
    const probability = exponentialDefinition.probability || 0.5;

    return exponential(min, max, step, probability);
  },
};

function processForge(forge, card, upgradingForge) {
  if (!Array.isArray(forge) && typeof forge === 'object') {
    const resultForge = { ...forge };
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
  const ongoingEffect = weightedSample(
    Object.values(ongoingEffects),
    [forgeLevelFilter(card.level)],
  );
  const { mods, ...defaultForge } = ongoingEffect;
  const processedForge = processForge(defaultForge, card);

  const forge = {
    ...processedForge,
  };

  return forge;
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
  // First we add any mod that is level 1,
  // is from the correct forgeLevel and is not already in the forge
  const availableMods = effectMods.filter(
    (mod) => (!mod.modLevel || mod.modLevel === 1)
      && ((mod.forgeLevel || 0) <= forgeLevel)
      && forgeMods.every((forgeMod) => forgeMod.key !== mod.key),
  );
  forgeMods.forEach((mod) => {
    const modLevel = mod.modLevel ? mod.modLevel + 1 : null;
    const modKey = mod.key;
    // Now we add any mod with current mod key and exactly
    // current mod level, never forgetting the forge level restriction
    effectMods.forEach((effectMod) => {
      if (
        effectMod.key === modKey
        && effectMod.modLevel === modLevel
        && (effectMod.forgeLevel || 0) <= forgeLevel
      ) {
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
  const availableMods = ongoingEffectMods.filter(
    (mod) => (!mod.modLevel || mod.modLevel === 1)
      && ((mod.forgeLevel || 0) <= forgeLevel)
      && forgeMods.every((forgeMod) => forgeMod.key !== mod.key),
  );
  forgeMods.forEach((mod) => {
    const modLevel = mod.modLevel ? mod.modLevel + 1 : null;
    const modKey = mod.key;
    ongoingEffectMods.forEach((effectMod) => {
      if (
        effectMod.key === modKey
        && effectMod.modLevel === modLevel
        && (effectMod.forgeLevel || 0) <= forgeLevel
      ) {
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
    weight: 3,
    complexity: 0,
    getNextStatsAmount(card) {
      const statsTotal = card.attack + card.hp;
      for (let index = 0; index < constants.STAT_THRESHOLDS.length; index += 1) {
        const threshold = constants.STAT_THRESHOLDS[index];
        if (statsTotal < threshold + 1 && index < constants.STAT_THRESHOLDS.length - 1) {
          return randomInt(
            constants.STAT_THRESHOLDS[index] + 1,
            constants.STAT_THRESHOLDS[index + 1],
          ) - statsTotal;
        }
      }
      return exponential(
        constants.STAT_THRESHOLDS[constants.STAT_THRESHOLDS.length - 1] + 1,
        9999,
        1,
        0.7,
      ) - statsTotal;
    },
    generateStats(card) {
      const statAmount = this.getNextStatsAmount(card);
      const attack = randomInt(0, statAmount);
      const hp = statAmount - attack;
      return {
        attack,
        hp,
      };
    },
    generate(card) {
      if (card.attack + card.hp >= constants.STAT_THRESHOLDS[0]) {
        return null;
      }
      return this.generateStats(card);
    },
    upgrade(forge, card) {
      if (
        card.attack + card.hp >= constants.STAT_THRESHOLDS[constants.STAT_THRESHOLDS.length - 1]
      ) {
        return null;
      }
      const mod = this.generateStats(card);
      return {
        forge: {
          ...forge,
          ...mod,
        },
        mod,
      };
    },
    apply(forge, card) {
      const newCard = { ...card };
      newCard.attack += forge.attack;
      newCard.hp += forge.hp;
      return newCard;
    },
    applyCost(baseCost, forge, card) {
      const newCard = { ...card };
      newCard.cost = baseCost;
      return newCard;
    },
    isCommanderForbidden() {
      return false;
    },
  },
  {
    type: 'addRegion',
    weight: 0,
    complexity: 0,
    generate(card) {
      if (card.region) {
        return null;
      }
      const region = weightedSample(regions);
      const elementsWithWeights = generateElementsWithWeights(region);
      const unitTypesWithWeights = generateUnitTypesWithWeights(region);
      let elementSample = null;
      if (Math.random() < 0.9) {
        elementSample = weightedSample(elementsWithWeights, [forgeLevelFilter(card.level)]);
      }
      const unitTypeSample = weightedSample(unitTypesWithWeights, [forgeLevelFilter(card.level)]);
      return {
        region: region.key,
        element: elementSample?.key,
        unitTypes: unitTypeSample?.key ? [unitTypeSample.key] : ['human'],
      };
    },
    addExtraUnitType(forge, card) {
      const region = regions[card.region];
      const unitTypesWithWeights = generateUnitTypesWithWeights(region);
      if (unitTypesWithWeights.length === 0) {
        return null;
      }
      let minLevel = 0;
      let maxLevel = 9999;
      card.unitTypes.forEach((currentUnitType) => {
        const foundUnitType = unitTypesWithWeights.find(
          (currentUnitTypeWithWeight) => currentUnitTypeWithWeight.key === currentUnitType,
        );
        if (!foundUnitType) {
          return;
        }
        minLevel = Math.max(minLevel, foundUnitType.forgeLevel);
        maxLevel = Math.min(maxLevel, foundUnitType.forgeLevel);
      });
      maxLevel = Math.min(card.level, maxLevel + 1);
      minLevel -= 1;
      const repeatedUntiTypesFilter = (currentUnitType) => !card.unitTypes.includes(
        currentUnitType.key,
      );
      const sample = weightedSample(
        unitTypesWithWeights,
        [forgeLevelFilter(maxLevel, minLevel), repeatedUntiTypesFilter],
      );
      if (sample === null) {
        return null;
      }
      const newForge = {
        ...forge,
        unitTypes: [...card.unitTypes, sample.key],
      };
      return {
        forge: newForge,
        mod: cleanDefinitionObject(sample),
      };
    },
    upgradeUnitType(forge, card) {
      const region = regions[card.region];
      const evolutions = [];
      card.unitTypes.forEach((currentUnitType) => {
        const foundUnitType = unitTypes[currentUnitType];
        if (foundUnitType.evolutions) {
          foundUnitType.evolutions.forEach((currentEvolution) => {
            if (typeof currentEvolution === 'string') {
              evolutions.push({
                key: currentEvolution,
                parent: currentUnitType,
              });
            } else {
              evolutions.push({
                ...currentEvolution,
                parent: currentUnitType,
              });
            }
          });
        }
      });
      if (evolutions.length === 0) {
        return null;
      }
      const unitTypesWithWeights = generateUnitTypesWithWeights(region, evolutions);
      const sample = weightedSample(unitTypesWithWeights, [forgeLevelFilter(card.level)]);
      if (sample === null) {
        return null;
      }
      const newForge = {
        ...forge,
        unitTypes: [...card.unitTypes, sample.key],
      };
      return {
        forge: newForge,
        mod: cleanDefinitionObject(sample),
      };
    },
    upgradeElement(forge, card) {
      if (elements.complex[card.element]) {
        return null;
      }
      if (!card.element) {
        throw new Error(`Card ${card.name} doesn't have an element`);
      }
      const region = regions[card.region];
      const basicElementWithWeights = generateElementsWithWeights(region);
      const otherBasicElements = basicElementWithWeights
        .filter((currentBasicElement) => currentBasicElement.key !== card.element);
      const newBasicElement = weightedSample(otherBasicElements, [forgeLevelFilter(card.level)]);
      const complexElement = Object.values(elements.complex).find(
        (currentComplexElement) => currentComplexElement.elements.includes(card.element)
          && currentComplexElement.elements.includes(newBasicElement.key),
      );
      if (complexElement === null) {
        throw new Error(`Element ${card.element} doesn't have a complex element with ${newBasicElement.key}`);
      }
      const newForge = {
        ...forge,
        element: complexElement.key,
      };

      return {
        forge: newForge,
        mod: complexElement,
      };
    },
    upgrade(forge, card) {
      const canUpgradeElement = card.element && !elements.complex[card.element];
      if (
        (card.unitTypes.length === 1 && Math.random() < 0.5)
        || (card.unitTypes.length === 2 && (!canUpgradeElement || Math.random() < 0.1))
      ) {
        if (card.unitTypes.length === 1 && Math.random() < 0.75) {
          const result = this.upgradeUnitType(forge, card);
          if (result) {
            return result;
          }
        }
        return this.addExtraUnitType(forge, card);
      }
      if (canUpgradeElement) {
        return this.upgradeElement(forge, card);
      }
      return null;
    },
    apply(forge, card) {
      const newCard = { ...card };
      if (forge.region) {
        newCard.region = forge.region;
      }
      if (forge.unitTypes) {
        newCard.unitTypes = forge.unitTypes;
      }
      if (forge.element) {
        newCard.element = forge.element;
      }
      return newCard;
    },
    applyCost(baseCost, _, card) {
      const newCard = { ...card };
      newCard.cost = baseCost;
      return newCard;
    },
    isCommanderForbidden() {
      return false;
    },
  },
  {
    type: 'addPassiveEffect',
    weight: 1,
    complexity: 0,
    generate(card) {
      const passiveEffectsWithWeights = generateObjectWeightsBasedOnElementAndUnitType(
        card,
        passiveEffects,
      );
      const passiveEffectsWithoutRequirements = passiveEffectsWithWeights.filter(
        (passiveEffect) => !passiveEffect.requirement,
      );
      if (!passiveEffectsWithWeights.length) {
        return null;
      }
      const sample = weightedSample(
        passiveEffectsWithoutRequirements,
        [forgeLevelFilter(card.level)],
      );
      if (card.passiveEffects && card.passiveEffects.includes(sample.key)) {
        return null;
      }
      const cleanSample = cleanDefinitionObject(sample, ['elements', 'unitTypes']);
      return {
        ...cleanSample,
      };
    },
    upgrade(forge, card) {
      const passiveEffectsWithWeights = generateObjectWeightsBasedOnElementAndUnitType(
        card,
        passiveEffects,
      );
      const upgradedPassiveEffects = Object.values(passiveEffectsWithWeights).filter(
        (passiveEffect) => passiveEffect.forgeLevel <= card.level
          && card.passiveEffects.includes(passiveEffect.requirement),
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
    apply(forge, card) {
      const newCard = { ...card };
      newCard.passiveEffects = newCard.passiveEffects || [];
      newCard.passiveEffects.push(forge.key);
      return newCard;
    },
    applyMod(mod, forge, card) {
      const newCard = { ...card };
      if (mod.requirement) {
        newCard.passiveEffects = newCard.passiveEffects.filter(
          (passiveEffect) => passiveEffect !== mod.requirement,
        );
      }
      return this.apply(forge, newCard);
    },
    applyCost(baseCost, forge, card) {
      const newCard = { ...card };
      const foundPassiveEffect = passiveEffects[forge.key];
      newCard.cost = baseCost;
      newCard.cost = foundPassiveEffect.costModificator
        ? foundPassiveEffect.costModificator(newCard) : newCard.cost;
      return newCard;
    },
    isCommanderForbidden() {
      return false;
    },
  },
  {
    type: 'addEffectOnTrigger',
    weight: 1,
    complexity: 1,
    generate(card) {
      const trigger = generateTrigger(card);
      const effect = generateEffect(card);
      if (card.triggers && card.triggers.some(
        ({ trigger: currentTrigger, effect: currentEffect }) => currentTrigger.key === trigger.key
          && currentEffect.key === effect.key,
      )) {
        return null;
      }

      return {
        trigger,
        effect,
      };
    },
    upgrade(forge, card) {
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
    apply(forge, card) {
      const newCard = { ...card };
      if (!newCard.triggers) newCard.triggers = [];
      newCard.triggers.push({
        trigger: cleanDefinitionObject(forge.trigger),
        effect: cleanDefinitionObject(forge.effect),
      });
      return newCard;
    },
    applyMod(mod, forge, card) {
      const newCard = { ...card };
      const foundTriggerIndex = newCard.triggers.findIndex(
        ({ trigger, effect }) => trigger.key === forge.trigger.key
          && effect.key === forge.effect.key,
      );
      if (foundTriggerIndex === -1) {
        throw new Error(`Trigger ${forge.trigger.key} not found`);
      }
      newCard.triggers.splice(foundTriggerIndex, 1);
      return this.apply(forge, newCard);
    },
    applyCost(baseCost, forge, card) {
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
    isCommanderForbidden(forge) {
      const foundTrigger = triggers[forge.trigger.key];
      return foundTrigger.isCommanderForbidden ? foundTrigger.isCommanderForbidden() : false;
    },
  },
  {
    type: 'addEffectOnAction',
    weight: 1,
    complexity: 1,
    generate(card) {
      const action = generateAction(card);
      const effect = generateEffect(card);
      if (card.actions && card.actions.some(
        ({ action: currentAction, effect: currentEffect }) => currentAction.key === action.key
          && currentEffect.key === effect.key,
      )) {
        return null;
      }

      return {
        action,
        effect,
      };
    },
    upgrade(forge, card) {
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
    apply(forge, card) {
      const newCard = { ...card };
      if (!newCard.actions) newCard.actions = [];
      newCard.actions.push({
        action: cleanDefinitionObject(forge.action),
        effect: cleanDefinitionObject(forge.effect),
      });
      return newCard;
    },
    findAction(forge, card) {
      const { actions: cardActions } = card;
      const foundAction = cardActions.find(
        ({ action, effect }) => action.key === forge.action.key
          && effect.key === forge.effect.key,
      );
      return foundAction;
    },
    applyMod(mod, forge, card) {
      const newCard = { ...card };
      const foundActionIndex = newCard.actions.findIndex(
        ({ action, effect }) => action.key === forge.action.key
          && effect.key === forge.effect.key,
      );
      if (foundActionIndex === -1) {
        throw new Error(`Action ${forge.action.key} not found`);
      }
      newCard.actions.splice(foundActionIndex, 1);
      return this.apply(forge, newCard);
    },
    applyCost(baseCost, forge, card, forgeIndex) {
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
    complexity: 2,
    generate(card) {
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
    upgrade(forge, card) {
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
    apply(forge, card) {
      const newCard = { ...card };
      if (!newCard.ongoingEffects) newCard.ongoingEffects = [];
      newCard.ongoingEffects.push({
        ...cleanDefinitionObject(forge.ongoingEffect),
      });
      return newCard;
    },
    applyMod(mod, forge, card) {
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
    // applyCost(baseCost, forge, card) {
    //   const newCard = { ...card };
    //   const foundEffect = effects[forge.effect.key];
    //   const extraPrice = foundEffect.price ? foundEffect.price(forge.effect) : 0;
    //   const foundTrigger = triggers[forge.trigger.key];
    //   const extraPriceModded = parseInt(
    //     foundTrigger.costModificator
    //       ? foundTrigger.costModificator({ cost: extraPrice }) : extraPrice,
    //     10,
    //   );
    //   newCard.cost = baseCost + extraPriceModded;
    //   return newCard;
    // },
    applyCost(baseCost, forge, card) {
      const newCard = { ...card };
      const foundOngoingEffect = ongoingEffects[forge.ongoingEffect.key];
      let passiveEffectCostModificator = ({ cost }) => cost;
      if (foundOngoingEffect.key === 'givePassiveEffect') {
        const foundPassiveEffect = passiveEffects[
          forge.ongoingEffect.passiveEffect
        ];
        passiveEffectCostModificator = foundPassiveEffect.costModificator;
      }
      let extraPrice = foundOngoingEffect.price ? foundOngoingEffect.price(
        { ...forge.ongoingEffect, passiveEffectCostModificator },
      ) : 0;

      (forge.mods || []).forEach((mod) => {
        const foundMod = foundOngoingEffect.mods.find(
          (currentMod) => currentMod.key === mod.key && currentMod.modLevel === mod.modLevel,
        );
        if (foundMod && foundMod.costModificator) {
          extraPrice += foundMod.costModificator(extraPrice, mod, forge);
        }
      });

      newCard.cost = baseCost + extraPrice;
      return newCard;
    },
    isCommanderForbidden() {
      return false;
    },
  },
];

module.exports = {
  forgeLevelFilter,
  generateTrigger,
  generateAction,
  generateEffect,
  forgeGenerators,
};
