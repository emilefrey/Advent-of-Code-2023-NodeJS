var helpers = require("./helpers");

const detectAndAddRows = (data) => {
  const updatedArray = [...data];
  let rowsAdded = 0;
  for (i = 0; i < data.length; i++) {
    if (!data[i].includes("#")) {
      updatedArray.splice(i + rowsAdded, 0, ".".repeat(data[0].length));
      rowsAdded++;
    }
  }
  return updatedArray;
};

const detectAndAddColumns = (data) => {
  let updatedArray = [...data];
  let columnsAdded = 0;
  for (i = 0; i < data[0].length; i++) {
    for (j = 0; j < data.length; j++) {
      // console.log(i, j, data[i][j]);
      if (data[j][i] === "#") {
        // console.log(j, i);
        break;
      } else if (j === data.length - 1) {
        updatedArray = updatedArray.map((line) => {
          return (
            line.slice(0, columnsAdded + i) + "." + line.slice(columnsAdded + i)
          );
        });
        columnsAdded++;
      }
    }

    // if (!data[i].includes("#")) {
    //   updatedArray.splice(i + rowsAdded, 0, ".".repeat(data[0].length));
    //   rowsAdded++;
    // }
  }
  return updatedArray;
};

function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}

const part1 = (data) => {
  let lines = helpers.splitByNewLine(data);
  lines = detectAndAddRows(lines);
  lines = detectAndAddColumns(lines);
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
    console.log("inside", galaxies[i]);
    for (let j = i + 1; j < galaxies.length; j++) {
      console.log("j loop");
      total +=
        Math.abs(galaxies[i].line - galaxies[j].line) +
        Math.abs(galaxies[i].column - galaxies[j].column);
    }
  }
  return total;
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  return 2;
};

module.exports = {
  part1,
  part2,
};
