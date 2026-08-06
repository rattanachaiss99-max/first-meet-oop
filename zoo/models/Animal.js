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
};
