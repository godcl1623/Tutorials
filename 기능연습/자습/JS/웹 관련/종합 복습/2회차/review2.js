/* eslint-disable strict */
/* 구현 순서
1. 토글 메뉴바
2. 모달창
3. 팝업창
4. iframe 모달
5. 사이드바 스크롤
6. 진행바 */

'use strict';

// 전역 상수 및 변수
const menuList = document.querySelectorAll('.menu-list');
const toggleButton = document.querySelectorAll('.toggle');
const keyData = Array.from(menuList).map(attribute => attribute.dataset.key);
const modalLayer = document.querySelector('.modal-layer');
const modalWindow = document.querySelector('.modal-window');
const iframeModal = document.querySelector('iframe');

// 함수
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

const openPopup = e => {
  modalLayer.classList.add('active');
  console.log(e.target);
  if (e.target.classList.contains('modal-toggle')) {
    modalWindow.classList.add('active');
  } else if (e.target.classList.contains('popup-toggle')) {
    modalLayer.classList.remove('active');
    window.open('review2-pop.html', 'popup window', 'width=300, height=400');
  } else if (e.target.classList.contains('iframe-toggle')) {
    iframeModal.classList.add('active');
  }
};

window.closeModal = () => {
  modalLayer.classList.remove('active');
  modalWindow.classList.remove('active');
  iframeModal.classList.remove('active');
};

// 이벤트 리스너
window.addEventListener('keydown', openSubMenu);
menuList.forEach(menu => menu.addEventListener('click', openSubMenu2));
toggleButton.forEach(button => button.addEventListener('click', openPopup));
modalLayer.addEventListener('click', closeModal);
modalWindow.querySelector('p').addEventListener('click', window.closeModal);
