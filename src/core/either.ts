// Definition of the Left class representing the left side (error)
export class Left<L, R> {
  // Attribute to store the value of type L (typically used for error reason)
  readonly value: L

  // Constructor initializing the value of type L
  constructor(value: L) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }
}

// Definition of the Right class representing the right side (success)
export class Right<L, R> {
  // Attribute to store the value of type R (typically used for result)
  readonly value: R

  // Constructor initializing the value of type R
  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }
}

// Definition of the Either type which can be Left<L> or Right<R>
export type Either<L, R> = Left<L, R> | Right<L, R>

// Function left that creates an instance of Left<L> with a value of type L
export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

// Function right that creates an instance of Right<R> with a value of type R
export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
