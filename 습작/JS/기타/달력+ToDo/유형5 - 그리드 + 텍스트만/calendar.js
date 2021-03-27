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
  const daySections = document.querySelectorAll('.day');
  daySections.forEach(dayBox => {dayBox.innerHTML = '';});
  daySections.forEach(dayBox => dayBox.classList.add('test'));
  const firstDay = new Date(year, month, 1);
  for (let i = 0; i <= lastDays[month] + firstDay.getDay() - 1; i++) {
    const maxLoop = lastDays[month] + firstDay.getDay();
    const valueArr = [...Array(maxLoop).keys()];
    if (i >= firstDay.getDay()) {
      daySections[i].innerText = valueArr[i] - firstDay.getDay() + 1;
    }
  }
};
calendarGenerator();
