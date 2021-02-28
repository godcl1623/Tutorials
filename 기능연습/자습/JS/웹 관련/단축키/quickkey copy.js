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

const keyInput = function (e) {
  const menuList = document.querySelector('.menu-list');
  const listItem = Array.from(document.querySelectorAll('.menu'));
  const keyList = Array.from(menuList.children).map(item => item.dataset.key);
  const keyData = String(e.keyCode);
  const selectedItem = listItem.find(item => item.dataset.key === keyData);
  const selectedSub = selectedItem.firstElementChild;
  if (!keyList.includes(keyData)) return;
  if (keyData === selectedItem.dataset.key) {
    selectedSub.classList.toggle('active');
  }
};

sidebar.addEventListener('scroll', onscroll);
window.addEventListener('keydown', keyInput);
