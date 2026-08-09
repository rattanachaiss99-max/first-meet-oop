const CELL_WIDTH = 6;
const ZOO_NAME = "JS Terminal Zoo";

// Whitelist of animals the terminal zoo is allowed to fetch from API Ninjas.
// Add more names here to expand the menu. These must match API Ninjas `name` values.
const ALLOWED_API_ANIMALS = [
  "cheetah",
  "lion",
  "panda",
  "giraffe",
  "penguin",
  "gorilla",
];

const ICONS = {
  entrance: "[IN]",
  tiger: "[T]",
  garden: "[G]",
  elephant: "[E]",
  wolf: "[W]",
  rhino: "[R]",
  apiAnimal: "[A]",
  foodCourt: "[F]",
  visitor: "[V]",
  empty: "[ ]",
};

const DIRECTORY_COLUMNS = [
  { key: "no", label: "No", width: 4 },
  { key: "icon", label: "Icon", width: 6 },
  { key: "area", label: "Area", width: 20 },
  { key: "type", label: "Type", width: 12 },
  { key: "visitor", label: "Visitor", width: 10 },
  { key: "details", label: "Details", width: 48 },
];

module.exports = {
  ALLOWED_API_ANIMALS,
  CELL_WIDTH,
  DIRECTORY_COLUMNS,
  ICONS,
  ZOO_NAME,
};
