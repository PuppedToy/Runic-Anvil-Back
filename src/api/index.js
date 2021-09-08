const users = require('./users');
const forges = require('./forges');

module.exports = {
  alive: () => true,
  token: (_, req) => req && req.userToken && req.userToken.id,
  ...users,
  ...forges,
};
