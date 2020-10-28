const users = require('./users');

module.exports = {
  alive: () => true,
  ...users,
};
