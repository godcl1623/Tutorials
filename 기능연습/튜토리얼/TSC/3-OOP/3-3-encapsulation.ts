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
    // 이런 종류의 데이터는 직접 수정이 불가능하도록 private 선언을 통해 캡슐화를 시켜줘야 함
    private static BEANS_PER_SHOTS: number = 15;

    private coffeeBeans: number = 0;

    // 아래 makeMaker와 같이 새로운 객체 인스턴스를 반환하는 메서드를 정의한 경우 constructor는 private으로 설정하는게 좋음
    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    // 외부에 노출되는 데이터는 public 선언을 굳이 노출할 필요가 없음 - 생략해도 됨
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

    public setBeans = (beans: number): void => {
      this.coffeeBeans = beans;
    };
  }

  const maker = new CoffeeMaker(200); // constructor를 private으로 설정할 경우 'CoffeeMaker' 클래스의 생성자는 private이며 클래스 선언 내에서만 액세스할 수 있습니다. ts(2673) 메세지 출력
  const maker2 = CoffeeMaker.makeMaker(200);
}
