var helpers = require("./helpers");

const part1 = (data) => {
  let [instructions, directions] = helpers.splitByBlankLine(data);
  instructions = instructions.split("");
  directions = helpers.splitByNewLine(directions);

  const map = {};
  directions.forEach((direction) => {
    let [key, lr] = direction.split(" = ");
    lr = lr.replace("(", "").replace(")", "");
    const [L, R] = lr.split(", ");
    map[key] = { L, R };
  });

  let count = 0;
  let current = "AAA";
  while (current !== "ZZZ") {
    current = map[current][instructions[count % instructions.length]];
    count++;
  }
  return count;
};

const part2 = (data) => {
  let [instructions, directions] = helpers.splitByBlankLine(data);
  instructions = instructions.split("");
  directions = helpers.splitByNewLine(directions);
  const map = {};
  const keysEndWithA = [];
  directions.forEach((direction) => {
    let [key, lr] = direction.split(" = ");
    if (key[2] === "A") {
      keysEndWithA.push(key);
    }
    lr = lr.replace("(", "").replace(")", "");
    const [L, R] = lr.split(", ");
    map[key] = { L, R, currentEnd: L };
  });

  // let count = 0;
  let currentPositions = [...keysEndWithA];

  const counts = [];
  currentPositions.forEach((position) => {
    let positionCount = 0;
    let next = map[position][instructions[positionCount % instructions.length]];
    positionCount++;
    while (!(next[2] === "Z")) {
      next = map[next][instructions[positionCount % instructions.length]];
      positionCount++;
    }
    counts.push(positionCount);
  });

  return helpers.leastCommonMultiple(counts);
};
//260000000 too low
module.exports = {
  part1,
  part2,
};
