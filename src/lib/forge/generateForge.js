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
    generate: (level, card) => {
      // @TODO This forge at higher levels could add a "counts as another type"
      // so a unit can actually have 2 types. This can also be one of
      // the permanent effects. Like auras. For example:
      // While at war: all units count as <type>. Something like that.

      const sample = weightedSample(unitTypes, [forgeLevelFilter(level)]);
      const text = sample.name;
      return {
        forge: {
          ...sample,
          text,
        },
        card: {
          ...card,
          unitType: sample.key,
        },
      };
    },
  },
  {
    type: 'addPassiveEffect',
    chance: 1,
    generate: (level, card) => {
      const sample = weightedSample(passiveEffects, [forgeLevelFilter(level)]);
      const text = sample.name;
      return {
        forge: {
          ...sample,
          text,
        },
        card: {
          ...card,
          passiveEffects: [...(card.passiveEffects || []), sample],
        },
      };
    },
  },
  // Basic: Trigger: effect
  {
    type: 'addEffectOnTrigger',
    chance: 1,
    generate: (level, card) => {
      const trigger = generateTrigger(level);
      const effect = generateEffect(level);
      const text = `${trigger.name}: ${effect.text}`;

      return {
        forge: {
          trigger,
          effect,
          text,
        },
        card: {
          ...card,
          text,
        },
      };
    },
  },
];

function generateForge(level, card) {
  if (level < 0 || level > 5) {
    throw new Error('Level must be between 1 and 5');
  }
  if (!card || typeof card !== 'object') {
    throw new Error('Card is required');
  }
  if (!card.type) {
    throw new Error('Card type is required');
  }

  const forgeGenerator = weightedSample(forgeGenerators);
  const { forge, card: newCard } = forgeGenerator.generate(level, card);
  return {
    forge: {
      tyoe: forgeGenerator.type,
      ...forge,
    },
    card: newCard,
  };
}

module.exports = {
  forgeLevelFilter,
  generateTrigger,
  processText,
  processValue,
  generateEffect,
  forgeGenerators,
  generateForge,
};
