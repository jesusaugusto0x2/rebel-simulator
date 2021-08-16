import Scheduler from "./handlers/Scheduler.js";
import Map from "./classes/Map/class.js";
import Governor from "./classes/Governor/class.js";
import { makeId } from "./utils/strings.js";
import { sleep } from "./utils/time.js";

export const simulate = async () => {
  const scheduler = new Scheduler();
  const governor = new Governor(`Hugo Chavez`, `military`, scheduler);
  const map = new Map(makeId(20), scheduler, governor);

  while (map.stability.value < 100 || map.reputation.value > 0) {
    map.evaluate();

    console.log(`-------------------------------------------------------`);

    scheduler.stepAhead();

    // await sleep(500);

    if (map.stability.value >= 100) {
      console.log(` YOU HAVE WON THE GAME`);
      break;
    }

    if (map.reputation.value <= 0) {
      console.log("YOU HAVE LOST THE GAME");
      break;
    }
  }

  return map;
};
