const md5 = require('md5');
const { randomInt } = require('../utils/random');
const { generateForge, applyForge, upgradeRandomForge } = require('./forge/generateForge');
const { generateName } = require('./generateCardName');

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

function levelUpCard(card) {
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

function upgradeCard(card) {
  const { level } = card;
  let upgradedCard = card;
  upgradeCard = levelUpCard(upgradedCard);
  if (level <= 4) {
    upgradeCard = levelUpCard(upgradedCard);
  }
  if (level === 4) {
    upgradeCard = levelUpCard(upgradedCard);
    upgradeCard = levelUpCard(upgradedCard);
    upgradeCard = levelUpCard(upgradedCard);
  }
  const { hashContent, hash } = generateHash(card);
  card.hashContent = hashContent;
  card.hash = hash;
  upgradedCard.level += 1;
  return upgradedCard;
}

function generateUnit(level = 1) {
  if (level < 0) throw new Error('Level must be positive');

  let card = {
    attack: randomInt(1, 3),
    hp: randomInt(0, 3),
    type: 'unit',
    unitType: 'human',
  };

  for (let accumulator = 0; accumulator < level; accumulator += 1) {
    card = upgradeCard(card);
  }

  // @TODO change every upgrade
  card.name = generateName(card);
  return card;
}

function addForgeToCard(card) {
  const forge = generateForge(card.level);
  return applyForge(forge, card);
}

const generateCard = generateUnit;

module.exports = { generateHash, generateCard, upgradeCard };
