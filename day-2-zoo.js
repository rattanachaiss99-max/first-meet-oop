const { createInterface } = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const { ZOO_NAME } = require("./zoo/constants");
const { createAnimals, createZooPath } = require("./zoo/data/zooData");
const { handleCommand, prepareAnimalFood } = require("./zoo/game");
const { Visitor } = require("./zoo/models/Visitor");
const { addAnimalToZooByName } = require("./zoo/services/zooAnimalService");
const {
  displayZoo,
  inspectLocation,
  showZooDirectory,
} = require("./zoo/ui/renderers");

const rl = createInterface({
  input,
  output,
});

const animals = createAnimals();
const zooPath = createZooPath(animals);
const visitor = new Visitor("PO");

async function fetchAnimalFromApi() {
  try {
    const animalName = await rl.question("Animal to add from API Ninjas: ");
    const zooAnimal = await addAnimalToZooByName(animalName, zooPath);

    console.log(`\nFetch success: ${zooAnimal.species} was returned from API Ninjas.`);
    console.log(`Added ${zooAnimal.species} to ${ZOO_NAME}.`);
  } catch (error) {
    console.error(`\nUnable to add animal: ${error.message}`);
  }
}

async function askForCommand() {
  while (true) {
    const answer = await rl.question(
      "\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [f] Fetch animal | [q] Quit\n> ",
    );
    const command = answer.trim().toLowerCase();

    if (command === "q") {
      console.log("\nThank you for visiting the JS Terminal Zoo.");
      rl.close();
      return;
    }

    await handleCommand(command, visitor, zooPath, {
      fetchAnimalFromApi,
      inspectLocation,
      showZooDirectory,
    });
    displayZoo(ZOO_NAME, zooPath, visitor);
  }
}

function startZoo() {
  console.log(zooPath[0].description);

  prepareAnimalFood(() => {
    displayZoo(ZOO_NAME, zooPath, visitor);
    askForCommand();
  });
}

startZoo();
