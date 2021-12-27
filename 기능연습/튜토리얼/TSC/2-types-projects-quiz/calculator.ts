/**
 * Let's make a calculator 🧮
 */
// 내 답안
const calculator = (calc: string, a: number, b: number): number => {
  switch (calc) {
    case 'substract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      return a / b;
    case 'remainder':
      return a % b;
    default:
      return a + b;
  }
};
// 풀이
// command는 string을 써도 되지만, 들어갈 값이 정해져 있기 때문에 Union을 사용할 수도 있음
type Command = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder';
function calculate(command: Command, a: number, b: number): number {
  switch (command) {
    case 'add':
      return a + b;
    case 'substract':
      return a - b;
    case 'multiply':
      return a * b;
    case 'divide':
      return a / b;
    case 'remainder':
      return a % b;
    // default에 기본 연산을 집어넣지 말고, 어떤 case에도 속하지 않는 경우 에러를 반환하도록 만들 것 !!!
    default:
      throw new Error('unknown command');
  }
}

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('substract', 3, 1)); // 2
console.log(calculate('multiply', 4, 2)); // 8
console.log(calculate('divide', 4, 2)); // 2
console.log(calculate('remainder', 5, 2)); // 1
