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

const TYPE = "government";

class MilitaryOp extends Operation {
  constructor() {
    super(TYPE);
  }

  execute(map, scheduler) {
    printMessage(
      `    Calculating military operation probabilities of execution`,
      `warning`
    );

    const { firstProb, secondProb, thirdProb } = getBudgetProbs(map);

    const executionProb = Prob.getRandom();

    if (executionProb < firstProb) {
      this.createSoldierOperation(map, scheduler);
    } else if (executionProb >= firstProb && executionProb < secondProb) {
      this.civilSupportOperation(map, scheduler);
    } else if (executionProb >= secondProb && executionProb <= thirdProb) {
      this.strikeOperation(map, scheduler);
    }
  }

  createSoldierOperation(map, scheduler) {
    printMessage(`    MIL OPERATION: Soldier Creation`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: LOW_PROB,
      stabilityVal: -LOW_PROB,
      insurgencyVal: -LOW_PROB,
      inflationVal: LOW_PROB,
      reputationVal: -LOW_PROB,
    });

    super.execute(
      map,
      scheduler,
      "government_outreach_operation",
      probs,
      LOW_PRICE,
      LOW_TIME
    );
  }

  civilSupportOperation(map, scheduler) {
    printMessage(`    MIL OPERATION: Civil Support`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: MED_PROB,
      stabilityVal: -MED_PROB,
      insurgencyVal: -MED_PROB,
      inflationVal: MED_PROB,
      reputationVal: -MED_PROB,
    });

    super.execute(
      map,
      scheduler,
      "government_outreach_operation",
      probs,
      MED_PRICE,
      MED_TIME
    );
  }

  strikeOperation(map, scheduler) {
    printMessage(`    MIL OPERATION: Strike`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: HIGH_PROB,
      stabilityVal: -HIGH_PROB,
      insurgencyVal: -HIGH_PROB,
      inflationVal: HIGH_PROB,
      reputationVal: -HIGH_PROB,
    });

    super.execute(
      map,
      scheduler,
      "government_outreach_operation",
      probs,
      HIGH_PRICE,
      HIGH_TIME
    );
  }
}

exports.MilitaryOperation = MilitaryOp;
