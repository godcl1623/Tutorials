/* eslint-disable strict */

'use strict';

/* 상수 및 변수 모음 */

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

/* 호출용 함수 모음 - 기본적으로 const - function 순 */

const isLeapYear = year => {
  return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
};
const febLastDay = year => {
  return isLeapYear(year) ? 29 : 28;
};

function toDoCurrentDate(e) {
  const todoDate = document.querySelector('.todo__date .this__date');
  todoDate.textContent = e.target.dataset.date;
}

const defaultDate = () => {
  const todoDate = document.querySelector('.todo__date .this__date');
  todoDate.textContent = `${dateStandard.getFullYear()}.${dateStandard.getMonth() + 1}.${dateStandard.getDate()}`;
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

function addLocalStorage(input) {
  const todoDate = document.querySelector('.todo__date .this__date');
  const key = todoDate.innerText.replace(/\n/g, '');
  const valueContainer = JSON.parse(localStorage.getItem(key)) || [];
  valueContainer.push(input);
  localStorage.setItem(key, JSON.stringify(valueContainer));
}

function getLocalStorageKey() {
  const days = document.querySelectorAll('.day');
  const dateValues = Array.from(days).filter(attribute => attribute.dataset.date);
  const valueMap = dateValues.map(element => element.dataset.date);
  const storageKeys = Object.keys(localStorage);
  const matchingKeys = valueMap.filter(values => storageKeys.includes(values));
  return matchingKeys;
}

function deleteList() {
  const todoDate = document.querySelector('.todo__date .this__date');
  const key = todoDate.innerText.replace(/\n/g, '');
  const currentKey = getLocalStorageKey().find(element => element === key);
  const currentValueSet = localStorage.getItem(currentKey);
  console.log(currentValueSet);
  // return test;
}

/* 주요기능 모음 */

function showSelectedList(event) {
  const todoContainer = document.querySelector('.todo__container');
  const selectedDate = event.target.dataset.date;
  const selectedList = JSON.parse(localStorage.getItem(selectedDate));
  todoContainer.innerHTML = '';
  const $ul = document.createElement('ul');
  $ul.classList.add('.todo__list__container');
  if (!Object.keys(localStorage).includes(selectedDate)) return;
  for (let i = 0; i < selectedList.length; i++) {
    const $li = document.createElement('li');
    $li.classList.add('todo__list__contents');
    const $input = document.createElement('input');
    $input.type = 'checkbox';
    $input.classList.add('checkbox');
    $input.addEventListener('change', () => {console.log('changed')});
    const $p = document.createElement('p');
    $p.classList.add('list__item');
    $p.textContent = selectedList[i];
    const $button = document.createElement('button');
    $button.classList.add('delete');
    $button.textContent = 'delete';
    $button.addEventListener('click', deleteList);
    $li.appendChild($input);
    $li.appendChild($p);
    $li.appendChild($button);
    $ul.appendChild($li);
  }
  todoContainer.appendChild($ul);
}

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
  const days = document.querySelectorAll('.day');
  days.forEach(day => day.addEventListener('click', toDoCurrentDate));
  days.forEach(dayBox => dayBox.addEventListener('click', showSelectedList));
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

const defaultUI = () => {
  if (localStorage.length !== 0) {
    const todoDate = document.querySelector('.todo__date .this__date');
    const key = todoDate.innerText.replace(/\n/g, '');
    const todoContainer = document.querySelector('.todo__container');
    const todayList = getLocalStorageKey().find(dateValue => dateValue === key);
    const defaultContents = JSON.parse(localStorage.getItem(todayList));
    const $ul = document.createElement('ul');
    $ul.classList.add('.todo__list__container');
    for (let i = 0; i < defaultContents.length; i++) {
      const $input = document.createElement('input');
      $input.type = 'checkbox';
      $input.classList.add('checkbox');
      $input.addEventListener('change', () => {console.log('changed')});
      const $li = document.createElement('li');
      $li.classList.add('todo__list__contents');
      const $p = document.createElement('p');
      $p.classList.add('list__item');
      $p.textContent = defaultContents[i];
      const $button = document.createElement('button');
      $button.classList.add('delete');
      $button.textContent = 'delete';
      $button.addEventListener('click', deleteList);
      $li.appendChild($input);
      $li.appendChild($p);
      $li.appendChild($button);
      $ul.appendChild($li);
    }
    todoContainer.appendChild($ul);
  }
};

function addList() {
  const todoContainer = document.querySelector('.todo__container');
  const textInput = document.querySelector('.text_input');
  const $ul = document.createElement('ul');
  $ul.classList.add('.todo__list__container');
  const $input = document.createElement('input');
  $input.type = 'checkbox';
  $input.classList.add('checkbox');
  $input.addEventListener('change', () => {console.log('changed')});
  const $li = document.createElement('li');
  $li.classList.add('todo__list__contents');
  const $p = document.createElement('p');
  $p.classList.add('list__item');
  $p.textContent = textInput.value;
  const $button = document.createElement('button');
  $button.classList.add('delete');
  $button.textContent = 'delete';
  $button.addEventListener('click', deleteList);
  $li.appendChild($input);
  $li.appendChild($p);
  $li.appendChild($button);
  $ul.appendChild($li);
  todoContainer.appendChild($ul);
  addLocalStorage(textInput.value);
  textInput.value = '';
}

function enterList(e) {
  if (e.keyCode === 13) {
    addList();
  }
}

/* 선언 모음 */

calendarGenerator();
selectYear();
selectMonth();
closeContainer();
prevMonth.addEventListener('click', monthToPrev);
nextMonth.addEventListener('click', monthToNext);
yearButton.addEventListener('click', openYearSelector);
monthButton.addEventListener('click', openMonthSelector);
closeButton.forEach(button => button.addEventListener('click', closeContainer));
textSubmit.addEventListener('click', addList);
window.onload = () => {
  defaultDate();
  defaultUI();
};
window.addEventListener('keydown', enterList);
