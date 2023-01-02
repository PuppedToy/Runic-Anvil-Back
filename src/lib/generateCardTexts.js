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
    return result;
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

function generateName(card) {
  const chosenTemplate = weighedSample(templates.filter((template) => template.type === card.type));

  const keyWords = getKeywords(card);
  let result = chosenTemplate.value;

  const mainNouns = nouns.main[card.unitType || 'human'];
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
    }
    if (match === '$other') {
      dictionary = weightedOtherNouns;
    }
    if (match === '$noun') {
      dictionary = weightedAllNouns;
    }
    if (match === '$main') {
      dictionary = weightedMainNouns;
    }
    if (match === '$profession') {
      dictionary = weightedProfessionNouns;
    }
    return weighedSample(dictionary).word;
  });

  return result;
}

module.exports = { generateName };
