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

const keyInput = function (e) {
  const menuList = document.querySelector('.menu-list');
  const keyList = Array.from(menuList.children).map(item => item.dataset.key);
  const keyData = String(e.keyCode);
  if(!keyList.includes(keyData)) return;
    alert(`alert ${keyList.indexOf(keyData)+1}`);
};

sidebar.addEventListener('scroll', onscroll);
window.addEventListener('keydown', keyInput);
