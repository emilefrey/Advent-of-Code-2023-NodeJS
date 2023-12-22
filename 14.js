var helpers = require("./helpers");

const tiltNorth = (lines) => {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const item = lines[i][j];
      if (item === "O") {
        let restingRow = i;
        let moved = false;
        while (
          lines[restingRow - 1]?.[j] !== "#" &&
          lines[restingRow - 1]?.[j] !== "O" &&
          restingRow - 1 >= 0
        ) {
          restingRow--;
          moved = true;
        }
        if (moved) {
          lines[i][j] = ".";
          lines[restingRow][j] = "O";
        }
      }
    }
  }
};

const tiltSouth = (lines) => {
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const item = lines[i][j];
      if (item === "O") {
        let restingRow = i;
        let moved = false;
        while (
          lines[restingRow + 1]?.[j] !== "#" &&
          lines[restingRow + 1]?.[j] !== "O" &&
          restingRow + 1 <= lines.length - 1
        ) {
          restingRow++;
          moved = true;
        }
        if (moved) {
          lines[i][j] = ".";
          lines[restingRow][j] = "O";
        }
      }
    }
  }
};

const tiltWest = (lines) => {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const item = lines[i][j];
      if (item === "O") {
        let restingColumn = j;
        let moved = false;
        while (
          restingColumn - 1 >= 0 &&
          lines[i][restingColumn - 1] !== "#" &&
          lines[i][restingColumn - 1] !== "O"
        ) {
          restingColumn--;
          moved = true;
        }
        if (moved) {
          lines[i][j] = ".";
          lines[i][restingColumn] = "O";
        }
      }
    }
  }
};

const tiltEast = (lines) => {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = line.length - 1; j >= 0; j--) {
      const item = lines[i][j];
      if (item === "O") {
        let restingColumn = j;
        let moved = false;
        while (
          restingColumn + 1 <= line.length - 1 &&
          lines[i][restingColumn + 1] !== "#" &&
          lines[i][restingColumn + 1] !== "O"
        ) {
          restingColumn++;
          moved = true;
        }
        if (moved) {
          lines[i][j] = ".";
          lines[i][restingColumn] = "O";
        }
      }
    }
  }
};

const cycle = (lines) => {
  tiltNorth(lines);
  tiltWest(lines);
  tiltSouth(lines);
  tiltEast(lines);
};

const part1 = (data) => {
  let lines = helpers.splitByNewLine(data);
  lines = lines.map((line) => line.split(""));
  tiltNorth(lines);

  return lines.reduce((accum, current, index) => {
    const count = current.filter((item) => item === "O").length;
    return accum + count * (lines.length - index);
  }, 0);
};

const part2 = (data) => {
  let lines = helpers.splitByNewLine(data);
  lines = lines.map((line) => line.split(""));
  for (let i = 0; i < 10000; i++) {
    if (i % 10000 === 0) {
      console.log((i / 100000) * 100);
    }
    cycle(lines);
  }
  return lines.reduce((accum, current, index) => {
    const count = current.filter((item) => item === "O").length;
    return accum + count * (lines.length - index);
  }, 0);
};

//108467 too high

module.exports = {
  part1,
  part2,
};
