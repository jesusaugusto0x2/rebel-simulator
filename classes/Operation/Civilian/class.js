const { Operation } = require("../class.js");

class CivilianOp extends Operation {
  constructor() {
    super("civilian", 25);

    // Starts with same execution probabilities
    this.servicesOperationProb = 0.33;
    this.developmentOperationProb = 0.33;
    this.infrastructureOperationProb = 0.33;
  }

  execute() {}

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
