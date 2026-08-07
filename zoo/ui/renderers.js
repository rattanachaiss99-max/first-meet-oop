const { CELL_WIDTH, DIRECTORY_COLUMNS, ICONS } = require("../constants");

function formatCell(value) {
  return String(value).padEnd(CELL_WIDTH, " ");
}

function padTableCell(value, width) {
  return String(value).padEnd(width, " ");
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 3)}...`;
}

function displayZoo(zooName, zooPath, visitor) {
  const topRow = zooPath.map((spot) => formatCell(spot.symbol)).join("");
  const bottomRow = zooPath
    .map((_, index) =>
      formatCell(
        index === visitor.currentPosition ? ICONS.visitor : ICONS.empty,
      ),
    )
    .join("");

  console.log(`\n=== ${zooName} ===`);
  console.log(topRow);
  console.log(bottomRow);
}

function showZooDirectory(zooPath, visitor) {
  const separator = `+${DIRECTORY_COLUMNS.map((column) => "-".repeat(column.width + 2)).join("+")}+`;
  const header = `| ${DIRECTORY_COLUMNS.map((column) => padTableCell(column.label, column.width)).join(" | ")} |`;

  console.log("\nZoo Directory");
  console.log(separator);
  console.log(header);
  console.log(separator);

  zooPath.forEach((spot, index) => {
    const type = spot.animal ? "Animal" : "Area";
    const details = spot.animal
      ? `${spot.animal.name} the ${spot.animal.species}`
      : spot.description;
    const row = [
      padTableCell(index + 1, DIRECTORY_COLUMNS[0].width),
      padTableCell(spot.symbol, DIRECTORY_COLUMNS[1].width),
      padTableCell(spot.name, DIRECTORY_COLUMNS[2].width),
      padTableCell(type, DIRECTORY_COLUMNS[3].width),
      padTableCell(
        index === visitor.currentPosition ? "Here" : "-",
        DIRECTORY_COLUMNS[4].width,
      ),
      padTableCell(
        truncateText(details, DIRECTORY_COLUMNS[5].width),
        DIRECTORY_COLUMNS[5].width,
      ),
    ];

    console.log(`| ${row.join(" | ")} |`);
  });

  console.log(separator);
}

function inspectLocation(visitor, zooPath) {
  const location = visitor.currentLocation(zooPath);

  console.log(`\nYou are at: ${location.name}`);

  if (location.animal) {
    console.log(location.animal.inspect());
    return;
  }

  console.log(location.description);
}

module.exports = {
  displayZoo,
  inspectLocation,
  showZooDirectory,
};
