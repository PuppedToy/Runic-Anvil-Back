const sampleUser = {
  id: 'a1a4069e-cfc3-5484-bb7a-ad8c6e31570b',
  name: 'NinaSchwartz',
  email: 'joli@pugdakcut.ax',
  validated: true,
  state: 'idle',
  settings: {},
  stats: {},
  bag: {
    gold: 154,
    runicEssence: 94,
    packs: 0,
  },
  ownedCards: [],
  quests: [],
  recentGames: [],
  collection: [],
  achievements: [],
  friends: [],
  reported: [],
  muted: [],
  chats: [],
};

module.exports = function () {
  return { ...sampleUser };
};
