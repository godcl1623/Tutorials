/* eslint-disable prettier/prettier */
/* eslint-disable strict */

'use strict';

// 상수 모음

const buttons = document.querySelectorAll('button');

// 클래스 모음

// 함수 모음

const sortFunction = e => {
  const clothes = document.querySelectorAll('.clothes');
  const clothesArr = Array.from(clothes);
  //
  switch (true) {
    case e.target.className === 'tshirts': {
      const tshirts = clothesArr.filter(lists => lists.classList.contains('tshirts'));
      const notTshirts = clothesArr.filter(lists => !lists.classList.contains('tshirts'));
      tshirts.forEach(lists => {lists.style.display = 'flex'});
      notTshirts.forEach(lists => {lists.style.display = 'none'});
      break;
    }
    case e.target.className === 'pants': {
      const pants = clothesArr.filter(lists => lists.classList.contains('pants'));
      const notPants = clothesArr.filter(lists => !lists.classList.contains('pants'));
      pants.forEach(lists => {lists.style.display = 'flex'});
      notPants.forEach(lists => {lists.style.display = 'none'});
      break;
    }
    case e.target.className === 'skirts': {
      const skirts = clothesArr.filter(lists => lists.classList.contains('skirts'));
      const notSkirts = clothesArr.filter(lists => !lists.classList.contains('skirts'));
      skirts.forEach(lists => {lists.style.display = 'flex'});
      notSkirts.forEach(lists => {lists.style.display = 'none'});
      break;
    }
    case e.target.className === 'blue': {
      const blue = clothesArr.filter(lists => lists.classList.contains('blue'));
      const notBlue = clothesArr.filter(lists => !lists.classList.contains('blue'));
      blue.forEach(lists => {lists.style.display = 'flex'});
      notBlue.forEach(lists => {lists.style.display = 'none'});
      break;
    }
    case e.target.className === 'yellow': {
      const yellow = clothesArr.filter(lists => lists.classList.contains('yellow'));
      const notYellow = clothesArr.filter(lists => !lists.classList.contains('yellow'));
      yellow.forEach(lists => {lists.style.display = 'flex'});
      notYellow.forEach(lists => {lists.style.display = 'none'});
      break;
    }
    case e.target.className === 'pink': {
      const pink = clothesArr.filter(lists => lists.classList.contains('pink'));
      const notPink = clothesArr.filter(lists => !lists.classList.contains('pink'));
      pink.forEach(lists => {lists.style.display = 'flex'});
      notPink.forEach(lists => {lists.style.display = 'none'});
      break;
    }
    case e.target.classList.contains('init'):
      clothes.forEach(lists => {lists.style.display = 'flex'});
      break;
    default: break;
  }
};

// 이벤트 리스너 모음

buttons.forEach(button => button.addEventListener('click', sortFunction));
