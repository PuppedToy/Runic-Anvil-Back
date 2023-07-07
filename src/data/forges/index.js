const actions = require('./actions');
const cardSelectors = require('./cardSelectors');
const cardStats = require('./cardStats');
const cardTypes = require('./cardTypes');
const conditions = require('./conditions');
const effects = require('./effects');
const elements = require('./elements');
const eligibleTargetsCards = require('./eligibleTargetsCards');
const eligibleTargetsKingdoms = require('./eligibleTargetsKingdoms');
const forgeTypes = require('./forgeTypes');
const kingdomStats = require('./kingdomStats');
const ongoingEffects = require('./ongoingEffects');
const passiveEffects = require('./passiveEffects');
const targetTypes = require('./targetTypes');
const triggerableEffects = require('./triggerableEffects');
const triggers = require('./triggers');
const unitTypes = require('./unitTypes');
const zones = require('./zones');

module.exports = {
  actions,
  cardSelectors,
  cardStats,
  cardTypes,
  conditions,
  effects,
  elements,
  eligibleTargetsCards,
  eligibleTargetsKingdoms,
  forgeTypes,
  kingdomStats,
  ongoingEffects,
  passiveEffects,
  targetTypes,
  triggerableEffects,
  triggers,
  unitTypes,
  zones,
};

/* eslint-disable max-len */
// General @TODO and WARNING:
// We need to ensure any effect that might chain only applies a max number of times (maybe 1, 2 or 5)
// Example:
// Unit 1: Whenever a friendly unit activates a triggereable effect, trigger a triggereable effect of a friendly unit
// Unit 2: Quick action: earn 4$

// Note that the amount of chosen targets may vary and will never be more than the eligible targets count
// unless specified by the card text

// Extras for both kingdoms and cards
// EXTRA A: All that meet 1 of many of the above conditions
// EXTRA B: All that meet many of the above conditions
// EXTRA C: All that does NOT meet the conditions

// Compounded effect ideas
// 1. Grant a passive effect to (eligible) cards
// 2. Remove a passive effect from (eligible) cards
// 3. Apply an effect to (eligible) cards

// EXTRA A: Any of the above may be done if a condition is met (we have to define condition yet). Eligible cards follow conditions actually, but there may be other conditions
