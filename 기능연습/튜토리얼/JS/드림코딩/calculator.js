'use strict';

const calculate = (command, a, b) => {
  if (command !== '+' && command !== '-' && command !== '*' && command !== '/' && command !== '%') {
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
  console.log(operators[0]);
};
