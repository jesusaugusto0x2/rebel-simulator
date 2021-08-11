const { Operation } = require("../class.js");

const Prob = require("../../../utils/probabilities.js");
const { printMessage } = require("../../../utils/strings.js");
const {
  buildProbabilitySet,
  getBudgetProbs,
  LOW_PROB,
  MED_LOW_PROB,
  MED_PROB,
  MED_HIGH_PROB,
  HIGH_PROB,
  LOW_PRICE,
  MED_PRICE,
  HIGH_PRICE,
  LOW_TIME,
  MED_TIME,
  HIGH_TIME,
} = require("../helpers.js");

const TYPE = "civilian";

class CivilianOp extends Operation {
  constructor() {
    super(TYPE);
  }

  execute(map, scheduler) {
    printMessage(
      `    Calculating civilian operation probabilities of execution`,
      `warning`
    );

    const { firstProb, secondProb, thirdProb } = getBudgetProbs(map);

    const executionProb = Prob.getRandom();

    if (executionProb < firstProb) {
      this.serviceOperation(map, scheduler);
    } else if (executionProb >= firstProb && executionProb < secondProb) {
      this.developmentOperation(map, scheduler);
    } else if (executionProb >= secondProb && executionProb <= thirdProb) {
      this.infrastructureOperation(map, scheduler);
    }
  }

  serviceOperation(map, scheduler) {
    printMessage(`    CIV OPERATION: Service`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: LOW_PROB,
      stabilityVal: MED_LOW_PROB,
      insurgencyVal: -LOW_PROB,
      inflationVal: LOW_PROB,
      reputationVal: MED_LOW_PROB,
    });

    super.execute(
      map,
      scheduler,
      "civilan_service_operation",
      probs,
      LOW_PRICE,
      LOW_TIME
    );
  }

  developmentOperation(map, scheduler) {
    printMessage(`    CIV OPERATION: Development`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: MED_LOW_PROB,
      stabilityVal: MED_HIGH_PROB,
      insurgencyVal: -MED_LOW_PROB,
      inflationVal: MED_PROB,
      reputationVal: MED_LOW_PROB,
    });

    super.execute(
      map,
      scheduler,
      "civilan_service_operation",
      probs,
      MED_PRICE,
      MED_TIME
    );
  }

  infrastructureOperation(map, scheduler) {
    printMessage(`    CIV OPERATION: Infrastructure`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: MED_HIGH_PROB,
      stabilityVal: HIGH_PROB,
      insurgencyVal: -MED_HIGH_PROB,
      inflationVal: MED_HIGH_PROB,
      reputationVal: MED_LOW_PROB,
    });

    super.execute(
      map,
      scheduler,
      "civilan_service_operation",
      probs,
      HIGH_PRICE,
      HIGH_TIME
    );
  }
}

exports.CivilianOperation = CivilianOp;
