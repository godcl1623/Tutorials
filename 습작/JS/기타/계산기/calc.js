// 변수, 상수 모음 => 상수 - 변수 순

const buttons = document.querySelectorAll('button');
const numBox = document.querySelector('.number-input');
// const memBox = document.querySelector('.number-output');
const numButton = document.querySelectorAll('.number-button');

// 함수 모음

const keyInput = e => {
  const keySet1 = Array.from(buttons).map(attribute => attribute.dataset.key1);
  const keySet2 = Array.from(buttons).map(attribute => attribute.dataset.key2);
  const keyDown = String(e.keyCode);
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
    default: break;
    case e.key === '%':
      const percent = document.querySelector('button[data-key2="%"]');
      percent.classList.add('active');
      percent.addEventListener('transitionend', () => {
        percent.classList.remove('active');
      });
      break;
      case e.key === '*':
        const multiply = document.querySelector('button[data-key3="*"]');
        multiply.classList.add('active');
        multiply.addEventListener('transitionend', () => {
          multiply.classList.remove('active');
        });
        break;
    case (matchingKey.dataset.key1 === keyDown || matchingKey.dataset.key2 === keyDown):
      matchingButton.classList.add('active');
      matchingButton.addEventListener('transitionend', () =>
        matchingButton.classList.remove('active')
      );
      break;
    case e.key === '*':
      console.log('test');
      break;
  }
};

const printInput = e => {
  const keySet1 = Array.from(numButton).map(attribute => attribute.dataset.key1);
  const keySet2 = Array.from(numButton).map(attribute => attribute.dataset.key2);
  const keyDown = String(e.keyCode);
  const matchingKey = Array.from(numButton) //
    .find(attribute =>
        attribute.dataset.key1 === keyDown || attribute.dataset.key2 === keyDown
    );
  if (!keySet1.includes(keyDown) && !keySet2.includes(keyDown)) return;
  if (matchingKey.dataset.key1 === keyDown || matchingKey.dataset.key2) {
    switch (true) {
      default: numBox.value += e.key;
      case (e.key === '*' || e.key === '%'):
        break;
      case numBox.value.length >= 15:
        break;
      case numBox.value.includes('.') && numBox.value.length !== '' && e.key === '.':
        break;
      case numBox.value[0] === '0' && numBox.value[1] === '.':
        numBox.value += e.key;
        break;
      case numBox.value[0] === '0' && e.key !== '.':
        break;
    }
  }
};

const clickedInput = e => {
  switch (true) {
    default: numBox.value += e.target.innerText;
    case numBox.value.length >= 15:
      break;
    case numBox.value.includes('.') && numBox.value.length !== '' && e.target.innerText === '.':
      break;
    case numBox.value[0] === '0' && numBox.value[1] === '.':
      numBox.value += e.target.innerText;
      break;
    case numBox.value[0] === '0' && e.target.innerText !== '.':
      break;
  }
};

const eraser = () => {
  const memory = document.querySelector('.calculator-body');
  memory.removeAttribute('data-first-value');
  memory.removeAttribute('data-second-value');
  memory.removeAttribute('data-operator');
};

const inputReset = () => {
  const init = document.querySelector('.initialize');
  init.addEventListener('click', () => {
    numBox.value = '';
    eraser();
  });
};

const buttonEvents = e => {
  if (e.keyCode === 27) {
    numBox.value = '';
    eraser();
  }
};

const calculate = (operator, firstVal, secondVal) => {
  switch (operator) {
    default: break;
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
  }
};

const calculator = e => {
  const operator = document.querySelectorAll('.operator');
  const memory = document.querySelector('.calculator-body');
  operator.forEach(clicked => clicked.addEventListener('click', e => {
    switch (true) {
      default: break;
      case numBox.value !== '' && !e.target.classList.contains('result'):
        memory.dataset.firstValue = numBox.value;
        memory.dataset.operator = e.target.innerText;
        numBox.value = '';
        break;
      case e.target.classList.contains('result'):
        memory.dataset.secondValue = numBox.value;
        const operator = memory.dataset.operator;
        const firstVal = memory.dataset.firstValue;
        const secondVal = memory.dataset.secondValue;
        numBox.value = calculate(operator, firstVal, secondVal);
        eraser();
        break;
    }
  }));
  window.addEventListener('keydown', e => {
    switch (true) {
      default: break;
      case numBox.value !== '' && e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/':
        memory.dataset.firstValue = numBox.value;
        memory.dataset.operator = e.key;
        numBox.value = '';
        break;
      case e.keyCode === 13:
        memory.dataset.secondValue = numBox.value;
        const firstVal = memory.dataset.firstValue;
        const operator = memory.dataset.operator;
        const secondVal = memory.dataset.secondValue;
        numBox.value = calculate(operator, firstVal, secondVal);
        eraser();
        break;
    }
  });
};

// 이벤트 리스너 모음

window.addEventListener('keydown', keyInput);
window.addEventListener('keydown', printInput);
numButton.forEach(clicked => clicked.addEventListener('click', clickedInput));
inputReset();
window.addEventListener('keydown', buttonEvents);
calculator();
