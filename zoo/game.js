function prepareAnimalFood(callback) {
  console.log("\nThe zookeeper is preparing the animal feed...");
  console.log("The animal feed is ready.");
  console.log("Visitors can continue exploring.");
  callback();
}

async function handleCommand(command, visitor, zooPath, actions) {
  if (command === "l") {
    console.log(visitor.moveLeft());
    return;
  }

  if (command === "r") {
    console.log(visitor.moveRight(zooPath.length - 1));
    return;
  }

  if (command === "i") {
    actions.inspectLocation(visitor, zooPath);
    return;
  }

  if (command === "d") {
    actions.showZooDirectory(zooPath, visitor);
    return;
  }

  if (command === "f") {
    await actions.fetchAnimalFromApi(zooPath);
    return;
  }

  console.log("Please enter l, r, i, d, f, or q.");
}

module.exports = {
  handleCommand,
  prepareAnimalFood,
};
