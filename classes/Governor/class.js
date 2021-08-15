import { printMessage } from "../../utils/strings.js";
import { CivilianOperation } from "../Operation/Civilian/class.js";
import { GovernmentOperation } from "../Operation/Government/class.js";
import { MilitaryOperation } from "../Operation/Military/class.js";
import GovHelper from "./helpers.js";

export default class Governor {
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

    if (GovHelper.evaluateCivilianOp(map) === true) {
      printMessage(`    Civilian operation will be executed`, `advice`);

      this.civOp.execute(map, this.scheduler);
    }

    if (GovHelper.evaluateGovernmentOp(map) === true) {
      printMessage(`    Government operation will be executed`, `advice`);

      this.govOp.execute(map, this.scheduler);
    }

    if (GovHelper.evaluateMilitaryOp(map) === true) {
      printMessage(`    Military operation will be executed`, `advice`);

      this.govOp.execute(map, this.scheduler);
    }
  }
}
