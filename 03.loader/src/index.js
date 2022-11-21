console.log('hello webpack loader')

class Person {
  constructor (name) {
    this.name = name
  }

  setName (name) {
    this.name = name
  }
}

let person = new Person('zx')
console.log(person)