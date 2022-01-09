// /*
//   ※ 조건
//   커피 콩: 전역 데이터 - 변수에 할당함
//   커피 기계(makeCoffee): 커피 콩, 샷을 인수로 '커피'를 반환
//   샷: 커피에 포함됨
//   커피: 커피 기계로 반환된 데이터
// */
// {
//   // 내 답안
//   // type CoffeeBean = 'coffeeBean';
//   // type Coffee = {
//   //   coffeeBean: string;
//   //   shots: number;
//   // };
//   // const makeCoffee = (shots: number, beans: CoffeeBean): Coffee => {
//   //   return {
//   //     coffeeBean: beans,
//   //     shots
//   //   };
//   // };

//   // console.log(makeCoffee(2, 'coffeeBean'));

//   // 풀이
//   // 2. CoffeeCup 타입 정의
//   type CoffeeCup = {
//     shots: number;
//     hasMilk: boolean;
//   }

//   // 3. 커피 콩 및 샷에 필요한 그람 수 정의
//   const BEANS_GRAMM_PER_SHOT: number = 7;

//   let coffeeBeans: number = 0;

//   // 1. 함수 정의
//   function makeCoffee(shots: number): CoffeeCup {
//     // 4. 예외 처리
//     if (coffeeBeans < shots * BEANS_GRAMM_PER_SHOT) {
//       throw new Error('Not enough coffee beans !');
//     }
//     // 5. 커피콩 차감
//     coffeeBeans -= shots * BEANS_GRAMM_PER_SHOT;
//     // 6. 커피 반환
//     return {
//       shots,
//       hasMilk: false
//     }
//   }

//   // 7. 커피 콩 충전
//   coffeeBeans += 3 * BEANS_GRAMM_PER_SHOT;

//   // 8. 커피 정의
//   const coffee = makeCoffee(2);
//   console.log(coffee);
// }

{
  type CupOfCoffee = {
    shots: number;
    hasMilk: boolean;
  };

  const BEANS_PER_GRAMM = 15;

  let coffeeBeans = 0;

  const coffeeMaker = (shots: number, hasMilk: boolean): CupOfCoffee => {
    if (coffeeBeans < shots * BEANS_PER_GRAMM) {
      throw new Error(`Not enough coffee beans. Current: ${coffeeBeans}`);
    }
    coffeeBeans -= shots * BEANS_PER_GRAMM;
    return {
      shots,
      hasMilk
    };
  };

  coffeeBeans += 200;
  const coffee = coffeeMaker(2, false);
  console.log(coffee);
}
