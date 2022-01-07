/*
  1. 모든 객체의 프로토타입은 Object이다 === 모든 객체는 Object를 상속한다
    - 아래 x, y 객체 등은 안에 아무런 프로퍼티, 메서드가 없어도 Object가 제공하는 toString()과 같은 메서드 사용 가능
        - 이 때, 두 객체 x, y의 __proto__의 일치 여부를 확인해보면 true가 반환된다(e.g. x.__proto__ === y.__proto__)
    - 브라우저 콘솔 등에서 화살표를 통해 __proto__ 프로퍼티를 확인해보면 Object에서 기본적으로 제공하는 프로퍼티, 메서드 확인 가능
*/
const x = {};
const y = {};
console.log(x); // __proto__: Object
console.log(y); // __proto__: Object

/*
  2. 모든 배열의 프로토타입은 Array이며, Array 객체 또한 객체이므로 Object를 상속한다
    - 사실상 모든 객체에 속하는 타입들이 toString 등을 사용할 수 있는 이유
*/
const array = [];
console.log(array); // __proto__: Array(0)

/*
  3. constructor 함수에 의해 만들어진 객체의 프로토타입은 Object이다.
    - 함수를 정의할 때 뭔가를 return하지 않고 this를 사용해 프로퍼티, 메서드 등을 정의할 경우 객체를 반환하는 constructor 함수로 사용할 수 있다.
      - 사용 방법은 클래스 인스턴스를 생성하듯 new 선언과 함께 함수를 호출하면 된다.
      - 그 결과 생성된 객체는 클래스처럼 constructor 함수에서 정의된 프로퍼티, 메서드 등을 가진다. => Instance member level
    - 어떠한 함수, 변수 등을 정의할 때 "[constructor 식별자].prototype.[함수 등 식별자] = 값" 형태로 정의할 경우 인스턴스마다 포함되지 않고, 인스턴스들의 prototype에 포함된다
      => Prototype member level
*/
function CoffeeMachine(beans) {
  this.beans = beans;
  // Instance member level
  // this.makeCoffee = shots => {
    // console.log('making...☕️');
  // }
}
// Prototype member level
CoffeeMachine.prototype.makeCoffee = shots => {
  console.log('making...☕️');
};
const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine1); // constructor: CoffeeMachine \n __proto__: Object
console.log(machine2); // constructor: CoffeeMachine \n __proto__: Object

function LatteMachine(milk) {
  this.milk = milk;
}
const latteMachine = new LatteMachine(123);
console.log(latteMachine); // constructor: LatteMachine \n __proto__: Object

LatteMachine.prototype = Object.create(CoffeeMachine);
console.log(latteMachine); // __proto__: CoffeeMachine > __proto__: Object