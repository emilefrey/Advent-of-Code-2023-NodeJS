var helpers = require("./helpers");

const detectAndAddRows = (data) => {
  let rowsAdded = [];
  for (i = 0; i < data.length; i++) {
    if (!data[i].includes("#")) {
      rowsAdded.push(i);
    }
  }
  return rowsAdded;
};

const detectAndAddColumns = (data) => {
  let columnsAdded = [];
  for (i = 0; i < data[0].length; i++) {
    for (j = 0; j < data.length; j++) {
      if (data[j][i] === "#") {
        break;
      } else if (j === data.length - 1) {
        columnsAdded.push(i);
      }
    }
  }
  return columnsAdded;
};

function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}

const part1 = (data, expansionValue = 2) => {
  let lines = helpers.splitByNewLine(data);
  rowsAdded = detectAndAddRows(lines);
  columnsAdded = detectAndAddColumns(lines);
  linesArray = lines.map((line) => line.split(""));
  const galaxies = [];

  linesArray.forEach((line, lineIndex) => {
    const indexes = getAllIndexes(line, "#");
    indexes.forEach((index) => {
      galaxies.push({ line: lineIndex, column: index });
    });
  });

  total = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const rowsCrossedWithExpansion = rowsAdded.filter(
        (row) =>
          (galaxies[i].line < row && row < galaxies[j].line) ||
          (galaxies[j].line < row && row < galaxies[i].line)
      );

      const columnsCrossedWithExpansion = columnsAdded.filter(
        (column) =>
          (galaxies[i].column < column && column < galaxies[j].column) ||
          (galaxies[j].column < column && column < galaxies[i].column)
      );

      total +=
        Math.abs(galaxies[i].line - galaxies[j].line) +
        Math.abs(galaxies[i].column - galaxies[j].column) +
        (rowsCrossedWithExpansion.length + columnsCrossedWithExpansion.length) *
          (expansionValue - 1);
    }
  }
  return total;
};

const part2 = (data) => {
  return part1(data, 1000000);
};

module.exports = {
  part1,
  part2,
};
