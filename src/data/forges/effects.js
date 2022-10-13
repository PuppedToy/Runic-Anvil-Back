// TODO:
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

const effects = {
  deploy: {
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
        range: {
          min: 20,
          max: 149,
        },
      },
      textContext: {
        card: 'a $target $value cost card from $from',
      },
      valueMultiploer: '$cost + $targetValue',
    },
    mods: [
      'ANOTHER_KINGDOM', // or upgrade
      'ANOTHER_PLACE', // or upgrade
      'UPGRADE_VALUE',
      'UPGRADE_TARGET_CARD',
      'ADD_SELECTOR', // or improve
    ],
  },
  draw: {
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
      amount: 1,
    },
  },
  dealDamage: {
    name: 'Deal damage',
    description: 'Deal damage to the target card',
    text: 'deal $value damage to $card',
    default: {
      card: {
        target: 'randomEnemy',
        text: 'a random enemy',
      },
      value: {
        range: {
          min: 1,
          max: 2,
        },
      },
    },
  },
  modifyInvestment: {
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
        range: {
          min: 1,
          max: 19,
        },
      },
    },
  },
  modifyCurrency: {
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
        range: {
          min: 20,
          max: 49,
        },
      },
      currency: 'gold',
    },
  },
};

module.exports = effects;
