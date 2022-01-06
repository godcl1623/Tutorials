{
  /**
   * Conditional Types: 3항 연산자를 이용해 조건부로 결정되는 타입을 만들 수 있음
   */

  // 기본 형태
  type Check<T> = T extends string ? boolean : number; // 주어진 타입이 문자열을 상속할 경우 boolean 타입으로 결정, 그 외의 경우 number로 결정
  type Type = Check<string>; // string이 전달됐으므로 Type의 타입은 boolean

  // 전달된 타입이 문자열 -> TypeName의 타입은 'string', 전달된 타입이 숫자 -> TypeName의 타입은 'number', ...
  type TypeName<T> = T extends string
    ? 'string'
    : T extends number
    ? 'number'
    : T extends boolean
    ? 'boolean'
    : T extends undefined
    ? 'undefined'
    : T extends Function
    ? 'function'
    : 'object';

  type T0 = TypeName<string>; // 'string'
  type T1 = TypeName<'a'>; // 'string'
  type T2 = TypeName<() => void>; // 'function'
}