{
  type CupOfCoffee = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CupOfCoffee;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_PER_SHOTS: number = 15;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // 이 부분 리턴 타입 잘못 작성하지 않도록 주의 !!!
    public static makeMaker = (coffeeBeans: number): CoffeeMachine => {
      return new CoffeeMachine(coffeeBeans);
    };

    public fillCoffeeBeans(beans: number): void {
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans = beans;
    }

    clean(): void {
      console.log('cleaning the machine...');
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_PER_SHOTS) {
        throw new Error('Not enough coffee beans !');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_PER_SHOTS;
    }

    private preheat(): void {
      console.log('heating machine...');
    }

    extract = (shots: number): CupOfCoffee => {
      console.log(`Pulling ${shots} shots...`);
      return {
        shots,
        hasMilk: false
      };
    };

    makeCoffee(shots: number): CupOfCoffee {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CafeLatteMachine extends CoffeeMachine {
    private steamMilk(): void {
      console.log('Steaming some milk... 🥛');
    }
    makeCoffee(shots: number): CupOfCoffee {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true
      };
    }
  }

  // const maker: CoffeeMachine = CoffeeMachine.makeMaker(200);
  const maker: CoffeeMachine = new CoffeeMachine(200);
  const latteMaker: CafeLatteMachine = new CafeLatteMachine(200);
  const coffee = latteMaker.makeCoffee(2);
  console.log(coffee);
}
