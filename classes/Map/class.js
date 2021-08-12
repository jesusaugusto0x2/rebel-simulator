const PD = require("probability-distributions");
const { printMessage } = require("../../utils/strings.js");
const Helper = require("./helpers.js");

class Map {
  constructor(name, scheduler, governor) {
    this.name = name;
    this.scheduler = scheduler;
    this.governor = governor;
    this.budget = PD.rint(1, 40, 55, false)[0];
    this.yearBudget = 0;
    this.totalPopulation = PD.rint(1, 260000, 270000, false)[0];
    this.hostilePopulation = PD.rint(1, 17000, 20000, false)[0];
    this.supportPopulation = PD.rint(1, 400, 500, false)[0];
    this.insurgentDiplomacy = PD.runif(100)[0];

    // Common fluctuating value
    this.corruption = {
      prob: 0.15,
      value: 5,
    };

    // Common fluctuating value
    this.inflation = {
      prob: 0.15,
      value: 5,
    };

    // Common fluctuating value
    this.insurgency = {
      prob: 0.25,
      value: 25,
    };

    // Game decider
    this.reputation = {
      prob: 0.01,
      value: 75,
    };

    // Game decider
    this.stability = {
      prob: 0.01,
      value: 0,
    };
  }

  reduceBudget(value) {
    this.budget -= value;
  }

  printValues() {
    printMessage(
      `  Self probability values:
        Stability: { prob: ${this.stability.prob.toFixed(2)}, val: ${this.stability.value.toFixed(2)}}
        Insurgency: { prob: ${this.insurgency.prob.toFixed(2)}, val: ${this.insurgency.value.toFixed(2)}}
        Corruption: { prob: ${this.corruption.prob.toFixed(2)}, val: ${this.corruption.value.toFixed(2)}}
        Reputation: { prob: ${this.reputation.prob.toFixed(2)}, val: ${this.reputation.value.toFixed(2)}}
        Inflation: { prob: ${this.inflation.prob.toFixed(2)}, val: ${this.inflation.value.toFixed(2)}}`,
      `magenta`
    );
  }

  runValuesEffect() {
    this.insurgency.value < 40 ?
      this.stability.value += 0.01 * this.reputation.value
      :this.stability.value -= 0.02 * this.insurgency.value;
    this.reputation.value -= 0.01 * (this.corruption.value+this.insurgency.value);
    this.reputation.value += 0.02 * this.stability.value;
  }

  evaluate() {
    printMessage(
      `Evaluating map state on ${this.scheduler.getCurrentTime()} week`,
      `advice`
    );

    Helper.runEvents(this);

    Helper.incrementBudget(this);

    Helper.checkSelfProbabilities(this);

    this.governor.executeOperation(this);

    Helper.selfUpdateByProbs(this);

    this.runValuesEffect();

    this.printValues();
  }
}

exports.Map = Map;
