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
    mapData.forEach((data) => {
      const destination = parseInt(data[0]);
      const source = parseInt(data[1]);
      const range = parseInt(data[2]);

      for (let i = 0; i < range; i++) {
        lookup[source + i] = `${destination + i}`;
      }
    });
    // console.log(lookup);
    return lookup;
    // console.log(mapData);
    // mapData = mapData.map((data) => data.split(" "));
  });

  // console.log(allData);

  const matching = [];
  seeds.forEach((seed) => {
    let currentKey = seed;
    for (let i = 0; i <= 6; i++) {
      currentKey = allData[i][currentKey] ?? currentKey;
    }
    matching.push(parseInt(currentKey));
    matching.sort((a, b) => a - b);
  });

  return matching[0];
  // lines.forEach((line) => {});
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
