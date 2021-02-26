/* eslint-disable prettier/prettier */
const sidebar = document.querySelector('aside');
const menu1 = document.getElementById('menu1');

window.onscroll = function () {
  function sidebarMove() {
    if (window.pageYOffset < 189) {
      sidebar.style.top = '189px';
    } else if (window.pageYOffset >= 189 && window.pageYOffset < sidebar.offsetTop) {
      sidebar.style.top = window.pageYOffset + 'px';
    } else if ((window.pageYOffset + window.innerHeight) > (sidebar.offsetTop + sidebar.scrollHeight)) {
      const top = window.pageYOffset + window.innerHeight - sidebar.scrollHeight - 2;
      sidebar.style.top = top + 'px';
    }
  }
  sidebarMove();
};

const KeyInput = function (e, x) {
  const keyData = document.querySelector(`#menu[data-key='${e.keyCode}']`);
  const li = document.querySelector(`nav ul li:nth-child(${x})`);
  if (!keyData) return;
  if (e.keyCode.toString() === li.dataset.key) {
    alert(`alert ${x}`);
  };
}

/* const keyInput1 = function (e) {
  const keyData = document.querySelector(`#menu[data-key='${e.keyCode}']`);
  const li1 = document.querySelector('nav ul li:nth-child(1)');
  if (!keyData) return;
  if (e.keyCode.toString() === li1.dataset.key) {
    alert('alert 1');
  };
};

const keyInput2 = function (e) {
  const keyData = document.querySelector(`#menu[data-key='${e.keyCode}']`);
  const li2 = document.querySelector('nav ul li:nth-child(2)');
  if (!keyData) return;
  if (e.keyCode.toString() === li2.dataset.key) {
    alert('alert 2');
  };
}; */

const keyInput1 = new KeyInput(e, 1);

sidebar.addEventListener('scroll', onscroll);
window.addEventListener('keydown', keyInput1);
window.addEventListener('keydown', keyInput2);