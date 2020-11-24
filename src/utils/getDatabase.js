const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

let connectionPromise;

function connectDatabase() {
  if (connectionPromise) {
    connectionPromise
      .finally(() => client.close())
      .finally(() => {
        connectionPromise = client.connect();
        return connectionPromise;
      })
      .then(() => client.db(process.env.DB_NAME));
  } else {
    connectionPromise = client.connect()
      .then(() => client.db(process.env.DB_NAME));
  }
}

connectDatabase();

function getDatabase(collection = null) {
  if (collection && (typeof collection !== 'string')) {
    return Promise.reject(new Error('The parameter collection should be a string'));
  }

  if (!collection) {
    return connectionPromise;
  }

  return connectionPromise
    .then((db) => db.collection(collection));
}

function closeDatabase() {
  connectionPromise
    .then(() => client.close())
    .then(() => {
      connectionPromise = Promise.reject(new Error('The connection is closed'));
    });
}

module.exports = {
  getDatabase,
  connectDatabase,
  closeDatabase,
};
