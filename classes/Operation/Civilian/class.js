const { Operation } = require("../class.js");

const Prob = require("../../../utils/probabilities.js");
const { printMessage } = require("../../../utils/strings.js");
const {
  buildProbabilitySet,
  LOW_PROB,
  MED_PROB,
  HIGH_PROB,
} = require("../helpers.js");

const TYPE = "civilian";
const BASE_TIME = 2;
const BASE_PRICE = 3;

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
      this.developmentOperation(map, scheduler);
    }

    if (Prob.getRandom() < this.infrastructureOperation) {
      this.infrastructureOperation(map, scheduler);
    }
  }

  serviceOperation(map, scheduler) {
    printMessage(`    CIV OPERATION: Service`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: LOW_PROB,
      stabilityVal: LOW_PROB,
      insurgencyVal: -LOW_PROB,
      inflationVal: LOW_PROB,
      reputationVal: LOW_PROB,
    });

    super.execute(map, scheduler, "civilan_service_operation", probs);
  }

  developmentOperation(map, scheduler) {
    printMessage(`    CIV OPERATION: Development`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: LOW_PROB,
      stabilityVal: LOW_PROB,
      insurgencyVal: -LOW_PROB,
      inflationVal: LOW_PROB,
      reputationVal: LOW_PROB,
    });

    super.execute(map, scheduler, "civilan_service_operation", probs);
  }

  infrastructureOperation(map, scheduler) {
    printMessage(`    CIV OPERATION: Infrastructure`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: LOW_PROB,
      stabilityVal: LOW_PROB,
      insurgencyVal: -LOW_PROB,
      inflationVal: LOW_PROB,
      reputationVal: LOW_PROB,
    });

    super.execute(map, scheduler, "civilan_service_operation", probs);
  }
}

exports.CivilianOperation = CivilianOp;
