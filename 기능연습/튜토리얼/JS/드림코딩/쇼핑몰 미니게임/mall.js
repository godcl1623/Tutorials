/* eslint-disable strict */

'use strict';

// 상수 모음

const buttons = document.querySelectorAll('button');

// 클래스 모음

// 함수 모음

const sortFunction = e => {
  const buttonsArray = Array.from(buttons);
  const buttonTypes = buttonsArray.map(button => button.className);
  const matchingTypes = buttonTypes.find(button => button === e.target.className);
  
  if (e.target.className === matchingTypes) {
    console.log('test');
  }
};

// 이벤트 리스너 모음

buttons.forEach(button => button.addEventListener('click', sortFunction));
