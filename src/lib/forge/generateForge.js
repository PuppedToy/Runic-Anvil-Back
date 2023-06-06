const weightedSample = require('../../utils/weightedSample');
const { randomInt } = require('../../utils/random');
const {
  unitTypes,
  passiveEffects,
  triggers,
  effects,
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

const processTextRegex = /\$([^.$ ]*?\.?)+?[^.$ ]+?(?=\s|$)/;
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
        throw new Error(`Field ${part} not found on ${JSON.stringify(resultField)}`);
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

  return resultText;
}

const processOperations = {
  range: (range) => {
    if (!Object.hasOwnProperty.call(range, 'min') || !Object.hasOwnProperty.call(range, 'max')) {
      throw new Error('Range must have min and max');
    }

    return randomInt(range.min, range.max);
  },
  sample: (sample) => weightedSample(sample),
  exponential: (exponential) => {
    if (!Object.hasOwnProperty.call(exponential, 'min')) {
      throw new Error('Range must have min and max');
    }
    const { min } = exponential;
    const max = exponential.max || 99999; // This is for safety purposes against infinite loops
    const step = exponential.step || 1;
    const probability = exponential.probability || 0.5;

    let result = min;
    while (Math.random() < probability && result < max) {
      result += step;
    }
    return result;
  },
};

function processDefaultForge(defaultForge) {
  if (!Array.isArray(defaultForge) && typeof defaultForge === 'object') {
    const resultDefaultForge = { ...defaultForge };
    Object.entries(resultDefaultForge).forEach(([key, value]) => {
      const keyWithoutDollar = key.replace('$', '');
      if (Object.hasOwnProperty.call(processOperations, keyWithoutDollar)) {
        resultDefaultForge[key] = processOperations[keyWithoutDollar](value);
      }
      resultDefaultForge[key] = processDefaultForge(resultDefaultForge[key]);
      Object.keys(resultDefaultForge[key]).forEach((subKey) => {
        if (subKey[0] === '$') {
          resultDefaultForge[key] = resultDefaultForge[key][subKey];
        }
      });
    });
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

  const processedDefaultForge = processDefaultForge(defaultForge);
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
  },
];

function getCost(card) {
  let baseCost = getCardBaseCost(card);
  let newCard = { ...card };
  newCard.cost = baseCost;
  const forges = card.forges || [];
  forges.forEach((forge) => {
    const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
    if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
    newCard = forgeGenerator.applyCost(baseCost, forge, card);
    baseCost += newCard.cost;
  });
  return newCard.cost;
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

function applyCardCostAndText(card) {
  let baseCost = getCardBaseCost(card);
  const forges = card.forges || [];
  let newCard = { ...card };
  const texts = [];
  // @TODO This is an arbitrary order to apply costs. It will change
  forges.forEach((forge) => {
    const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
    if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
    newCard = forgeGenerator.applyCost(baseCost, forge, card);
    baseCost += newCard.cost;
    if (forgeGenerator.getText) texts.push(forgeGenerator.getText(forge, card));
  });
  const text = mergeTexts(texts);
  newCard.text = text ? `${text}.` : '';
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
  applyCardCostAndText,

  forgeGenerators,
};
