// 상수 모음
const body = document.querySelector('body');
// 함수 모음
function divGenerator() {
  for (let i = 0; i < 5; i++) {
    const $container = document.createElement('div');
    $container.classList.add('container');
    const $textBox = document.createElement('p');
    $textBox.classList.add('order');
    const $img = document.createElement('img');
    $img.classList.add('img');
    const $desc = document.createElement('p');
    $desc.classList.add('desc');
    $container.appendChild($textBox);
    $container.appendChild($img);
    $container.appendChild($desc);
    body.appendChild($container);
  }
}
// 이벤트 리스너 모음
window.onload = () => {divGenerator()};
