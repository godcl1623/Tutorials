{
  type CupOfCoffee = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
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

  class CheapMilkSteamer {
    private steamMilk(): void {
      console.log('Steaming some milk... 🥛');
    }

    makeMilk(cup: CupOfCoffee): CupOfCoffee {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true
      };
    }
  }

  class CafeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFother: CheapMilkSteamer
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CupOfCoffee {
      const coffee = super.makeCoffee(shots);
      this.milkFother.makeMilk(coffee);
      return {
        ...coffee,
        hasMilk: true
      };
    }
  }

  class AutoSugarMixer {
    private getSugar() {
      console.log('Getting some sugar from jar');
    }

    addSugar(cup: CupOfCoffee): CupOfCoffee {
      this.getSugar();
      return {
        ...cup,
        hasSugar: true
      };
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    constructor(private beans: number, private getSugar: AutoSugarMixer) {
      super(beans);
    }

    makeCoffee(shots: number): CupOfCoffee {
      const coffee = super.makeCoffee(shots);
      this.getSugar.addSugar(coffee);
      return {
        ...coffee,
        hasSugar: true
      };
    }
  }

  // Composition 구현
  // 1. 일단 가장 상위의 클래스를 상속하도록 만든다
  class SweetLatteMachine extends CoffeeMachine {
    // 2. 생성자를 통해 필요한 기능들을 담고 있는 클래스를 받도록 만든다.
    constructor(
      private beans: number,
      private milk: CheapMilkSteamer,
      private sugar: AutoSugarMixer
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CupOfCoffee {
      // 3. 필요한 기능들을 클래스 내부에서 불러와 사용한다.
      const coffee = super.makeCoffee(shots);
      const milkAdded = this.milk.makeMilk(coffee);
      return this.sugar.addSugar(milkAdded);
    }
  }

  // const maker: CoffeeMachine = CoffeeMachine.makeMaker(200);
}
