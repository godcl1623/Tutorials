/* eslint-disable strict */

'use strict';

const dateStandard = new Date();
const yearButton = document.querySelector('.year');
const monthButton = document.querySelector('.month');
const prevMonth = document.querySelector('.prev__month');
const nextMonth = document.querySelector('.next__month');
const closeButton = document.querySelectorAll('.close');
const yearContainer = document.querySelector('.year-container');
const monthContainer = document.querySelector('.month-selection');
let currentYear = dateStandard.getFullYear();
let currentMonth = dateStandard.getMonth();
yearButton.textContent = currentYear;
monthButton.textContent = currentMonth + 1;
const isLeapYear = year => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
};
const febLastDay = year => {
  return isLeapYear(year) ? 29 : 28;
};

const calendarGenerator = (year = currentYear, month = currentMonth) => {
  const lastDays = [31, febLastDay(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const calendarDates = document.querySelector('.calendar__dates');
  calendarDates.textContent = '';
  const firstDay = new Date(year, month, 1);
  let i;
  for (i = 0; i <= lastDays[month] + firstDay.getDay() - 1; i++) {
    const day = document.createElement('div');
    if (i >= firstDay.getDay()) {
      day.textContent = i - firstDay.getDay() + 1;
      day.classList.add('day');
      day.dataset.date = `${currentYear}.${currentMonth + 1}.${day.textContent}`;
      if (i - firstDay.getDay() + 1 === dateStandard.getDate() &&
        year === dateStandard.getFullYear() && month === dateStandard.getMonth()) {
        day.classList.add('today');
      }
    }
    calendarDates.appendChild(day);
  }
};

function monthToPrev() {
  if (currentMonth > 0) {
    monthButton.textContent = parseFloat(monthButton.textContent) - 1;
    --currentMonth;
    calendarGenerator(currentYear, currentMonth);
  } else {
    yearButton.textContent = parseFloat(yearButton.textContent) - 1;
    monthButton.textContent = 12;
    currentMonth = 11;
    currentYear = parseFloat(currentYear) - 1;
    calendarGenerator(currentYear, currentMonth);
  }
}

function monthToNext() {
  if (currentMonth < 11) {
    monthButton.textContent = parseFloat(monthButton.textContent) + 1;
    ++currentMonth;
    calendarGenerator(currentYear, currentMonth);
  } else {
    yearButton.textContent = parseFloat(yearButton.textContent) + 1;
    monthButton.textContent = 1;
    currentMonth = 0;
    currentYear = parseFloat(currentYear) + 1;
    calendarGenerator(currentYear, currentMonth);
  }
}

const selectYear = () => {
  const selectors = yearContainer.querySelectorAll('.selector');
  function yearChanger(event) {
    currentYear = parseFloat(event.target.textContent);
    calendarGenerator(currentYear, currentMonth);
    yearButton.textContent = event.target.textContent;
    yearContainer.classList.remove('active');
  }
  selectors.forEach(button => button.addEventListener('click', yearChanger));
};

const selectMonth = () => {
  const selectors = monthContainer.querySelectorAll('.selector');
  function monthChanger(event) {
    currentMonth = parseFloat(event.target.textContent) - 1;
    calendarGenerator(currentYear, currentMonth);
    monthButton.textContent = event.target.textContent;
    monthContainer.classList.remove('active');
  }
  selectors.forEach(button => button.addEventListener('click', monthChanger));
};

function openYearSelector() {
  yearContainer.classList.add('active');
}

function openMonthSelector() {
  monthContainer.classList.add('active');
}

function closeContainer() {
  yearContainer.classList.remove('active');
  monthContainer.classList.remove('active');
}

calendarGenerator();
selectYear();
selectMonth();
closeContainer();
prevMonth.addEventListener('click', monthToPrev);
nextMonth.addEventListener('click', monthToNext);
yearButton.addEventListener('click', openYearSelector);
monthButton.addEventListener('click', openMonthSelector);
closeButton.forEach(button => button.addEventListener('click', closeContainer));
