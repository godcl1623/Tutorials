{
  // JavaScript
  function jsAdd(num1, num2) {
    return num1 + num2;
  }

  // TypeScript
  /**
    함수에서의 타입 설정 방법
    식별자(매개변수: [매개변수 타입]): [리턴 값 타입] {} ([]는 무시할 것)
  */
  function jsAdd(num1: number, num2: number): number {
    return num1 + num2;
  }

  // JavaScript
  function jsFetchNum(id) {
    // code ...
    // code ...
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    })
  }

  // TypeScript
  /**
   * 복잡한 형태의 함수에서의 타입 설정 방법
   */
  // 내가 작성한 답안
  function jsFetchNum(id: number): number {
    // code ...
    // code ...
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }
  // 정답
  // id는 내부 구현사항이 없기 때문에 아무 타입이나 할당 가능하지만, 일반적으로 string을 사용한다
  // 함수가 Promise를 리턴할 경우 number 등의 타입만 적는게 아니라 Promise<타입> 형태로 작성해야 함
  function jsFetchNum(id: string): Promise<number> {
    // code ...
    // code ...
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // 최신 JavaScript 문법도 TypeScript에서 사용 가능
  // 1. Optional Parameter
  // JS와 달리 TS는 함수 파라미터의 갯수가 맞지 않을 경우 오류가 발생함
  function printName(firstName: string, lastName: string) {
    console.log(firstName);
    console.log(lastName);
  }
  // 이건 문제 X
  printName('chihang', 'lee');
  // 이건 문제 O
  printName('foo');
  // Optional Parameter는 함수의 매개변수를 선택사항으로 만들어, 인수의 갯수가 매개변수 갯수와 맞지 않더라도 함수를 정상적으로 사용할 수 있도록 만듦
  // 사용법: 파라미터 뒤에 ?를 붙임
  function eraseName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  eraseName('foo', 'bar');
  eraseName('doh');
  // Optional Parameter를 사용하는 자리에 or 연산자 사용 불가
  /**
   * funcion printName(firstName: string, lastName?: string) => 인수 숫자, 매개변수 숫자 일치하지 않아도 괜찮음
   * function eraseName(firstNme: string, lastName: string | undefined) => 인수 숫자와 매개변수 숫자를 맞춰야 하며, 두 번째 인수를 넣고 싶지 않아도 최소 undefined는 반드시 포함해야 함
   */

  // 2. Default Parameter
  // JS, TS 변수 값 할당 방법과 동일한 방법으로 매개변수 기본값 이용 가능
  function foo(bar: string = 'default value'): void {
    console.log(bar)
  }

  // 3. Rest Parameter
  // 인수로 들어오는 원하는 만큼의 숫자를 모두 더해서 출력하는 함수 만들어보기
  // 내 답안
  const addNumbers = (...params: object): number => {
    // reduce 사용?
  }
  // 정답
  // rest parameter를 사용할 경우, rest parameter 자체는 배열처럼 취급돼도 타입은 object를 부여하지 않음(애초에 object 타입 자체가 권장되지 않음)
  // rest parameter의 타입은 rest parameter에 들어오는 인수들의 타입을 의미함 -> number인 경우 인수로 number만 올 수 있음
  // 모든 값의 합은 내 생각대로 reduce를 사용하면 되긴 하는데, 이전 값, 이후 값에 뭔가 특정한 값을 할당한다기 보다 a, b와 같이 일반적인 매개변수로 설정하면 쉽게 구할 수 있음
  function addNums(...numbers: number): number {
    return numbers.reduce((a, b) => a + b);
  }
}
