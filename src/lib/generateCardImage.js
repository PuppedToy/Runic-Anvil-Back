const {
  start,
  requestQuery,
} = require('./stableDiffusion');

const weightedSample = require('../utils/weightedSample');
const regions = require('../data/forges/regions');

const MODEL = 'trinart2_115000';

const artists = [
  'artgerm',
  'wlop',
  'guweiz',
  'megan duncanson',
  'benjamin lacombe',
  'adrian borda',
  'stanley artgermm',
  'tom bagshaw',
  'craig mullins',
  'carne griffiths',
  'ayami kojima',
  'beksinski',
  'giger',
  'yusuke murata',
  'mars ravelo',
  'greg rutkowski',
  'alphonse mucha',
  'loish',
  'makoto shinkai',
  'ilya kuvshinov',
  'viktoria gavrilenko',
  'steve zheng',
  'terry rogers',
];

function generatePrompt(card) {
  if (!card) throw new Error('No card provided');

  let region;
  if (card.region) {
    const foundRegion = regions[card.region];
    [region] = foundRegion.aliases;
  } else {
    region = 'a fantasy world';
  }
  const imageArtists = new Array(2).fill(0).map(() => weightedSample(artists)).join(' and ');
  const cardImageKeywords = (card.passiveEffects || []).join(', ');
  let unitType = 'human';
  if (card.unitTypes.length === 1) {
    [unitType] = card.unitTypes;
  } else if (card.unitTypes.length > 1) {
    unitType = `hybrid creature ${card.unitTypes.join(', ')} and ${card.unitTypes.slice(-1)[0]}`;
  }
  let element = '';
  if (card.element) {
    element = ` of element ${card.element}`;
  }
  return `Epic drawing of a ${unitType}${element} in ${region}, ${card.name}, ${cardImageKeywords}, by ${imageArtists}, hyper detailed, 8k resolution, cinematic, intrincate, concept art, epic, trending in artstation`;
}

async function generateImage(card) {
  if (!card) throw new Error('No card provided');

  start();

  const prompt = generatePrompt(card);
  const seed = parseInt(Math.random() * 1000000, 10);
  const ckpt = MODEL;
  const quantity = 1;

  const { promise } = requestQuery(prompt, seed, ckpt, quantity);
  const results = await promise;
  const [result] = results;
  return {
    generationData: {
      prompt,
      seed,
      ckpt,
      quantity,
    },
    result,
  };
}

module.exports = {
  generatePrompt,
  generateImage,
};
