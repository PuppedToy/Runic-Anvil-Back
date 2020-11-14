const jwt = require('jsonwebtoken');

const { verifyUser } = require('../../db');

async function loginGraphQL({ name, password }) {
  try {
    const user = await verifyUser(name, password);
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
