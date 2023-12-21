var helpers = require("./helpers");

const part1 = (data) => {
  const lines = helpers.splitByNewLine(data);

  const map = [[]];
  let currentRow = 0;
  let currentColumn = 0;

  lines.forEach((line) => {
    let [direction, amount] = line.split(" ");
    amount = parseInt(amount);
    if (direction === "U") {
      const temp = currentRow;
      while (currentRow > temp - amount) {
        if (!map[currentRow]) {
          map[currentRow] = [];
        }
        map[currentRow][currentColumn] = 1;
        currentRow--;
      }
    } else if (direction === "D") {
      const temp = currentRow;
      while (currentRow < temp + amount) {
        if (!map[currentRow]) {
          map[currentRow] = [];
        }
        map[currentRow][currentColumn] = 1;
        currentRow++;
      }
    } else if (direction === "R") {
      const temp = currentColumn;
      while (currentColumn < temp + amount) {
        if (!map[currentRow]) {
          map[currentRow] = [];
        }
        map[currentRow][currentColumn] = 1;

        currentColumn++;
      }
    } else if (direction === "L") {
      const temp = currentColumn;
      while (currentColumn > temp - amount) {
        if (!map[currentRow]) {
          map[currentRow] = [];
        }
        map[currentRow][currentColumn] = 1;
        currentColumn--;
      }
    }
  });
  console.table(map);

  return map.reduce((accum, currentValue) => {
    const temp = [];
    let i = 0;
    let start = false;
    let inside = false;
    let count = 0;
    let hitGap = false;
    while (i < currentValue.length) {
      // if you hit a 1, you def count
      if (currentValue[i]) {
        count++;
        i++;
        if (!start) {
          start = true;
        }
        continue;
      } else if (!currentValue[i] && start) {
        count++;
        i++;
        start = false;
        inside = true;
        continue;
      } else if (!currentValue[i] && !start && inside) {
        count++;
        i++;
        continue;
      } else if (inside) {
        count++;
        i++;
        continue;
      }
      i++;
    }
    console.log(count);
    // const rowValue = currentValue.length - i;
    return accum + count;
  }, 0);
};

// 21438 too low

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  return 2;
};

module.exports = {
  part1,
  part2,
};
