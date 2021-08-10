const Probs = require("../../utils/probabilities.js");

const operationTypes = ["civilian", "government", "military"];

exports.calculateType = () => {
  const index = Probs.getUniformRandom(0, operationTypes.length);

  return operationTypes[index];
};

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

exports.LOW_PROB = 0.01;
exports.MED_LOW_PROB = 0.02;
exports.MED_PROB = 0.03;
exports.MED_HIGH_PROB = 0.04;
exports.HIGH_PROB = 0.05;
