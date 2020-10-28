const { MongoClient, ObjectId } = require('mongodb');
const argon2 = require('argon2');

const client = new MongoClient(process.env.MONGODB_URI);
const connectionPromise = client.connect()
  .then(() => client.db(process.env.DB_NAME));

function getDatabase() {
  return connectionPromise;
}

const baseUser = {
  validated: false,
  state: 'idle',
  settings: {},
  stats: {},
  bag: {
    gold: 0,
    runicEssence: 0,
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
  email: null,
  team: null,
  currentGame: null,
};

async function getUserById(id) {
  const db = await getDatabase();
  const user = await db.collection('users').findOne({ _id: ObjectId(id) });

  return user ? {
    id: user._id,
    ...user,
  } : null;
}
module.exports.getUserById = getUserById;

async function createUser(name, password) {
  const [db, hashedPassword] = await Promise.all([
    getDatabase(),
    argon2.hash(password),
  ]);

  const result = await db.collection('users').insertOne({
    name,
    password: hashedPassword,
    ...baseUser,
  });

  // This result contains insertedId, insertedCount and ops[] as fields that could be used.
  return result;
}
module.exports.createUser = createUser;
