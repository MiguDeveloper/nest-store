const myName = 'Miguel';
const myAge = 12;
const suma = (a: number, b: number) => {
  return a + b;
};
class Persona {
  public age;
  public name;

  constructor(age: number, name: string) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `my name is ${this.name} and my age is: ${this.age}`;
  }
}

const miguel = new Persona(38, 'Miguel');
miguel.getSummary();
