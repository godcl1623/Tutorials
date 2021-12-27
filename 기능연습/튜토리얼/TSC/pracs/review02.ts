{
  /*
    1. Union 타입
    : or 연산자를 사용해서 사용할 수 있는 값을 미리 정해놓는 타입
  */
  type UnionExample = 'frog' | 'flies' | 'water' | 'splash' | 34 | { foo: 'bar' };
  let frog: UnionExample = 'frog';
  frog = { foo: 'bar' };
  frog = 34; // 타입에 할당한 값이면 문제 없음
  frog = 'boo'; // 타입에 할당한 값이 아니면 ts(2322) 오류 발생

  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  };
  type ReturnExample = SuccessState | FailState;
  const funcExample = (id: string, pwd: string): Promise<ReturnExample> => {
    return new Promise((resolve, reject) => {
      if (id === pwd) {
        resolve({
          response: {
            body: 'foo'
          }
        });
      } else {
        reject(new Error());
      }
    });
  };
  /*
    2. Discriminated Union
    : Union 타입을 구성하는 타입들에 구분 가능한 프로퍼티를 부여, 조건에 따라 Union 타입의 인수를 다른 방식으로 이용해야 하는 경우 유용
  */
  // 위 funcExample()을 인수로 하는 함수 handleReturn()
  const handleReturn = (val: ReturnExample): void => {
    // if (val.response !== undefined) 형태는 사용 불가능 - 함수 스코프 내부 시점에서는 val의 타입이 SuccessState인지 FailState인지 결정되지 않은 상황이므로
    // 좋지 않은 방법으로 작성할 경우
    if ('response' in val) {
      console.log(val.response.body);
    } else {
      console.log(val.reason);
    }
  };
  // discriminated union을 사용할 경우 val.response 형태로 사용 가능
  type DiscSuccess = {
    result: true;
    response: {
      body: string;
    };
  };
  type DiscFail = {
    result: false;
    reason: string;
  };
  type DiscReturn = DiscSuccess | DiscFail;
  const newHandle = (val: DiscReturn): void => {
    if (val.result) {
      console.log(val.response.body);
    } else {
      console.log(val.reason);
    }
  };
  /*
    3. Intersection
    : & 연산자를 사용해서 가능한 모든 값을 포함하는 타입
  */
  type Student = {
    study: 'hard';
    score: 93;
  };
  type Worker = {
    work: 'hard';
    salary: 'low';
  };
  const intern = (person: Student & Worker) => {
    console.log(person);
  };
  intern({
    study: 'hard',
    score: 93,
    work: 'hard',
    salary: 'low'
  });
  /*
    Enum
    : 서로 관련된 상수를 하나로 묶은 것
  */
  // JS 방식의 Enum
  const thisWeek = Object.freeze({ Monday: 0, Tuesday: 1 });
  // TS 방식의 Enum - 식별자, 중괄호 사이에 = 넣지 않도록 주의
  enum nextWeek {
    Monday, // 기본적으로 첫 번째 값부터 숫자 0부터 할당됨
    Tuesday = 29, // 중간에 임의의 number 타입 값을 할당할 경우, 뒤의 프로퍼티들은 해당 값부터 1씩 커지는 값이 부여됨
    Wednesday = 'day after tomorrow' // 프로퍼티 중 하나에 문자열을 할당한 경우, 최소한 다음 프로퍼티에 별도의 값을 반드시 부여해야 한다.
  }
  let doh: nextWeek;
  doh = 293847; // enum 타입의 문제점은 이렇게 전혀 상관 없는 number 타입 값을 할당해도 오류가 발생하지 않는 점이다.
  // 일반적으로 enum이 수행하는 역할은 Union이 대체 가능
  type UnionWeek = 'Monday' | 'Tuesday' | 'Wednesday';
  /*
    Type Assertion
    : 어떠한 변수 등의 타입으로 특정 타입을 내세우는데 사용
  */
  // 예시 - JS 호환을 위한 함수 - any 타입을 반환한다고 정해지긴 했는데, 실제로는 string을 반환함
  const exampleFunc = (param: string): any => {
    return 'foo';
  };
  // 이 리턴값을 이용해 String API를 이용하려 해도, 함수 리턴 값의 타입은 any로 정해져 API를 이용할 수 없는 상황 -> 보통 이런 경우에 사용
  (exampleFunc('foo') as string).charAt(9); // API 사용 가능
  let dah = exampleFunc('bar');
  (dah as number).toString(); // assertion으로 올바르지 않은 타입을 강제로 부여할 경우: undefined 출력
  (dah as Array<number>).push(1); // 이런 경우에는 프로그램이 뻗음
  const findNum = (): number[] | undefined => {
    return undefined;
  };
  const faa = findNum();
  faa!.push(1);
  /*
    Type Inference
    : 타입을 명시하지 않아도 타입이 부여된 효과를 부여할 수 있음
  */
  let exmp = 'example';
  exmp = 39; // 'number' 형식은 'string' 형식에 할당할 수 없습니다.(ts2322)
}
