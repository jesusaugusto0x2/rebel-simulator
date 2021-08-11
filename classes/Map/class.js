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
      prob: 0.01,
      value: 5,
    };

    // Common fluctuating value
    this.insurgency = {
      prob: 0.12,
      value: 25,
    };

    // Game decider
    this.reputation = {
      prob: 0.01,
      value: 95,
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
    const builtStats = {
      corruption: this.corruption,
      inflation: this.inflation,
      insurgency: this.insurgency,
      reputation: this.reputation,
      stability: this.stability,
    };

    printMessage(
      `  Self probability values: ${JSON.stringify(builtStats, null, 4)}`,
      `magenta`
    );
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

    this.printValues();
  }
}

exports.Map = Map;
