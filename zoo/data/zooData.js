const { ICONS } = require("../constants");
const { Elephant, Rhino, Tiger, Wolf } = require("../models/Animal");

function createAnimals() {
  return [
    new Tiger("Milo", ICONS.tiger),
    new Elephant("Khan", ICONS.elephant),
    new Wolf("Luna", ICONS.wolf),
    new Rhino("Rocky", ICONS.rhino),
  ];
}

function createZooPath(animals) {
  return [
    {
      symbol: ICONS.entrance,
      name: "Entrance",
      description:
        "The main entrance to the zoo. The morning visitors are arriving.",
    },
    {
      symbol: animals[0].symbol,
      name: "Tiger enclosure",
      animal: animals[0],
    },
    {
      symbol: ICONS.garden,
      name: "Garden",
      description: "A quiet garden with large trees and shaded benches.",
    },
    {
      symbol: animals[1].symbol,
      name: "Elephant enclosure",
      animal: animals[1],
    },
    {
      symbol: animals[2].symbol,
      name: "Wolf enclosure",
      animal: animals[2],
    },
    {
      symbol: animals[3].symbol,
      name: "Rhino enclosure",
      animal: animals[3],
    },
    {
      symbol: ICONS.foodCourt,
      name: "Food court",
      description: "The food court smells like popcorn and fresh fruit.",
    },
  ];
}

module.exports = {
  createAnimals,
  createZooPath,
};
