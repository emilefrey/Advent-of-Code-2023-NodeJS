var helpers = require("./helpers");

const part1 = (data) => {
  const lines = helpers.splitByNewLine(data);
  let total = 0;
  lines.forEach((line, row) => {
    const re = /\d+/g;
    while ((match = re.exec(line)) != null) {
      if (hasSymbolNeighbor(match.index, match[0].length, line, lines, row)) {
        total += parseInt(match[0]);
      }
    }
  });
  return total;
};

const hasSymbolNeighbor = (startIndex, length, line, lines, row) => {
  const checkSameRow = () => {
    let before = false;
    let after = false;
    if (line[startIndex - 1]) {
      before = line[startIndex - 1] !== ".";
    }
    if (line[startIndex + length]) {
      after = line[startIndex + length] !== ".";
    }
    return before || after;
  };

  checkRow = (rowToCheck) => {
    const row = rowToCheck?.slice(
      startIndex === 0 ? 0 : startIndex - 1,
      startIndex + length + 1 > line.length - 1
        ? line.length - 1
        : startIndex + length + 1
    );
    const findMatch = row?.match(/[0-9.]+/g).join("");

    if (findMatch === undefined || row === undefined) {
      return false;
    }
    return findMatch !== row;
  };
  return checkSameRow() || checkRow(lines[row - 1]) || checkRow(lines[row + 1]);
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  let potentialGears = [];
  const rePotentialGear = /\*/g;

  lines.forEach((line, rowNumber) => {
    while ((match = rePotentialGear.exec(line)) != null) {
      potentialGears.push({
        row: rowNumber,
        index: match.index,
        gearValues: [],
      });
    }
  });

  const rePotentialGearValue = /[0-9]+/g;
  lines.forEach((line, rowNumber) => {
    while (
      (potentialGearValueMatch = rePotentialGearValue.exec(line)) != null
    ) {
      let matchingGears = potentialGears.filter((gear) => {
        const onSameOrNeighboringRow =
          rowNumber === gear.row ||
          rowNumber === gear.row - 1 ||
          rowNumber === gear.row + 1;
        return onSameOrNeighboringRow;
      });

      matchingGears = matchingGears.filter((gear) => {
        const valueIsAdjacent = between(
          gear.index,
          potentialGearValueMatch.index - 1,
          potentialGearValueMatch.index + potentialGearValueMatch[0].length
        );
        return valueIsAdjacent;
      });

      matchingGears.forEach((gear) => {
        if (!gear.gearValues.includes(potentialGearValueMatch[0])) {
          gear.gearValues.push(potentialGearValueMatch[0]);
        }
      });
    }
  });

  const gearPairsMultipled = potentialGears
    .filter((gear) => gear.gearValues.length === 2)
    .map((gear) => {
      return parseInt(gear.gearValues[0] * parseInt(gear.gearValues[1]));
    });

  return helpers.getTotal(gearPairsMultipled);
};

function between(x, min, max) {
  return x >= min && x <= max;
}

module.exports = {
  part1,
  part2,
};
