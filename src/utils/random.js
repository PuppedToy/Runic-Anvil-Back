function randomInt(min, max, step) {
  if (!step) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  else {
    return Math.floor((Math.random() * (max - min + step) + min) / step) * step;
  }
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = {
  randomInt,
  randomFloat,
};
