const { CivilianOperation } = require("../Operation/Civilian/class.js");
const { GovernmentOperation } = require("../Operation/Government/class.js");
const { MilitaryOperation } = require("../Operation/Military/class.js");
const Helper = require("./helpers.js");

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

    if (Helper.evaluateCivilianOp(map)) {
      console.log(`A civilan operation can be executed`);
      this.civOp.execute(map);
    }
  }
}

exports.Governor = Governor;
