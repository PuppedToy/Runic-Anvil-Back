const db = require('../../db');

async function getUserGraphQL({ id }) {
  if (!id) {
    throw new Error('id parameter is needed');
  }

  return db.users.getById(id);
}

module.exports = getUserGraphQL;
