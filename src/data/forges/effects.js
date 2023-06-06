// @TODO:
// 1. Review every passive / effect / trigger to see if they apply to weapons or spells
// 2. Create the forge tree for the effects.
// 3. Assign a cost/modificator for each effect

/*
 * Modify a stat of a card @TODO
 * Deploy @TODO
 * Summon / Cast @TODO
 * Destroy / Banish @TODO
 * Draw / Discard @TODO
 * Move @TODO
 * Deal damage @TODO
 * Retire / Recall @TODO
 * Duel @TODO
 * Give turn token / Advance / Delay turn @TODO
 * Modify investment @TODO
 * Modify currency (earn / collect / give / steal) @TODO
 * Modify zone size @TODO
 * Mutate / Transform / Upgrade / Downgrade / Forge / Unforge / Drain @TODO
 * Create / Discover @TODO
 * Give status @TODO
 * Heal @TODO
 * Random effect @TODO
 * Reveal / Disarm @TODO
 * Confuse / Betray @TODO
 * Give energy / Exhaust @TODO
 * Grant state until condition @TODO
 */

// @TODO Note, for balance and fun purposes I will add a ridiculous amount of range for effects
// In the future, tweak them for match their rarity

const { constants } = require('../enums');

const DEFAULT_MODS = [
  'ADD_OR_IMPROVE_TARGET',
  'ADD_OR_IMPROVE_SELECTOR',
  'ADD_OR_IMPROVE_CONDITION',
];

const effects = {
  deploy: {
    key: 'deploy',
    name: 'Deploy',
    description: 'Deploy a card to the target place',
    text: 'deploy $card',
    default: {
      from: {
        kingdom: 'owner',
        place: 'hand',
        text: 'the owner\'s hand',
      },
      target: 'random',
      value: {
        // $range: {
        //   min: 50,
        //   max: 149,
        // },
        $exponential: {
          min: 50,
          max: 500,
          step: 25,
          probability: 0.8,
        },
      },
      textContext: {
        card: 'a $target $value cost card from $from',
      },
      valueMultiplier: '$cost + $targetValue',
    },
    mods: [
      'ANOTHER_KINGDOM', // or upgrade
      'ANOTHER_PLACE', // or upgrade
      'UPGRADE_VALUE',
      'UPGRADE_TARGET_CARD',
      'ADD_SELECTOR', // or improve
    ],
    price: ({ value }) => value * 0.5,
  },
  draw: {
    key: 'draw',
    name: 'Draw',
    description: 'Draw cards from the target place',
    text: 'draw $amount card$plural from $from',
    default: {
      from: {
        kingdom: 'owner',
        place: 'deck',
        text: 'the owner\'s deck',
      },
      textContext: {
        plural: (context) => (context.amount > 1 ? 's' : ''),
      },
      // amount: 1,
      amount: {
        $exponential: {
          min: 1,
          max: 10,
          probability: 0.2,
        },
      },
    },
    mods: [
      ...DEFAULT_MODS,
      'IMPROVE_TARGET_KINGDOM',
      'IMPROVE_CARD_SELECTOR',
      'DISCARD',
      'CHANGE_PLACE',
    ],
    price: () => 20,
  },
  dealDamage: {
    key: 'dealDamage',
    name: 'Deal damage',
    description: 'Deal damage to the target card',
    text: 'deal $value damage to $card',
    default: {
      card: {
        target: 'randomEnemy',
        text: 'a random enemy',
      },
      value: {
        // $range: {
        //   min: 1,
        //   max: 2,
        // },
        $exponential: {
          min: 1,
          max: 10,
        },
      },
    },
    price: ({ value }) => value * 50,
  },
  modifyInvestment: {
    key: 'modifyInvestment',
    name: 'Modify investment',
    description: 'Modify the investment of the target kingdom',
    text: '$operation $value investment to $target',
    default: {
      target: {
        kingdom: 'owner',
        text: 'the owner',
      },
      operation: 'add',
      value: {
        // $range: {
        //   min: 10,
        //   max: 49,
        // },
        $exponential: {
          min: 10,
          max: 400,
          step: 10,
          probability: 0.9,
        },
      },
    },
    price: ({ value }) => value,
  },
  modifyCurrency: {
    key: 'modifyCurrency',
    name: 'Modify currency',
    description: 'Modify the currency of the target kingdom',
    text: '$operation $value $currency to $target',
    default: {
      target: {
        kingdom: 'owner',
        text: 'the owner',
      },
      operation: 'add',
      value: {
        // $range: {
        //   min: 10,
        //   max: 49,
        // },
        $exponential: {
          min: 20,
          max: 1000,
          step: 20,
          probability: 0.9,
        },
      },
      currency: 'gold',
    },
    price: ({ value }) => value * 0.8,
  },
  modifyStat: {
    key: 'modifyStat',
    name: 'Modify stat',
    description: 'Modify the stat of the target card',
    text: 'Give $value $stat to $card',
    default: {
      card: {
        target: 'randomAlly',
        text: 'a random ally',
      },
      value: {
        // $range: {
        //   min: 1,
        //   max: 2,
        // },
        $exponential: {
          min: 1,
          max: 10,
        },
      },
      stat: {
        $sample: [
          'attack',
          'hp',
        ],
      },
    },
    price: ({ value, stat }) => value * (stat === 'attack' ? constants.CARD_PRICE_PER_ATTACK_POINT : constants.CARD_PRICE_PER_HP_POINT),
  },
  destroy: {
    key: 'destroy',
    name: 'Destroy',
    description: 'Destroy the target card',
    text: 'destroy $card',
    default: {
      card: {
        target: 'randomEnemy',
        text: 'a random enemy',
      },
    },
    price: () => 400,
  },
  move: {
    key: 'move',
    name: 'Move',
    description: 'Move the target card to the target place',
    text: 'move $card to $place',
    default: {
      card: {
        $sample: [
          {
            target: 'randomAlly',
            text: 'a random ally',
          },
          {
            target: 'randomEnemy',
            text: 'a random enemy',
          },
        ],
      },
      place: {
        $sample: [
          {
            place: 'barracks',
            text: 'the barracks',
            price: ({ card }) => (card.target === 'randomAlly' ? -50 : 50),
          },
          {
            place: 'rangedZone',
            text: 'the ranged zone',
            price: ({ card }) => (card.target === 'randomAlly' ? -20 : 20),
          },
          {
            place: 'meleeZone',
            text: 'the melee zone',
          },
          {
            place: 'warZone',
            text: 'the war zone',
            price: ({ card }) => (card.target === 'randomAlly' ? 25 : -25),
          },
        ],
      },
    },
    price: ({ place, ...rest }) => (Object.hasOwnProperty.call(place, 'price') ? place.price(rest) : 0),
  },
  recall: {
    key: 'recall',
    name: 'Recall',
    description: 'Recall the target card',
    text: 'recall $card',
    default: {
      card: {
        target: 'randomEnemy',
        text: 'a random enemy',
      },
    },
    price: () => 100,
  },
  fight: {
    key: 'fight',
    name: 'Fight',
    description: 'Fight the target card',
    text: 'fight $card',
    default: {
      card: {
        target: 'randomEnemy',
        text: 'a random enemy',
      },
    },
    price: () => 0,
  },
  heal: {
    key: 'heal',
    name: 'Heal',
    description: 'Heal to the target card',
    text: 'heal $value hp of $card',
    default: {
      card: {
        target: 'randomInjuredAlly',
        text: 'a random injured ally',
      },
      value: {
        // $range: {
        //   min: 1,
        //   max: 2,
        // },
        $exponential: {
          min: 1,
          max: 10,
        },
      },
    },
    price: ({ value }) => value * 40,
  },
  betray: {
    key: 'betray',
    name: 'Betray',
    description: 'Betray the target card',
    text: '$card betrays',
    default: {
      card: {
        target: 'randomEnemy',
        text: 'a random enemy',
      },
    },
    price: () => 600,
  },
  resurrect: {
    key: 'resurrect',
    name: 'Resurrect',
    description: 'Resurrect the target card',
    text: 'resurrect $card',
    default: {
      card: {
        target: 'randomAlly',
        text: 'a random ally',
      },
    },
    price: () => 200,
  },
  discard: {
    key: 'discard',
    name: 'Discard',
    description: 'Discard the target card',
    text: 'discard $card',
    default: {
      card: {
        target: 'randomAlly',
        text: 'a random ally',
      },
    },
    price: () => -50,
  },
  summon: {
    key: 'summon',
    name: 'Summon',
    description: 'Summon a card to the target place',
    text: 'summon $card in $place',
    default: {
      target: 'random',
      value: {
        // $range: {
        //   min: 50,
        //   max: 149,
        // },
        $exponential: {
          min: 50,
          max: 1000,
          step: 25,
          probability: 0.8,
        },
      },
      place: {
        place: 'cardLocation',
        text: 'this card\'s location',
      },
      textContext: {
        card: 'a $target $value cost card',
      },
      valueMultiplier: '$cost + $targetValue',
    },
    price: ({ value }) => value,
  },
  create: {
    key: 'create',
    name: 'Create',
    description: 'Create a card and shuffle it into the deck',
    text: 'create $card',
    default: {
      target: 'random',
      value: {
        // $range: {
        //   min: 50,
        //   max: 149,
        // },
        $exponential: {
          min: 50,
          max: 2000,
          step: 50,
          probability: 0.9,
        },
      },
      textContext: {
        card: 'a $target $value cost card',
      },
      valueMultiplier: '$cost + $targetValue',
    },
    price: ({ value }) => value * 0.1,
  },
};

module.exports = effects;
