{
  type CupOfCoffee = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    private static BEANS_PER_SHOTS: number = 15;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    public static makeMaker = (coffeeBeans: number): CoffeeMaker => {
      return new CoffeeMaker(coffeeBeans);
    };

    makeCoffee = (shots: number): CupOfCoffee => {
      // if (this.coffeeBeans < shots * CoffeeMaker.BEANS_PER_SHOTS) {
      //   throw new Error(`Not enough beans. Current: ${this.coffeeBeans}`);
      // }
      // this.coffeeBeans -= shots * CoffeeMaker.BEANS_PER_SHOTS;
      // return {
      //   shots,
      //   hasMilk: false
      // };
    };

    public setBeans = (beans: number): void => {
      this.coffeeBeans = beans;
    };
  }

  const maker2 = CoffeeMaker.makeMaker(200);
}
