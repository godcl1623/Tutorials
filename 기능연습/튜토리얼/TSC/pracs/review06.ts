/**
 * 타입 가드 정리
 */
{
  // 0. 타입 가드가 필요한 이유
  const data: string | number = 'default';
  /*
    아래와 같은 형태는 불가능하다 - arg의 타입이 불분명하기 때문에 연산을 수행할 수 없음
    function processing(arg: string | number) {
      return (arg + arg);
    }
  */
}
{
  // 1. typeof
  // 인자의 타입이 특정 타입에 일치하는지 여부를 확인한다.
  function processing(arg: string | number) {
    if (typeof arg === 'string') {
      return arg + arg;
    }
  }
}
{
  // 2. instanceof
  // 인자가 둘 이상의 클래스 / 인터페이스의 유니온 타입일 때 타입을 결정하는 역할을 수행함
  class Animal {}
  class Cat extends Animal {
    growl: string = 'meow';
  }
  class Dog extends Animal {
    bark: string = 'bowwow';
  }
  function howl(arg: Cat | Dog): string {
    if (arg instanceof Dog) {
      return arg.bark;
    } else {
      return arg.growl;
    }
  }
}
{
  // 3. 사용자 정의 타입 가드
  // (1) 타입 서술어를 사용하는 경우
  class Animal {}
  class Cat extends Animal {
    growl: string = 'meow';
  }
  class Dog extends Animal {
    bark: string = 'bowwow';
  }
  const animalFarm: Animal[] = [new Cat(), new Dog()];

  /**
   * 원문:
      function isMeow(animal: Animal): animal is Cat {
        return (animal as Cat).growl !== undefined;
      }
      * 'is'만 사용자 정의 타입 가드라고 생각했는데, 이러한 함수 형태를 사용자 정의 타입 가드 함수라고 하는 것 같다.
        사용자 정의 타입 가드는 이미 존재하는 타입 검증 키워드인 typeof, instanceof, in 대신 사용자가 직접 만든 타입을 검증하는 함수를 말하는 것 같다.
        함수는 <value is Type> 형태의 타입을 가지며, 이 함수의 스코프 내부는 Type의 프로퍼티만 쓸 수 있는 공간이 된다.
        저 형태만 해당하는건지, 'is' 키워드를 사용해 인자로 전달된 클래스가 특정 조건을 만족하는지 확인하는 형태면 전부 괜찮은건지 확인 필요
      */
  function isMeow(animal: Animal): animal is Cat {
    return (animal as Cat).growl !== undefined;
  }
  console.log(animalFarm.every(isMeow));

  // (2) in 키워드 사용
  /**
   * in은 프로퍼티 비교를 수행할 때 사용한다
   */
  function isBowwow(animal: Cat | Dog) {
    if ('bark' in animal) {
      console.log(animal.bark);
    }
  }
}
{
  /**
   ***** 에러 핸들링 복습 *****
   * 에러 핸들링 방법
      (1) Error 객체 이용
        - 예상하지 못했던 오류를 다루는데 사용
      (2) Error State 이용
        - 코드 작성 시점에서 예상 가능했던 오류를 다루는데 사용
          ex) 인터넷 연결과 관련된 코드 작성 시 -> timeout, offline, server down 등의 경우를 예상할 수 있음
   */
  // (1) Error 객체
  class UnexpectedError extends Error {}
  function test(arg: string): void {
    if (arg === 'invalid') {
      throw new UnexpectedError('invalid');
    }
  }

  try {
    test('invalid');
  } catch {
    console.log('foo');
  }

  // (2) Error State
  type SuccessState = {
    result: 'Success';
  };
  type ErrorState = {
    result: 'Fail';
    reason: 'timeout' | 'offline';
  };
  type ResultState = SuccessState | ErrorState;
  function handleConnection(result: boolean, failType?: string): ResultState {
    if (result) {
      return {
        result: 'Success'
      };
    } else if (failType === 'timeout') {
      return {
        result: 'Fail',
        reason: 'timeout'
      };
    } else {
      return {
        result: 'Fail',
        reason: 'offline'
      };
    }
  }

  console.log(handleConnection(true));
  console.log(handleConnection(false, 'timeout'));
  console.log(handleConnection(false, 'offline'));
}
