const md5 = require('md5');
const { randomInt } = require('../utils/random');
const { generateForge, applyForge } = require('./forge/generateForge');
const { generateName } = require('./generateCardTexts');

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
    rarityLevel, attack, hp, unitType, passiveEffects = [], triggers = [], actions = [], conditionalEffects = [],
  } = card;
  const sortedPassiveEffects = JSON.stringify(passiveEffects.sort());
  const sortedTriggers = JSON.stringify(triggers.sort(createForgeComparator('trigger', 'effect')));
  const sortedActions = JSON.stringify(actions.sort(createForgeComparator('action', 'effect')));
  const sortedConditionalEffects = JSON.stringify(conditionalEffects.sort(createForgeComparator('selector', 'ongoingEffect')));
  const hashContent = `${rarityLevel}|${attack}|${hp}|${unitType}|${sortedPassiveEffects}|${sortedTriggers}|${sortedActions}|${sortedConditionalEffects}`;
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

const generateCard = generateUnit;

module.exports = { generateCard };
