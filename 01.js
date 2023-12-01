var helpers = require("./helpers");

const part1 = (data) => {
  const lines = helpers.splitByNewLine(data);
  const arrayOfNumbers = processLines(lines);
  return getTotal(arrayOfNumbers);
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  const arrayOfNumbers = processLinesPart2(lines);
  return getTotal(arrayOfNumbers);
};

const processLines = (lines) => {
  const arrayOfCalibrationValues = lines.map((line) => {
    // replace non-digits with emtpy strings, leaving only numbers behind
    const numbersOnly = line.replace(/\D/g, "");
    const firstNumber = numbersOnly[0];
    const lastNumber = numbersOnly[numbersOnly.length - 1];
    return parseInt(`${firstNumber}${lastNumber}`);
  });
  return arrayOfCalibrationValues;
};

const processLinesPart2 = (lines) => {
  const matchValues = lines.map((line) => {
    const matchedStrings = getNumberValues(line);
    return parseInt(
      `${matchedStrings[0]}${matchedStrings[matchedStrings.length - 1]}`
    );
  });
  return matchValues;
};

const getNumberValues = (string) => {
  const valueLookup = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  return [
    ...string.matchAll(
      new RegExp(
        /(?<=(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9))/,
        "g"
      )
    ),
  ].map((found) => {
    const value = found[1];
    if (value.length > 1) {
      return valueLookup[value];
    }
    return value;
  });
};

const getTotal = (arrayOfNumbers) => {
  return arrayOfNumbers.reduce(
    (partialSum, currentTotal) => partialSum + currentTotal,
    0
  );
};

module.exports = {
  part1,
  part2,
};
