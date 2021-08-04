exports.incrementBudget = map => {
  // Returns a random integer from 1 to 10:
  const randomBudget = Math.floor(Math.random() * 4) + 3;

  map.budget += randomBudget;
};
