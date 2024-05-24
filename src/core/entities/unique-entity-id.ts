import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  public value: String

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: String) {
    this.value = value ?? randomUUID()
  }
}
