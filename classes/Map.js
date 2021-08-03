// import PD from "probability-distributions";
const PD = require("probability-distributions");

export class Map {
  constructor(name) {
    this.name = name;
    this.budget = PD.rint(1, 40, 55, false)[0];
    this.yearBudget = 0;
    this.totalPopulation = PD.rint(1, 118000, 123000, false)[0];
    this.hostilePopulation = PD.rint(1, 1500, 2300, false)[0];
    this.supportPopulation = PD.rint(1, 1500, 2300, false)[0];
    this.reputation = 95;
    this.corruptionRisk = 0.05;
    this.corruptionLevel = 0;
    this.inflation = 0;
    this.insurgentDiplomacy = PD.runif(100)[0];
  }
}
