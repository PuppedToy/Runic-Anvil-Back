const { places, kingdoms, targets, operations, stats, creations } = require('../enums');
const { randomInt } = require('../../utils/random');
const weightedSample = require('../../utils/weightedSample');
const { cardSelectors } = require('.');

  const deployValueLevel1Mod = {
    id: 'value',
    modLevel: 1,
    value: {
      $range: {
        min: 250,
        max: 500,
        step: 50,
      },
    },
  };
  
  const deployValueLevel2Mod = {
    id: 'value',
    modLevel: 2,
    value: {
      $range: {
        min: 550,
        max: 900,
        step: 50,
      },
    },
  };
  
  const deployValueLevel3Mod = {
    id: 'value',
    modLevel: 3,
    value: {
      $exponential: {
        min: 1000,
        max: 10000,
        step: 100,
        probability: 0.75,
      },
    },
  };
  
  const deployValueMods = [
    deployValueLevel1Mod,
    deployValueLevel2Mod,
    deployValueLevel3Mod,
  ];
  
  const drawValueLevel1Mod = {
    id: 'value',
    modLevel: 1,
    value: 2
  };
  
  const drawValueLevel2Mod = {
    id: 'value',
    modLevel: 2,
    value: {
      $range: {
        min: 3,
        max: 4,
      },
    },
  };
  
  const drawValueLevel3Mod = {
    id: 'value',
    modLevel: 3,
    value: {
      $exponential: {
        min: 5,
        max: 10,
        step: 1,
        probability: 0.75,
      },
    },
  };
  
  const drawValueMods = [
    drawValueLevel1Mod,
    drawValueLevel2Mod,
    drawValueLevel3Mod,
  ];
  
  const dealDamageValueLevel1Mod = {
    id: 'value',
    modLevel: 1,
    value: {
      $range: {
        min: 3,
        max: 4,
      },
    },
  };
  
  const dealDamageValueLevel2Mod = {
    id: 'value',
    modLevel: 2,
    value: {
      $range: {
        min: 5,
        max: 7,
      },
    },
  };
  
  const dealDamageValueLevel3Mod = {
    id: 'value',
    modLevel: 2,
    value: {
      $exponential: {
        min: 8,
        max: 100,
        step: 1,
        probability: 0.75,
      },
    },
  };
  
  const dealDamageValueMods = [
    dealDamageValueLevel1Mod,
    dealDamageValueLevel2Mod,
    dealDamageValueLevel3Mod,
  ];
  
  const modifyInvestmentValueLevel1Mod = {
    id: 'value',
    modLevel: 1,
    value: {
      $range: {
        min: 75,
        max: 200,
        step: 25,
      },
    },
  };
  
  const modifyInvestmentValueLevel2Mod = {
    id: 'value',
    modLevel: 2,
    value: {
      $range: {
        min: 250,
        max: 500,
        step: 50,
      },
    },
  };
  
  
  const modifyInvestmentValueLevel3Mod = {
    id: 'value',
    modLevel: 3,
    value: {
      $exponential: {
        min: 600,
        max: 10000,
        step: 50,
        probability: 0.75,
      },
    },
  };
  
  const modifyInvestmentValueMods = [
    modifyInvestmentValueLevel1Mod,
    modifyInvestmentValueLevel2Mod,
    modifyInvestmentValueLevel3Mod,
  ];
  
  const modifyCurrencyValueLevel1Mod = {
    id: 'value',
    modLevel: 1,
    value: {
      $range: {
        min: 200,
        max: 400,
        step: 25,
      },
    },
  };
  
  const modifyCurrencyValueLevel2Mod = {
    id: 'value',
    modLevel: 2,
    value: {
      $range: {
        min: 450,
        max: 900,
        step: 50,
      },
    },
  };
  
  const modifyCurrencyValueLevel3Mod = {
    id: 'value',
    modLevel: 3,
    value: {
      $exponential: {
        min: 1000,
        max: 100000,
        step: 100,
        probability: 0.75,
      },
    },
  };
  
  const modifyCurrencyValueMods = [
    modifyCurrencyValueLevel1Mod,
    modifyCurrencyValueLevel2Mod,
    modifyCurrencyValueLevel3Mod,
  ];
  
  const generateStatMethod = (minIncrement, maxIncrement) => ({ [stats.ATTACK]: attack = 0, [stats.HP]: hp = 0 }) => {
    const totalIncrement = randomInt(minIncrement, maxIncrement);
    const random = Math.random();
    let attackIncrement = 0;
    let hpIncrement = 0;
    if (random < 0.3) {
      attackIncrement = totalIncrement;
    }
    else if (random < 0.6) {
      hpIncrement = totalIncrement;
    }
    else {
      attackIncrement = randomInt(1, totalIncrement - 1);
      hpIncrement = totalIncrement - attackIncrement;
    }
    const result = {};
    if (attackIncrement > 0) {
      result[stats.ATTACK] = attack + (attack >= 0 ? attackIncrement : -attackIncrement);
    }
    if (hpIncrement > 0) {
      result[stats.HP] = hp + (hp >= 0 ? hpIncrement : -hpIncrement);
    }
    return result;
  };
  
  const statValueLevel1Mod = {
    id: 'value',
    modLevel: 1,
    stats: {
      $custom: {
        method: generateStatMethod(3, 5),
      },
    },
  };
  
  const statValueLevel2Mod = {
    id: 'value',
    modLevel: 2,
    stats: {
      $custom: {
        method: generateStatMethod(6, 10),
      },
    },
  };
  
  const statValueLevel3Mod = {
    id: 'value',
    modLevel: 3,
    stats: {
      $custom: {
        method: generateStatMethod(12, 30),
      },
    },
  };
  
  const reverseStatsMod = {
    id: 'reverse',
    stats: {
      $custom: {
        method: ({ [stats.ATTACK]: attack = 0, [stats.HP]: hp = 0 }) => {
          const result = {};
          if (attack > 0) {
            result[stats.ATTACK] = -attack;
          }
          if (hp > 0) {
            result[stats.HP] = -hp;
          }
          return result;
        },
      },
    }
  };
  
  const statMods = [
    statValueLevel1Mod,
    statValueLevel2Mod,
    statValueLevel3Mod,
    reverseStatsMod,
  ];
  
  const resurrectValueLevel1Mod = {
    id: 'value',
    modLevel: 1,
    forgeLevel: 4,
    value: 2,
  };
  
  const resurrectValueLevel2Mod = {
    id: 'value',
    modLevel: 2,
    value: 3,
  };
  
  const resurrectValueMods = [
    resurrectValueLevel1Mod,
    resurrectValueLevel2Mod,
  ];
  
  const summonValueLevel1Mod = {
    id: 'value',
    modLevel: 1,
    value: {
      $range: {
        min: 200,
        max: 400,
        step: 40,
      },
    },
  };
  
  const summonValueLevel2Mod = {
    id: 'value',
    modLevel: 2,
    value: {
      $range: {
        min: 450,
        max: 700,
        step: 50,
      },
    },
  };
  
  const summonValueLevel3Mod = {
    id: 'value',
    modLevel: 3,
    value: {
      $exponential: {
        min: 800,
        max: 10000,
        step: 100,
        probability: 0.75,
      },
    },
  };
  
  const summonValueMods = [
    summonValueLevel1Mod,
    summonValueLevel2Mod,
    summonValueLevel3Mod,
  ];
  
  const createValueLevel1Mod = {
    id: 'value',
    modLevel: 1,
    value: {
      $range: {
        min: 350,
        max: 500,
        step: 50,
      },
    },
  };
  
  const createValueLevel2Mod = {
    id: 'value',
    modLevel: 2,
    value: {
      $range: {
        min: 550,
        max: 900,
        step: 50,
      },
    },
  };
  
  const createValueLevel3Mod = {
    id: 'value',
    modLevel: 3,
    value: {
      $exponential: {
        min: 1000,
        max: 100000,
        step: 100,
        probability: 0.75,
      },
    },
  };
  
  const createValueMods = [
    createValueLevel1Mod,
    createValueLevel2Mod,
    createValueLevel3Mod,
  ];
  
  const discardValueLevel1Mod = {
    id: 'value',
    modLevel: 1,
    value: 2,
  };
  
  const discardValueLevel2Mod = {
    id: 'value',
    modLevel: 2,
    value: {
      $exponential: {
        min: 3,
        max: 10,
        step: 1,
        probability: 0.25,
      },
    },
  };
  
  const discardValueMods = [
    discardValueLevel1Mod,
    discardValueLevel2Mod,
  ];
  
  const fromDeckMod = {
    id: 'fromPlace',
    modLevel: 1,
    from: {
      place: 'deck',
    },
  };
  
  const toRangedOrMeleeMod = {
    id: 'toPlace',
    modLevel: 1,
    to: {
      place: {
        $sample: [
          'rangedZone',
          'meleeZone',
        ],
      },
    },
  };
  
  const toWarOrSiegeMod = {
    id: 'toPlace',
    modLevel: 2,
    to: {
      place: {
        $sample: [
          'warZone',
          'siegeZone',
        ],
      },
    },
  };
  
  const deployToPlaceMods = [
    toRangedOrMeleeMod,
    toWarOrSiegeMod,
  ];
  
  const toWarOrBarracksMod = {
    id: 'toPlace',
    modLevel: 1,
    to: {
      place: {
        $sample: [places.WAR_ZONE, places.BARRACKS],
      },
    },
  };
  
  const toSiegeMod = {
    id: 'toPlace',
    modLevel: 2,
    to: {
      place: places.SIEGE_ZONE,
    },
  };
  
  const moveToPlaceMods = [
    toWarOrBarracksMod,
    toSiegeMod,
  ];
  
  const toPlaceDeckModForgeLevel3 = {
    id: 'toPlace',
    modLevel: 1,
    forgeLevel: 3,
    to: {
      place: places.DECK,
    },
  };
  
  const { BARRACKS: _BARRACKS, NONE: _NONE, ...allPlacesButBarracks } = places;
  const toPlaceAnyButBarracksMod = {
    id: 'toPlace',
    modLevel: 1,
    forgeLevel: 3,
    to: {
      place: {
        $sample: [...allPlacesButBarracks],
      },
    },
  };
  
  
  const toPlaceAnyIngameButBarracksMod = {
    id: 'toPlace',
    modLevel: 1,
    forgeLevel: 3,
    to: {
      place: {
        $sample: [
          places.RANGED_ZONE,
          places.MELEE_ZONE,
          places.WAR_ZONE,
          places.SIEGE_ZONE,
        ],
      },
    },
  };
  
  const toPlaceHandMod = {
    id: 'toPlace',
    modLevel: 1,
    to: {
      place: places.HAND,
    },
  };
  
  const toDeckMod = {
    id: 'to',
    modLevel: 1,
    to: {
      place: places.DECK,
    },
  };
  
  const toOwnerOrAllyLevel2Mod = {
    id: 'to',
    modLevel: 2,
    to: {
      kingdom: {
        $sample: [kingdoms.OWNER, kingdoms.ALLY],
      }
    },
  };
  
  const toKingdomAllyMod = {
    id: 'toKingdom',
    modLevel: 1,
    to: {
      kingdom: kingdoms.ALLY,
    },
    kingdomSelector: 'toKingdom',
  };
  
  const fromKingdomOwnerMod = {
    id: 'fromKingdom',
    modLevel: 1,
    to: {
      kingdom: kingdoms.OWNER,
    },
    kingdomSelector: 'fromKingdom',
  };
  
  const fromKingdomAllyLevel2Mod = {
    id: 'fromKingdom',
    modLevel: 2,
    to: {
      kingdom: kingdoms.ALLY,
    },
    kingdomSelector: 'fromKingdom',
  };
  
  const toKingdomEnemyLevel2Mod = {
    id: 'toKingdom',
    modLevel: 2,
    to: {
      kingdom: kingdoms.ENEMY,
    },
  };
  
  const toKingdomAllyModForgeLevel3 = {
    id: 'toKingdom',
    modLevel: 1,
    forgeLevel: 3,
    to: {
      kingdom: kingdoms.ALLY,
    },
    kingdomSelector: 'toKingdom',
  };
  
  const toKingdomEnemyLevel2ModForgeLevel4 = {
    id: 'toKingdom',
    modLevel: 2,
    forgeLevel: 4,
    to: {
      kingdom: kingdoms.ENEMY,
    },
  };
  
  const toKingdomEnemySubtractMod = {
    id: 'toKingdom',
    modLevel: 2,
    to: {
      kingdom: kingdoms.ENEMY,
    },
    operations: operations.SUBTRACT,
    kingdomSelector: 'toKingdom',
  };
  
  const toKingdomEnemyStealMod = {
    id: 'toKingdom',
    modLevel: 3,
    to: {
      kingdom: kingdoms.ENEMY,
    },
    operations: operations.STEAL,
    kingdomSelector: 'toKingdom',
  };
  
  const toKingdomGoldMods = [
    toKingdomAllyMod,
    toKingdomEnemySubtractMod,
    toKingdomEnemyStealMod,
  ];
  
  const reverseGoldMod = {
    id: 'reverse',
    forgeLevel: 4,
    to: {
      $custom: {
        method: ({ to }) => {
          if (to.kingdom === kingdoms.ALLY) {
            return kingdoms.ENEMY;
          }
          else if (to.kingdom === kingdoms.ENEMY) {
            return Math.random() > 0.5 ? kingdoms.ALLY : kingdoms.OWNER;
          }
        }
      }
    },
    operation: {
      $custom: {
        method: ({ operation }) => {
          if (operation === operations.ADD) {
            return operations.SUBTRACT;
          }
          else if (operation === operations.SUBTRACT || operation === operations.STEAL) {
            return operations.ADD;
          }
        }
      },
    },
  };
  
  const fromKingdomAllyMod = {
    id: 'fromKingdom',
    modLevel: 1,
    from: {
      kingdom: kingdoms.ALLY,
    },
    kingdomSelector: 'fromKingdom',
  };
  
  const fromKingdomEnemyModForgeLevel3 = {
    id: 'fromKingdom',
    modLevel: 1,
    forgeLevel: 3,
    from: {
      kingdom: kingdoms.ENEMY,
    },
    kingdomSelector: 'fromKingdom',
  };
  
  const fromKingdomEnemyLevel2Mod = {
    id: 'fromKingdom',
    modLevel: 2,
    from: {
      kingdom: kingdoms.ENEMY,
    },
    kingdomSelector: 'fromKingdom',
  };
  
  const banishModForgeLevel4 = {
    id: 'banish',
    modLevel: 1,
    forgeLevel: 4,
    banish: true,
  };
  
  const randomCreationMod = {
    id: 'creation',
    modLevel: 1,
    creation: creations.RANDOM,
    cardSelector: 'creation',
  };
  
  const discoverMod = {
    id: 'creation',
    modLevel: 2,
    creation: creations.DISCOVER,
  };
  
  const improveTargetLevel1Mod = {
    id: 'improveTarget',
    modLevel: 1,
    target: targets.RANDOM,
  };
  
  const improveTargetLevel2Mod = {
    id: 'improveTarget',
    modLevel: 2,
    target: targets.ALL,
  };
  
  const improveTargetMods = [
    improveTargetLevel1Mod,
    improveTargetLevel2Mod,
  ];
  
  const addOrUpdateCardSelectorMod = {
    id: 'addSelector',
    modLevel: 1,
    cardSelector: {
      $custom: {
        method: ({ cardSelector }) => {
          const availableSelectors = Object.keys(cardSelector);
          if (availableSelectors.length === 0) {
            return null;
          }
          const chosenSelector = weightedSample(availableSelectors);
          if (chosenSelector === null) {
            return {
              [chosenSelector]: {
                $sample: cardSelectors,
              }
            }
          }
          else {
            // @TODO Update
            return null;
          }
        },
      }
    }
  };
  
module.exports = {
    effects: {
        deployValueLevel1Mod,
        deployValueLevel2Mod,
        deployValueLevel3Mod,
        deployValueMods,
        drawValueLevel1Mod,
        drawValueLevel2Mod,
        drawValueLevel3Mod,
        drawValueMods,
        dealDamageValueLevel1Mod,
        dealDamageValueLevel2Mod,
        dealDamageValueLevel3Mod,
        dealDamageValueMods,
        modifyInvestmentValueLevel1Mod,
        modifyInvestmentValueLevel2Mod,
        modifyInvestmentValueLevel3Mod,
        modifyInvestmentValueMods,
        modifyCurrencyValueLevel1Mod,
        modifyCurrencyValueLevel2Mod,
        modifyCurrencyValueLevel3Mod,
        modifyCurrencyValueMods,
        statValueLevel1Mod,
        statValueLevel2Mod,
        statValueLevel3Mod,
        reverseStatsMod,
        statMods,
        resurrectValueLevel1Mod,
        resurrectValueLevel2Mod,
        resurrectValueMods,
        summonValueLevel1Mod,
        summonValueLevel2Mod,
        summonValueLevel3Mod,
        summonValueMods,
        createValueLevel1Mod,
        createValueLevel2Mod,
        createValueLevel3Mod,
        createValueMods,
        discardValueLevel1Mod,
        discardValueLevel2Mod,
        discardValueMods,
        fromDeckMod,
        toRangedOrMeleeMod,
        toWarOrSiegeMod,
        deployToPlaceMods,
        toWarOrBarracksMod,
        toSiegeMod,
        moveToPlaceMods,
        toPlaceDeckModForgeLevel3,
        toPlaceAnyButBarracksMod,
        toPlaceAnyIngameButBarracksMod,
        toPlaceHandMod,
        toDeckMod,
        toOwnerOrAllyLevel2Mod,
        toKingdomAllyMod,
        fromKingdomOwnerMod,
        fromKingdomAllyLevel2Mod,
        toKingdomEnemyLevel2Mod,
        toKingdomAllyModForgeLevel3,
        toKingdomEnemyLevel2ModForgeLevel4,
        toKingdomEnemySubtractMod,
        toKingdomEnemyStealMod,
        toKingdomGoldMods,
        reverseGoldMod,
        fromKingdomAllyMod,
        fromKingdomEnemyModForgeLevel3,
        fromKingdomEnemyLevel2Mod,
        banishModForgeLevel4,
        randomCreationMod,
        discoverMod,
        improveTargetLevel1Mod,
        improveTargetLevel2Mod,
        improveTargetMods,
        addOrUpdateCardSelectorMod,
    },
};