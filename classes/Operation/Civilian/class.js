const { Operation } = require("../class.js");

const Prob = require("../../../utils/probabilities.js");

class CivilianOp extends Operation {
  constructor() {
    super("civilian", 25);

    // Starts with same execution probabilities
    this.servicesOperationProb = 0.33;
    this.developmentOperationProb = 0.33;
    this.infrastructureOperationProb = 0.33;
  }

  execute(map) {
    const servProb = Prob.getRandom();

    if (servProb < this.servicesOperationProb) {
      this.serviceOperation();
    }

    const devProb = Prob.getRandom();

    if (devProb < this.developmentOperation) {
      this.developmentOperation();
    }

    const infProb = Prob.getRandom();

    if (infProb < this.infrastructureOperation) {
      this.infrastructureOperation();
    }
  }

  serviceOperation() {
    console.log(`Executing a service operation`);
  }

  developmentOperation() {
    console.log(`Executing a development operation`);
  }

  infrastructureOperation() {
    console.log(`Executing an infrastructure operation`);
  }
}

exports.CivilianOperation = CivilianOp;
