import PD from "probability-distributions";
import Probs from "../../utils/probabilities.js";
import { printMessage } from "../../utils/strings.js";
import Helper from "./helpers.js";

const DECIMAL_ADJUST = 2;
const MINIMUM_ADJUSTABLE_PROB = 0.02;

export default class Map {
  constructor(name, scheduler, governor) {
    this.name = name;
    this.scheduler = scheduler;
    this.governor = governor;
    this.budget = PD.rint(1, 40, 55, false)[0];
    this.yearBudget = 0;
    this.totalPopulation = PD.rint(1, 260000, 270000, false)[0];
    this.hostilePopulation = PD.rint(1, 17000, 20000, false)[0];
    this.supportPopulation = PD.rint(1, 400, 500, false)[0];
    this.insurgentDiplomacy = PD.runif(100)[0];

    // Common fluctuating value
    this.corruption = {
      prob: 0.15,
      value: 5,
    };

    // Common fluctuating value
    this.inflation = {
      prob: 0.15,
      value: 5,
    };

    // Common fluctuating value
    this.insurgency = {
      prob: 0.25,
      value: 25,
    };

    // Game decider
    this.reputation = {
      prob: 0.03,
      value: 75,
    };

    // Game decider
    this.stability = {
      prob: 0.01,
      value: 5,
    };
  }

  reduceBudget(value) {
    this.budget -= value;
  }

  printValues() {
    printMessage(
      `  Self probability values:
        Stability: { prob: ${this.stability.prob.toFixed(
          DECIMAL_ADJUST
        )}, val: ${this.stability.value}}
        Insurgency: { prob: ${this.insurgency.prob.toFixed(
          DECIMAL_ADJUST
        )}, val: ${this.insurgency.value}}
        Corruption: { prob: ${this.corruption.prob.toFixed(
          DECIMAL_ADJUST
        )}, val: ${this.corruption.value}}
        Reputation: { prob: ${this.reputation.prob.toFixed(
          DECIMAL_ADJUST
        )}, val: ${this.reputation.value}}
        Inflation: { prob: ${this.inflation.prob.toFixed(
          DECIMAL_ADJUST
        )}, val: ${this.inflation.value}}`,
      `magenta`
    );
  }

  runValuesEffect() {
    this.insurgency.value < 40
      ? (this.stability.value += 0.01 * this.reputation.value)
      : (this.stability.value -= 0.02 * this.insurgency.value);
    this.reputation.value -=
      0.01 * (this.corruption.value + this.insurgency.value);
    this.reputation.value += 0.02 * this.stability.value;
  }

  readjustValues() {
    if (this.stability.prob < MINIMUM_ADJUSTABLE_PROB) {
      this.stability.prob = Probs.getUniformRandom(0.01, 0.15);
    }

    if (this.insurgency.prob < MINIMUM_ADJUSTABLE_PROB) {
      this.insurgency.prob = Probs.getUniformRandom(0.01, 0.15);
    }

    if (this.corruption.prob < MINIMUM_ADJUSTABLE_PROB) {
      this.corruption.prob = Probs.getUniformRandom(0.01, 0.15);
    }

    if (this.inflation.prob < MINIMUM_ADJUSTABLE_PROB) {
      this.inflation.prob = Probs.getUniformRandom(0.01, 0.15);
    }

    if (this.reputation.prob < MINIMUM_ADJUSTABLE_PROB) {
      this.reputation.prob = Probs.getUniformRandom(0.01, 0.15);
    }
  }

  evaluate() {
    printMessage(
      `Evaluating map state on ${this.scheduler.getCurrentTime()} week`,
      `advice`
    );

    Helper.runEvents(this);

    Helper.incrementBudget(this);

    Helper.checkSelfProbabilities(this);

    this.governor.executeOperation(this);

    Helper.selfUpdateByProbs(this);

    // this.runValuesEffect();

    this.printValues();

    this.readjustValues();
  }
}
