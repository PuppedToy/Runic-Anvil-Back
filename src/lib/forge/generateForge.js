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

// const TARGET_TYPE_CARD = 'TARGET_TYPE_CARD';
// const TARGET_TYPE_KINGDOM = 'TARGET_TYPE_KINGDOM';
// function generateEligibleTargets(level, targetTypes) {
//   let eligibleTargets = {};

//   if (targetTypes.includes(TARGET_TYPE_CARD)) {
//     eligibleTargets = { ...eligibleTargets, ...eligibleTargetsCards };
//   }
//   if (targetTypes.includes(TARGET_TYPE_KINGDOM)) {
//     eligibleTargets = { ...eligibleTargets, ...eligibleTargetsKingdoms };
//   }

//   const eligibleTarget = weightedSample(eligibleTargets, [forgeLevelFilter(level)]);

//   return eligibleTarget;
// }

function mergeTexts(textList) {
  return textList.map(
    (text) => (text[text.length - 1] === '.' ? text.slice(0, -1) : text),
  ).join('.\n');
}

function cleanDefinitionObject(definitionObject) {
  const unwantedProperties = ['name', 'description', 'textContext', 'text', 'weight'];
  const result = { ...definitionObject };
  unwantedProperties.forEach((property) => {
    delete result[property];
  });
  return result;
}

const processTextRegex = /\$([^.$ )\]}:]*?\.?)+?[^.$ )\]}:]+?(?=\s|$|:|\)|\]|\})/;
function processText(text, textContext = {}) {
  if (!text) return '';

  let resultText = text;
  let lastResult = null;
  while (resultText.includes('$')) {
    const resultRegex = processTextRegex.exec(resultText);
    if (!resultRegex) {
      throw new Error(`Regex is expected to match on processText.
  - Last result: ${lastResult}
  - Received text: ${text}
  - Current state: ${resultText}
  - Other fields: ${JSON.stringify(textContext)}`);
    }
    const [match] = resultRegex;
    const parts = match.replace('$', '').split('.');
    let resultField = textContext;
    parts.forEach((part) => {
      if (!Object.hasOwnProperty.call(resultField, part)) {
        throw new Error(`Field ${part} not found on ${JSON.stringify(resultField, null, 2)}`);
      }
      if (typeof resultField[part] === 'function') {
        resultField = resultField[part](textContext);
      } else {
        resultField = resultField[part];
      }
    });
    if (typeof resultField === 'object') {
      if (Object.hasOwnProperty.call(resultField, 'text')) {
        resultField = resultField.text;
      } else {
        throw new Error(`Text field not found on ${JSON.stringify(resultField)}`);
      }
    }
    resultText = resultText.replace(match, resultField);
    if (lastResult === resultText) {
      throw new Error(`Text is not expected to be the same after processing.
  - Received text: ${text}.
  - Current state: ${resultText}
  - Other fields: ${JSON.stringify(textContext)}`);
    }
    lastResult = resultText;
  }

  const lowerCaseResultText = resultText.toLowerCase();
  const firstCapitalLetterResultText = lowerCaseResultText[0].toUpperCase() + lowerCaseResultText.slice(1);
  return firstCapitalLetterResultText;
}

const processOperations = {
  range: (range) => {
    if (!Object.hasOwnProperty.call(range, 'min') || !Object.hasOwnProperty.call(range, 'max')) {
      throw new Error('Range must have min and max');
    }

    return randomInt(range.min, range.max, range.step);
  },
  sample: (sample) => weightedSample(sample, undefined, { noKey: true }),
  sampleWithKeyReplacement: ({ list, keyReplace }) => weightedSample(list, undefined, { keyReplace, noKey: !keyReplace }),
  filteredSample: ({ list, filters, keyReplace }) => weightedSample(list, filters, { keyReplace, noKey: !keyReplace }),
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

function processForge(defaultForge) {
  if (!Array.isArray(defaultForge) && typeof defaultForge === 'object') {
    let resultDefaultForge = { ...defaultForge };
    Object.entries(resultDefaultForge).forEach(([key, value]) => {
      const keyWithoutDollar = key.replace('$', '');
      if (Object.hasOwnProperty.call(processOperations, keyWithoutDollar)) {
        resultDefaultForge[key] = processOperations[keyWithoutDollar](value);
      }
      resultDefaultForge[key] = processForge(resultDefaultForge[key]);
    });
    const keys = Object.keys(resultDefaultForge);
    if (keys.length === 1 && keys[0][0] === '$') {
      return resultDefaultForge[keys[0]];
    }
    return resultDefaultForge;
  }
  return defaultForge;
}

// Effects
// @TODO targets
// @TODO conditions
// @TODO for each effect enumerate the type of targets it might have
// @TODO text placeholders for both effects and targets
// In the case of basic effects it will be <$effect $target>
// For instance, Deploy a random card from your hand is Deploy $target
function generateEffect() {
  // Now all the previous work isn't useful.
  // We start small here. We don't need level. We are generating
  // a new level 1 deploy effect. We will create an improveEffect method

  // For now, we should focus on each effect to be generated on their default
  // state. We will tackle improvements later

  const effect = weightedSample(effects, [forgeLevelFilter(1)]);

  const {
    key,
    name,
    description,
    text,
    default: defaultForge,
    textContext: generalTextContext = {},
    price,
  } = effect;

  const processedDefaultForge = processForge(defaultForge);
  const textContext = { ...(processedDefaultForge.textContext || {}), ...generalTextContext };

  const forge = {
    key,
    name,
    description,
    ...processedDefaultForge,
    textContext,
    text,
    price,
  };

  return forge;
}


function generateSelector(level) {
  const selector = weightedSample(cardSelectors, [forgeLevelFilter(level)]);

  const {
    key,
    text,
    selector: selectorDefinition,
    textContext: generalTextContext = {},
  } = selector;

  const processedSelector = processForge(selectorDefinition);
  const textContext = { ...(processedSelector.textContext || {}), ...generalTextContext };

  const forge = {
    key,
    text,
    selector: processedSelector,
    textContext,
  };
  return forge;
}

function generateOngoingEffect(level) {
  const ongoingEffect = weightedSample(ongoingEffects, [forgeLevelFilter(level)]);

  const {
    key,
    text,
    effect,
    textContext: generalTextContext = {},
  } = ongoingEffect;

  const processedEffect = processForge(effect);
  const textContext = { ...(processedEffect.textContext || {}), ...generalTextContext };

  const forge = {
    key,
    text,
    effect: processedEffect,
    textContext,
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
      const sample = weightedSample(elements.basic, [forgeLevelFilter(level)]);
      return {
        ...sample,
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
    getText: (forge) => {
      const foundPassiveEffect = passiveEffects[forge.key];
      return foundPassiveEffect.name;
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
        textContext: {
          ...(trigger.textContext || {}),
          ...(effect.textContext || {}),
        },
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
    getText: (forge) => {
      const foundEffect = effects[forge.effect.key];
      const foundTrigger = triggers[forge.trigger.key];
      const textContext = {
        ...(forge.effect),
        ...(forge.trigger),
        ...(forge.effect.textContext || {}),
        ...(forge.trigger.textContext || {}),
        ...(foundEffect.textContext || {}),
        ...(foundTrigger.textContext || {}),
      };
      return processText(`${foundTrigger.name}: ${foundEffect.text}`, textContext);
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
        textContext: {
          ...(action.textContext || {}),
          ...(effect.textContext || {}),
        },
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
    getText (forge, card, forgeIndex) {
      const foundEffect = effects[forge.effect.key];
      const foundAction = actions[forge.action.key];
      const foundForge = card.forges[forgeIndex];
      const textContext = {
        ...(forge.effect),
        ...(forge.action),
        ...(forge.effect.textContext || {}),
        ...(forge.action.textContext || {}),
        ...(foundEffect.textContext || {}),
        ...(foundAction.textContext || {}),
        actionCost: foundForge.cost,
      };
      return processText(`${foundAction.text}: ${foundEffect.text}`, textContext);
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
        textContext: {
          ...(selector.textContext || {}),
          ...(ongoingEffect.textContext || {}),
        },
      };
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
    getText: (forge) => {
      const foundSelector = cardSelectors[forge.selector.key];
      const foundOngoingEffect = ongoingEffects[forge.ongoingEffect.key];
      const textContext = {
        target: forge.target,
        ...(forge.selector),
        ...(forge.ongoingEffect),
        ...(forge.selector.textContext || {}),
        ...(forge.ongoingEffect.textContext || {}),
        ...(foundSelector.textContext || {}),
        ...(foundOngoingEffect.textContext || {}),
      };
      if (foundOngoingEffect.key === 'statChange' && textContext.effect.value >= 0) {
        textContext.effect.value = `+${textContext.effect.value}`;
      }
      return processText(`${foundSelector.text} ${foundOngoingEffect.text}`, textContext);
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
  const texts = [];
  // @TODO This is an arbitrary order to apply costs. It will change
  forges.forEach((forge, forgeIndex) => {
    const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
    if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
    newCard = forgeGenerator.applyCost(baseCost, forge, card, forgeIndex);
    baseCost += newCard.cost;
    if (forgeGenerator.getText) texts.push(forgeGenerator.getText(forge, newCard, forgeIndex));
  });
  const text = mergeTexts(texts);
  newCard.text = text ? `${text}.` : '';
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
  mergeTexts,
  processText,
  generateEffect,
  generateForge,
  applyForge,
  getCost,
  canBeCommander,
  applyCardCalculatedFields,

  forgeGenerators,
};
