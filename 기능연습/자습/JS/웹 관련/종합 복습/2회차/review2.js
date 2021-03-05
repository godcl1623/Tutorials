/* eslint-disable strict */
/* 구현 순서
1. 토글 메뉴바 V
2. 모달창 V
3. 팝업창 V
4. iframe 모달 V
5. 사이드바 스크롤 V
6. 진행바 V */

'use strict';

// 전역 상수 및 변수
  // 토글메뉴
const menuList = document.querySelectorAll('.menu-list');
const toggleButton = document.querySelectorAll('.toggle');
const keyData = Array.from(menuList).map(attribute => attribute.dataset.key);
  // 팝업, 모달 등
const modalLayer = document.querySelector('.modal-layer');
const modalWindow = document.querySelector('.modal-window');
const iframeModal = document.querySelector('iframe');
  // 사이드바
const sidebar = document.querySelector('.sidebar');
  // 진행바
const progressField = document.querySelector('.progressbar-field');
const progressBar = document.querySelector('.progressive');

// 함수
  // 토글메뉴
const openSubMenu = e => {
  const keyCode = String(e.keyCode);
  if (!keyData.includes(keyCode)) return;
  const matchingKey = Array.from(menuList).find(attribute => attribute.dataset.key === keyCode);
  matchingKey.firstElementChild.classList.toggle('active');
};

const openSubMenu2 = e => {
  if (keyData.includes(e.target.dataset.key)) {
    e.target.firstElementChild.classList.toggle('active');
  }
};
  // 팝업, 모달
const openPopup = e => {
  modalLayer.classList.add('active');
  const buttonValue = Array.of(...e.target.classList)[0];

  switch (buttonValue) {
    case 'modal-toggle':
      modalWindow.classList.add('active');
      break;
    case 'popup-toggle':
      modalLayer.classList.remove('active');
      window.open('review2-pop.html', 'popup window', 'width=300, height=400');
      break;
    case 'iframe-toggle':
      iframeModal.classList.add('active');
      break;
  }
};

window.closeModal = () => {
  modalLayer.classList.remove('active');
  modalWindow.classList.remove('active');
  iframeModal.classList.remove('active');
};
  // 사이드바
const stickySidebar = () => {
  const sidebarBottom = sidebar.offsetTop + sidebar.scrollHeight;
  const windowBottom = window.pageYOffset + window.innerHeight;
  const top = sidebar.offsetTop + (windowBottom - sidebarBottom);

  switch(true) {
    case window.pageYOffset <= 500:
      sidebar.style.top = `${500}px`;
      break;
    case sidebarBottom <= windowBottom:
      sidebar.style.top = `${top}px`;
      break;
    case sidebar.offsetTop >= window.pageYOffset:
      sidebar.style.top = `${window.pageYOffset}px`;
      break;
  }
};
  // 진행바
const fillingProgressiveBar = () => {
  const htmlHeight = document.documentElement.scrollHeight;
  const heightForScroll = htmlHeight - window.innerHeight;
  const scrollPercent = (window.pageYOffset / heightForScroll) * 100;

  if (window.pageYOffset >= 32) {
    progressField.style.display = 'block';
    progressBar.style.width = `${scrollPercent}%`;
  } else {
    progressField.style.display = 'none';
  }
};
// 이벤트 리스너
  // 토글 메뉴
window.addEventListener('keydown', openSubMenu);
menuList.forEach(menu => menu.addEventListener('click', openSubMenu2));
  // 팝업, 모달 등
toggleButton.forEach(button => button.addEventListener('click', openPopup));
modalLayer.addEventListener('click', closeModal);
modalWindow.querySelector('p').addEventListener('click', window.closeModal);
  // 사이드바
window.addEventListener('scroll', stickySidebar);
  // 진행바
window.addEventListener('scroll', fillingProgressiveBar);
