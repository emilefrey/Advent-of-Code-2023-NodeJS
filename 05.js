var helpers = require("./helpers");

const part1 = (data) => {
  var sections = helpers.splitByBlankLine(data);

  const seeds = sections[0].split(": ")[1].split(" ");
  sections.shift();
  const maps = sections;

  const allData = maps.map((m) => {
    let lookup = {};
    let mapData = helpers.splitByNewLine(m);
    mapData.shift();
    mapData = mapData.map((dataString) => dataString.split(" "));
    // console.log(mapData);
    mapData.map((data) => {
      const destination = parseInt(data[0]);
      const source = parseInt(data[1]);
      const range = parseInt(data[2]);

      // memory issue
      // for (let i = 0; i < range; i++) {
      //   lookup[source + i] = `${destination + i}`;
      // }

      return { source: source, destination: destination, range: range };
    });
    // console.log(lookup);
    return mapData;
    // console.log(mapData);
    // mapData = mapData.map((data) => data.split(" "));
  });

  // console.log(allData);

  const matching = [];
  seeds.forEach((seed) => {
    let currentKey = parseInt(seed);
    for (let i = 0; i <= 6; i++) {
      for (let j = 0; j < allData[i].length; j++) {
        const destination = parseInt(allData[i][j][0]);
        const source = parseInt(allData[i][j][1]);
        const range = parseInt(allData[i][j][2]);
        if (source <= currentKey && currentKey < source + range) {
          currentKey = destination + (currentKey - source);
          break;
        }
      }
      // allData[i].forEach((data) => {});
      // memory issue
      // currentKey = allData[i][currentKey] ?? currentKey;
    }
    matching.push(parseInt(currentKey));
    matching.sort((a, b) => a - b);
  });

  return matching[0];
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  let total = 0;
  lines.forEach((line) => {});
  return total;
};

module.exports = {
  part1,
  part2,
};
