var helpers = require("./helpers");

const part1 = (data) => {
  const lines = helpers.splitByNewLine(data);
  let total = 0;
  lines.forEach((line) => {
    let possible = true;
    let [gameId, games] = line.split(": ");
    gameId = parseInt(gameId.split(" ")[1]);
    const gamesArray = games.split("; ");
    gamesArray.forEach((draw) => {
      const colorDraw = draw.split(", ");
      colorDraw.forEach((color) => {
        let [count, colorDrawn] = color.split(" ");
        count = parseInt(count);
        if (count > maxLookup[colorDrawn]) {
          possible = false;
          // TODO: Break (not necessary, but could speed things up...I think I need a for loop)
        }
      });
    });
    if (possible) {
      total += gameId;
    }
  });
  return total;
};

const maxLookup = {
  blue: 14,
  red: 12,
  green: 13,
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  let total = 0;
  lines.forEach((line) => {
    let maxBlue = 0;
    let maxRed = 0;
    let maxGreen = 0;
    let games = line.split(": ")[1];
    const gamesArray = games.split("; ");
    gamesArray.forEach((draw) => {
      const colorDraw = draw.split(", ");
      colorDraw.forEach((color) => {
        let [count, colorDrawn] = color.split(" ");
        count = parseInt(count);
        if (colorDrawn === "red") {
          maxRed = determineMax(maxRed, count);
        } else if (colorDrawn === "blue") {
          maxBlue = determineMax(maxBlue, count);
        } else if (colorDrawn === "green") {
          maxGreen = determineMax(maxGreen, count);
        }
      });
    });
    total += maxBlue * maxRed * maxGreen;
  });
  return total;
};

const determineMax = (currentMax, currentValue) => {
  if (currentValue > currentMax) {
    return currentValue;
  }
  return currentMax;
};

module.exports = {
  part1,
  part2,
};
