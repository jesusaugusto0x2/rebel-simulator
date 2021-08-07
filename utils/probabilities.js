/**
 * Calculates a random number between 0 and 1
 * excluding 1
 *
 * @returns {Number}
 */
exports.getRandom = () => {
  return Math.random();
};

/**
 * Returns a random number between given parameters
 * excluding max parameter. It uses an uniform distribution
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
exports.getUniformRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * Returns a random number between given parameters
 * excluding max parameter. It uses a non-uniform distribution
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
exports.getNonUniformRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
