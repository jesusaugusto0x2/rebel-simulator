const PD = require("probability-distributions");

const Helper = require("./helpers.js");

class Map {
  constructor(name, scheduler) {
    this.name = name;
    this.budget = PD.rint(1, 40, 55, false)[0];
    this.yearBudget = 0;
    this.totalPopulation = PD.rint(1, 260000, 270000, false)[0];
    this.hostilePopulation = PD.rint(1, 17000, 20000, false)[0];
    this.supportPopulation = PD.rint(1, 400, 500, false)[0];
    this.reputation = 95;
    this.corruptionRisk = 0.05;
    this.corruptionLevel = 0;
    this.inflation = 0;
    this.insurgentDiplomacy = PD.runif(100)[0];
    this.stability = 0;
    this.scheduler = scheduler;
  }

  evaluate() {
    console.log(
      `Evaluating map circumstances ${this.scheduler.getCurrentTime()}`
    );

    Helper.incrementBudget(this);

    console.log("budget", this.budget);
  }
}

exports.Map = Map;
