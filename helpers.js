const splitByNewLine = (data) => data.split(/\r?\n/);

const splitBySpace = (data) => data.split(" ");

const splitByBlankLine = (data) => data.split(/\n\n/);

const isUpperCase = (string) => /^[A-Z]*$/.test(string);

const getTotal = (arrayOfNumbers) => {
  return arrayOfNumbers.reduce(
    (partialSum, currentTotal) => partialSum + currentTotal,
    0
  );
};

function between(x, min, max) {
  return x >= min && x <= max;
}

module.exports = {
  splitByNewLine,
  splitBySpace,
  splitByBlankLine,
  isUpperCase,
  getTotal,
  between,
};
