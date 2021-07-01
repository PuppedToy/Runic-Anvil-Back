const generateForge = require('./generateForge');

const N_FORGES = 30;

// eslint-disable-next-line no-console
console.log(JSON.stringify(
  new Array(N_FORGES).fill().map(() => generateForge(3)),
));
