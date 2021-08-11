const { printMessage } = require("../../utils/strings");

class Operation {
  constructor(type) {
    this.type = type;
  }

  execute(map, scheduler, operationType, probabilitySet, opPrice, opTime) {
    if (map.budget < opPrice) {
      printMessage(`Couldn't perform operation due to low budget`, "danger");
      return null;
    }

    map.reduceBudget(opPrice);

    scheduler.setEvent(
      {
        operation: operationType,
        probabilities: probabilitySet,
      },
      opTime
    );
  }
}

exports.Operation = Operation;
