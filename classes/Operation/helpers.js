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
