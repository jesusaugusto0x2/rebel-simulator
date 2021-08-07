const Probs = require("../../utils/probabilities.js");

/**
 * Increments the map budget randomly every time step
 *
 * @param {Map} map
 * @returns {Void}
 */
exports.incrementBudget = map => {
  map.budget += Math.round(Probs.getUniformRandom(1, 4), 0);
};
