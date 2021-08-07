const { Operation } = require("../class.js");

const Prob = require("../../../utils/probabilities.js");

const TYPE = "civilian";
const BASE_TIME = 5;
const BASE_PRICE = 4;

class CivilianOp extends Operation {
  constructor() {
    super(TYPE, BASE_TIME, BASE_PRICE);

    // Starts with same execution probabilities
    this.servicesOperationProb = 0.33;
    this.developmentOperationProb = 0.33;
    this.infrastructureOperationProb = 0.33;
  }

  execute(map, scheduler) {
    console.log(`Running civilian operation execution function:`);

    if (Prob.getRandom() < this.servicesOperationProb) {
      this.serviceOperation(map, scheduler);
    }

    if (Prob.getRandom() < this.developmentOperation) {
      this.developmentOperation();
    }

    if (Prob.getRandom() < this.infrastructureOperation) {
      this.infrastructureOperation();
    }
  }

  serviceOperation(map, scheduler) {
    console.log(`Executing a service operation`);

    const probabilitySet = [
      {
        type: "corruption",
        value: 0.05,
        operation: "increase",
      },
      {
        type: "stability",
        value: 0.03,
        operation: "increase",
      },
      {
        type: "inflation",
        value: 0.02,
        operation: "increase",
      },
      {
        type: "reputation",
        value: 0.01,
        operation: "increase",
      },
    ];

    super.execute(map, scheduler, "civilan_service_operation", probabilitySet);
  }

  developmentOperation() {
    console.log(`Executing a development operation`);

    const probabilitySet = [
      {
        type: "corruption",
        value: 0.08,
        operation: "increase",
      },
      {
        type: "stability",
        value: 0.06,
        operation: "increase",
      },
      {
        type: "inflation",
        value: 0.1,
        operation: "increase",
      },
      {
        type: "reputation",
        value: 0.03,
        operation: "increase",
      },
    ];

    super.execute(map, scheduler, "civilan_service_operation", probabilitySet);
  }

  infrastructureOperation() {
    console.log(`Executing an infrastructure operation`);

    const probabilitySet = [
      {
        type: "corruption",
        value: 0.08,
        operation: "increase",
      },
      {
        type: "stability",
        value: 0.1,
        operation: "increase",
      },
      {
        type: "inflation",
        value: 0.07,
        operation: "increase",
      },
      {
        type: "reputation",
        value: 0.05,
        operation: "increase",
      },
    ];

    super.execute(map, scheduler, "civilan_service_operation", probabilitySet);
  }
}

exports.CivilianOperation = CivilianOp;
