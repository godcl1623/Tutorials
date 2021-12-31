{
  // interface Poly {
  //   logging(): void;
  // }

  // abstract class를 만들 때는 abstract 선언이 class 선언에 우선한다
  // 만약 interface를 구현한 class를 abstract class로 만들 경우 오류가 발생하므로, 이 경우 interface 구현 내용을 삭제해야 한다
  // abstract class Parent implements Poly {
  abstract class Parent {
    constructor(protected user: string) {}

    // abstract method를 만들며 캡슐화를 동시에 진행할 때는 캡슐화 선언(protected, private 등)이 abstract 선언보다 우선한다.
    // 또한, 메서드를 abstract로 만들면 스코프를 작성하지 않는다(아예 중괄호 자체를 생략해야 한다)
    public abstract logging(): void;
    // {
    //   console.log(this.user);
    // }
  }

  class Child01 extends Parent {
    // abstract class에서 abstract로 선언한 메서드는 모든 자식 클래스마다 새로 정의해야 한다.
    public logging(): void {
      // 부모 클래스가 constructor로 받는 인수도 protected로 바꿔야 자식 클래스와 공유가 가능하다
      console.log(this.user, 1);
    }
  }
  class Child02 extends Parent {
    public logging(): void {
      console.log(this.user, 2);
    }
  }
  class Child03 extends Parent {
    public logging(): void {
      console.log(this.user, 3);
    }
  }
  class Child04 extends Parent {
    public logging(): void {
      console.log(this.user, 4);
    }
  }
  class Child05 extends Parent {
    public logging(): void {
      console.log(this.user, 5);
    }
  }
  class Child06 extends Parent {
    public logging(): void {
      console.log(this.user, 6);
    }
  }
  class Child07 extends Parent {
    public logging(): void {
      console.log(this.user, 7);
    }
  }
  class Child08 extends Parent {
    public logging(): void {
      console.log(this.user, 8);
    }
  }
  class Child09 extends Parent {
    public logging(): void {
      console.log(this.user, 9);
    }
  }

  const instances = [
    // newParent('user00'), -> abstract class는 새로운 인스턴스를 만들 수 없다
    new Child01('user01'),
    new Child02('user02'),
    new Child03('user03'),
    new Child04('user04'),
    new Child05('user05'),
    new Child06('user06'),
    new Child07('user07'),
    new Child08('user08'),
    new Child09('user09')
  ];

  instances.forEach(instance => instance.logging());
}
