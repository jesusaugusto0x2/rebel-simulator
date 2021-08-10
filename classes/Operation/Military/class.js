const { Operation } = require("../class.js");

const Prob = require("../../../utils/probabilities.js");
const { buildProbabilitySet } = require("../helpers.js");
const { printMessage } = require("../../../utils/strings.js");

const TYPE = "government";
const BASE_TIME = 5;
const BASE_PRICE = 6;

class MilitaryOp extends Operation {
  constructor() {
    super(TYPE, BASE_TIME, BASE_PRICE);

    // Starts with same execution probabilities
    this.createSoldierProb = 0.33;
    this.civilSupportProb = 0.33;
    this.strikeProb = 0.33;
  }

  execute(map, scheduler) {
    printMessage(
      `    Calculating military operation probabilities of execution`,
      `warning`
    );

    if (Prob.getRandom() < this.createSoldierProb) {
      this.createSoldierOperation(map, scheduler);
    }

    if (Prob.getRandom() < this.civilSupportProb) {
      this.civilSupportOperation(map, scheduler);
    }

    if (Prob.getRandom() < this.strikeProb) {
      this.strikeOperation(map, scheduler);
    }
  }

  createSoldierOperation(map, scheduler) {
    printMessage(`    MIL OPERATION: Soldier Creation`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: 0.01,
      stabilityVal: -0.01,
      insurgencyVal: -0.01,
      inflationVal: 0.01,
      reputationVal: 0.01,
    });

    super.execute(map, scheduler, "government_outreach_operation", probs);
  }

  civilSupportOperation(map, scheduler) {
    printMessage(`    MIL OPERATION: Civil Support`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: 0.01,
      stabilityVal: -0.01,
      insurgencyVal: -0.01,
      inflationVal: 0.01,
      reputationVal: 0.01,
    });

    super.execute(map, scheduler, "government_outreach_operation", probs);
  }

  strikeOperation(map, scheduler) {
    printMessage(`    MIL OPERATION: Strike`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: 0.01,
      stabilityVal: -0.01,
      insurgencyVal: -0.01,
      inflationVal: 0.01,
      reputationVal: -0.01,
    });

    super.execute(map, scheduler, "government_outreach_operation", probs);
  }
}

exports.MilitaryOperation = MilitaryOp;
