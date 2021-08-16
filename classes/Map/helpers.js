import Probs from "../../utils/probabilities.js";
import { printMessage } from "../../utils/strings.js";
class MapHelper {
  constructor() {}

  /**
   * Increments the map budget randomly every time step
   *
   * @param {Map} map
   * @returns {Void}
   */
  incrementBudget = map => {
    map.budget += Math.round(Probs.getUniformRandom(1, 4), 0);
  };

  /**
   * Gets all the related functions on the current time for the map
   * and checks it's probability values on every type
   *
   * @param {Map} map
   */
  runEvents(map) {
    const eventList = map.scheduler.getCurrentEvents();

    // Get the current stored events of a time instance
    for (const evt of eventList) {
      // Get all the probability set sent through the event
      for (const probObject of evt.probabilities) {
        console.log(`Running probability event object: `, probObject);

        // Sum the type probability with value on the map item
        if (probObject.value < 0 && map[probObject.type].prob > 0) {
          map[probObject.type].prob = this.sumProb(map[probObject.type].prob, probObject.value);
        } else if (probObject.value > 0 && map[probObject.type].prob < 1) {
          map[probObject.type].prob = this.sumProb(map[probObject.type].prob, probObject.value);
        }
      }
    }
  }

  sumValue = (item, value) => {
    item += value;
    if(item > 100)
      item = 100;
    if(item < 0)
      item = 0;
    return item;
  }

  sumProb = (item, value) => {
    item += value;
    if(item > 1)
      item = 1;
    if(item < 0)
      item = 0;
    return item;
  }
  /**
   * Loops through every probabilistic value of itself and
   * checks a possible rise on its value
   *
   * @param {Map} map
   */
  checkSelfProbabilities = map => {
    if (Probs.getRandom() < map.corruption.prob) {
      map.corruption.value = this.sumValue(map.corruption.value, 1);
    }

    if (Probs.getRandom() < map.inflation.prob) {
      map.inflation.value = this.sumValue(map.inflation.value, 1);
    }

    if (Probs.getRandom() < map.reputation.prob) {
      map.reputation.value = this.sumValue(map.reputation.value, 1);
    }

    if (Probs.getRandom() < map.stability.prob) {
      map.stability.value = this.sumValue(map.stability.value, 1);
    }

    if (Probs.getRandom() < map.insurgency.prob) {
      map.insurgency.value = this.sumValue(map.insurgency.value, 1);
    }
  };

  /**
   * Made extra checks depending on current probabilites
   *
   * @param {Map} map
   */
  selfUpdateByProbs = map => {
    this.mayUpgradeValuesByCorruption(map);

    this.mayUpgradeValuesByStability(map);

    this.mayUpgradeValuesByInsurgency(map);
  };

  /**
   * Checks if the current corruption value should
   * update insurgency value by 1
   *
   * @param {Map} map
   */
  mayUpgradeValuesByCorruption = map => {
    if (
      map.scheduler.currentTime % 3 === 0 &&
      Probs.getRandom() < map.corruption.prob
    ) {
      printMessage(
        `      Insurgency shall be upgraded by 1 due to corruption`,
        `danger`
      );
      map.insurgency.value = this.sumValue(map.insurgency.value, 1);
      map.insurgency.prob = this.sumProb(map.insurgency.prob, 0.0555);

      printMessage(
        `      Inflation shall be upgraded by 1 due to corruption`,
        `danger`
      );
      map.inflation.value = this.sumValue(map.inflation.value, 1);
      map.inflation.prob = this.sumProb(map.inflation.prob, 0.035);

      printMessage(
        `      Stability shall be reduced by 1 due to corruption`,
        `danger`
      );
      map.stability.value = this.sumValue(map.stability.value, -1);
      map.stability.prob = this.sumProb(map.stability.prob, -0.0255);

      printMessage(
        `      Reputation shall be reduced by 1 due to corruption`,
        `danger`
      );
      map.reputation.value = this.sumValue(map.reputation.value, -1);
      map.reputation.prob = this.sumProb(map.reputation.prob, -0.0255);
    }
  };

  /**
   * Checks if lack of stability should update corrpution values and probabilities
   *
   * @param {Map} map
   */
  mayUpgradeValuesByStability = map => {
    if (
      map.scheduler.currentTime % 2 === 0 &&
      Probs.getRandom() < map.stability.prob
    ) {
      printMessage(
        `      Corruption shall be reduced by 1 due to stability`,
        `success`
      );
      map.corruption.value = this.sumValue(map.corruption.value, -1);
      map.corruption.prob = this.sumProb(map.corruption.prob, -0.0399);

      printMessage(
        `      Insurgency shall be reduced by 1 due to stability`,
        `success`
      );
      map.insurgency.value = this.sumValue(map.insurgency.value, -1);
      map.insurgency.prob = this.sumProb(map.insurgency.prob, -0.025);

      printMessage(
        `      Inflation shall be reduced by 1 due to stability`,
        `success`
      );
      map.inflation.value = this.sumValue(map.inflation.value, -1);
      map.inflation.prob = this.sumProb(map.insurgency.prob, -0.025);
    }
  };

  /**
   * Checks if any variable should be updated depdnding of the current insurgency value
   *
   * @param {Map} map
   */
  mayUpgradeValuesByInsurgency = map => {
    if (
      map.scheduler.currentTime % 3 === 0 &&
      Probs.getRandom() < map.insurgency.prob
    ) {
      printMessage(
        `      Corruption shall be updated by 1 due to insurgency`,
        `danger`
      );
      map.corruption.value = this.sumValue(map.corruption.value, 1);
      map.corruption.prob = this.sumProb(map.corruption.prob, 0.04125);
      printMessage(
        `      Stability shall be reduced by 1 due to insurgency`,
        `danger`
      );
      map.stability.value = this.sumValue(map.stability.value, -1);
      map.stability.prob = this.sumProb(map.stability.prob, -0.0555);
      printMessage(
        `      Reputation shall be reduced by 1 due to insurgency`,
        `danger`
      );
      map.reputation.value = this.sumValue(map.reputation.value, -1);
      map.reputation.prob = this.sumProb(map.reputation.prob, -0.0555);
    }
  };
}

export default new MapHelper();
