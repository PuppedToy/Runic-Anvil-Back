function randomInt(min, max, step) {
  if (!step) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return Math.floor((Math.random() * (max - min + step) + min) / step) * step;
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function exponential(min, max = 99999, step = 1, probability = 0.5) {
  let result = min;
  while (Math.random() < probability && Math.abs(result) < max) {
    result += step;
  }
  return result;
}

module.exports = {
  randomInt,
  randomFloat,
  exponential,
};
