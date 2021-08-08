const { Operation } = require("../class.js");

const Prob = require("../../../utils/probabilities.js");
const { buildProbabilitySet } = require("../helpers.js");
const { printMessage } = require("../../../utils/strings.js");

const TYPE = "civilian";
const BASE_TIME = 5;
const BASE_PRICE = 4;

class CivilianOp extends Operation {
  constructor() {
    super(TYPE, BASE_TIME, BASE_PRICE);

    // Starts with same execution probabilities
    this.servicesOperationProb = 0.33;
    this.developmentOperationProb = 0.33;
    this.infrastructureOperationProb = 0.33;
  }

  execute(map, scheduler) {
    printMessage(
      `    Calculating civilian operation probabilities of execution`,
      `warning`
    );

    if (Prob.getRandom() < this.servicesOperationProb) {
      this.serviceOperation(map, scheduler);
    }

    if (Prob.getRandom() < this.developmentOperation) {
      this.developmentOperation();
    }

    if (Prob.getRandom() < this.infrastructureOperation) {
      this.infrastructureOperation();
    }
  }

  serviceOperation(map, scheduler) {
    printMessage(`    CIV OPERATION: Service`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: 0.05,
      stabilityVal: 0.03,
      inflationVal: 0.02,
      reputationVal: 0.01,
      insurgencyVal: -0.02,
    });

    super.execute(map, scheduler, "civilan_service_operation", probs);
  }

  developmentOperation() {
    printMessage(`    CIV OPERATION: Development`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: 0.08,
      stabilityVal: 0.06,
      inflationVal: 0.1,
      reputationVal: 0.03,
      insurgencyVal: -0.04,
    });

    super.execute(map, scheduler, "civilan_service_operation", probs);
  }

  infrastructureOperation() {
    printMessage(`    CIV OPERATION: Infrastructure`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: 0.12,
      stabilityVal: 0.07,
      inflationVal: 0.18,
      reputationVal: 0.14,
      insurgencyVal: -0.05,
    });

    super.execute(map, scheduler, "civilan_service_operation", probs);
  }
}

exports.CivilianOperation = CivilianOp;
