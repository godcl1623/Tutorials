{
  interface IEither<L, R> {
    left: () => L;
    right: () => R;
    center: () => number;
  }

  class Either<L, R> implements IEither<L, R> {
    constructor(private leftVal: L, private rightVal: R) {}

    left = (): L => {
      return this.leftVal;
    };

    right = (): R => {
      return this.rightVal;
    };

    center = (): number => {
      return 0;
    };
  }

  const either = new Either(9, 230);
  console.log(either.left());
  console.log(either.right());
  console.log(either.center());
}
