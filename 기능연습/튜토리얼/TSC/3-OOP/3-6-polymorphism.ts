{
  interface Poly {
    logging(): void;
  }

  class Parent implements Poly {
    constructor(private user: string) {}

    logging(): void {
      console.log(this.user);
    }
  }

  class Child01 extends Parent {}
  class Child02 extends Parent {}
  class Child03 extends Parent {}
  class Child04 extends Parent {}
  class Child05 extends Parent {}
  class Child06 extends Parent {}
  class Child07 extends Parent {}
  class Child08 extends Parent {}
  class Child09 extends Parent {}

  const instances = [
    new Parent('user00'),
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
