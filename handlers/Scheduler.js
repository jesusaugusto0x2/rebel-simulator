class Scheduler {
  constructor() {
    this.events = [];
    this.currentTime = 0;
    this.timeAccumulator = 1;
  }

  /**
   * Inserts a new event with a scheduled time into the
   * future event list
   *
   * @param {Object} _evt
   * @param {Integer} _time
   */
  setEvent(_evt, _time) {
    let event = _evt;

    event.time = this.currentTime + _time;

    console.log(`  New event insertion`, event);

    this.events.push(event);
  }

  /**
   * Checks if there's still any event on the list
   *
   * @returns {Boolean}
   */
  hasEvents() {
    return this.events.length > 0;
  }

  /**
   * Retrieves an event object in case the next time event it's
   * the same as the current time
   *
   * @returns {Void}
   */
  getCurrentEvents() {
    return this.events.filter(evt => {
      return evt.time === this.currentTime;
    });
  }

  /**
   * Advances the time in the defined step
   *
   * @returns {Void}
   */
  stepAhead() {
    this.currentTime += 1;
  }

  /**
   * Returns the current time of the scheduler
   *
   * @returns {Integer}
   */
  getCurrentTime() {
    return this.currentTime;
  }
}

exports.Scheduler = Scheduler;
