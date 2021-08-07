const { Operation } = require("../class.js");

class MilitaryOp extends Operation {
  constructor() {
    super("government", 25);

    // Starts with same execution probabilities
    this.createSoldierProb = 0.33;
  }

  execute() {}

  soldierCreateOperation() {
    console.log(`Executing an soldier creation operation`);
  }
}

exports.MilitaryOperation = MilitaryOp;
