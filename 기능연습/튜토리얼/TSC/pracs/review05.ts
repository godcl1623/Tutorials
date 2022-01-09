{
  /* 한 클래스에 2개 이상 interface 붙이기 */
  interface Logging {
    normalLogging(word: string): void;
  }

  interface DeepLogging {
    normalLogging(word: string): void;
    deeperLogging(word: string, times: number): void;
  }

  // 콤마로 구분해서 interface를 붙이고 싶은 만큼 붙이면 된다.
  class Logger implements Logging, DeepLogging {
    constructor(private user: string) {}

    normalLogging(word: string): void {
      console.log(this.user);
      console.log(word);
    }

    deeperLogging(word: string, times: number): void {
      console.log(this.user);
      for (let i = 0; i < times; i++) {
        console.log(word);
      }
    }
  }

  const logger: Logger = new Logger('user');
  // 같은 클래스의 인스턴스이되, 서로 다른 인터페이스를 타입으로 설정하면 해당 인터페이스에 맞는 기능만 사용 가능하다.
  const normalLogger: Logging = new Logger('normal');
  const deepLogger: DeepLogging = new Logger('deeper');
  normalLogger.normalLogging('foo');
  deepLogger.deeperLogging('bar', 3);
}
{
  /* 상속 */
  class Logger {
    constructor(protected user: string) {}

    normalLogging(word: string): void {
      console.log(this.user);
      console.log(word);
    }

    deeperLogging(word: string, times: number): void {
      console.log(this.user);
      for (let i = 0; i < times; i++) {
        console.log(word);
      }
    }
  }

  // 한 클래스를 상속하려면 extends [원본 클래스]와 같이 작성한다.
  class Lugger extends Logger {
    // 동일한 메서드를 자식 클래스에 맞게 커스텀하고 싶다면 자식 클래스에 동일한 메서드를 작성하고 내용만 고친다 ex) protected suUser: string
    constructor(protected user: string, private suUser: string) {
      // 부모 메서드의 기능을 그대로 유지하고 싶다면 super를 활용한다. 특히 constructor의 경우 인수도 그대로 적어줘야 한다.
      // private으로 설정한 경우 자식으로 계승되지 않으므로, 은닉을 그대로 이용하고 싶다면 protected로 바꿔줘야 한다.
      super(user);
    }

    normalLogging(word: string): void {
      // 부모 메서드를 그대로 사용하고 싶다면 함수 외부는 그대로 작성하고, 내부 스코프에서 super.함수명(인수) 형태로 작성해준다.
      super.normalLogging(word);
    }

    deeperLogging(word: string, times: number): void {
      // super.메서드(인수) 형태로 작성한 경우, 일단 부모 메서드의 코드가 그대로 실행되고, 따로 작성한 코드는 따로 실행되는 것 같다.
      super.deeperLogging(word, times);
      for (let i = 0; i < times; i++) {
        console.log(times);
      }
    }
  }

  const lugger = new Lugger('lugger', 'Logger');
  lugger.normalLogging('normal');
  lugger.deeperLogging('deeper', 9);
}
