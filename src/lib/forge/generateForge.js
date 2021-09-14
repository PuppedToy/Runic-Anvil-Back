const weightedSample = require('../../utils/weightedSample');
const {
  unitTypes,
  passiveEffects,
  triggers,
  effects,
  eligibleTargetsCards,
  eligibleTargetsKingdoms,
} = require('../../data/forges');

// Filters
const forgeLevelFilter = (level) => ({ forgeLevel = 0 }) => level >= forgeLevel;

// Trigger
function generateTrigger(level) {
  return weightedSample(triggers, [forgeLevelFilter(level)]);
}

const TARGET_TYPE_CARD = 'TARGET_TYPE_CARD';
const TARGET_TYPE_KINGDOM = 'TARGET_TYPE_KINGDOM';
function generateEligibleTargets(level, targetTypes) {
  let eligibleTargets = {};

  if (targetTypes.includes(TARGET_TYPE_CARD)) {
    eligibleTargets = { ...eligibleTargets, ...eligibleTargetsCards };
  }
  if (targetTypes.includes(TARGET_TYPE_KINGDOM)) {
    eligibleTargets = { ...eligibleTargets, ...eligibleTargetsKingdoms };
  }

  const eligibleTarget = weightedSample(eligibleTargets, [forgeLevelFilter(level)]);

  return eligibleTarget;
}

const processTextRegex = /\$([^.$ ]*?\.?)+?[^.$ ]+?(?=\s|$)/;
function processText({ text, ...fields }) {
  if (!text) throw new Error('Text is required to process text');

  let resultText = text;
  while (resultText.includes('$')) {
    const resultRegex = processTextRegex.exec(resultText);
    if (!resultRegex) {
      throw new Error(`Regex is expected to match on processText.
  - Received text: ${text}.
  - Current state: ${resultText}
  - Other fields: ${JSON.stringify(fields)}`);
    }
    const [match] = resultRegex;
    const parts = match.replace('$', '').split('.');
    let resultField = fields;
    parts.forEach((part) => {
      resultField = resultField[part];
    });
    resultText = resultText.replace(match, resultField);
  }

  return resultText;
}

// Effects
// TODO targets
// TODO conditions
// TODO for each effect enumerate the type of targets it might have
// TODO text placeholders for both effects and targets
// In the case of basic effects it will be <$effect $target>
// For instance, Deploy a random card from your hand is Deploy $target
function generateEffect(level) {
  const effect = weightedSample(effects, [forgeLevelFilter(level)]);

  // TODO now we are assuming card as eligible targets
  const target = generateEligibleTargets(level, [TARGET_TYPE_CARD]);
  const generatedTarget = {
    ...target,
    ...(target.generate ? target.generate(level) : {}),
  };
  if (generatedTarget.text) {
    generatedTarget.text = processText(generatedTarget);
  }
  return {
    ...effect,
    // TODO This is Assuming no effect placeholders. Make it count when the time comes
    text: `${effect.name} ${generatedTarget.text || generatedTarget.name}`,
  };
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
  },
  // Basic: Trigger: effect
  {
    type: 'addEffectOnTrigger',
    chance: 1,
    generate: (level) => {
      // TODO
      const trigger = generateTrigger(level);
      const effect = generateEffect(level);

      return {
        trigger,
        effect,
        text: `${trigger.name}: ${effect.text}`,
      };
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

module.exports = generateForge;
