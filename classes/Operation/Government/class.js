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

    const executionProb = Prob.getRandom();

    if (executionProb < firstProb) {
      this.outreachOperation(map, scheduler);
    } else if (executionProb >= firstProb && executionProb < secondProb) {
      this.antiCorruptiveOperation(map, scheduler);
    } else if (executionProb >= secondProb && executionProb <= thirdProb) {
      this.democraticOperation(map, scheduler);
    }
  }

  outreachOperation(map, scheduler) {
    printMessage(`    GOB OPERATION: Outreach`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: -MED_LOW_PROB,
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
      LOW_PRICE,
      LOW_TIME
    );
  }

  antiCorruptiveOperation(map, scheduler) {
    printMessage(`    GOB OPERATION: Anti-corruptive`, `warning`);

    const probs = buildProbabilitySet({
      corruptionVal: -MED_PROB,
      stabilityVal: MED_LOW_PROB,
      insurgencyVal: -MED_PROB,
      inflationVal: MED_HIGH_PROB,
      reputationVal: MED_LOW_PROB,
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
      corruptionVal: -HIGH_PROB,
      stabilityVal: MED_HIGH_PROB,
      insurgencyVal: -HIGH_PROB,
      inflationVal: MED_HIGH_PROB,
      reputationVal: MED_HIGH_PROB,
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
