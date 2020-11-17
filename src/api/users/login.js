const jwt = require('jsonwebtoken');

const db = require('../../db');

async function loginGraphQL({ name, password }) {
  try {
    const user = await db.users.verify(name, password);
    let token = null;
    if (user) {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    }
    return token;
  } catch (error) {
    return false;
  }
}

module.exports = loginGraphQL;
