const triggerableEffects = {
  action: {
    name: 'Action',
    description: 'Actions can be triggered only before the attack phase and it exhaust the card that uses the action.',
    costModificator: ({ cost }) => cost * 2,
  },
  quickAction: {
    name: 'Quick action',
    description: 'Quick actions can be triggered once per turn at any point and without cost',
    costModificator: ({ cost }) => cost * 3,
  },
  hire: {
    name: 'Hire',
    description: 'The owner must pay a price to activate the effect of the card, and the card is exhausted when using this effect. These are actions with price.',
    costModificator: ({ cost }) => cost * 0.5,
  },
  buy: {
    name: 'Buy',
    description: 'The owner must pay a price to activate the effect of the card and it can be played any number of times.',
    costModificator: ({ cost }) => cost * 1.2,
  },
};

module.exports = triggerableEffects;
