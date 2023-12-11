var helpers = require("./helpers");

const findNextValue = (line) => {
  const nextLine = [];
  for (let i = 0; i < line.length - 1; i++) {
    nextLine.push(line[i + 1] - line[i]);
  }

  if ([...new Set(nextLine)].length === 1 && nextLine[0] === 0) {
    return 0;
  }
  return findNextValue(nextLine) + nextLine[nextLine.length - 1];
};

const part1 = (data) => {
  const lines = helpers.splitByNewLine(data);
  const values = [];
  lines.forEach((line) => {
    const lineValues = line.split(" ").map((value) => parseInt(value));
    const add = findNextValue(lineValues);
    values.push(lineValues[lineValues.length - 1] + add);
  });
  return helpers.getTotal(values);
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  const values = [];
  lines.forEach((line) => {
    const lineValues = line
      .split(" ")
      .map((value) => parseInt(value))
      .reverse();
    const add = findNextValue(lineValues);
    values.push(lineValues[lineValues.length - 1] + add);
  });
  return helpers.getTotal(values);
};

module.exports = {
  part1,
  part2,
};
