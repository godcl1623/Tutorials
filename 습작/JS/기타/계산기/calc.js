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
  if (matchingKey.dataset.key1 === keyDown || matchingKey.dataset.key2) {
    matchingButton.classList.add('active');
    matchingButton.addEventListener('transitionend', () =>
      matchingButton.classList.remove('active')
    );
  }
};

const printInput = e => {
  const keySet1 = Array.from(buttons).map(attribute => attribute.dataset.key1);
  const keySet2 = Array.from(buttons).map(attribute => attribute.dataset.key2);
  const keyDown = String(e.keyCode);
  const matchingKey = Array.from(buttons) //
    .find(attribute =>
        attribute.dataset.key1 === keyDown || attribute.dataset.key2 === keyDown
    );
  if (!keySet1.includes(keyDown) && !keySet2.includes(keyDown)) return;
  if (matchingKey.dataset.key1 === keyDown || matchingKey.dataset.key2) {
    switch (true) {
      default: numBox.value += e.key;
      case numBox.value.length >= 15:
        break;
      case numBox.value.includes('.') && numBox.value.length !== null && e.key === '.':
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
    case numBox.value.includes('.') && numBox.value.length !== null && e.target.innerText === '.':
      break;
    case numBox.value[0] === '0' && numBox.value[1] === '.':
      numBox.value += e.target.innerText;
      break;
    case numBox.value[0] === '0' && e.target.innerText !== '.':
      break;
  }
};

const inputReset = () => {
  const init = document.querySelector('.initialize');
  init.addEventListener('click', () => {
    numBox.value = null;
  });
};

const buttonEvents = e => {
  if (e.keyCode === 27) {
    numBox.value = null;
  }
};

// 이벤트 리스너 모음

window.addEventListener('keydown', keyInput);
window.addEventListener('keydown', printInput);
numButton.forEach(clicked => clicked.addEventListener('click', clickedInput));
inputReset();
window.addEventListener('keydown', buttonEvents);
