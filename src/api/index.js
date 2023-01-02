const users = require('./users');
const forges = require('./forges');
const cards = require('./cards');

module.exports = {
  alive: () => true,
  token: (_, req) => req && req.userToken && req.userToken.id,
  ...users,
  ...forges,
  ...cards,
};
