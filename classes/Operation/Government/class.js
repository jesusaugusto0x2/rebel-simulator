const { Operation } = require("../class.js");

class GovernmentOp extends Operation {
  constructor() {
    super("government", 25);

    // Starts with same execution probabilities
    this.outreachOperationProb = 0.33;
    this.antiCorruptiveOperationProb = 0.33;
    this.democraticOperationProb = 0.33;
  }

  execute() {}

  outreachOperation() {
    console.log(`Executing an outreach operation`);
  }

  antiCorruptiveOperation() {
    console.log(`Executing an anti-corruption operation`);
  }

  democraticOperation() {
    console.log(`Executing a democraatic operation`);
  }
}

exports.GovernmentOperation = GovernmentOp;
