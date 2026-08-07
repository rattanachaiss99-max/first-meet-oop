class Animal {
  constructor(name, species, symbol, fact, sound) {
    this.name = name;
    this.species = species;
    this.symbol = symbol;
    this.fact = fact;
    this.sound = sound;
  }

  inspect() {
    return [
      `You are visiting: ${this.name} the ${this.species}`,
      this.fact,
      `${this.name} says: ${this.sound}`,
    ].join("\n");
  }
}

function buildApiFact(apiAnimal) {
  const characteristics = apiAnimal.characteristics || {};
  const locations = Array.isArray(apiAnimal.locations)
    ? apiAnimal.locations.join(", ")
    : "Unknown";
  const habitat = characteristics.habitat || "unknown habitat";
  const diet = characteristics.diet || "unknown diet";
  const slogan = characteristics.slogan;

  const details = [
    `${apiAnimal.name} lives in ${habitat} and follows a ${diet.toLowerCase()} diet.`,
    `Found in: ${locations}.`,
  ];

  if (slogan) {
    details.push(slogan);
  }

  return details.join(" ");
}

function createAnimalFromApi(apiAnimal, symbol) {
  const species = apiAnimal.name || "Unknown Animal";

  return new Animal(
    species,
    species,
    symbol,
    buildApiFact(apiAnimal),
    "Rustle...",
  );
}

class Tiger extends Animal {
  constructor(name, symbol) {
    super(
      name,
      "Tiger",
      symbol,
      "This tiger moves quietly and watches everything from the shade.",
      "Grrr!",
    );
  }
}

class Elephant extends Animal {
  constructor(name, symbol) {
    super(
      name,
      "Elephant",
      symbol,
      "The elephant sprays water and swings its trunk with calm confidence.",
      "Pawoo!",
    );
  }
}

class Wolf extends Animal {
  constructor(name, symbol) {
    super(
      name,
      "Wolf",
      symbol,
      "This wolf patrols the enclosure and listens closely to every sound.",
      "Awooo!",
    );
  }
}

class Rhino extends Animal {
  constructor(name, symbol) {
    super(
      name,
      "Rhino",
      symbol,
      "The rhino stands strong near the rocks and kicks dust into the air.",
      "Snort!",
    );
  }
}

module.exports = {
  Animal,
  Elephant,
  Rhino,
  Tiger,
  Wolf,
  createAnimalFromApi,
};
