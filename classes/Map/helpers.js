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

/**
 * Gets all the related functions on the current time for the map
 * and checks it's probability values on every type
 *
 * @param {Map} map
 */
exports.runEvents = map => {
  const eventList = map.scheduler.getCurrentEvents();

  console.log("eventList", eventList);

  // Get the current stored events of a time instance
  for (const evt of eventList) {
    // Get all the probability set sent through the event
    for (const probObject of evt.probabilities) {
      // Check if the probability object has an increase / decrease operation type
      const probValue =
        probObject.operation === "increase"
          ? probObject.value
          : probObject.value * -1;

      // Sum the type probability with value on the map item
      map[probObject.type].prob += probValue;
    }
  }
};
