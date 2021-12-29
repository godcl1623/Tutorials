{
  /* 캡슐화 실습 */
  type CupOfCoffee = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    // 캡슐화란 클래스 내 데이터를 외부에서 열람할 수 없도록 은닉하는 것을 말한다.
    // 프로퍼티 앞에 public / private / protected와 같은 선언을 붙여 프로퍼티를 구분할 수 있다.
    // 이 중 private / public이 실제로 데이터를 은닉하는 선언인데, private은 오직 이 클래스에서만 사용 가능하고 protected는 상속 관계 내에서만 사용 가능하다는 차이가 있다.
    private static BEANS_PER_SHOTS: number = 15;
    private coffeeBeans: number = 0;

    // constructor를 private으로 만들 수도 있는데, 이 경우 기존과 같이 식별자 = new 클래스(초기화 인수) 형태로 인스턴스를 만들 수 없으며, 아래 makeMaker와 같이 외부에서 이용 가능한 메서드가 필요하다.
    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // public 선언이 붙은 데이터는 사용자가 접근해 사용할 수 있는 데이터가 된다.
    public static makeMaker = (coffeeBeans: number): CoffeeMaker => {
      return new CoffeeMaker(coffeeBeans);
    };

    // public 선언은 생략 가능하다.
    makeCoffee = (shots: number): CupOfCoffee => {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_PER_SHOTS) {
        throw new Error(`Not enough beans. Current: ${this.coffeeBeans}`);
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_PER_SHOTS;
      return {
        shots,
        hasMilk: false
      };
    };
  }

  // const maker = new CoffeeMaker(200); => contructor가 은닉된 상태에서 이런 방식으로 인스턴스를 만들면 ['CoffeeMaker' 클래스의 생성자는 private이며 클래스 선언 내에서만 액세스할 수 있습니다.] 오류가 발생한다.
  const maker = CoffeeMaker.makeMaker(200);
}
{
  /* Getter, Setter 실습 */
  type CupOfCoffee = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    private static BEANS_PER_SHOTS: number = 15;
    /*
      때로는 constructor에 의한 초기화 이후에도 객체 내부에 존재하는 프로퍼티의 값을 수정할 필요가 있는데, 문제는 내부 데이터를 외부에서 직접 조작하도록 만들어서는 안 된다.
      이 때 사용 가능한 것이 getter와 setter인데, getter는 원본 데이터를 훼손하지 않는 형태로 외부에서 접근 가능하게 만들어주며 setter는 이러한 데이터의 값을 수정할 수 있도록 만들어준다.
      아래 coffeeBeans는 다음과 같이 getter, setter를 적용할 수 있다.
    */
    // private coffeeBeans: number = 0;

    get beans(): number {
      return this.coffeeBeans;
    }

    // setter 대신 this.coffeeBeans의 값을 수정하는 메서드를 만들 수도 있는데 굳이 setter를 사용하는 이유는 코드 통일성 때문인 것으로 보인다.
    // 예를들어 getter, setter를 사용할 경우 maker.beans를 사용해 값을 열람하거나 수정할 수 있는 반면, 메서드를 이용할 경우 maker.setBeans()와 같은 형태로 값을 수정해야 하기 때문이다.
    set beans(bean: number) {
      // setter는 다음과 같이 유효성 검사를 수행할 수 있다.
      if (bean < 0) {
        throw new Error("you can't add minus quantity of beans");
      }
      this.coffeeBeans = bean;
    }

    // 이건 좀 다른 이야기인데, constructor는 아래 방법 말고 다른 방법으로 간소화하여 작성할 수 있다.
    // private constructor(coffeeBeans: number) {
    //   this.coffeeBeans = coffeeBeans;
    // }
    private constructor(private coffeeBeans: number) {} // 이렇게 작성하면 lint 경고가 뜨긴 하는데, 캡슐화와 프로퍼티 설정을 한 번에 할 수 있다.
    // 또한, this.coffeeBeans를 먼저 선언하지 않고 getter, setter를 설정했음에도 문제가 발생하지 않았다.

    public static makeMaker = (coffeeBeans: number): CoffeeMaker => {
      return new CoffeeMaker(coffeeBeans);
    };

    makeCoffee = (shots: number): CupOfCoffee => {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_PER_SHOTS) {
        throw new Error(`Not enough beans. Current: ${this.coffeeBeans}`);
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_PER_SHOTS;
      return {
        shots,
        hasMilk: false
      };
    };
  }

  const maker = CoffeeMaker.makeMaker(200);
  console.log(maker.beans); // 200
  maker.beans = 400;
  console.log(maker.beans); // 400
}
{
  /* 추상화 실습 */
  /*
    추상화는 클래스 내에 외부에서 이용 가능한 데이터가 많아 사용자가 오히려 이용하기 어려운 경우, 정말 필요한 데이터만 노출시켜 상대적으로 사용하기 편하게 만드는 것과 관련이 있는 것 같다.
    추상화 구현 방법은 2가지가 있는데, 하나는 캡슐화를 통해 정말 필요한 데이터만 노출시키는 방법이 있고, 다른 하나는 interface를 통해 필요한 데이터만 노출시키는 방법이다.
  */
  type CupOfCoffee = {
    shots: number;
    hasMilk: boolean;
  };

  // interface의 식별자는 클래스와 동일하게 작성하되 인터페이스임을 알아볼 수 있는 표시를 넣던지(아래 I처럼), 클래스와 관련성만 갖춘 채 별개로 작성하는 방법이 있다.
  // 강의에서는 후자를 추천했는데, 나는 전자가 좀 더 나아보인다.
  interface ICoffeeMaker {
    makeCoffee(shots: number): CupOfCoffee;
    // setter는 선언할 수 없는 것으로 보임
    // set beans(bean: number)
    setBeans(bean: number): void;
    /*
      interface에서만 작성하고 클래스에서 작성하지 않으면
      ['CoffeeMaker' 클래스가 'ICoffeeMaker' 인터페이스를 잘못 구현합니다.
      'setBeans' 속성이 'CoffeeMaker' 형식에 없지만 'ICoffeeMaker' 형식에서 필수입니다.]
      오류가 발생한다.
    */
  }

  // interface를 적용하려면 클래스 선언 시 클래스 식별자 뒤에 [implements <interface 명>] 형태로 덧붙인다.
  // 이 때 클래스는 interface에 작성된 기능을 반드시 구현해야 한다.
  class CoffeeMaker implements ICoffeeMaker {
    private static BEANS_PER_SHOTS: number = 15;

    get beans(): number {
      return this.coffeeBeans;
    }

    set beans(bean: number) {
      if (bean < 0) {
        throw new Error("you can't add minus quantity of beans");
      }
      this.coffeeBeans = bean;
    }

    setBeans(bean: number): void {
      if (bean < 0) {
        throw new Error("you can't add minus quantity of beans");
      }
      this.coffeeBeans = bean;
    }

    private constructor(private coffeeBeans: number) {}

    public static makeMaker = (coffeeBeans: number): CoffeeMaker => {
      return new CoffeeMaker(coffeeBeans);
    };

    makeCoffee = (shots: number): CupOfCoffee => {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_PER_SHOTS) {
        throw new Error(`Not enough beans. Current: ${this.coffeeBeans}`);
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_PER_SHOTS;
      return {
        shots,
        hasMilk: false
      };
    };

    brewing = () => {
      // do something
    };

    grinding = () => {
      // do something
    };
  }

  // 클래스로 만든 인스턴스는 사실 타입이 해당 클래스이다. 아래에서 maker는 사실 maker: CoffeeMaker가 생략된 셈이다.
  // 클래스로 만든 인스턴스는 public으로 설정된 모든 데이터를 그대로 사용 가능하다
  const maker = CoffeeMaker.makeMaker(200);
  // 반면 interface를 적용하려면 타입을 interface로 설정해야 한다. 이 경우 ICoffeeMaker가 된다.
  // interface로 만든 인스턴스는 오직 interface에서 지정한 데이터만 사용 가능하다.
  const maker2: ICoffeeMaker = CoffeeMaker.makeMaker(200);
}
