{
  /*
    ※ 절차형 실습
    커피 = 커피 콩 15g + 물 혹은 우유 -> { 커피, 용매, 샷 }
    커피 만든다 = 샷, 물 / 우유를 입력해서 커피를 추출함

    변수: 커피 보유량
    상수: 커피 투입량, 물, 우유
    함수: 커피 추출
  */
  type Solvent = 'water' | 'milk';
  type CupOfCoffee = {
    beans: number;
    shots: number;
    solvent: Solvent;
  };
  const water: Solvent = 'water';
  const milk: Solvent = 'milk';
  const BEANS_PER_SHOT: number = 15;
  let beans: number = 0;
  const makeCoffee = (shots: number, solvent: Solvent): CupOfCoffee => {
    if (beans < shots * BEANS_PER_SHOT) {
      throw new Error(`Not enough beans. Current: ${beans}`);
    }
    beans -= BEANS_PER_SHOT * shots;
    return {
      beans: BEANS_PER_SHOT * shots,
      shots,
      solvent
    };
  };
  beans += 200;
  console.log(makeCoffee(2, water));
}
{
  /*
    ※ 객체형 실습
      - 세부 조건은 절차형을 따른다. 세부 조건 = 커피 머신 기능
        - static 상수: 샷 당 커피
        - 기본 상수: 용매(물, 커피)
        - 초기화 필요한 변수: 커피 보유량
      - 커피 머신 원형을 만든 후 커피 머신 생산
      - 커피 머신 생산 방법
        1. constructor를 따른다: 인수를 전달해 호출한다
        2. method를 따른다: constructor 필수 인수를 전달해 커피 머신을 반환한다
  */
  type Solvent = 'water' | 'milk';
  type CupOfCoffee = {
    beans: number;
    shots: number;
    solvent: Solvent;
  };
  class MachineMaker {
    static BEANS_PER_SHOT: number = 15;
    water: Solvent = 'water';
    milk: Solvent = 'milk';
    // this로 정의될 변수의 타입은 여기에 따로 적어줘야 한다
    beans: number;

    // 그와 별개로 constuctor가 받을 인수 타입은 constructor에서 따로 정의해야 한다
    constructor(beans: number) {
      this.beans = beans;
    }

    static makeMachine = (beans: number): MachineMaker => {
      return new MachineMaker(beans);
    };

    makeCoffee = (shots: number, solvent: Solvent): CupOfCoffee => {
      if (this.beans < shots * MachineMaker.BEANS_PER_SHOT) {
        throw new Error(`Not enough beans. Current: ${this.beans}`);
      }
      this.beans -= shots * MachineMaker.BEANS_PER_SHOT;
      return {
        beans: this.beans,
        shots,
        solvent
      };
    };
  }

  const machine01 = new MachineMaker(150);
  console.log('OOP', machine01.makeCoffee(4, machine01.milk));
  const machine02 = MachineMaker.makeMachine(300);
  console.log('OOP', machine02.makeCoffee(6, machine02.water));
}
