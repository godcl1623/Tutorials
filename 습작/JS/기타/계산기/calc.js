// 변수, 상수 모음 => 상수 - 변수 순

const buttons = document.querySelectorAll('button');

// 함수 모음

const keyInput = e => {
  const keySet1 = Array.from(buttons).map(attribute => attribute.dataset.key1);
  const keySet2 = Array.from(buttons).map(attribute => attribute.dataset.key2);
  const keyDown = String(e.keyCode);
  const matchingKey = Array.from(buttons) //
    .find(attribute =>
      attribute.dataset.key1 === keyDown || attribute.dataset.key2 === keyDown);
  const matchingButton = document.querySelector(`button[data-key1='${e.keyCode}']`)
    || document.querySelector(`button[data-key2='${e.keyCode}']`);

  if (!keySet1.includes(keyDown) && !keySet2.includes(keyDown)) return;
  // 여기 조건문만 복습
  if (matchingKey.dataset.key1 === keyDown || matchingKey.dataset.key2) {
    matchingButton.classList.add('active');
    matchingButton.addEventListener('transitionend', () => matchingButton.classList.remove('active'));
  }
};

// 이벤트 리스너 모음

window.addEventListener('keydown', keyInput);
