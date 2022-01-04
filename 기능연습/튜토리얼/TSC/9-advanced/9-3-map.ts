{
  // 기본 타입 Video를 만든 후 이를 바탕으로 하는 VideoOptional, VideoReadOnly 등을 만든다고 할 때, Video에 프로퍼티 하나가 추가될 때마다 동일한 내용을 복붙 + 수정해줘야 함

  type Video = {
    title: string;
    author: string; // 여기까지 기본
    desc: string; // 추가
  };

  /*
    type VideoOptional = {
      title?: string;
      author?: string;
    }

    type VideoReadonly = {
      readonly title: string;
      readonly author: string;
    }
  */

  /**
   * Mapped Type: 기존 타입의 key, value를 받아오면서 Array의 map처럼 루프를 돌게 만듦
   * type 구성요소들은 기존 타입과 공유하는 한편, Mapped Type을 만들면서 optional, readonly 등으로 설정 가능함
   */

  type Optional<T> = {
    [P in keyof T]?: T[P]; // 대괄호 앞에 readonly를 붙이면 readonly 설정 가능
  };

  type OptionalVideo = Optional<Video>;

  const video1: OptionalVideo = {
    title: 'dvd1'
    // author, desc 등은 작성하지 않아도 OK
    // cover: 'seifjsl.jpg'와 같이 Video 타입에 작성되지 않은 항목을 임의로 추가할 수 없음
  };
}
{
  /**
   * 다음 타입이 어떤 역할을 수행하는지 생각해보기
   * 내 답안: T 타입에서 정의한 타입들 대신 null이 와도 되는 타입 -> 정답
   */
  type Nullable<T> = { [P in keyof T]?: T[P] | null };

  type Video = {
    title: string;
    author: string;
    desc: string;
  };

  const obj2: Nullable<Video> = {
    title: null // 기존 타입과 달리 null도 사용 가능
  };

  // 일괄적으로 특정 타입을 지정하도록 만들 수도 있음
  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };
}
