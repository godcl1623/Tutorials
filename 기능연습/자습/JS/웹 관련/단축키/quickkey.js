/* eslint-disable prettier/prettier */

'use strict';

const sidebar = document.querySelector('aside');

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

const keyInput = e => {
  const menuList = document.querySelector('.menu-list');
  const keyList = Array.from(menuList.children).map(item => item.dataset.key);
  const keyCode = String(e.keyCode);
  const matchingMenu = Array.from(document.querySelectorAll('.menu')).find(item => item.dataset.key === keyCode);
  if (!keyList.includes(keyCode)) return;
  if (keyCode === matchingMenu.dataset.key) {
    matchingMenu.firstElementChild.classList.toggle('active');
  }
  // console.log(keyCode);
  // alert(`alert ${keyList.indexOf(keyCode)+1}`);
};

sidebar.addEventListener('scroll', onscroll);
window.addEventListener('keydown', keyInput);
