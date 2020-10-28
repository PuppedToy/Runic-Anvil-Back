const { getUserById } = require('../../db');

async function getUserGraphQL({ id }) {
  return getUserById(id);
}

module.exports = getUserGraphQL;
