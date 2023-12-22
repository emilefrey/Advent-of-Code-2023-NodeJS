var helpers = require("./helpers");

const part1 = (data) => {
  const groups = data.split(",");
  const results = [];
  groups.forEach((group) => {
    let total = 0;
    const characters = group.split("");
    characters.forEach((character) => {
      const charCode = character.charCodeAt(0);
      total += charCode;
      total = total * 17;
      total = total % 256;
    });
    results.push(total);
  });

  return helpers.getTotal(results);
};

const part2 = (data) => {
  const groups = data.split(",");
  const results = [];
  const boxes = {};
  groups.forEach((group) => {
    let box = 0;
    let characters = "";
    if (group.includes("-")) {
      characters = group.split("-")[0];
    } else if (group.includes("=")) {
      characters = group.split("=")[0];
    }
    characters = characters.split("");

    characters.forEach((character) => {
      const charCode = character.charCodeAt(0);
      box += charCode;
      box = box * 17;
      box = box % 256;
    });
    if (!boxes[box]) {
      boxes[box] = { lenses: [] };
    }

    if (group.includes("-")) {
      const lensLabel = group.split("-")[0];
      boxes[box].lenses = boxes[box].lenses.filter(
        (lens) => lens.label !== lensLabel
      );
    } else if (group.includes("=")) {
      let [lensLabel, focalLength] = group.split("=");
      focalLength = parseInt(focalLength);
      const currentIndex = boxes[box].lenses.findIndex(
        (lens) => lens.label === lensLabel
      );
      if (currentIndex !== -1) {
        boxes[box].lenses[currentIndex] = {
          label: lensLabel,
          focalLength: focalLength,
        };
      } else {
        boxes[box].lenses.push({ label: lensLabel, focalLength: focalLength });
      }
    }
  });

  const total = Object.entries(boxes).reduce((accum, [box, boxContent]) => {
    let boxTotal = 0;
    boxContent.lenses.forEach((lens, lensIndex) => {
      boxTotal += (1 + parseInt(box)) * (lensIndex + 1) * lens.focalLength;
    });
    return accum + boxTotal;
  }, 0);
  return total;
};

module.exports = {
  part1,
  part2,
};
