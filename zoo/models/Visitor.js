class Visitor {
  constructor(name) {
    this.name = name;
    this.currentPosition = 0;
  }

  moveLeft() {
    if (this.currentPosition === 0) {
      return `${this.name} is already at the entrance.`;
    }

    this.currentPosition -= 1;
    return `${this.name} walks to the left.`;
  }

  moveRight(lastIndex) {
    if (this.currentPosition === lastIndex) {
      return `${this.name} is already at the end of the zoo path.`;
    }

    this.currentPosition += 1;
    return `${this.name} walks to the right.`;
  }

  currentLocation(path) {
    return path[this.currentPosition];
  }
}

module.exports = {
  Visitor,
};
