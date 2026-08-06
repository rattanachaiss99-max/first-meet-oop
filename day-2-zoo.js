const { createInterface } = require("node:readline");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
  constructor(name) {
    super(
      name,
      "Tiger",
      "🐯",
      "This tiger moves quietly and watches everything from the shade.",
      "Grrr!",
    );
  }
}

class Elephant extends Animal {
  constructor(name) {
    super(
      name,
      "Elephant",
      "🐘",
      "The elephant sprays water and swings its trunk with calm confidence.",
      "Pawoo!",
    );
  }
}

class Wolf extends Animal {
  constructor(name) {
    super(
      name,
      "Wolf",
      "🐺",
      "This wolf patrols the enclosure and listens closely to every sound.",
      "Awooo!",
    );
  }
}

class Rhino extends Animal {
  constructor(name) {
    super(
      name,
      "Rhino",
      "🦏",
      "The rhino stands strong near the rocks and kicks dust into the air.",
      "Snort!",
    );
  }
}

class Visitor {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  moveLeft() {
    if (this.position === 0) {
      return `${this.name} is already at the entrance.`;
    }

    this.position -= 1;
    return `${this.name} walks to the left.`;
  }

  moveRight(lastIndex) {
    if (this.position === lastIndex) {
      return `${this.name} is already at the end of the zoo path.`;
    }

    this.position += 1;
    return `${this.name} walks to the right.`;
  }

  currentLocation(path) {
    return path[this.position];
  }
}

const animals = [
  new Tiger("Milo"),
  new Elephant("Khan"),
  new Wolf("Luna"),
  new Rhino("Rocky"),
];

const zooPath = [
  {
    symbol: "🚪",
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
    symbol: "🌳",
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
    symbol: "🍽️",
    name: "Food court",
    description: "The food court smells like popcorn and fresh fruit.",
  },
];

const visitor = new Visitor("Neeti");
const zooName = "JS Terminal Zoo";

function showZooDirectory() {
  console.log("\nZoo Directory");

  zooPath.forEach((spot, index) => {
    console.log(`${index + 1}. ${spot.symbol} ${spot.name}`);
  });
}

function displayZoo() {
  const topRow = zooPath.map((spot) => spot.symbol).join(" -- ");
  const bottomRow = zooPath
    .map((_, index) => (index === visitor.position ? "🙂" : "⬜"))
    .join(" -- ");

  console.log(`\n=== ${zooName} ===`);
  console.log(topRow);
  console.log(bottomRow);
}

function inspectLocation() {
  const location = visitor.currentLocation(zooPath);

  console.log(`\nYou are at: ${location.name}`);

  if (location.animal) {
    console.log(location.animal.inspect());
    return;
  }

  console.log(location.description);
}

function prepareAnimalFood(callback) {
  console.log("\nThe zookeeper is preparing the animal feed...");
  console.log("The animal feed is ready.");
  console.log("Visitors can continue exploring.");
  callback();
}

function handleCommand(command) {
  if (command === "l") {
    console.log(visitor.moveLeft());
  } else if (command === "r") {
    console.log(visitor.moveRight(zooPath.length - 1));
  } else if (command === "i") {
    inspectLocation();
  } else if (command === "d") {
    showZooDirectory();
  } else {
    console.log("Please enter l, r, i, d, or q.");
  }
}

function askForCommand() {
  rl.question(
    "\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n> ",
    (answer) => {
      const command = answer.trim().toLowerCase();

      if (command === "q") {
        console.log("\nThank you for visiting the JS Terminal Zoo.");
        rl.close();
        return;
      }

      handleCommand(command);
      displayZoo();
      askForCommand();
    },
  );
}

function startZoo() {
  console.log(zooPath[0].description);

  prepareAnimalFood(() => {
    displayZoo();
    askForCommand();
  });
}

startZoo();
