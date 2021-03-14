/* eslint-disable prettier/prettier */
// 변수, 상수 모음 => 상수 - 변수 순

const buttons = document.querySelectorAll('button');
const numBox = document.querySelector('.number-input');
// const memBox = document.querySelector('.number-output');
const numButton = document.querySelectorAll('.number-button');

// 함수 모음

// 키 선택 효과
const keyInput = e => {
  const keySet1 = Array.from(buttons).map(attribute => attribute.dataset.key1);
  const keyDown = String(e.keyCode);
  const keySet2 = Array.from(buttons).map(attribute => attribute.dataset.key2);
  const matchingKey = Array.from(buttons) //
    .find(
      attribute =>
        attribute.dataset.key1 === keyDown || //
        attribute.dataset.key2 === keyDown
    );
  const matchingButton =
    document.querySelector(`button[data-key1='${e.keyCode}']`) ||
    document.querySelector(`button[data-key2='${e.keyCode}']`);

  if (!keySet1.includes(keyDown) && !keySet2.includes(keyDown)) return;
  // 여기 조건문만 복습
  switch (true) {
    case e.key === '5': {
      const five = document.querySelector('button[data-key2="101"]');
      five.classList.add('active');
      five.addEventListener('transitionend', () => {
        five.classList.remove('active');
      });
      break;
    }
    case e.key === '*': {
      const multiply = document.querySelector('button[data-key3="*"]');
      multiply.classList.add('active');
      multiply.addEventListener('transitionend', () => {
        multiply.classList.remove('active');
      });
      break;
    }
    case e.key === '-': {
      const minus = document.querySelector('button[data-key3="-"]');
      minus.classList.add('active');
      minus.addEventListener('transitionend', () => {
        minus.classList.remove('active');
      });
      break;
    }
    case matchingKey.dataset.key1 === keyDown ||
      matchingKey.dataset.key2 === keyDown:
      matchingButton.classList.add('active');
      matchingButton.addEventListener('transitionend', () =>
        matchingButton.classList.remove('active')
      );
      break;
    default: break;
  }
};

// 연산 초기화 - 대상 모음
const eraser = () => {
  const memory = document.querySelector('.calculator-body');
  memory.removeAttribute('data-first-value');
  memory.removeAttribute('data-second-value');
  memory.removeAttribute('data-operator');
  memory.removeAttribute('data-completed');
};

// 숫자창에 숫자 띄우기 - 키입력
const printInput = e => {
  const keySet1 = Array.from(numButton).map(attribute => attribute.dataset.key1);
  const keySet2 = Array.from(numButton).map(attribute => attribute.dataset.key2);
  const keyDown = String(e.keyCode);
  const matchingKey = Array.from(numButton) //
    .find(attribute => attribute.dataset.key1 === keyDown || attribute.dataset.key2 === keyDown);
  const memory = document.querySelector('.calculator-body');
  if (!keySet1.includes(keyDown) && !keySet2.includes(keyDown)) return;
  if (matchingKey.dataset.key1 === keyDown || matchingKey.dataset.key2 === keyDown) {
    switch (true) {
      case numBox.value.length >= 15:
        break;
      case numBox.value.includes('.') && numBox.value.length !== '' && e.key === '.':
        break;
      case numBox.value[0] === '0' && numBox.value[1] === '.':
        switch (true) {
          case memory.dataset.completed === undefined:
            numBox.value += e.key;
            break;
          case memory.dataset.completed === 'completed':
            eraser();
            numBox.value = '';
            numBox.value += e.key;
            break;
          default: break;
        }
        break;
      case numBox.value[0] === '0' && e.key !== '.':
        break;
      case memory.dataset.completed === 'completed' && e.key !== /\d/:
        eraser();
        numBox.value = '';
        numBox.value += e.key;
        break;
      default: {
        const numKey = Array.from(numButton);
        const newKeyArray = numKey.map(key => key.innerText);
        if (newKeyArray.find(key => key === e.key)) {
          numBox.value += e.key;
        }
      }
    }
  }
};

  // 숫자창에 숫자 띄우기 - 버튼
const clickedInput = e => {
  const memory = document.querySelector('.calculator-body');
  switch (true) {
    case numBox.value.length >= 15:
      break;
    case numBox.value.includes('.') && numBox.value.length !== '' && e.target.innerText === '.':
      break;
    case memory.dataset.completed === undefined && numBox.value[0] === '0' && numBox.value[1] === '.':
      numBox.value += e.target.innerText;
      break;
    case memory.dataset.completed === 'completed' && numBox.value[0] === '0' && numBox.value[1] === '.':
      eraser();
      numBox.value = '';
      numBox.value += e.target.innerText;
      break;
    case numBox.value[0] === '0' && e.target.innerText !== '.':
      break;
    case memory.dataset.completed === 'completed' && e.target.classList.contains('number-button'):
      eraser();
      numBox.value = '';
      numBox.value += e.target.innerText;
      break;
    default: numBox.value += e.target.innerText;
  }
};
  // 연산 초기화 - 버튼
const inputReset = () => {
  const init = document.querySelector('.initialize');
  init.addEventListener('click', () => {
    numBox.value = '';
    eraser();
  });
};
  // 연산 초기화 - 키입력
const buttonEvents = e => {
  if (e.keyCode === 27) {
    numBox.value = '';
    eraser();
  }
};
  // 연산 함수
const calculate = (operator, firstVal, secondVal) => {
  switch (operator) {
    case '+':
      return parseFloat(firstVal) + parseFloat(secondVal);
    case '-':
      return parseFloat(firstVal) - parseFloat(secondVal);
    case '×':
    case '*':
      return parseFloat(firstVal) * parseFloat(secondVal);
    case '÷':
    case '/':
      return parseFloat(firstVal) / parseFloat(secondVal);
    default: break;
  }
};

  // 연산결과 출력
const buttonCalculator = () => {
  const operator = document.querySelectorAll('.operator');
  const memory = document.querySelector('.calculator-body');
  let calOperator;
  let firstVal;
  let secondVal;
    // 연산결과 출력 - 버튼입력의 경우
  operator.forEach(clicked => clicked.addEventListener('click', e => {
    switch (true) {
      case e.target.innerText === '+/-':
        switch (true) {
          case memory.dataset.firstValue !== undefined && memory.dataset.operator !== undefined:
            numBox.value = parseFloat(numBox.value) * -1;
            break;
          case memory.dataset.completed === 'completed':
            break;
          default: numBox.value = parseFloat(numBox.value) * -1;
        }
        break;
      case e.target.classList.contains('percent'):
        switch(true) {
          case memory.dataset.firstValue === undefined:
            numBox.value = parseFloat(numBox.value) / 100;
            eraser();
            memory.dataset.completed = 'completed';
            break;
          case memory.dataset.firstValue !== undefined:
            memory.dataset.secondValue = numBox.value;
            calOperator = memory.dataset.operator;
            firstVal = memory.dataset.firstValue;
            secondVal = memory.dataset.secondValue;
            numBox.value = calculate(calOperator, firstVal, secondVal) / 100;
            eraser();
            memory.dataset.completed = 'completed';
            break;
          default: break;
        }
        break;
      case !e.target.classList.contains('result') && !e.target.classList.contains('percent'):
        switch (true) {
          case memory.dataset.firstValue !== undefined && memory.dataset.operator !== undefined && numBox.value === '':
            memory.dataset.operator = e.target.innerText;
            break;
          case memory.dataset.firstValue !== undefined:
            memory.dataset.secondValue = numBox.value;
            calOperator = memory.dataset.operator;
            firstVal = memory.dataset.firstValue;
            secondVal = memory.dataset.secondValue;
            numBox.value = calculate(calOperator, firstVal, secondVal);
            eraser();
            memory.dataset.firstValue = numBox.value;
            memory.dataset.operator = e.target.innerText;
            numBox.value = '';
            break;
          case numBox.value !== '':
            memory.dataset.firstValue = numBox.value;
            memory.dataset.operator = e.target.innerText;
            numBox.value = '';
            break;
          default: break;
        }
        break;
      // 연산 결과 출력
      case e.target.classList.contains('result'):
        switch (true) {
          case numBox.value === '':
            break;
          case memory.dataset.firstValue === undefined && numBox.value !== '':
            break;
          default:
            memory.dataset.secondValue = numBox.value;
            calOperator = memory.dataset.operator;
            firstVal = memory.dataset.firstValue;
            secondVal = memory.dataset.secondValue;
            numBox.value = Math.round(calculate(calOperator, firstVal, secondVal) * 10 ** 13) / 10 ** 13;
            eraser();
            memory.dataset.completed = 'completed';
            break;
        }
        break;
      default: break;
    }
  }));
};

const keyCalculator = () => {
  const memory = document.querySelector('.calculator-body');
  let calOperator;
  let firstVal;
  let secondVal;
  // 연산결과 출력 - 키입력의 경우
  window.addEventListener('keydown', e => {
    const opButton = ['+', '-', '*', '/', '_', '%', 'Enter'];
    const matchingKey = Array.from(opButton).find(operator => operator === e.key);
    if (matchingKey) {
      switch (true) {
        case e.key === '_':
          switch (true) {
            case memory.dataset.firstValue !== undefined && memory.dataset.operator !== undefined:
              numBox.value = parseFloat(numBox.value) * -1;
              break;
            case memory.dataset.completed === 'completed':
              break;
            default: numBox.value = parseFloat(numBox.value) * -1;
          }
          break;
        case e.key === '%':
          switch(true) {
            case memory.dataset.firstValue === undefined:
              numBox.value = parseFloat(numBox.value) / 100;
              eraser();
              memory.dataset.completed = 'completed';
              break;
            case memory.dataset.firstValue !== undefined:
              memory.dataset.secondValue = numBox.value;
              calOperator = memory.dataset.operator;
              firstVal = memory.dataset.firstValue;
              secondVal = memory.dataset.secondValue;
              numBox.value = calculate(calOperator, firstVal, secondVal) / 100;
              eraser();
              memory.dataset.completed = 'completed';
              break;
            default: break;
          }
          break;
        case e.key !== 'Enter' && e.key !== '%':
          switch (true) {
            case memory.dataset.firstValue !== undefined && memory.dataset.operator !== undefined && numBox.value === '':
              memory.dataset.operator = e.key;
              break;
            case memory.dataset.firstValue !== undefined:
              memory.dataset.secondValue = numBox.value;
              calOperator = memory.dataset.operator;
              firstVal = memory.dataset.firstValue;
              secondVal = memory.dataset.secondValue;
              numBox.value = calculate(calOperator, firstVal, secondVal);
              eraser();
              memory.dataset.firstValue = numBox.value;
              memory.dataset.operator = e.key;
              numBox.value = '';
              break;
            case numBox.value !== '':
              memory.dataset.firstValue = numBox.value;
              memory.dataset.operator = e.key;
              numBox.value = '';
              break;
            default: break;
          }
          break;
        // 연산 결과 출력
        case e.key === 'Enter':
          switch (true) {
            case numBox.value === '':
              break;
            case memory.dataset.firstValue === undefined && numBox.value !== '':
              break;
            default:
              memory.dataset.secondValue = numBox.value;
              calOperator = memory.dataset.operator;
              firstVal = memory.dataset.firstValue;
              secondVal = memory.dataset.secondValue;
              numBox.value = Math.round(calculate(calOperator, firstVal, secondVal) * 10 ** 13) / 10 ** 13;
              eraser();
              memory.dataset.completed = 'completed';
              break;
          }
          break;
        default: break;
      }
    }
  });
};

// 이벤트 리스너 모음

window.addEventListener('keydown', keyInput);
window.addEventListener('keydown', printInput);
numButton.forEach(clicked => clicked.addEventListener('click', clickedInput));
inputReset();
window.addEventListener('keydown', buttonEvents);
buttonCalculator();
keyCalculator();
