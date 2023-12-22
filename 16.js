var helpers = require("./helpers");

const goUp = (x, y, situation) => {
  let currentX = x;
  let currentY = y;
  while (
    situation[currentX - 1]?.[currentY]?.item === "."
    // situation[currentX]?.[currentY - 1] === "X"
  ) {
    situation[currentX - 1][currentY].item = "X";
    situation[currentX - 1][currentY].energized = true;
    currentX--;
  }
  if (situation[currentX - 1]?.[currentY]) {
    reflect(currentX - 1, currentY, "B", situation);
  }
};

const goDown = (x, y, situation) => {
  let currentX = x;
  let currentY = y;
  while (
    situation[currentX + 1]?.[currentY]?.item === "."
    // situation[currentX]?.[currentY - 1] === "X"
  ) {
    situation[currentX + 1][currentY].item = "X";
    situation[currentX + 1][currentY].energized = true;
    currentX++;
  }
  if (situation[currentX + 1]?.[currentY]) {
    reflect(currentX + 1, currentY, "T", situation);
  }
};

const goRight = (x, y, situation) => {
  let currentX = x;
  let currentY = y;
  while (
    situation[currentX]?.[currentY + 1]?.item === "."
    // situation[currentX]?.[currentY - 1] === "X"
  ) {
    situation[currentX][currentY + 1].item = "X";
    situation[currentX][currentY + 1].energized = true;
    currentY++;
  }
  if (situation[currentX]?.[currentY + 1]) {
    reflect(currentX, currentY + 1, "L", situation);
  }
};

const goLeft = (x, y, situation) => {
  let currentX = x;
  let currentY = y;
  while (
    situation[currentX]?.[currentY - 1]?.item === "."
    // situation[currentX]?.[currentY - 1] === "X"
  ) {
    situation[currentX][currentY - 1].item = "X";
    situation[currentX][currentY - 1].energized = true;
    currentY--;
  }
  if (situation[currentX]?.[currentY - 1]) {
    reflect(currentX, currentY - 1, "R", situation);
  }
};

const part1 = (data) => {
  const lines = helpers.splitByNewLine(data);
  const situation = lines.map((line) =>
    line
      .split("")
      .map((item) => ({ item: item, energized: false, directions: [] }))
  );
  goRight(0, -1, situation);
  const energizedView = situation.map((item) =>
    item.map((x) => (x.energized ? "X" : "."))
  );

  return energizedView.reduce((accum, current) => {
    return accum + current.filter((item) => item === "X").length;
  }, 0);
};

const reflect = (x, y, fromDirection, situation) => {
  const mirror = situation[x][y];
  const mirrorValue = mirror.item;

  if (
    !mirror.directions.includes(fromDirection) &&
    !(mirror.directions.length === 4)
  ) {
    if (mirrorValue !== "X") {
      mirror.directions.push(fromDirection);
    }

    mirror.energized = true;

    if (mirrorValue === "|") {
      if (fromDirection === "L" || fromDirection === "R") {
        goUp(x, y, situation);
        goDown(x, y, situation);
      } else if (fromDirection === "T") {
        goDown(x, y, situation);
      } else if (fromDirection === "B") {
        goUp(x, y, situation);
      }
    } else if (mirrorValue === "-") {
      if (fromDirection === "R") {
        goLeft(x, y, situation);
      } else if (fromDirection === "L") {
        goRight(x, y, situation);
      } else if (fromDirection === "T" || fromDirection === "B") {
        goLeft(x, y, situation);
        goRight(x, y, situation);
      }
    } else if (mirrorValue === "/") {
      if (fromDirection === "T") {
        goLeft(x, y, situation);
      } else if (fromDirection === "B") {
        goRight(x, y, situation);
      } else if (fromDirection === "L") {
        goUp(x, y, situation);
      } else if (fromDirection === "R") {
        goDown(x, y, situation);
      }
    } else if (mirrorValue === "\\") {
      if (fromDirection === "T") {
        goRight(x, y, situation);
      } else if (fromDirection === "B") {
        goLeft(x, y, situation);
      } else if (fromDirection === "L") {
        goDown(x, y, situation);
      } else if (fromDirection === "R") {
        goUp(x, y, situation);
      }
    } else {
      if (fromDirection === "T") {
        goDown(x, y, situation);
      } else if (fromDirection === "B") {
        goUp(x, y, situation);
      } else if (fromDirection === "R") {
        goLeft(x, y, situation);
      } else if (fromDirection === "L") {
        goRight(x, y, situation);
      }
    }
  }
};

const getTotal = (situation) => {
  const energizedView = situation.map((item) =>
    item.map((x) => (x.energized ? "X" : "."))
  );

  return energizedView.reduce((accum, current) => {
    return accum + current.filter((item) => item === "X").length;
  }, 0);
};

const part2 = (data) => {
  const lines = helpers.splitByNewLine(data);
  const situation = lines.map((line) =>
    line
      .split("")
      .map((item) => ({ item: item, energized: false, directions: [] }))
  );

  const values = [];

  for (let i = 0; i < lines.length; i++) {
    const tempDown = structuredClone(situation);
    const tempUp = structuredClone(situation);
    const tempLeft = structuredClone(situation);
    const tempRight = structuredClone(situation);

    // from top
    goRight(i, -1, tempRight);
    goLeft(i, lines.length, tempLeft);
    goDown(-1, i, tempDown);
    goUp(lines.length, i, tempUp);

    values.push(getTotal(tempRight));
    values.push(getTotal(tempLeft));
    values.push(getTotal(tempDown));
    values.push(getTotal(tempUp));
  }
  return Math.max(...values);
};

module.exports = {
  part1,
  part2,
};
