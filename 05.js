var helpers = require("./helpers");

const part1 = (data) => {
  var sections = helpers.splitByBlankLine(data);

  const seeds = sections[0].split(": ")[1].split(" ");
  sections.shift();
  const maps = sections;

  const allData = maps.map((m) => {
    let mapData = helpers.splitByNewLine(m);
    mapData.shift();
    mapData = mapData.map((dataString) => dataString.split(" "));
    mapData.map((data) => {
      const destination = parseInt(data[0]);
      const source = parseInt(data[1]);
      const range = parseInt(data[2]);

      return { source: source, destination: destination, range: range };
    });
    return mapData;
  });

  let matching;
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
    }
    if (currentKey < matching || !matching) {
      matching = currentKey;
    }
  });

  return matching;
};

const part2 = (data) => {
  var sections = helpers.splitByBlankLine(data);

  const seeds = sections[0].split(": ")[1].split(" ");
  const seedRanges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push(seeds.slice(i, i + 2));
  }

  sections.shift();
  const maps = sections;

  const allData = maps.map((m) => {
    let mapData = helpers.splitByNewLine(m);
    mapData.shift();
    mapData = mapData.map((dataString) => dataString.split(" "));
    mapData.map((data) => {
      const destination = parseInt(data[0]);
      const source = parseInt(data[1]);
      const range = parseInt(data[2]);

      return { source: source, destination: destination, range: range };
    });
    return mapData;
  });

  let matching;

  seedRanges.forEach((seedRange) => {
    console.log(seedRange);
    for (
      let i = parseInt(seedRange[0]);
      i < parseInt(seedRange[1]) + parseInt(seedRange[0]);
      i++
    ) {
      let currentKey = parseInt(i);
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
      }
      if (currentKey < matching || !matching) {
        matching = currentKey;
      }
    }
  });

  return matching;
};

module.exports = {
  part1,
  part2,
};
