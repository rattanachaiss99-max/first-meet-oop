const { createInterface } = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const { ZOO_NAME } = require("./zoo/constants");
const { createAnimals, createZooPath } = require("./zoo/data/zooData");
const { Visitor } = require("./zoo/models/Visitor");
const { addAnimalToZooByName } = require("./zoo/services/zooAnimalService");
const { displayZoo, showZooDirectory } = require("./zoo/ui/renderers");

async function main() {
  const rl = createInterface({ input, output });
  const visitor = new Visitor("PO");
  const animals = createAnimals();
  const zooPath = createZooPath(animals);

  try {
    const animalName = await rl.question("Animal to add from API Ninjas: ");
    const zooAnimal = await addAnimalToZooByName(animalName, zooPath);

    console.log(
      `\nFetch success: ${zooAnimal.species} was returned from API Ninjas.`,
    );
    console.log(`Added ${zooAnimal.species} to ${ZOO_NAME}.`);
    displayZoo(ZOO_NAME, zooPath, visitor);
    showZooDirectory(zooPath, visitor);
  } catch (error) {
    console.error(`\nUnable to add animal: ${error.message}`);
  } finally {
    rl.close();
  }
}

main();
