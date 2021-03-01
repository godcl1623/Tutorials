'use strict';

const calculate = (command, a, b) => {
  const operators = ['+', '-', '*', '/', '%'];
  const matchingOne = operators.find(input => input.includes(command));
  if (!matchingOne.includes(command)) {
    return 'Try Again !';
  } else if (command === '+') {
    return a + b;
  } else if (command === '-') {
    return a - b;
  } else if (command === '*') {
    return a * b;
  } else if (command === '/') {
    return a / b;
  } else if (command === '%') {
    return a % b;
  }
};
