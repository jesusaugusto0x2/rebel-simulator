const Probs = require("../../utils/probabilities.js");
const { printMessage } = require("../../utils/strings.js");

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

  printMessage(
    `  Needed probabilities for civilan operation execution: `,
    `advice`
  );

  printMessage(`  Stability prob: ${stabilityProb}`, `warning`);
  printMessage(`  Corruption prob: ${corruptionProb}`, `warning`);

  const commonProb = Probs.joinExcludentProbs(stabilityProb, corruptionProb);

  printMessage(
    `  Resulting prob: ${corruptionProb}% chances of executing a Civilian Operation`,
    `success`
  );

  return Probs.getRandom() < commonProb;
};
