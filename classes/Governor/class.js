const { printMessage } = require("../../utils/strings.js");
const { CivilianOperation } = require("../Operation/Civilian/class.js");
const { GovernmentOperation } = require("../Operation/Government/class.js");
const { MilitaryOperation } = require("../Operation/Military/class.js");
const Helper = require("./helpers.js");

class Governor {
  constructor(name, type, scheduler) {
    this.name = name;
    this.type = type;
    this.scheduler = scheduler;

    // Operation classes utilities
    this.civOp = new CivilianOperation();
    this.govOp = new GovernmentOperation();
    this.milOp = new MilitaryOperation();
  }

  salute() {
    return `Hello, my name is ${this.name}`;
  }

  executeOperation(map) {
    printMessage(`Governor ${this.name} starts executing operations`, `advice`);

    if (Helper.evaluateCivilianOp(map)) {
      printMessage(`    Civilian operation will be executed`, `advice`);

      this.civOp.execute(map, this.scheduler);
    }
  }
}

exports.Governor = Governor;
