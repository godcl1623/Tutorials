console.clear();
console.log('this from outside of function: ', this);

function simpleFunc() {
  console.log('this from inside of function: ', this);
}
simpleFunc();

const simpleFunc2 = () => console.log('this from inside of arrow function: ', this);
simpleFunc2();

class Counter {
  count = 0;
  increase = function () {
    console.log('this from inside of class: ', this);
  };
}
const counter = new Counter();
counter.increase();

const caller = counter.increase;
caller();

class Counter2 {
  decrease = () => {
    console.log('this from inside of classes arrow function: ', this);
  };
}
const counter2 = new Counter2();
counter2.decrease();

class Bob {}
const bob = new Bob();
bob.run = counter2.decrease;
bob.run();
