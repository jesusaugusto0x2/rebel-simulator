const Probs = require("../../utils/probabilities.js");

/**
 *
 * @param {Map} map
 */
exports.incrementBudget = map => {
  // Returns a random integer from 1 to 10:
  const randomBudget = Math.round(Probs.getUniformRandom(1, 4), 0);

  map.budget += randomBudget;
};
