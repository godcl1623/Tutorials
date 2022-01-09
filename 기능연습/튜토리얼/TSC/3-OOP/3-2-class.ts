{
  /*
    커피 메이커 틀은 커피를 만들지 않는다 - 오직 커피 메이커만 생산함
    커피 생산은 여전히 샷 정보만 받아서 함
    일반적인 전역 변수, 상수는 클래스 내부에서 다룬다
    변수, 상수 중 특히 공통적으로 참조하며 잘 변하지 않는 경우 static을 붙인다.
    static을 붙인 변수는 this.로 호출하는게 아니라 클래스명.으로 호출한다
    
    constructor가 받을 인수의 타입을 잊어버리지 말기
  */
  type CupOfCoffee = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    static BEANS_PER_SHOTS: number = 15;

    coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMaker = (coffeeBeans: number): CoffeeMaker => {
      return new CoffeeMaker(coffeeBeans);
    }

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

  const maker = new CoffeeMaker(200);
  console.log(maker.makeCoffee(2), maker.coffeeBeans);
  const maker2 = CoffeeMaker.makeMaker(250);
  console.log(maker2.makeCoffee(4));
}
