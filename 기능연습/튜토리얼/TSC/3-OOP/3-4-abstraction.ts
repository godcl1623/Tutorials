{
  type CupOfCoffee = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CupOfCoffee;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CupOfCoffee;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_PER_SHOTS: number = 15;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
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

  const maker: CoffeeMachine = CoffeeMachine.makeMaker(200);
  // maker.fillCoffeeBeans(32);
  // maker.makeCoffee(2);
  // const maker2: CommercialCoffeeMaker = CoffeeMachine.makeMaker(200);
  // maker2.fillCoffeeBeans(32);
  // maker2.makeCoffee(2);
  // maker2.clean();

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  const user: AmateurUser = new AmateurUser(maker);
  user.makeCoffee();
  const barista: ProBarista = new ProBarista(maker);
  barista.makeCoffee();
}
