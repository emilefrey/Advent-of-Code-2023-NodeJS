var helpers = require("./helpers");

const getOverlap = (line) => {
  const numbers = line.split(": ");
  let [winningNumbers, myNumbers] = numbers[1].split(" | ");
  winningNumbers = winningNumbers.match(/[0-9]+/g);
  myNumbers = myNumbers.match(/[0-9]+/g);
  const overlap = myNumbers.filter((numberHaveNumber) =>
    winningNumbers.includes(numberHaveNumber)
  );
  return overlap;
};

const part1 = (data) => {
  const lines = helpers.splitByNewLine(data);
  let total = 0;
  lines.forEach((line) => {
    const overlap = getOverlap(line);
    if (overlap.length >= 1) {
      total += 2 ** (overlap.length - 1);
    }
  });

  return total;
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  const winners = lines.map((line) => {
    const overlap = getOverlap(line);
    return { lineWinners: overlap.length, copies: 1 };
  });

  winners.forEach((winner, winnerIndex) => {
    for (let i = 1; i <= winner.lineWinners; i++) {
      winners[winnerIndex + i].copies += winner.copies;
    }
  });

  const total = helpers.getTotal(winners.map((winner) => winner.copies));
  return total;
};

module.exports = {
  part1,
  part2,
};
