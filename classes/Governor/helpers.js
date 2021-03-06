import Probs from "../../utils/probabilities.js";
import { printMessage } from "../../utils/strings.js";

class GovernorHelper {
  /**
   * It will evaluate the inverse probability values of stability
   * and corruption and sum both of them, in order to check if
   * there's any chance of executing a civilan operation depending
   * on future risks.
   *
   * @param {Map} map
   * @returns {Boolean}
   */
  evaluateCivilianOp = map => {
    const stabilityProb = map.stability.prob;
    // const corruptionProb = map.corruption.prob;

    printMessage(
      `  Needed probabilities for civilan operation execution: `,
      `advice`
    );

    printMessage(`  Stability prob: ${stabilityProb}`, `warning`);
    // printMessage(`  Corruption prob: ${corruptionProb}`, `warning`);

    // const commonProb = Probs.joinExcludentProbs(stabilityProb, corruptionProb);

    printMessage(
      `  Resulting prob: ${stabilityProb} chances of executing a Civilian Operation`,
      `success`
    );

    return Probs.getRandom() > stabilityProb;
  };

  /**
   * It will evaluate the current probabilities of corruption and
   * insurgency respectively and sum both of them, in order to check
   * if there's chance of executing a government operation.
   *
   * @param {Map} map
   * @returns {Boolean}
   */
  evaluateGovernmentOp = map => {
    const insurgencyProb = map.insurgency.prob;
    const corruptionProb = map.corruption.prob;

    printMessage(
      `  Needed probabilities for government operation execution: `,
      `advice`
    );

    printMessage(`  Insurgency prob: ${insurgencyProb}`, `warning`);
    printMessage(`  Corruption prob: ${corruptionProb}`, `warning`);

    const commonProb = Probs.joinExcludentProbs(insurgencyProb, corruptionProb);

    printMessage(
      `  Resulting prob: ${commonProb}% chances of executing a Government Operation`,
      `success`
    );

    return Probs.getRandom() < commonProb;
  };

  /**
   * It will evaluate the current probabilities of insurgency and
   * stability, in order to check if there's an actual need of executing a
   * militar operation.
   *
   * @param {Map} map
   */
  evaluateMilitaryOp = map => {
    const insurgencyProb = map.insurgency.prob;
    // const stabilityProb = map.stability.prob;

    printMessage(
      `  Needed probabilities for military operation execution: `,
      `advice`
    );

    printMessage(`  Insurgency prob: ${insurgencyProb}`, `warning`);
    // printMessage(`  Stability prob: ${stabilityProb}`, `warning`);

    // const commonProb = Probs.joinExcludentProbs(stabilityProb, insurgencyProb);

    printMessage(
      `  Resulting prob: ${insurgencyProb}% chances of executing a Government Operation`,
      `success`
    );

    return Probs.getRandom() < insurgencyProb;
  };
}

export default new GovernorHelper();
