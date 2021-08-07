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

/**
 * Sums 2 different probabilities by exclusion
 *
 * @param {Number} prA
 * @param {Number} prB
 * @returns {Number}
 */
exports.joinExcludentProbs = (prA, prB) => {
  return prA + prB - prA * prB;
};

/**
 * Returns the inverse probability of a given one
 *
 * @param {Number} pr
 * @returns {Number}
 */
exports.getInverseProb = pr => {
  return 1 - pr;
};
