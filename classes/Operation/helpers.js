const Probs = require("../../utils/probabilities.js");

const operationTypes = ["civilian", "government", "military"];

exports.calculateType = () => {
  const index = Probs.getUniformRandom(0, operationTypes.length);

  return operationTypes[index];
};
