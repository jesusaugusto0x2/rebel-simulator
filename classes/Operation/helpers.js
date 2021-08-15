// -- Operation Probability Constants
export const LOW_PROB = 0.01;
export const MED_LOW_PROB = 0.02;
export const MED_PROB = 0.03;
export const MED_HIGH_PROB = 0.04;
export const HIGH_PROB = 0.05;

// -- Operation Time Constants
const lowTime = 2;
const medTime = 3;
const highTime = 4;

export const LOW_TIME = lowTime;
export const MED_TIME = medTime;
export const HIGH_TIME = highTime;

// -- Operation Price Constants
const lowPrice = 2;
const medPrice = 3;
const highPrice = 4;

export const LOW_PRICE = lowPrice;
export const MED_PRICE = medPrice;
export const HIGH_PRICE = highPrice;

class OperationHelper {
  /**
 * Builds an array with probability information to be processed by the map
 *
 * @param {Object} param0
 * @param {Number} param0.corruptionVal
 * @param {Number} param0.stabilityVal
 * @param {Number} param0.inflationVal
 * @param {Number} param0.reputationVal
 * @param {Number} param0.insurgencyVal

 * @returns {Array}
 */
  buildProbabilitySet({
    corruptionVal,
    stabilityVal,
    inflationVal,
    reputationVal,
    insurgencyVal,
  }) {
    return [
      {
        type: "corruption",
        value: corruptionVal,
      },
      {
        type: "stability",
        value: stabilityVal,
      },
      {
        type: "inflation",
        value: inflationVal,
      },
      {
        type: "reputation",
        value: reputationVal,
      },
      {
        type: "insurgency",
        value: insurgencyVal,
      },
    ];
  }

  /**
   * Stablish set of probabilities for custom operations
   * executions depending on the current map budget
   *
   * @param {Number} budget
   */
  getBudgetProbs(budget) {
    if (budget < lowPrice) {
      return { firstProb: 0, secondProb: 0, thirdProb: 0 };
    }

    if (budget === lowPrice) {
      return { firstProb: 1, secondProb: 0, thirdProb: 0 };
    }

    if (budget === medPrice) {
      return { firstProb: 0.75, secondProb: 0.25, thirdProb: 0 };
    }

    return { firstProb: 0.65, secondProb: 0.25, thirdProb: 0.1 };
  }
}

export default new OperationHelper();
