// const PD = require("probability-distributions");
const { Scheduler } = require("./handlers/Scheduler.js");
const { Map } = require("./classes/Map/class.js");
const { sleep } = require("./utils/time.js");
const { makeId } = require("./utils/strings.js");
const { Governor } = require("./classes/Governor/class.js");

const simulate = async () => {
  const scheduler = new Scheduler();

  const governor = new Governor();

  const map = new Map(makeId(20), scheduler, governor);

  console.log("Scheduler", scheduler);

  console.log("Map", map);

  while (map.stability < 100 || map.reputation < 0) {
    console.log(`Starting a new week`);

    map.evaluate();

    scheduler.stepAhead();

    await sleep(1000);
  }
};

simulate();
