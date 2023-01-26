const stringSimilarity = require('string-similarity');

const adjectives = require('../data/textGeneration/adjectives');
const nouns = require('../data/textGeneration/nouns');
const templates = require('../data/textGeneration/templates');
const weighedSample = require('../utils/weightedSample');

function getKeywords(item) {
  let result = [];
  if (!item) {
    return result;
  }
  if (typeof item === 'string') {
    result = item.split(' ').map((word) => word.toLowerCase());
  } else if (item instanceof Array) {
    result = item.map(getKeywords).flat();
  } else if (typeof item === 'object') {
    Object.values(item).forEach((value) => {
      result = result.concat(getKeywords(value));
    });
  }

  // Remove duplicates
  result = [...new Set(result)];

  return result;
}

function addWeightsToObjectListComparingWithAKeywordList(list = [], keywordList = []) {
  const result = list.map(({ word, relatedWords = [], ...rest }) => {
    const newObject = {
      word, relatedWords, weight: 1, ...rest,
    };

    const allWords = [word, ...relatedWords];
    keywordList.forEach((keyword) => {
      allWords.forEach((currentWord) => {
        const similarity = stringSimilarity.compareTwoStrings(keyword, currentWord);

        if (similarity >= 0.5) {
          newObject.weight += parseInt(similarity * 4, 10);
        }
      });
    });

    return newObject;
  });

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
    || weighedSample(templates.filter((currentTemplate) => currentTemplate.type === card.type));

  const keyWords = getKeywords(card);
  let result = chosenTemplate.value;

  let mainNouns = nouns.main[card.unitType || 'human'];
  if (!mainNouns.length) {
    console.warn(`No main nouns found for unit type ${card.unitType}`);
    mainNouns = nouns.main.human;
  }
  const otherNouns = nouns.other;
  const allNouns = [...mainNouns, ...otherNouns];
  const professionNouns = allNouns.filter((noun) => Boolean(noun.profession));
  const weightedAdjectives = addWeightsToObjectListComparingWithAKeywordList(adjectives, keyWords);
  const weightedMainNouns = addWeightsToObjectListComparingWithAKeywordList(mainNouns, keyWords);
  const weightedOtherNouns = addWeightsToObjectListComparingWithAKeywordList(otherNouns, keyWords);
  const weightedAllNouns = addWeightsToObjectListComparingWithAKeywordList(allNouns, keyWords);
  const weightedProfessionNouns = addWeightsToObjectListComparingWithAKeywordList(
    professionNouns,
    keyWords,
  );

  result = result.replace(/\$[a-z]+/g, (match) => {
    let dictionary = weightedAllNouns;
    if (match === '$adjective') {
      dictionary = weightedAdjectives;
    } else if (match === '$other') {
      dictionary = weightedOtherNouns;
    } else if (match === '$noun') {
      dictionary = weightedAllNouns;
    } else if (match === '$main') {
      dictionary = weightedMainNouns;
    } else if (match === '$profession') {
      dictionary = weightedProfessionNouns;
    } else {
      throw new Error(`Unknown template: ${match}`);
    }
    try {
      return weighedSample(dictionary).word;
    } catch (error) {
      console.error(`Detected error while trying to read the chosen template: ${chosenTemplate.value}. The current result is ${result} and the match is ${match}`);
      console.error(`Card: ${JSON.stringify(card)}`, null, 2);
      console.error(`Keywords: ${JSON.stringify(keyWords)}`);
      console.error(`Dictionary: ${JSON.stringify(dictionary)}`, null, 2);
      throw error;
    }
  });

  return result;
}

module.exports = { getKeywords, addWeightsToObjectListComparingWithAKeywordList, generateName };
