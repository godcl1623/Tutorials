{
  // I. 기본 타입 정리 (1)
  // ☆☆☆☆☆ 1. 원시(Primitive) 타입 ☆☆☆☆☆
  // number, boolean, string, symbol, undefined, null + bigint
  // 2. 객체(Object) 타입
  // Primitive 제외 전부
  // 3. TS에서 undefined 등의 타입을 일반적으로 사용하는 방법
  // 원시 타입의 경우
  const nums: number = 0;
  // 객체 타입의 경우
  const strs: string[] = ['foo', 'bar'];
  // undefined, null - 다른 타입과 함께 정의돼야
  // undefined: 특정 타입 외에 뭘 사용할지 모름 ☆☆☆☆☆
  let notSure: string | undefined;
  notSure = 'doh';
  // null: 값이 있거나 없다 ☆☆☆☆☆
  let yesOrNo: string | null;
  yesOrNo = '';

  // II. 기본 타입 정리 (2)
  // unknown, any, void, never, object
  /**
    ※ 사용을 권장하지 않는 타입들
      -> undefined, null, unknown, any, object
      => 공통점: 특정 타입만 제한하는게 아니라 범용적으로 사용 가능한 타입들
    unknown: 타입이 정해지지 않음 - JS, TS 혼용 시 타입을 동적으로 정해야 하는 경우 사용
    any: 어떤 타입도 올 수 있음
    object: 객체 타입에 쓰이며, 어떤 타입의 객체도 올 수 있음
   */
  // unknown 예시
  let anony: unknown = { spy: 'killer' };
  anony = 20;
  // any 예시
  let freeman: any = 'gordon';
  freeman = ['half life 1', 'half life 2'];
  // object 예시
  let obj: object;
  obj = { frog: 'flies' };
  obj = 'pond splash'; // 'string' 형식은 'object' 형식에 할당할 수 없습니다.
  obj = [1, 2, 3]; // 배열은 가능
  /**
    void, never의 사용례

    void: 함수가 console만 사용해 값을 리턴하지 않는 경우에 사용
    never: 함수가 예외 처리로 인해 값을 리턴하지 않는 경우에 사용
   */
  const consoleOutput = (): void => {
    console.log('foo');
  };
  const handleErr = (err): never => {
    if (err) {
      throw err;
    }
  };

  // III. 함수에서 타입 이용하기
  /**
    1. 함수에서 사용 가능한 타입들
    // 아래 '함수 타입' 참조
  */

  /**
    2. 함수에 타입을 부여하는 방법

    식별자(파라미터: 타입): 리턴타입 => {}
  */
  const testFunc = (inpt: string): string => {
    return inpt + 'world !';
  };

  /**
    3. TS에서 Promise를 다루는 방법

    식별자(파라미터: 타입): Promise<프로미스 리턴 타입> => {}
    ☆☆☆☆☆ 함수 스코프 내부에서 파라미터를 이용하지 않을 경우, 파라미터의 타입은 자유롭게 정해도 괜찮음
   */

  const returnPromise = (inpt: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      resolve(inpt);
    });
  };

  // IV. 함수 타입 이용(spread, default, optional)
  /*
    1. Spread Parameter

    형태
    JS: function (...args) = {
      // args는 배열 형태로 전달됨
    }
    TS: function (...args: 배열 원소의 타입): 리턴 타입 = {}
  */
  /*
    2. Default Parameter
    형태
    JS: function (param = defaultVal) = {}
    TS: function (param: 타입 = defaultVal) = {}
  */
  /*
    3. Optional Parameter
    형태
    JS: function (par1, par2?) = {}
    TS: function (par1: 타입1, par2?: 타입2) = {}
  */
  /*
    4. 배열 reduce로 모든 인수의 합 구하기
  */
  const reduceEx = (...args: number): number => {
    return args.reduce((prev, next) => prev + next);
  };

  // V. 배열 vs 튜플
  /*
    TS에서의 배열: 배열에 특정 타입의 원소만 들어올 수 있음
    TS에서의 튜플: 배열에 여러 타입의 원소들을 섞어서 구성할 수 있음(= JS의 배열)
  */
  // 1. 배열 타입 정의 방법 - 첫 번째 방법을 권장
  // ☆☆☆☆☆ 이유: 배열 타입에 readonly 속성을 부여하여, 배열을 함수의 인수로 넣었을 때 함수 내부에서 배열을 변경하지 않도록 만들 수 있음
  // 첫 번째 양식만 readonly 속성 사용 가능
  const arrExample: number[] = [];
  const arrExample2: Array<string> = [];
  // 2. 튜플 정의 방법 - ☆☆☆☆☆ 타입에 대괄호, | 연산자를 사용해 담을 수 있는 타입을 모두 정의함
  const tupleExample: [string | number] = [];
  /*
  ☆☆☆☆☆ 튜플 사용이 권장되지 않는 이유
  인덱스 방식으로 데이터를 이용하는 것이 객체에 비해 불편하기 때문
    -> interface, type alias, class 등으로 대체 권장
  object deconstructuring을 사용하면 좀 낫지만, 역시 객체에 비해서는 불편

  ☆☆☆☆☆ 튜플 사용 예제: 리액트의 useState
  */

  // VI. Type Alias
  /*
  1. 일반적인 사용 방법
  정의 -> type (타입 식별자 - 첫 글자 대문자로) = (할당할 타입);
  사용 -> 식별자: (type alias) = 값
  */
  type Word = string;
  const world: Word = 'hello';
  /*
  2. 객체 타입 설정 방법
  정의:
    식별자: {
      프로퍼티1: 타입1;
      프로퍼티2: 타입2;
      ...
    }
    => 한 번 정의해두면 여기서 정해진 프로퍼티명을 강제로 써야 함
  */
  type ObjType = {
    prop1: string;
    prop2: number;
  };
  const objExample = {
    prop1: 'hello',
    prop2: 3
  }
  /*
  3. String Literal Types

  어떤 특정한 타입을 string 등의 타입으로 설정하는게 아니라 문자열로 설정하는 것. 값을 할당할 때 해당 문자열 외에는 할당할 수 없음
  */
  type Slt = 'frog flies';
  const pond: Slt = 'frog flies';
}
