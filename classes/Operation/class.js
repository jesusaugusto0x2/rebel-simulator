const { printMessage } = require("../../utils/strings");

class Operation {
  constructor(type, baseTime, basePrice) {
    this.type = type;
    this.baseTime = baseTime;
    this.basePrice = basePrice;
  }

  execute(map, scheduler, operationType, probabilitySet) {
    if (map.budget < this.basePrice) {
      printMessage(`Couldn't perform operation due to low budget`, "danger");
      return null;
    }

    map.reduceBudget(this.basePrice);

    scheduler.setEvent(
      {
        operation: operationType,
        probabilities: probabilitySet,
      },
      this.baseTime
    );
  }
}

exports.Operation = Operation;
