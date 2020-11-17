const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);
const connectionPromise = client.connect()
  .then(() => client.db(process.env.DB_NAME));

function getDatabase(collection = null) {
  if (!collection) {
    return connectionPromise;
  }

  return connectionPromise
    .then((db) => db.collection(collection));
}

module.exports = getDatabase;
