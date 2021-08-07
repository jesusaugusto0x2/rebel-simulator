const { Scheduler } = require("./handlers/Scheduler.js");
const { Map } = require("./classes/Map/class.js");
const { sleep } = require("./utils/time.js");
const { makeId } = require("./utils/strings.js");
const { Governor } = require("./classes/Governor/class.js");

const simulate = async () => {
  const scheduler = new Scheduler();
  const governor = new Governor(`Hugo Chavez`, `military`, scheduler);
  const map = new Map(makeId(20), scheduler, governor);

  console.log(map);

  while (map.stability.value < 100 || map.reputation.value > 0) {
    map.evaluate();
    scheduler.stepAhead();
    await sleep(1000);
  }
};

simulate();
