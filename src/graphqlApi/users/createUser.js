const db = require('../../db');

// @TODO return creation result instead of true or false
async function createUserGraphQL({ name, password }) {
  try {
    await db.users.create(name, password);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = createUserGraphQL;
