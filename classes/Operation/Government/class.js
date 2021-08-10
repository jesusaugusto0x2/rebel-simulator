const { Operation } = require("../class.js");

const Prob = require("../../../utils/probabilities.js");
const { buildProbabilitySet } = require("../helpers.js");
const { printMessage } = require("../../../utils/strings.js");

const TYPE = "government";
const BASE_TIME = 3;
const BASE_PRICE = 5;

class GovernmentOp extends Operation {
  constructor() {
    super(TYPE, BASE_TIME, BASE_PRICE);

    // Starts with same execution probabilities
    this.outreachOperationProb = 0.33;
    this.antiCorruptiveOperationProb = 0.33;
    this.democraticOperationProb = 0.33;
  }

  execute(map, scheduler) {
    printMessage(
      `    Calculating government operation probabilities of execution`,
      `warning`
    );

    if (Prob.getRandom() < this.outreachOperationProb) {
      this.outreachOperation(map, scheduler);
    }

    if (Prob.getRandom() < this.antiCorruptiveOperationProb) {
      this.antiCorruptiveOperation(map, scheduler);
    }

    if (Prob.getRandom() < this.democraticOperationProb) {
      this.democraticOperation(map, scheduler);
    }
  }

  outreachOperation(map, scheduler) {
    printMessage(`    GOB OPERATION: Outreach`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: -0.01,
      stabilityVal: 0.01,
      insurgencyVal: 0.01,
      inflationVal: 0.01,
      reputationVal: 0.01,
    });

    super.execute(map, scheduler, "government_outreach_operation", probs);
  }

  antiCorruptiveOperation(map, scheduler) {
    printMessage(`    GOB OPERATION: Anti-corruptive`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: -0.01,
      stabilityVal: 0.01,
      insurgencyVal: -0.01,
      inflationVal: 0.01,
      reputationVal: 0.01,
    });

    super.execute(map, scheduler, "government_outreach_operation", probs);
  }

  democraticOperation(map, scheduler) {
    printMessage(`    GOB OPERATION: Democratic`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: -0.01,
      stabilityVal: 0.01,
      inflationVal: 0.01,
      reputationVal: 0.01,
      insurgencyVal: 0.01,
    });

    super.execute(map, scheduler, "government_outreach_operation", probs);
  }
}

exports.GovernmentOperation = GovernmentOp;
