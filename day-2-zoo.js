const { createInterface } = require("node:readline");

const { ZOO_NAME } = require("./zoo/constants");
const { createAnimals, createZooPath } = require("./zoo/data/zooData");
const { handleCommand, prepareAnimalFood } = require("./zoo/game");
const { Visitor } = require("./zoo/models/Visitor");
const {
  displayZoo,
  inspectLocation,
  showZooDirectory,
} = require("./zoo/ui/renderers");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const animals = createAnimals();
const zooPath = createZooPath(animals);
const visitor = new Visitor("PO");

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

      handleCommand(command, visitor, zooPath, {
        inspectLocation,
        showZooDirectory,
      });
      displayZoo(ZOO_NAME, zooPath, visitor);
      askForCommand();
    },
  );
}

function startZoo() {
  console.log(zooPath[0].description);

  prepareAnimalFood(() => {
    displayZoo(ZOO_NAME, zooPath, visitor);
    askForCommand();
  });
}

startZoo();
