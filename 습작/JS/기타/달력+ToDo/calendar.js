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
const textSubmit = document.querySelector('.text_submit');
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
      if (i - firstDay.getDay() + 1 === dateStandard.getDate() &&
        year === dateStandard.getFullYear() && month === dateStandard.getMonth()) {
        day.classList.add('today');
      }
    }
    calendarDates.appendChild(day);
  }
};

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

const showListContainer = e => {
  const toDoContainer = document.querySelector('.todo__container');
  toDoContainer.innerHTML = e.target.children[0].innerHTML;
};

const showDefaultContainer = () => {
  const toDoContainer = document.querySelector('.todo__container');
  const today = document.querySelector('.today');
  toDoContainer.innerHTML = today.children[0].innerHTML;
};

const showDefaultDate = () => {
  const thisDate = document.querySelector('.todo__date .this__date');
  const thisYear = thisDate.querySelector('.this__date__year');
  const thisMonth = thisDate.querySelector('.this__date__month');
  const thisDay = thisDate.querySelector('.this__date__day');
  thisYear.innerText = `${currentYear}.`;
  thisMonth.innerText = `${currentMonth + 1}.`;
  thisDay.innerText = dateStandard.getDate();
};

const currentDate = () => {
  const thisDate = document.querySelector('.todo__date .this__date');
  const calendarDates = document.querySelector('.calendar__dates');
  function textChanger(e) {
    if (e.target.classList.contains('calendar__dates')) return;
    thisDate.textContent = `${currentYear}.${currentMonth + 1}.${e.target.innerText}`;
  }
  calendarDates.addEventListener('click', textChanger);
};

const makeToDoList = e => {
  if (e.target.childNodes.length > 1) {
    return;
  }
  const $ul = document.createElement('ul');
  $ul.classList.add('todo__list__container');
  e.target.appendChild($ul);
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

function showToDoList(e) {
  makeToDoList(e);
  currentDate();
  showListContainer(e);
  console.log(e.target.children[0]);
}

function addList() {
  const days = document.querySelectorAll('.day');
  const textInput = document.querySelector('.text_input');
  if (!textInput.value) return;
  const $li = document.createElement('li');
  $li.innerHTML = `
      <input type="checkbox" class="checkbox">
      <p class="list__item">${textInput.value}</p>
  `;
  days[dateStandard.getDate() - 1].childNodes[1].appendChild($li);
  // console.log(days[dateStandard.getDate() - 1]);
}

calendarGenerator();
selectYear();
selectMonth();
closeContainer();
currentDate();
prevMonth.addEventListener('click', monthToPrev);
nextMonth.addEventListener('click', monthToNext);
yearButton.addEventListener('click', openYearSelector);
monthButton.addEventListener('click', openMonthSelector);
closeButton.forEach(button => button.addEventListener('click', closeContainer));
const days = document.querySelectorAll('.day');
days.forEach(dayBox => dayBox.addEventListener('click', showToDoList));
window.onload = () => {
  const today = document.querySelector('.today');
  if (today.childNodes.length === 1) {
    const $ul = document.createElement('ul');
    $ul.innerHTML = `
      <li>
        <p>test</p>
      </li>
    `;
    $ul.classList.add('todo__list__container');
    today.appendChild($ul);
  }
  showDefaultContainer();
  showDefaultDate();
};
textSubmit.addEventListener('click', addList);
