const PD = require("probability-distributions");

// import { Scheduler } from "./handlers/Scheduler.js";

// function sleep(ms) {
//   return new Promise(resolve => {
//     setTimeout(resolve, ms);
//   });
// }

const simulate = async () => {
  // const scheduler = new Scheduler();

  // scheduler.setEvent(
  //   { title: "First event summoned!", slug: "example_event" },
  //   3
  // );

  // scheduler.setEvent(
  //   { title: "Second event summoned!", slug: "example_event" },
  //   5
  // );

  // scheduler.start();

  // while (scheduler.hasEvents()) {
  //   let event = scheduler.getEvent();

  //   console.log("event", event);

  //   scheduler.stepAhead();

  //   await sleep(500);
  // }

  console.log("Random Integer", PD.rint(1, 500, 1000, false)[0]);
};

simulate();
