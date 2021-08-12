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

  // Get the current stored events of a time instance
  for (const evt of eventList) {
    // Get all the probability set sent through the event
    for (const probObject of evt.probabilities) {
      console.log(`Running probability event object: `, probObject);

      // Sum the type probability with value on the map item
      if (probObject.value < 0 && map[probObject.type].prob > 0) {
        map[probObject.type].prob += probObject.value;
      } else if (probObject.value > 0 && map[probObject.type].prob < 1) {
        map[probObject.type].prob += probObject.value;
      }
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

/**
 * Made extra checks depending on current probabilites
 *
 * @param {Map} map
 */
exports.selfUpdateByProbs = map => {
  mayUpgradeValuesByCorruption(map);

  mayUpgradeValuesByStability(map);

  mayUpgradeValuesByInsurgency(map);

  // mayDowngradeReputation(map);
};

/**
 * Checks if the current reputation value should be reduced by
 * every 5 steps of the scheduler
 *
 * @param {Map} map
 */
const mayDowngradeReputation = map => {
  if (
    map.scheduler.currentTime % 5 === 0 &&
    Probs.getRandom() > map.stability.prob
  ) {
    printMessage(
      `      Reputation shall be reduced by 1 due to lack of stability`,
      `danger`
    );
    map.reputation.value -= 1;
    map.reputation.prob -= 0.025;
  }
};

/**
 * Checks if the current corruption value should
 * update insurgency value by 1
 *
 * @param {Map} map
 */
const mayUpgradeValuesByCorruption = map => {
  if (
    map.scheduler.currentTime % 4 === 0 &&
    map.corruption.prob < 0.7 &&
    Probs.getRandom() < map.corruption.prob
  ) {
    printMessage(
      `      Insurgency shall be upgraded by 1 due to corruption`,
      `danger`
    );
    map.insurgency.value += 1;
    map.insurgency.prob += 0.0455;

    printMessage(
      `      Inflation shall be upgraded by 1 due to corruption`,
      `danger`
    );
    map.inflation.value += 1;
    map.inflation.prob += 0.035;

    printMessage(
      `      Stability shall be reduced by 1 due to corruption`,
      `danger`
    );
    map.stability.value -= 1;
    map.stability.prob -= 0.0255;

    printMessage(
      `      Reputation shall be reduced by 1 due to corruption`,
      `danger`
    );
    map.reputation.value -= 1;
    map.reputation.prob -= 0.0255;
  }
};

/**
 * Checks if lack of stability should update corrpution values and probabilities
 *
 * @param {Map} map
 */
const mayUpgradeValuesByStability = map => {
  if (
    map.scheduler.currentTime % 2 === 0 &&
    map.stability.prob < 0.8 &&
    map.corruption.prob > 0.1 &&
    map.insurgency.prob > 0.05 &&
    Probs.getRandom() < map.stability.prob
  ) {
    printMessage(
      `      Corruption shall be reduced by 1 due to stability`,
      `success`
    );
    map.corruption.value -= 1;
    map.corruption.prob -= 0.0399;

    printMessage(
      `      Insurgency shall be reduced by 1 due to stability`,
      `success`
    );
    map.insurgency.value -= 1;
    map.insurgency.prob -= 0.025;
  }
};

/**
 * Checks if any variable should be updated depdnding of the current insurgency value
 *
 * @param {Map} map
 */
const mayUpgradeValuesByInsurgency = map => {
  if (
    map.scheduler.currentTime % 3 === 0 &&
    Probs.getRandom() < map.insurgency.prob
  ) {
    printMessage(
      `      Corruption shall be updated by 1 due to insurgency`,
      `danger`
    );
    map.corruption.value += 1;
    map.corruption.prob += 0.08125;
  }
};
