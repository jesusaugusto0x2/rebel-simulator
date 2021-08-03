// import { Governor } from "./classes/Governor.js";

// function init() {
//   let gob = new Governor("Jesus Varela");

//   console.log(gob.salute());
// }

// init();

import { Scheduler } from "./handlers/Scheduler.js";

const scheduler = new Scheduler();

scheduler.setEvent(
  { title: "First event summoned!", slug: "example_event" },
  3
);

scheduler.setEvent(
  { title: "Second event summoned!", slug: "example_event" },
  5
);

const simulate = () => {
  scheduler.start();

  while (scheduler.hasEvents()) {
    let event = scheduler.getEvent();

    console.log("event", event);
  }
};

simulate();
