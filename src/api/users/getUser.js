const db = require('../../db');

async function getUserGraphQL({ id }) {
  return db.users.getById(id);
}

module.exports = getUserGraphQL;
