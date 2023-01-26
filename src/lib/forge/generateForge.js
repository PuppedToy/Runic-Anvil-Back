const weightedSample = require('../../utils/weightedSample');
const { randomInt } = require('../../utils/random');
const {
  unitTypes,
  passiveEffects,
  triggers,
  effects,
} = require('../../data/forges');

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

function mergeTexts(previousCardText, newCardText) {
  if (!previousCardText) return `${newCardText}.`;
  return `${previousCardText}\n${newCardText}.`;
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
function processText(text, textContext) {
  if (!text) throw new Error('Text is required to process text');

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

function processValue(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'object') {
    if (Object.hasOwnProperty.call(value, 'range')) {
      const { range } = value;
      if (!Object.hasOwnProperty.call(range, 'min') || !Object.hasOwnProperty.call(range, 'max')) {
        throw new Error('Range must have min and max');
      }

      return randomInt(range.min, range.max);
    }
  }
  return value;
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
    name, description, text, default: defaultForge, generalTextContext = {},
  } = effect;

  const value = processValue(defaultForge.value);
  const textContext = { ...(defaultForge.textContext || {}), ...generalTextContext };

  const forge = {
    name,
    description,
    ...defaultForge,
    value,
    textContext,
  };

  forge.text = processText(text, { ...forge, ...textContext });

  return forge;
}

const forgeGenerators = [
  {
    type: 'addUnitType',
    chance: 1,
    generate: (level) => {
      const sample = weightedSample(unitTypes, [forgeLevelFilter(level)]);
      const text = sample.name;
      return {
        ...sample,
        text,
      };
    },
    apply: (forge, card) => {
      const newCard = { ...card };
      newCard.unitType = forge.key;
      return newCard;
    },
  },
  {
    type: 'addPassiveEffect',
    chance: 1,
    generate: (level) => {
      const sample = weightedSample(passiveEffects, [forgeLevelFilter(level)]);
      const text = sample.name;
      return {
        ...sample,
        text,
      };
    },
    apply: (forge, card) => {
      const newCard = { ...card };
      newCard.text = mergeTexts(card.text, forge.text);
      return newCard;
    },
  },
  // Basic: Trigger: effect
  {
    type: 'addEffectOnTrigger',
    chance: 1,
    generate: (level) => {
      const trigger = generateTrigger(level);
      const effect = generateEffect(level);

      return {
        trigger,
        effect,
        text: `${trigger.name}: ${effect.text}`,
      };
    },
    apply: (forge, card) => {
      const newCard = { ...card };
      newCard.text = mergeTexts(card.text, forge.text);
      if (!newCard.triggers) newCard.triggers = [];
      newCard.triggers.push({
        trigger: cleanDefinitionObject(forge.trigger),
        effect: cleanDefinitionObject(forge.effect),
      });
      return newCard;
    },
  },
];

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
  return forgeGenerator.apply(forge, card);
}

module.exports = {
  forgeLevelFilter,
  generateTrigger,
  cleanDefinitionObject,
  mergeTexts,
  processText,
  processValue,
  generateEffect,
  forgeGenerators,
  generateForge,
  applyForge,
};
