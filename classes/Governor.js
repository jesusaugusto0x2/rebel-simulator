export class Governor {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  salute() {
    return `Hello, my name is ${this.name}`;
  }
}
