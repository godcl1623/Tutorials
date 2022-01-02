{
  // 오직 숫자만 받을 수 있어 좋지 않음
  function checkNumNotNull(arg: number | null): number {
    if (arg == null) {
      throw new Error('not a valid number');
    }
    return arg;
  }

  // 모든 타입을 받고 리턴할 수 있지만 타입이 보장되지 않으므로 좋지 않음
  function checkAnyNotNull(arg: any | null): any {
    if (arg == null) {
      throw new Error('not a valid type');
    }
    return arg;
  }

  // 제네릭 타입 함수를 작성하려면 1) 식별자 옆에 <GENERIC> 혹은 <T>라 적은 후, 2) 인수와 리턴 값의 타입을 GENERIC 혹은 T로 설정한다. 함수 식별자에만 <>를 붙인다.
  // 제네릭은 사용 시점에 타입이 결정된다.
  function checkGenericNotNull<GENERIC>(arg: GENERIC | null): GENERIC {
    if (arg == null) {
      throw new Error('not a valid type');
    }
    return arg;
  }

  // function으로 작성할 때와 달리 제너릭 표시를 식별자에 붙이지 않고 등호 다음으로 넘긴다.
  const check2 = <T>(arg: T | null): T => {
    if (arg == null) {
      throw new Error('not a valid type');
    }
    return arg;
  };
}
