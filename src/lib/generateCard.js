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

function levelUpCard(card) {
  const cardForges = card.forges || [];
  const isNewForge = !cardForges.length || Math.random() < 0.5;
  let newCard;
  if (isNewForge) {
    newCard = addForgeToCard(card, 3);
    if (newCard) {
      console.log(`Added forge to card ${JSON.stringify(newCard, null, 2)}`);
    }
  }
  if (!newCard) {
    newCard = upgradeRandomForge(card);
    if (!newCard) {
      newCard = addForgeToCard(card);
      console.log(`Could not find a forge to upgrade. Added forge to card ${JSON.stringify(newCard, null, 2)}`);
    } else {
      console.log(`Upgraded forge on card ${JSON.stringify(newCard, null, 2)}`);
    }
  }
  if (!newCard) {
    throw new Error('Could not upgrade card');
  }
  if (Math.random() < constants.FLAVOR_UPGRADE_CHANCE) {
    console.log('Upgrading flavor...');
    const flavouredCard = upgradeFlavor(newCard);
    if (flavouredCard) {
      console.log(`Upgraded flavor on card ${JSON.stringify(flavouredCard, null, 2)}`);
      newCard = flavouredCard;
    } else {
      console.log('Could not upgrade flavor');
    }
  }
  return newCard;
}

function upgradeCard(card) {
  const { level } = card;
  let upgradedCard = card;
  upgradedCard = levelUpCard(upgradedCard);
  if (level === 5) {
    upgradedCard = levelUpCard(upgradedCard);
    upgradedCard = levelUpCard(upgradedCard);
    upgradedCard = levelUpCard(upgradedCard);
  }
  upgradedCard.level += 1;
  const { hashContent, hash } = generateHash(card);
  upgradedCard.hashContent = hashContent;
  upgradedCard.hash = hash;
  return upgradedCard;
}

const startingUnitTypes = Object.values(unitTypes).filter((unitType) => !unitType.forgeLevel);
function generateUnit(level = 1) {
  if (level < 0) throw new Error('Level must be positive');
  const statsAmount = randomInt(1, constants.STAT_THRESHOLDS[0]);
  const hp = randomInt(1, statsAmount);
  const attack = statsAmount - hp;
  const unitType = weightedSample(startingUnitTypes);

  let card = {
    level: 1,
    attack,
    hp,
    type: 'unit',
    unitTypes: [unitType.key],
  };

  console.log(`Created base card ${JSON.stringify(card, null, 2)}`);

  for (let accumulator = 1; accumulator < level; accumulator += 1) {
    card = upgradeCard(card);
  }

  card.name = generateName(card);
  console.log(`Forged: ${JSON.stringify(card, null, 2)}`);
  return card;
}

function addForgeToCard(card, maxIterations) {
  const forge = generateForge(card, maxIterations);
  if (!forge) return null;
  return applyForge(forge, card);
}

const generateCard = generateUnit;

module.exports = { generateHash, generateCard, upgradeCard };
