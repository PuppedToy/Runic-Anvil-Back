const md5 = require('md5');
const { randomInt } = require('../utils/random');
const { generateForge, applyForge, upgradeRandomForge } = require('./forge/generateForge');
const { generateName } = require('./generateCardName');

function exponential(min, range, probability = 0.5) {
  let result = min;
  while (Math.random() < probability && result < range) {
    result += 1;
  }
  return result;
}

function createForgeComparator(forgeKey, forgeSubkey) {
  return (a, b) => {
    const triggerComparison = a[forgeKey].key.localeCompare(b[forgeKey].key);
    if (triggerComparison !== 0) return triggerComparison;
    return a[forgeSubkey].key.localeCompare(b[forgeSubkey].key);
  }
}

function generateHash(card) {
  const {
    rarityLevel, attack, hp, unitType, element, passiveEffects = [], triggers = [], actions = [], conditionalEffects = [],
  } = card;
  const sortedPassiveEffects = JSON.stringify(passiveEffects.sort());
  const sortedTriggers = JSON.stringify(triggers.sort(createForgeComparator('trigger', 'effect')));
  const sortedActions = JSON.stringify(actions.sort(createForgeComparator('action', 'effect')));
  const sortedConditionalEffects = JSON.stringify(conditionalEffects.sort(createForgeComparator('selector', 'ongoingEffect')));
  const hashContent = `${rarityLevel}|${attack}|${hp}|${unitType}|${element}|${sortedPassiveEffects}|${sortedTriggers}|${sortedActions}|${sortedConditionalEffects}`;
  return { hashContent, hash: md5(hashContent) };
}

function generateUnit(level = 1) {
  if (level < 0) throw new Error('Level must be positive');

  const minAttack = randomInt(0, 4);
  const minHp = randomInt(1, 4);

  let card = {
    attack: exponential(minAttack, 50, 0.6),
    hp: exponential(minHp, 50, 0.6),
    type: 'unit',
    unitType: 'human',
  };

  const forges = [];
  for (let accumulator = 0; accumulator < level; accumulator += 1) {
    const forge = generateForge(level);
    forges.push(forge);
    card = applyForge(forge, card);
  }

  card.forges = forges;
  card.name = generateName(card);
  const { hashContent, hash } = generateHash(card);
  card.hashContent = hashContent;
  card.hash = hash;
  return card;
}

function addForgeToCard(card) {
  const forge = generateForge(card.level);
  card.forges.push(forge);
  return applyForge(forge, card);
}

function upgradeCard(card) {
  const isNewForge = !card.forges.length || Math.random() < 0.7 - card.forges.length * 0.1;
  if (isNewForge) {
    return addForgeToCard(card);
  }
  else {
    const newCard = upgradeRandomForge(card);
    if (newCard === null) {
      return addForgeToCard(card);
    }
  }
}

const generateCard = generateUnit;

module.exports = { generateHash, generateCard, upgradeCard };
