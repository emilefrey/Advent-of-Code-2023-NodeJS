var helpers = require("./helpers");

const part1 = (data) => {
  const lines = helpers.splitByNewLine(data);
  const arrayOfNumbers = processLines(lines);
  return getTotal(arrayOfNumbers);
};

const processLines = (lines) => {
  const arrayOfCalibrationValues = lines.map((line) => {
    // replace non-digits with emtpy strings, leaving only numbers behind
    const numbersOnly = line.replace(/\D/g, "");
    // get the first number in the remaining string
    const firstNumber = numbersOnly[0];
    // get the last number of the remaining string
    const lastNumber = numbersOnly[numbersOnly.length - 1];
    // create a 2 digit number
    return parseInt(`${firstNumber}${lastNumber}`);
  });
  return arrayOfCalibrationValues;
};

const getTotal = (arrayOfNumbers) => {
  return arrayOfNumbers.reduce(
    (partialSum, currentTotal) => partialSum + currentTotal,
    0
  );
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  const arrayOfNumbers = processLinesPart2(lines);
  return getTotal(arrayOfNumbers);
};

const processLinesPart2 = (lines) => {
  // find all the numbers in the line (including strings)
  const valueArray = lines.map((line) => {
    const matchedStrings = getNumberValues(line);
    return parseInt(
      `${matchedStrings[0]}${matchedStrings[matchedStrings.length - 1]}`
    );
  });
  return valueArray;
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
      // match all with a lookback to ensure overlaps are included
      new RegExp(
        /(?<=(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9))/,
        "g"
      )
    ),
  ].map((found) => {
    // value is in group 1 of the matchAll
    const value = found[1];
    if (value.length > 1) {
      return valueLookup[value];
    }
    return value;
  });
};

module.exports = {
  part1,
  part2,
};
