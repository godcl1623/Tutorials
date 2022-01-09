{
  /**
   * 1. Interface vs type alias
   * Interface: 어떤 것을 구현할 목적으로 정의하는 경우에 사용
   * Type Alias: 어떤 데이터를 담을 것인지 정의하는 경우에 사용
   */
  // interface: 단순히 데이터를 담는 것을 떠나서 뭔가를 구현할 때 사용
  interface SmartPhone {
    calling(phone: number): void;
    phoneBook: {
      phoneNumber: string;
    };
  }

  class IPhone implements SmartPhone {
    calling(phone: number): void {
      console.log(phone);
    }

    phoneBook = {
      phoneNumber: 'foo'
    };
  }

  // type alias: 단순히 어떤 데이터를 담을 것인지 정의하는 경우에 사용
  type phoneBook<T> = {
    phoneNumber: T;
  };

  const book: phoneBook<string> = {
    phoneNumber: 'foo'
  };
}
{
  /**
   * 2. Index Type
   * index 형식으로 객체의 value를 받아올 수 있는 것처럼 타입 또한 index 형식으로 key에 대한 value를 받아올 수 있다.
   */
  type Songs = {
    frog: 'flies';
    pond: 'splash';
  };
  const foo: Songs['frog'] = 'flies';
}
{
  /**
   * 3. Mapped Type
   * Array의 Map API처럼 다른 타입의 key + value를 가져와 새로운 타입을 만들 수 있다.
   * 새로운 타입은 기본적으로 원래 타입과 일종의 동기화 상태를 이루며(e.g. 원래 타입에서 데이터 추가하면 새로운 타입에도 추가), 새로 만들 때 readonly, ? 등 옵션을 부여할 수 있다.
   */
  type Songs = {
    frog: 'flies';
    pond: 'splash';
  };
  type Poems<T> = {
    readonly [P in keyof T]?: T[P];
  };
  type Foo = Poems<Songs>;
  const Bar: Foo = {
    frog: 'flies' // ? 옵션으로 frog 혹은 pond를 반드시 포함할 필요는 없지만, 일단 포함시키는 경우 원래의 값인 'flies', 'splash' 등을 사용해야만 함
    // 추가로 원본 타입인 Songs에서 정의하지 않은 새로운 타입을 추가시킬 수 없음
  };
  Bar.frog = 'doh'; // type Foo에서 readonly 속성을 부여했으므로 프로퍼티의 값을 수정할 수도 없음
}
