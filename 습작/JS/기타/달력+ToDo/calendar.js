/* eslint-disable strict */

'use strict';

const dateStandard = new Date();
const currentYear = dateStandard.getFullYear();
const currentMonth = dateStandard.getMonth();
const isLeapYear = year => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
};
const febLastDay = year => {
  return isLeapYear(year) ? 29 : 28;
};

const calendarGenerator = (year = currentYear, month = currentMonth) => {
  const lastDays = [31, febLastDay(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const calendarBody = document.querySelector('#calendar-area');
  const firstDay = new Date(year, month, 1);
  let cnt = 1;
  let monthCnt = 100;
  for (let i = 0; i < 6; i++) {
    const $tr = document.createElement('tr');
    $tr.setAttribute('class', monthCnt);
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay.getDay()) || cnt > lastDays[month]) {
        let $td = document.createElement('td');
        $tr.appendChild($td);
      } else {
        let $td = document.createElement('td');
        $td.textContent = cnt;
        $td.setAttribute('class', cnt);
        $tr.appendChild($td);
        cnt++;
      }
    }
    monthCnt++;
    calendarBody.appendChild($tr);
  }
};
calendarGenerator();
