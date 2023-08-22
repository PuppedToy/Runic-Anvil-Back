const rnamegen = require('rnamegen');

const fallbackText = require('../data/textGeneration/fallback');
const templates = require('../data/textGeneration/templates');
const weighedSample = require('../utils/weightedSample');

const regions = require('../data/forges/regions');
const effects = require('../data/forges/effects');
const triggers = require('../data/forges/triggers');
const actions = require('../data/forges/actions');
const unitTypes = require('../data/forges/unitTypes');
const elements = require('../data/forges/elements');
const passiveEffects = require('../data/forges/passiveEffects');

function getCardDictionaries(card) {
  const result = {
    mainNouns: [],
    adjectives: [],
    professions: [],
    otherNouns: [],
  };

  const resultKeys = Object.keys(result);
  const addNames = (baseDictionary) => {
    if (baseDictionary) {
      resultKeys.forEach((key) => {
        const resultDictionary = result[key];
        (baseDictionary[key] || []).forEach((word) => {
          if (
            typeof word === 'string'
          ) {
            resultDictionary.push(word);
          } else if (
            typeof word === 'object'
            && (word.minAttack === undefined || word.minAttack <= card.attack)
            && (word.maxAttack === undefined || word.maxAttack >= card.attack)
            && (word.minHp === undefined || word.minHp <= card.hp)
            && (word.maxHp === undefined || word.maxHp >= card.hp)
          ) {
            resultDictionary.push(word.key);
          }
        });
      });
      if (baseDictionary.unitTypes) {
        baseDictionary.unitTypes.forEach((unitType) => {
          if (typeof unitType === 'object') {
            addNames(unitType);
          }
        });
        baseDictionary.elements.forEach((element) => {
          if (typeof element === 'object') {
            addNames(element);
          }
        });
      }
    }
  };

  const {
    region,
    element,
    unitTypes: cardUnitTypes = [],
    triggers: cardTriggers = [],
    actions: cardActions = [],
    passiveEffects: cardPassiveEffects = [],
  } = card;

  if (region) {
    const cardRegion = regions[region];
    addNames(cardRegion);
  }
  if (element) {
    let cardElement = elements.basic[element];
    if (!cardElement) {
      cardElement = elements.complex[element];
    }
    addNames(cardElement);
  }
  cardUnitTypes.forEach((unitType) => {
    const cardUnitType = unitTypes[unitType];
    addNames(cardUnitType);
  });
  cardPassiveEffects.forEach((passiveEffect) => {
    const cardPassiveEffect = passiveEffects[passiveEffect];
    addNames(cardPassiveEffect);
  });
  cardTriggers.forEach((trigger) => {
    const cardTrigger = triggers[trigger?.trigger?.key];
    const cardEffect = effects[trigger?.effect?.key];
    addNames(cardTrigger);
    addNames(cardEffect);
  });
  cardActions.forEach((action) => {
    const cardAction = actions[action?.action?.key];
    const cardEffect = effects[action?.effect?.key];
    addNames(cardAction);
    addNames(cardEffect);
  });
  return result;
}

function upperFirstLetters(string) {
  let result = string;
  const delimiters = [' ', '-', '\''];
  delimiters.forEach((delimiter) => {
    result = result
      .split(delimiter)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(delimiter);
  });
  result = result.replace(/'S /g, '\'s ');
  return result;
}

function generateName(card, options = {}) {
  let template;

  if (!card || typeof card !== 'object') {
    throw new Error('Card must be an object');
  }

  if (typeof options !== 'object') {
    throw new Error('Options must be an object');
  }

  if (options && Object.hasOwnProperty.call(options, 'test')
    && Object.hasOwnProperty.call(options.test, 'template')) {
    template = options.test.template;
  }

  const chosenTemplate = template
    || weighedSample(templates.filter(
      (currentTemplate) => currentTemplate.type === card.type
        && currentTemplate.forgeLevel === card.level,
    ));

  const dictionaries = getCardDictionaries(card);
  Object.entries(dictionaries).forEach(([key, dictionary]) => {
    if (!dictionary || !dictionary.length) {
      console.warn(`No dictionary found for ${key} in card ${JSON.stringify(card, null, 2)}}`);
      dictionaries[key] = [...fallbackText[key]];
    }
  });

  let result = chosenTemplate.value;

  const cardRegion = regions[card.region];
  if (!cardRegion) {
    result = result.replace(/\$region/g, '$otherNouns');
  } else {
    dictionaries.regions = [cardRegion.name, ...(cardRegion.aliases || [])];
  }

  while (result.includes('$properNoun')) {
    result = result.replace('$properNoun', rnamegen(1, 5, 11)[0]);
  }

  const keys = Object.keys(dictionaries);
  keys.forEach((key) => {
    const singularKey = key.slice(0, -1);
    while (result.includes(`$${singularKey}`)) {
      result = result.replace(`$${singularKey}`, weighedSample(dictionaries[key]));
    }
  });

  // Check if there are $words like this and raise an error for each
  result.match(/\$[a-z]+/g)?.forEach((match) => {
    console.error(`Detected error while trying to read the chosen template: ${chosenTemplate.value}. The current result is ${result} and the match is ${match}`);
    console.error(`Card: ${JSON.stringify(card)}`, null, 2);
    console.error(`Dictionaries: ${JSON.stringify(dictionaries)}`, null, 2);
    throw new Error(`Unknown template: ${match}`);
  });

  return upperFirstLetters(result);
}

module.exports = { getCardDictionaries, upperFirstLetters, generateName };
