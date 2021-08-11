// -- Operation Probability Constants
exports.LOW_PROB = 0.01;
exports.MED_LOW_PROB = 0.02;
exports.MED_PROB = 0.03;
exports.MED_HIGH_PROB = 0.04;
exports.HIGH_PROB = 0.05;

// -- Operation Time Constants
const lowTime = 2;
const medTime = 3;
const highTime = 4;

exports.LOW_TIME = lowTime;
exports.MED_TIME = medTime;
exports.HIGH_TIME = highTime;

// -- Operation Price Constants
const lowPrice = 2;
const medPrice = 3;
const highPrice = 4;

exports.LOW_PRICE = lowPrice;
exports.MED_PRICE = medPrice;
exports.HIGH_PRICE = highPrice;

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
exports.buildProbabilitySet = ({
  corruptionVal,
  stabilityVal,
  inflationVal,
  reputationVal,
  insurgencyVal,
}) => {
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
};

/**
 * Stablish set of probabilities for custom operations
 * executions depending on the current map budget
 *
 * @param {Number} budget
 */
exports.getBudgetProbs = budget => {
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
};
