import { Operation } from "../class.js";
import { printMessage } from "../../../utils/strings.js";
import Prob from "../../../utils/probabilities.js";
import OperationHelper from "../helpers.js";
import {
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
} from "../helpers.js";

const TYPE = "civilian";

export class CivilianOperation extends Operation {
  constructor() {
    super(TYPE);
  }

  execute(map, scheduler) {
    printMessage(
      `    Calculating civilian operation probabilities of execution`,
      `warning`
    );

    const { firstProb, secondProb, thirdProb } =
      OperationHelper.getBudgetProbs(map);

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

    const probs = OperationHelper.buildProbabilitySet({
      corruptionVal: LOW_PROB,
      stabilityVal: LOW_PROB,
      insurgencyVal: -LOW_PROB,
      inflationVal: LOW_PROB,
      reputationVal: LOW_PROB,
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

    const probs = OperationHelper.buildProbabilitySet({
      corruptionVal: MED_PROB,
      stabilityVal: MED_PROB,
      insurgencyVal: -MED_PROB,
      inflationVal: MED_PROB,
      reputationVal: MED_PROB,
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

    const probs = OperationHelper.buildProbabilitySet({
      corruptionVal: HIGH_PROB,
      stabilityVal: HIGH_PROB,
      insurgencyVal: -HIGH_PROB,
      inflationVal: HIGH_PROB,
      reputationVal: HIGH_PROB,
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
