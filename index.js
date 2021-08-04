// const PD = require("probability-distributions");
const { Scheduler } = require("./handlers/Scheduler.js");
const { Map } = require("./classes/Map.js");
const { sleep } = require("./utils/time.js");

const simulate = async () => {
  const scheduler = new Scheduler();

  const map = new Map();

  console.log("Scheduler", scheduler);

  console.log("Map", map);

  while (map.stability < 100 || map.reputation < 0) {
    console.log(`Start of week ${scheduler.getCurrentTime()}`);

    scheduler.stepAhead();

    await sleep(1000);
  }
};

simulate();
