const weightedSample = require('../../utils/weightedSample');
const { randomInt } = require('../../utils/random');
const { constants } = require('../../data/enums');
const { forgeGenerators } = require('./forgeGenerators');

function getCardBaseCost(card) {
  return parseInt(
    (
      card.attack * constants.CARD_PRICE_PER_ATTACK_POINT
      + card.hp * constants.CARD_PRICE_PER_HP_POINT
    ), 10,
  );
}

function getCost(card) {
  let baseCost = getCardBaseCost(card);
  console.log(baseCost);
  const forges = card.forges || [];
  let newCard = { ...card, cost: baseCost };
  // @TODO This is an arbitrary order to apply costs. It may change
  console.log(JSON.stringify(forges, null, 2));
  forges.forEach((forge, forgeIndex) => {
    const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
    if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
    newCard = forgeGenerator.applyCost(baseCost, forge, card, forgeIndex);
    console.log(forge.type, newCard.cost);
    baseCost = newCard.cost;
  });
  return newCard.cost;
}

function canBeCommander(card) {
  const forges = card.forges || [];
  const isCommanderForbidden = forges.some((forge) => {
    const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
    if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
    return forgeGenerator.isCommanderForbidden(forge);
  });
  const interestingForgeTypes = [
    'addEffectOnTrigger',
    'addEffectOnAction',
    'addOngoingEffects',
  ];
  const hasForgesOfInterestingCommanderTypes = forges.some(
    (forge) => interestingForgeTypes.includes(forge.type),
  );
  const baseCost = getCardBaseCost(card);
  const cardCost = getCost(card);
  const allowed = !isCommanderForbidden
    && (cardCost - baseCost) <= constants.COMMANDER_DEFAULT_VALUE;
  // @TODO Should check each forge value to see if it's recommended
  const recommended = allowed
    && hasForgesOfInterestingCommanderTypes
    && (cardCost - baseCost) >= constants.RECOMMENDED_COMMANDER_LOWER_THRESHOLD;
  return {
    allowed,
    recommended,
  };
}

function getCardComplexity(card) {
  return (card.forges || []).reduce((acc, forge) => acc + (forgeGenerators.find(
    (generator) => generator.type === forge.type,
  )?.complexity || 0), 0);
}

function applyForge(forge, card) {
  const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
  if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
  if (!card) throw new Error('Card is required');
  const newCard = forgeGenerator.apply(forge, card);
  if (!newCard.forges) {
    newCard.forges = [];
  }
  newCard.forges.push(forge);
  return newCard;
}

function applyMod(mod, forgeIndex, forge, card) {
  const forgeGenerator = forgeGenerators.find((generator) => generator.type === forge.type);
  if (!forgeGenerator) throw new Error(`Forge generator not found for type ${forge.type}`);
  let newCard;
  if (!forge.mods) {
    // eslint-disable-next-line no-param-reassign
    forge.mods = [];
  }
  forge.mods.push(mod);
  if (forgeGenerator.applyMod) {
    newCard = forgeGenerator.applyMod(mod, forge, card);
  } else {
    newCard = forgeGenerator.apply(forge, card);
  }
  newCard.forges[forgeIndex] = forge;
  return newCard;
}

function upgradeFlavor(card) {
  const addRegionForgeGenerator = forgeGenerators.find((forge) => forge.type === 'addRegion');
  let newCard;
  if (!card.region) {
    const regionForge = addRegionForgeGenerator.generate(card);
    if (!regionForge) {
      console.error(`Card ${card.name} doesn't have a region and can't generate one`);
      return newCard;
    }
    regionForge.type = 'addRegion';
    newCard = applyForge(regionForge, card);
  } else {
    const regionForge = card.forges.find((forge) => forge.type === 'addRegion');
    const upgradeResult = addRegionForgeGenerator.upgrade(regionForge, card);
    if (!upgradeResult) {
      return newCard;
    }
    const { mod, forge: upgradedForge } = upgradeResult;
    const forgeIndex = card.forges.findIndex((forge) => forge === regionForge);
    newCard = applyMod(mod, forgeIndex, upgradedForge, card);
  }
  return newCard;
}

function generateForge(card, maxIterations = 10000) {
  let forgeGenerator;
  let forge = null;
  const cardComplexity = getCardComplexity(card);
  for (let i = 0; !forge && i < maxIterations; i += 1) {
    forgeGenerator = weightedSample(forgeGenerators);
    const forgeComplexity = forgeGenerator.complexity || 0;
    if (forgeComplexity) {
      const nextComplexity = cardComplexity + (forgeComplexity);
      let chanceToSkip = i * -0.02;
      if (nextComplexity >= 2 && nextComplexity < 3) {
        chanceToSkip += 0.5;
      } else if (nextComplexity >= 3 && nextComplexity < 4) {
        chanceToSkip += 0.75;
      } else if (nextComplexity >= 4) {
        chanceToSkip += 1;
      }
      if (Math.random() < chanceToSkip) {
        // eslint-disable-next-line no-continue
        continue;
      }
    }
    forge = forgeGenerator.generate(card);
  }
  if (!forge) {
    return null;
  }
  return {
    type: forgeGenerator.type,
    ...forge,
  };
}

function upgradeRandomForge(card) {
  const remainingForges = [...(card.forges || [])].filter((forge) => forge.type !== 'addRegion');
  while (remainingForges.length) {
    const chosenForgeIndex = randomInt(0, remainingForges.length - 1);
    const chosenForge = remainingForges[chosenForgeIndex];
    remainingForges.splice(chosenForgeIndex, 1);
    const forgeGenerator = forgeGenerators.find((generator) => generator.type === chosenForge.type);
    if (!forgeGenerator) throw new Error(`Forge generator not found for type ${chosenForge.type}`);
    const upgradeResult = forgeGenerator.upgrade(chosenForge, card);
    if (!upgradeResult) {
      // eslint-disable-next-line no-continue
      continue;
    }
    const { mod, forge: upgradedForge } = upgradeResult;
    const forgeIndex = card.forges.findIndex((forge) => forge === chosenForge);
    const newCard = applyMod(mod, forgeIndex, upgradedForge, card);
    return newCard;
  }
  return null;
}

function applyCardCalculatedFields(card) {
  const cost = getCost(card);
  const newCard = { ...card, cost };
  const { allowed, recommended } = canBeCommander(card);
  newCard.canBeCommander = allowed;
  newCard.recommendedAsCommander = recommended;
  delete newCard.forges;
  return newCard;
}

module.exports = {
  generateForge,
  applyForge,
  upgradeRandomForge,
  getCost,
  canBeCommander,
  applyCardCalculatedFields,
  upgradeFlavor,

  forgeGenerators,
};
