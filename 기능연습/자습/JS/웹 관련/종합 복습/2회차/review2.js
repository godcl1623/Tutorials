/* eslint-disable strict */
/* 구현 순서
1. 토글 메뉴바
2. 모달창
3. 팝업창
4. iframe 모달
5. 사이드바 스크롤
6. 진행바 */

'use strict';

// 상수 및 변수
const menuList = document.querySelectorAll('.menu-list');

// 함수
const openSubMenu = e => {
  const menuList = document.querySelectorAll('.menu-list');
  const menuArray = Array.from(menuList);
  const keyData = Array.from(menuList).map(item => item.dataset.key);
  const keyCode = String(e.keyCode);
  // const matchingKey = keyData.find(item => item === keyCode);
  const matchingKey = menuArray.find(item => item.dataset.key === keyCode);
  if (!keyData.includes(keyCode)) return;
  if (keyCode === matchingKey.dataset.key) {
    matchingKey.firstElementChild.classList.toggle('active');
  }
  // console.log(matchingKey);
};

// 이벤트 리스너
// menuList.forEach(menu => menu.addEventListener('keydown', openSubMenu));
window.addEventListener('keydown', openSubMenu);
