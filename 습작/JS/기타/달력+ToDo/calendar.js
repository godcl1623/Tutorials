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
  // const calendarDates = document.querySelector('.calendar__dates');
  const daySections = document.querySelectorAll('.day');
  // calendarDates.innerHTML = '';
  daySections.forEach(dayBox => {dayBox.innerHTML = '';});
  let cnt = 1;
  const firstDay = new Date(year, month, 1);
  // for (let i = 0; i < 6; i++) {
  //   const weeks = document.createElement('div');
  //   weeks.classList.add('calendar-weeks');
  //   calendarDates.appendChild(weeks);
  //   for (let j = 0; j < 7; j++) {
  //     const day = document.createElement('div');
  //     if ((i === 0 && j < firstDay.getDay()) || cnt > lastDays[month]) {
  //       weeks.appendChild(day);
  //       day.classList.add('empty');
  //     } else {
  //       day.innerHTML = cnt;
  //       weeks.appendChild(day);
  //       day.classList.add('filled');
  //       cnt++;
  //     }
  //   }
  // }
  // for (let i = 0; i < 6; i++) {
  //   for (let j = 0; j < 7; j++) {
  //     // if ((i === 0 && j < firstDay.getDay()) || cnt > lastDays[month]) {
  //     //   console.log(j);
  //     // } else {
  //     //   daySections.forEach(dayBox => {
  //     //     dayBox.innerHTML = cnt;
  //     //     cnt++;
  //     //   });
  //     // }
  //   }
  // }
  const firstDate = document.querySelector('.1');
  const dayArr = Array.from(daySections);
  const test = dayArr.find(ele => ele.classList.contains(firstDay.getDay()));
  if (firstDate === test) {console.log('test')};
};
calendarGenerator(2021, 2);
