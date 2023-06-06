const {
  start,
  requestQuery,
} = require('./stableDiffusion');

const weightedSample = require('../utils/weightedSample');

const MODEL = 'trinart2_115000';

const contextualWords = [
  'fighting',
  'war',
  'battlefield',
  'mountain',
  'forest',
  'volcano',
  'city',
  'night',
  'daylight',
  'dawn',
  'waterfall',
  'hell',
  'heaven',
  'ancient',
  'ruins',
  'cave',
  'dungeon',
  'castle',
  'temple',
  'tomb',
  'graveyard',
  'arctic',
  'desert',
  'jungle',
  'swamp',
  'ocean',
  'sea',
  'river',
  'lake',
  'beach',
  'cliff',
  'abyss',
  'legendary',
  'powerful',
  'sunset',
  'horror',
  'ethereal',
  'closeup portrait',
];

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

function getCardImageKeywords(card) {
  if (!card) return [];
  const result = new Set();
  Object.entries(card).forEach(([key, value]) => {
    if (key === 'id' || key === '_id') {
      return;
    }
    if (key === 'key' && typeof value === 'string') result.add(value);
    else if (typeof value === 'object' && !Array.isArray(value)) {
      const subResult = getCardImageKeywords(value);
      subResult.forEach((subValue) => result.add(subValue));
    }
  });
  return Array.from(result);
}

function generatePrompt(card) {
  if (!card) throw new Error('No card provided');

  const imageContext = `${weightedSample(contextualWords)} and ${weightedSample(contextualWords)} background`;
  const imageArtists = new Array(2).fill(0).map(() => weightedSample(artists)).join(' and ');
  const cardImageKeywords = getCardImageKeywords(card).join(', ');
  return `Epic drawing of a ${card.unitType || 'human'} ${card.name}, ${cardImageKeywords}, ${imageContext} background, by ${imageArtists}, hyper detailed, 8k resolution, cinematic, intrincate, concept art, epic, trending in artstation`;
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
  getCardImageKeywords,
  generatePrompt,
  generateImage,
};