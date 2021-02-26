/* eslint-disable prettier/prettier */
const sidebar = document.querySelector('aside');
const menu1 = document.getElementById('menu1');
const keyData = document.querySelectorAll(`#menu[data-key]`);
const arr = [];
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

const keyInput = function (e) {
  const keyData = document.querySelector(`#menu[data-key='${e.keyCode}']`);
  const arr = [];
  arr.push(keyData);
  if (!keyData) {
    return;
  } else if (e.keyCode.toString() === '81') {
    alert('alert 1');
  };
};

sidebar.addEventListener('scroll', onscroll);
window.addEventListener('keydown', keyInput);