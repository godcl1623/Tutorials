/* eslint-disable strict */

'use strict';

const dateStandard = new Date();
const yearButton = document.querySelector('.year');
const monthButton = document.querySelector('.month');
let currentYear = dateStandard.getFullYear();
let currentMonth = dateStandard.getMonth();
yearButton.innerText = currentYear;
monthButton.innerText = currentMonth + 1;
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
  const firstDay = new Date(year, month, 1);
  for (let i = 0; i <= lastDays[month] + firstDay.getDay() - 1; i++) {
    const day = document.createElement('div');
    if (i >= firstDay.getDay()) {
      day.innerText = i - firstDay.getDay() + 1;
    }
    calendarDates.appendChild(day);
  }
};
calendarGenerator();

const monthToPrev = () => {
  if (currentMonth > 0) {
    monthButton.innerText = `${parseFloat(monthButton.innerText) - 1}`;
    --currentMonth;
    calendarGenerator(currentYear, currentMonth);
  } else {
    yearButton.innerText = parseFloat(yearButton.innerText) - 1;
    monthButton.innerText = 12;
    currentMonth = 11;
    currentYear -= 1;
    calendarGenerator(currentYear, currentMonth);
  }
};

const monthToNext = () => {
  if (currentMonth < 11) {
    monthButton.innerText = parseFloat(monthButton.innerText) + 1;
    ++currentMonth;
    calendarGenerator(currentYear, currentMonth);
  } else {
    yearButton.innerText = parseFloat(yearButton.innerText) + 1;
    monthButton.innerText = 1;
    currentMonth = 0;
    currentYear += 1;
    calendarGenerator(currentYear, currentMonth);
  }
};

const prevMonth = document.querySelector('.prev__month');
const nextMonth = document.querySelector('.next__month');
prevMonth.addEventListener('click', monthToPrev);
nextMonth.addEventListener('click', monthToNext);
