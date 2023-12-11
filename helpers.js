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

function leastCommonMultiple(arrayOfNumbers) {
  // very little idea how this JS works yet, but need to find least common muliple
  // shamelessly stolen: https://stackoverflow.com/a/49722579/4920796
  const gcd = (a, b) => (a ? gcd(b % a, a) : b);
  const lcm = (a, b) => (a * b) / gcd(a, b);

  return arrayOfNumbers.reduce(lcm);
}

module.exports = {
  splitByNewLine,
  splitBySpace,
  splitByBlankLine,
  isUpperCase,
  getTotal,
  between,
  leastCommonMultiple,
};
