const { CivilianOperation } = require("../Operation/Civilian/class.js");
const { GovernmentOperation } = require("../Operation/Government/class.js");
const { MilitaryOperation } = require("../Operation/Military/class.js");

class Governor {
  constructor(name, type, scheduler) {
    this.name = name;
    this.type = type;
    this.scheduler = scheduler;
    this.civOp = new CivilianOperation();
    this.govOp = new GovernmentOperation();
    this.milOp = new MilitaryOperation();
  }

  salute() {
    return `Hello, my name is ${this.name}`;
  }

  executeOperation(map) {
    console.log(`Governor is executing an operation...`);
  }
}

exports.Governor = Governor;
