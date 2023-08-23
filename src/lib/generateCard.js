const md5 = require('md5');
const { randomInt } = require('../utils/random');
const {
  generateForge, applyForge, upgradeRandomForge, upgradeFlavor,
} = require('./forge/generateForge');
const { generateName } = require('./generateCardName');
const { constants } = require('../data/enums');
const { unitTypes } = require('../data/forges');
const weightedSample = require('../utils/weightedSample');

function createForgeComparator(forgeKey, forgeSubkey) {
  return (a, b) => {
    const triggerComparison = a[forgeKey].key.localeCompare(b[forgeKey].key);
    if (triggerComparison !== 0) return triggerComparison;
    return a[forgeSubkey].key.localeCompare(b[forgeSubkey].key);
  };
}

function generateHash(card) {
  const {
    level,
    attack,
    hp,
    unitType,
    element,
    passiveEffects = [],
    triggers = [],
    actions = [],
    conditionalEffects = [],
  } = card;
  const sortedPassiveEffects = JSON.stringify(passiveEffects.sort());
  const sortedTriggers = JSON.stringify(triggers.sort(createForgeComparator('trigger', 'effect')));
  const sortedActions = JSON.stringify(actions.sort(createForgeComparator('action', 'effect')));
  const sortedConditionalEffects = JSON.stringify(conditionalEffects.sort(createForgeComparator('selector', 'ongoingEffect')));
  const hashContent = `${level}|${attack}|${hp}|${unitType}|${element}|${sortedPassiveEffects}|${sortedTriggers}|${sortedActions}|${sortedConditionalEffects}`;
  return { hashContent, hash: md5(hashContent) };
}

function addForgeToCard(card, maxIterations) {
  const forge = generateForge(card, maxIterations);
  if (!forge) return null;
  return applyForge(forge, card);
}

function levelUpCard(card) {
  const cardForges = card.forges || [];
  const isNewForge = !cardForges.length || Math.random() < 0.5;
  let newCard;
  if (isNewForge) {
    newCard = addForgeToCard(card, 3);
  }
  if (!newCard) {
    newCard = upgradeRandomForge(card);
    if (!newCard) {
      newCard = addForgeToCard(card);
    }
  }
  if (!newCard) {
    throw new Error('Could not upgrade card');
  }
  if (Math.random() < constants.FLAVOR_UPGRADE_CHANCE) {
    const flavouredCard = upgradeFlavor(newCard);
    if (flavouredCard) {
      newCard = flavouredCard;
    }
  }
  return newCard;
}

function upgradeCard(card) {
  const { level } = card;
  let upgradedCard = card;
  upgradedCard.level += 1;
  upgradedCard = levelUpCard(upgradedCard);
  if (level === 5) {
    upgradedCard = levelUpCard(upgradedCard);
    upgradedCard = levelUpCard(upgradedCard);
    upgradedCard = levelUpCard(upgradedCard);
  }
  return upgradedCard;
}

const startingUnitTypes = Object.values(unitTypes).filter((unitType) => !unitType.forgeLevel);
function generateUnit(level) {
  const cappedLevel = Math.min(Math.max(level, 0), 5);
  const statsAmount = randomInt(1, constants.STAT_THRESHOLDS[0]);
  const hp = randomInt(1, statsAmount);
  const attack = statsAmount - hp;
  const unitType = weightedSample(startingUnitTypes);

  let card = {
    level: 0,
    attack,
    hp,
    type: 'unit',
    unitTypes: [unitType.key],
  };

  for (let accumulator = 0; accumulator < cappedLevel; accumulator += 1) {
    card = upgradeCard(card);
  }

  const { hashContent, hash } = generateHash(card);
  card.hashContent = hashContent;
  card.hash = hash;
  card.name = generateName(card);
  return card;
}

const generateCard = generateUnit;

module.exports = { generateHash, generateCard, upgradeCard };
