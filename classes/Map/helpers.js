const Probs = require("../../utils/probabilities.js");
const { printMessage } = require("../../utils/strings.js");

/**
 * Increments the map budget randomly every time step
 *
 * @param {Map} map
 * @returns {Void}
 */
exports.incrementBudget = map => {
  map.budget += Math.round(Probs.getUniformRandom(1, 4), 0);
};

/**
 * Gets all the related functions on the current time for the map
 * and checks it's probability values on every type
 *
 * @param {Map} map
 */
exports.runEvents = map => {
  const eventList = map.scheduler.getCurrentEvents();

  printMessage(`Current list of events: ${eventList}`);

  // Get the current stored events of a time instance
  for (const evt of eventList) {
    // Get all the probability set sent through the event
    for (const probObject of evt.probabilities) {
      // Check if the probability object has an increase / decrease operation type
      // const probValue =
      //   probObject.operation === "increase"
      //     ? probObject.value
      //     : probObject.value * -1;

      // Sum the type probability with value on the map item
      map[probObject.type].prob += probObject.value;
    }
  }
};

/**
 * Loops through every probabilistic value of itself and
 * checks a possible rise on its value
 *
 * @param {Map} map
 */
exports.checkSelfProbabilities = map => {
  if (Probs.getRandom() < map.corruption.prob) {
    map.corruption.value += 1;
  }

  if (Probs.getRandom() < map.inflation.prob) {
    map.inflation.value += 1;
  }

  if (Probs.getRandom() < map.reputation.prob) {
    map.reputation.value += 1;
  }

  if (Probs.getRandom() < map.stability.prob) {
    map.stability.value += 1;
  }

  if (Probs.getRandom() < map.insurgency.prob) {
    map.insurgency.value += 1;
  }
};
