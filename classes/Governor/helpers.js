const Probs = require("../../utils/probabilities.js");

/**
 *
 * Depending on the current map values, the probabilities
 * are evaluated in order to check if it's possible to
 * execute a civilian operation
 *
 * @param {Map} map
 * @returns {Boolean}
 */
exports.evaluateCivilianOp = map => {
  const stabilityProb = Probs.getInverseProb(map.stability.prob);
  const corruptionProb = Probs.getInverseProb(map.corruption.prob);

  console.log(
    `stability prob: ${stabilityProb} - corruption prob: ${corruptionProb}`
  );

  const commonProb = Probs.joinExcludentProbs(stabilityProb, corruptionProb);

  console.log(`Prob of ${commonProb} given to execute a civilian operation`);

  return Probs.getRandom() < commonProb;
};
