var helpers = require("./helpers");

const getWinningCount = (timeToRace, distanceToBeat) => {
  let winningCount = 0;
  for (let i = 1; i < timeToRace; i++) {
    const distance = (timeToRace - i) * i;
    if (distance > distanceToBeat) {
      winningCount++;
    }
  }
  return winningCount;
};

const part1 = (data) => {
  const lines = helpers
    .splitByNewLine(data)
    .map((line) => line.match(/[0-9]+/g));
  const winningCounts = lines[0].map((time, index) => {
    return getWinningCount(parseInt(time), parseInt(lines[1][index]));
  });
  return winningCounts.reduce((a, b) => a * b, 1);
};

const part2 = (data) => {
  const lines = helpers
    .splitByNewLine(data)
    .map((line) => line.match(/[0-9]+/g));
  const time = parseInt(lines[0].join(""));
  const distance = parseInt(lines[1].join(""));
  return getWinningCount(time, distance);
};

module.exports = {
  part1,
  part2,
};
