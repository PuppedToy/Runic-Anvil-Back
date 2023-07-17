const md5 = require('md5');
const { randomInt } = require('../utils/random');
const { generateForge, applyForge, upgradeRandomForge } = require('./forge/generateForge');
const { generateName } = require('./generateCardName');
const regions = require('../data/forges/regions');
const weightedSample = require('../utils/weightedSample');

function createForgeComparator(forgeKey, forgeSubkey) {
  return (a, b) => {
    const triggerComparison = a[forgeKey].key.localeCompare(b[forgeKey].key);
    if (triggerComparison !== 0) return triggerComparison;
    return a[forgeSubkey].key.localeCompare(b[forgeSubkey].key);
  }
}

function generateHash(card) {
  const {
    level, attack, hp, unitType, element, passiveEffects = [], triggers = [], actions = [], conditionalEffects = [],
  } = card;
  const sortedPassiveEffects = JSON.stringify(passiveEffects.sort());
  const sortedTriggers = JSON.stringify(triggers.sort(createForgeComparator('trigger', 'effect')));
  const sortedActions = JSON.stringify(actions.sort(createForgeComparator('action', 'effect')));
  const sortedConditionalEffects = JSON.stringify(conditionalEffects.sort(createForgeComparator('selector', 'ongoingEffect')));
  const hashContent = `${level}|${attack}|${hp}|${unitType}|${element}|${sortedPassiveEffects}|${sortedTriggers}|${sortedActions}|${sortedConditionalEffects}`;
  return { hashContent, hash: md5(hashContent) };
}

function levelUpCard(card) {
  const cardForges = card.forges || [];
  const isNewForge = !cardForges.length || Math.random() < 0.7 - cardForges.length * 0.1;
  if (isNewForge) {
    const newCard =  addForgeToCard(card);
    console.log(`Added forge to card ${JSON.stringify(newCard, null, 2)}`);
    return newCard;
  }
  else {
    let newCard = upgradeRandomForge(card);
    if (newCard === null) {
      newCard = addForgeToCard(card);
      console.log(`Could not find a forge to upgrade. Added forge to card ${JSON.stringify(newCard, null, 2)}`);
    }
    else {
      console.log(`Upgraded forge on card ${JSON.stringify(newCard, null, 2)}`);
    }
    return newCard;
  }
}

function upgradeCard(card) {
  const { level } = card;
  let upgradedCard = card;
  upgradedCard = levelUpCard(upgradedCard);
  if (level <= 5) {
    upgradedCard = levelUpCard(upgradedCard);
  }
  if (level === 5) {
    upgradedCard = levelUpCard(upgradedCard);
    upgradedCard = levelUpCard(upgradedCard);
    upgradedCard = levelUpCard(upgradedCard);
  }
  const { hashContent, hash } = generateHash(card);
  card.hashContent = hashContent;
  card.hash = hash;
  upgradedCard.level += 1;
  return upgradedCard;
}

function generateUnit(level = 1) {
  if (level < 0) throw new Error('Level must be positive');
  const region = weightedSample(regions);

  let card = {
    level: 1,
    attack: randomInt(0, 3),
    hp: randomInt(1, 3),
    type: 'unit',
    unitTypes: ['human'],
    region: region.key,
  };

  console.log(`Created base card ${JSON.stringify(card, null, 2)}`);

  for (let accumulator = 1; accumulator < level; accumulator += 1) {
    card = upgradeCard(card);
  }

  // @TODO change every upgrade
  card.name = generateName(card);
  return card;
}

function addForgeToCard(card) {
  const forge = generateForge(card);
  return applyForge(forge, card);
}

const generateCard = generateUnit;

module.exports = { generateHash, generateCard, upgradeCard };
