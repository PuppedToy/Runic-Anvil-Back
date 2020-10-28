const { createUser } = require('../../db');

async function createUserGraphQL({ name, password }) {
  try {
    await createUser(name, password);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = createUserGraphQL;
