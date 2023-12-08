var helpers = require("./helpers");

const determineHandTypePart1 = (occurrences) => {
  const occurrenceKeys = Object.keys(occurrences);
  const occurrenceValues = Object.values(occurrences);
  // console.log(occurrencKeys);
  const size = occurrenceKeys.length;
  if (size === 5) {
    // all cards unique, one of a kind
    return 0;
  } else if (size === 4) {
    // 2 cards same, other 3 unique, 1 pair
    return 1;
  } else if (size === 3) {
    // either 3 of a kind or 2 pair
    if (occurrenceValues.includes(3)) {
      return 3;
    }
    return 2;
  } else if (size === 2) {
    //either full house or 4 of a kind
    if (occurrenceValues.includes(4)) {
      return 4;
    }
    return "F";
  }
  // otherwise 5 of a kind
  return 5;
};

const determineHandTypePart2 = (occurrences) => {
  const occurrenceKeys = Object.keys(occurrences);
  const occurrenceValues = Object.values(occurrences);
  const jokerCount = occurrences["J"];
  const size = occurrenceKeys.length;
  if (size === 5) {
    // only possilble to have one J
    if (jokerCount === 1) {
      // one pair
      return 1;
    }
    // all cards unique, one of a kind
    return 0;
  } else if (size === 4) {
    if (jokerCount > 0) {
      // bump 2 cards to 3
      return 3;
    }
    // 2 cards same, other 3 unique, 1 pair
    return 1;
  } else if (size === 3) {
    // either 3 of a kind or 2 pair
    // 3 of a kind
    if (occurrenceValues.includes(3)) {
      if (jokerCount > 0) {
        return 4;
      }
      return 3;
    } else {
      // 2 pair
      if (jokerCount === 1) {
        return "F";
      } else if (jokerCount === 2) {
        return 4;
      }
      return 2;
    }
  } else if (size === 2) {
    //either full house or 4 of a kind
    if (jokerCount > 0) {
      return 5;
    }
    if (occurrenceValues.includes(4)) {
      return 4;
    } else {
      return "F";
    }
  }
  // otherwise 5 of a kind
  return 5;
};

const cardValuesPart1 = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const cardValuesPart2 = {
  J: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  Q: 12,
  K: 13,
  A: 14,
};

const part1 = (data) => {
  const lines = helpers.splitByNewLine(data);

  const hands = { 0: [], 1: [], 2: [], 3: [], F: [], 4: [], 5: [] };
  lines.forEach((line) => {
    let [hand, bid] = line.split(" ");
    hand = hand.split("");

    const occurrences = hand.reduce((acc, curr) => {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});

    const handType = determineHandTypePart1(occurrences);
    hands[handType].push({ hand, bid });
  });

  Object.values(hands).forEach((handArray) => {
    handArray.sort((a, b) => {
      for (let i = 0; i <= 4; i++) {
        if (a.hand[i] === b.hand[i]) {
          continue;
        } else {
          return cardValuesPart1[a.hand[i]] - cardValuesPart1[b.hand[i]];
        }
      }
    });
  });

  const handsRanked = [
    ...hands["0"],
    ...hands["1"],
    ...hands["2"],
    ...hands["3"],
    ...hands["F"],
    ...hands["4"],
    ...hands["5"],
  ];

  let finalValue = 0;
  handsRanked.forEach((rankedHand, index) => {
    finalValue += parseInt(rankedHand.bid) * (index + 1);
  });
  return finalValue;
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);

  const hands = { 0: [], 1: [], 2: [], 3: [], F: [], 4: [], 5: [] };
  lines.forEach((line) => {
    let [hand, bid] = line.split(" ");
    hand = hand.split("");

    const occurrences = hand.reduce((acc, curr) => {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});

    const handType = determineHandTypePart2(occurrences);
    hands[handType].push({ hand, bid });
  });

  // sort
  Object.values(hands).forEach((handArray) => {
    handArray.sort((a, b) => {
      for (let i = 0; i <= 4; i++) {
        if (a.hand[i] === b.hand[i]) {
          continue;
        } else {
          return cardValuesPart2[a.hand[i]] - cardValuesPart2[b.hand[i]];
        }
      }
    });
  });

  const handsRanked = [
    ...hands["0"],
    ...hands["1"],
    ...hands["2"],
    ...hands["3"],
    ...hands["F"],
    ...hands["4"],
    ...hands["5"],
  ];

  let finalValue = 0;
  handsRanked.forEach((rankedHand, index) => {
    finalValue += parseInt(rankedHand.bid) * (index + 1);
  });
  return finalValue;
};

module.exports = {
  part1,
  part2,
};
