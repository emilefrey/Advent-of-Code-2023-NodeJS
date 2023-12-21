var helpers = require("./helpers");

const findNextStepCoordinates = (lines, currentX, currentY, visited) => {
  const currentValue = lines[currentY][currentX];

  const lookNorth = () => {
    if (
      currentY - 1 >= 0 &&
      (currentValue === "|" ||
        currentValue === "L" ||
        currentValue === "J" ||
        currentValue === "S") &&
      !visited.some(
        (coordinate) =>
          coordinate.X === currentX && coordinate.Y === currentY - 1
      )
    ) {
      const up = lines[currentY - 1][currentX];
      if (up === "|" || up === "F" || up === "7" || up === "S") {
        return { X: currentX, Y: currentY - 1 };
      }
    }
  };

  const lookSouth = () => {
    if (
      currentY + 1 < lines.length &&
      (currentValue === "|" ||
        currentValue === "7" ||
        currentValue === "F" ||
        currentValue === "S") &&
      !visited.some(
        (coordinate) =>
          coordinate.X === currentX && coordinate.Y === currentY + 1
      )
    ) {
      const down = lines[currentY + 1][currentX];
      if (down === "|" || down === "L" || down === "J" || down === "S") {
        return { X: currentX, Y: currentY + 1 };
      }
    }
  };

  const lookEast = () => {
    if (
      currentX + 1 < lines[currentY].length &&
      (currentValue === "L" ||
        currentValue === "F" ||
        currentValue === "-" ||
        currentValue === "S") &&
      !visited.some(
        (coordinate) =>
          coordinate.X === currentX + 1 && coordinate.Y === currentY
      )
    ) {
      const right = lines[currentY][currentX + 1];
      if (right === "-" || right === "J" || right === "7" || right === "S") {
        return { X: currentX + 1, Y: currentY };
      }
    }
  };

  const lookWest = () => {
    if (
      currentX - 1 >= 0 &&
      (currentValue === "-" ||
        currentValue === "J" ||
        currentValue === "7" ||
        currentValue === "S") &&
      !visited.some(
        (coordinate) =>
          coordinate.X === currentX - 1 && coordinate.Y === currentY
      )
    ) {
      const left = lines[currentY][currentX - 1];
      if (left === "-" || left === "L" || left === "F" || left === "S") {
        return { X: currentX - 1, Y: currentY };
      }
    }
  };

  const north = lookNorth();
  const south = lookSouth();
  const east = lookEast();
  const west = lookWest();

  if (north) {
    return north;
  } else if (south) {
    return south;
  } else if (east) {
    return east;
  } else if (west) {
    return west;
  }
};

const part1 = (data) => {
  const lines = helpers.splitByNewLine(data);
  let Y = lines.findIndex((line) => line.includes("S"));
  let X = lines[Y].indexOf("S");
  let count = 0;
  const visited = [{ X, Y }];
  while (true) {
    console.log(X, Y);
    const result = findNextStepCoordinates(lines, X, Y, visited);
    X = result?.X;
    Y = result?.Y;
    count++;
    visited.push({ X, Y });
    if (X === undefined || Y === "undefined") {
      break;
    }
  }

  return count / 2;
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  return 2;
};

module.exports = {
  part1,
  part2,
};
