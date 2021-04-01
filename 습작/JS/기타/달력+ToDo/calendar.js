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
      day.dataset.date = `${currentYear}.${currentMonth + 1}.${day.textContent}`;
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

const readLocalStorageKeys = () => {
  const testArr = [];
  const storageArr = Object.entries(localStorage);
  for (let i = storageArr.length - 1; i >= 0; i--) {
    testArr.push(storageArr[i][0]);
  }
  return testArr;
};

const showListContainer = e => {
  const toDoContainer = document.querySelector('.todo__container');
  toDoContainer.innerHTML = e.target.childNodes[1].innerHTML;
};

const getDataSets = () => {
  const days = document.querySelectorAll('.day');
  const daysArr = Array.from(days);
  return daysArr.map(ele => ele.dataset.date);
};

const showDefaultContainer = () => {
  const today = document.querySelector('.today');
  const toDoContainer = document.querySelector('.todo__container');
  toDoContainer.innerHTML = today.childNodes[1].innerHTML;
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
  const thisYear = thisDate.querySelector('.this__date__year');
  const thisMonth = thisDate.querySelector('.this__date__month');
  const thisDay = thisDate.querySelector('.this__date__day');
  const calendarDates = document.querySelector('.calendar__dates');
  function textChanger(e) {
    if (e.target.classList.contains('calendar__dates')) return;
    thisYear.innerText = `${currentYear}.`;
    thisMonth.innerText = `${currentMonth + 1}.`;
    thisDay.innerText = e.target.innerText;
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

const toLocalStorage = input => {
  const todoThisDate = document.querySelector('.todo__date .this__date');
  const newKey = todoThisDate.innerText.replace(/\n/g, '');
  const dropHistory = JSON.parse(localStorage.getItem(newKey)) || [];
  const localValue = {
    'task':input,
    'completed':false
  };
  dropHistory.push(localValue);
  localStorage.setItem(newKey, JSON.stringify(dropHistory));
};

const testKeyArr = () => {
  const matchingArr = getDataSets().filter(ele => readLocalStorageKeys().includes(ele));
  const testArr = [];
  let i = 0;
  while (i < matchingArr.length) {
    testArr.push(JSON.parse(localStorage.getItem(matchingArr[i])));
    i++;
  }
  return testArr;
};

const matchingDays = () => {
  const days = document.querySelectorAll('.day');
  const matchingArr = getDataSets().filter(ele => readLocalStorageKeys().includes(ele));
  const testArr = [];
  days.forEach(ele => {
    if (matchingArr.includes(ele.dataset.date)) {
      testArr.push(ele);
    }
  });
  return testArr;
};

const makeDefaultUl = () => {
  const matchingArr = getDataSets().filter(ele => readLocalStorageKeys().includes(ele));
  const testArr = Array.from(testKeyArr());
  const testArr2 = Array.from(matchingDays());
  // console.log(matchingArr, testArr, testArr2);
  for (let i = 0; i < matchingArr.length; i++) {
    if (testArr2[i].childNodes.length === 1) {
      const $ul = document.createElement('ul');
      $ul.classList.add('todo__list__container');
      // console.log(testArr2[i]);
      if (localStorage.length !== 0) {
        for (let j = 0; j < testArr[i].length; j++) {
          $ul.innerHTML += `
            <li class="todo__list__contents">
              <input type="checkbox" class="checkbox">
              <p class="list__item">${testArr[i][j].task}</p>
            </li>
          `;
          // console.log(testArr[i][j]);
        }
      }
      testArr2[i].appendChild($ul);
    }
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
}

function addList() {
  const days = document.querySelectorAll('.day');
  const thisDay = document.querySelector('.this__date__day');
  const toDoContainer = document.querySelector('.todo__container');
  let thisNumber = parseFloat(thisDay.innerText) - 1;
  const textInput = document.querySelector('.text_input');
  if (!textInput.value) return;
  toLocalStorage(textInput.value);
  const $li = document.createElement('li');
  $li.innerHTML = `
      <input type="checkbox" class="checkbox">
      <p class="list__item">${textInput.value}</p>
  `;
  $li.classList.add('todo__list__contents');
  days[thisNumber].childNodes[1].appendChild($li);
  toDoContainer.innerHTML = days[thisNumber].childNodes[1].innerHTML;
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
  showDefaultDate();
  makeDefaultUl();
  showDefaultContainer();
};
textSubmit.addEventListener('click', addList);
