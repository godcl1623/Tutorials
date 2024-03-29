{
  // JavaScript
  // let: 값이 할당된 변수에 새로운 값을 재할당할 수 있음(es6)
  // let name = 'hello';
  // name = 'hi';
  // cf) var: let과 사용법은 비슷하지만, 호이스팅 등 여러 예상치 못한 문제가 발생할 수 있어 사용하지 않는 것 권장
  // 어차피 컴파일러로 let, const 등이 var로 바뀌므로, 호환성 핑계로 따로 사용하지는 말 것
  // var age = 5;
  // age = 1;
  // const: 값이 할당되면 바꿀 수 없음
  // const foo = 'bar';

  /**
    자바스크립트에서의 타입 분류
    * Primitive: 하나의 값만 담을 수 있음
      -> number, string, boolean, bigint, symbol, null, undefined
    * Object: 좀 더 복잡한 형태로 값을 담을 수 있음
      -> Primitive 이외 전부 - function, array 등
  */

  /**
    타입스크립트의 타입
      - 타입 자체는 자바스크립트와 동일
      - 단, 변수 선언 단계에서부터 타입을 엄격하게 지정해야 함 + 한 번 타입이 정의될 경우 다른 타입을 해당 변수에 할당할 수 없음
    
    타입스크립트에서 타입을 지정하는 방법
    ##### 식별자:타입 = 값 #####

    */

  // // 타입에 따른 예시
  // // 1. number
  // const num:number = -6;

  // // 2. string
  // const str:string = 'hello';

  // // 3. boolean
  // const boal: boolean = false;

  // // 4. undefined: 값이 비었는지 아닌지 정해지지 않음
  // // undefined는 단독으로 지정되지 않음 - 보통 |(or 연산자)를 통해 다른 타입과 함께 쓰임
  // let name: undefined;
  // // name = 'foo'; => 이렇게 할 경우 undefined에 할당할 수 없다는 오류 발생
  // let age: number | undefined;
  // age = undefined;
  // age = 1;

  // // 5. null: 값이 비어있음
  // // undefined와 마찬자기로 단독 타입으로는 사용되지 않음
  // let person: string | null;

  // /**
  //   단, 보편적으로는 undefined를 많이 이용함
  //     - '특정 타입 외에 어떤 타입을 이용할지 정해지지 않았다'의 의미 -> undefined 사용
  //       -> ex) 함수에서 사용할 경우 - number를 return하거나 undefined return
  //     - '값이 있거나 없다'의 의미 -> null 사용
  // */

  // 6. unknown: 무엇이 담길지 알 수 없는 상태
  // 타입 구분을 위해 타입스크립트를 사용하는 것이므로 unknown을 사용할 이유도 없고, 사용하지 않는 것이 권장
  // unknown 타입이 존재하는 경우: TS는 JS와 같이 쓰일 수 있는데, JS의 동적 타입을 대처하기 위해 unknown 타입이 존재
  let notSure: unknown = 0;
  notSure = 'he';
  notSure = true;

  // 7. any: 아무거나 다 쓸 수 있음
  // unknown은 차라리 뭐가 올지 모르겠다는 뉘앙스긴 한데, any는 뭘 쓰던 말던 신경쓰지 않는다는 뉘앙스라 더 주의 필요
  let anything: any = 0;
  anything = 'hello';

  // 8. void: 함수가 아무것도 리턴하지 않을 경우
  // 일반적으로 함수가 리턴하는 값의 타입을 명시하는 것이 좋지만, void의 경우에는 생략 가능. 단, 개발 조직의 개발문화에 따라 다를 수 있음
  function print(): void {
    console.log('hello');
    // 함수가 콘솔 출력 기능만 담당하는 경우, console.log 다음에 return;이 생략된 상태임
    // 이러한 상태의 함수 타입을 void 타입이라 함
  }
  // 아래와 같이 변수에는 void를 선언하지 않음 - 사실상 undefined만 할당 가능한 상태이기 때문
  let unusable: void = undefined;

  // 8. never: void와 같이 함수에서 설정할 수 있는 타입
  // 리턴값의 타입이 never라는 것은 함수가 값을 리턴하지 않겠다는 의미임
  // 사례: throw error 혹은 while(true)로 루프 실행
  function throwError(message: string): never {
    // message -> server(log)
    // throw new Error(message);
    // while(true){}
  }
  // void와 마찬가지로 never도 변수에 할당하진 않음
  let neverEnding: never;

  // 9. object: 원시 타입을 제외한 모든 타입을 할당 가능
  // 역시 가리지 않고 무엇이든 담을 수 있기 때문에 사용하지 않는 것을 권장함 - Object 타입도 타입을 명확히 명시하는 것을 추천
  let obj: object;
  function acceptSomeObj(obj: object) {
    // Do Something
  }
  acceptSomeObj({ foo: 'bar' });
  acceptSomeObj({ fox: 'hati hati hati ho' });
}
