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
  const calendarDates = document.querySelector('.calendar__dates');
  calendarDates.innerHTML = '';
  let cnt = 1;
  const firstDay = new Date(year, month, 1);
  for (let i = 0; i < 6; i++) {
    const weeks = document.createElement('div');
    weeks.classList.add('calendar-weeks');
    calendarDates.appendChild(weeks);
    for (let j = 0; j < 7; j++) {
      const day = document.createElement('div');
      if ((i === 0 && j < firstDay.getDay()) || cnt > lastDays[month]) {
        weeks.appendChild(day);
        day.classList.add('empty');
      } else {
        day.innerHTML = cnt;
        weeks.appendChild(day);
        day.classList.add('filled');
        cnt++;
      }
    }
  }
  // for (let i = 0; i <= lastDays[month] + firstDay.getDay() - 1; i++) {
  //   const day = document.createElement('div');
  //   if (i >= firstDay.getDay()) {
  //     day.classList.add('calendar-day');
  //     day.innerHTML = i - firstDay.getDay() + 1;
  //   }
  //   calendarDates.appendChild(day);
  // }
};
calendarGenerator(2021, 2);
