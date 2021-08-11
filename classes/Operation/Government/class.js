const { Operation } = require("../class.js");

const Prob = require("../../../utils/probabilities.js");
const { printMessage } = require("../../../utils/strings.js");
const {
  buildProbabilitySet,
  getBudgetProbs,
  LOW_PROB,
  MED_PROB,
  HIGH_PROB,
  LOW_PRICE,
  MED_PRICE,
  HIGH_PRICE,
  LOW_TIME,
  MED_TIME,
  HIGH_TIME,
} = require("../helpers.js");

const TYPE = "government";

class GovernmentOp extends Operation {
  constructor() {
    super(TYPE);
  }

  execute(map, scheduler) {
    printMessage(
      `    Calculating government operation probabilities of execution`,
      `warning`
    );

    const { firstProb, secondProb, thirdProb } = getBudgetProbs(map);

    if (Prob.getRandom() < firstProb) {
      this.outreachOperation(map, scheduler);
    }

    if (Prob.getRandom() < secondProb) {
      this.antiCorruptiveOperation(map, scheduler);
    }

    if (Prob.getRandom() < thirdProb) {
      this.democraticOperation(map, scheduler);
    }
  }

  outreachOperation(map, scheduler) {
    printMessage(`    GOB OPERATION: Outreach`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: -LOW_PROB,
      stabilityVal: LOW_PROB,
      insurgencyVal: LOW_PROB,
      inflationVal: LOW_PROB,
      reputationVal: LOW_PROB,
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

  antiCorruptiveOperation(map, scheduler) {
    printMessage(`    GOB OPERATION: Anti-corruptive`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: -LOW_PROB,
      stabilityVal: LOW_PROB,
      insurgencyVal: -LOW_PROB,
      inflationVal: LOW_PROB,
      reputationVal: LOW_PROB,
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

  democraticOperation(map, scheduler) {
    printMessage(`    GOB OPERATION: Democratic`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: -LOW_PROB,
      stabilityVal: LOW_PROB,
      inflationVal: LOW_PROB,
      reputationVal: LOW_PROB,
      insurgencyVal: LOW_PROB,
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

exports.GovernmentOperation = GovernmentOp;
