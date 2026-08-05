const HOUR_IN_MS = 60 * 60 * 1000;

class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this.hunger = 50;
    this.hoursPassed = 0;
  }

  makeSound() {
    console.log(`${this.name} makes a sound...`);
  }

  eat(food = "a meal") {
    this.hunger = Math.max(0, this.hunger - 10);
    console.log(
      `${this.name} the ${this.species} eats ${food}. Hunger level is now ${this.hunger}.`,
    );
  }

  passHour() {
    this.hoursPassed += 1;
    this.hunger = Math.max(0, this.hunger - 10);
  }
}

class Mammal extends Animal {
  constructor(name, species, furColor) {
    super(name, species);
    this.furColor = furColor;
  }

  groom() {
    console.log(`${this.name} brushes their ${this.furColor} fur by the river.`);
  }
}

class Bird extends Animal {
  constructor(name, species, wingspan) {
    super(name, species);
    this.wingspan = wingspan;
  }

  makeSound() {
    console.log(`${this.name} chirps from above the trees.`);
  }

  fly() {
    console.log(`${this.name} spreads ${this.wingspan} wings and circles the sky.`);
  }
}

function describeHunger(animal) {
  console.log(
    `${animal.name} the ${animal.species} wanders on. Hunger level is now ${animal.hunger}.`,
  );

  if (animal.hunger === 20) {
    console.log(`${animal.name} starts looking for food before the sun gets too low.`);
  }

  if (animal.hunger === 0) {
    console.log(`${animal.name} feels satisfied and lies down to rest.`);
  }
}

function startStory(animals, totalHours, hourInMs = HOUR_IN_MS) {
  console.log("The animal story begins with these hunger levels:");
  for (const animal of animals) {
    console.log(`- ${animal.name}: ${animal.hunger}`);
  }

  let currentHour = 0;
  const storyTimer = setInterval(() => {
    currentHour += 1;
    console.log(`\nHour ${currentHour}`);

    for (const animal of animals) {
      animal.passHour();
      describeHunger(animal);
    }

    if (currentHour >= totalHours || animals.every((animal) => animal.hunger === 0)) {
      clearInterval(storyTimer);
      console.log(`\nThe story ends after ${currentHour} hour(s).`);
    }
  }, hourInMs);

  return storyTimer;
}

const leo = new Animal("Leo", "Lion");
const zazu = new Bird("Zazu", "Hornbill", "2-foot");
const baloo = new Mammal("Baloo", "Bear", "brown");

console.log("A warm morning begins across the savanna.");
leo.makeSound();
zazu.makeSound();
zazu.fly();
baloo.groom();
leo.eat("fresh berries");

// Use 1000 ms here so the story can be demonstrated quickly.
startStory([leo, zazu, baloo], 5, 1000);
