const { fetchAnimalFromApiNinjas } = require("../api/animalNinjaApi");
const { addAnimalToZooPath, createZooAnimalFromApi } = require("../data/zooData");

async function addAnimalToZooByName(animalName, zooPath) {
  const apiAnimal = await fetchAnimalFromApiNinjas(animalName);
  const zooAnimal = createZooAnimalFromApi(apiAnimal);

  addAnimalToZooPath(zooPath, zooAnimal);

  return zooAnimal;
}

module.exports = {
  addAnimalToZooByName,
};
