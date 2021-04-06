/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable strict */

'use strict';

/* 상수 및 변수 모음 */
const varContainer = {
  dateStandard: new Date(),
  yearButton: document.querySelector('.year'),
  monthButton: document.querySelector('.month'),
  prevMonth: document.querySelector('.prev__month'),
  nextMonth: document.querySelector('.next__month'),
  closeButton: document.querySelectorAll('.close'),
  yearContainer: document.querySelector('.year-container'),
  monthContainer: document.querySelector('.month-selection'),
  textSubmit: document.querySelector('.text_submit'),
  deleteAllBtn: document.querySelector('.delete_all'),
  todoPrevDate: document.querySelector('.todo__date .prev__date'),
  todoNextDate: document.querySelector('.todo__date .next__date'),
  startYear: document.querySelector('.start_year'),
  endYear: document.querySelector('.end_year'),
  decades: document.querySelector('.decades'),
  setTodayBtn: document.querySelector('.set-today')
};

const derivedVarContainer = {
  prevDecadeBtn: varContainer.yearContainer.querySelector('.prev__decade'),
  nextDecadeBtn: varContainer.yearContainer.querySelector('.next__decade'),
  currentYear: varContainer.dateStandard.getFullYear(),
  currentMonth: varContainer.dateStandard.getMonth()
};

varContainer.yearButton.textContent = derivedVarContainer.currentYear;
varContainer.monthButton.textContent = derivedVarContainer.currentMonth + 1;

/* 클래스 정의 */
class MakeList {
  constructor(element1, element2, element3, element4, element5) {
    this.element1 = element1;
    this.element2 = element2;
    this.element3 = element3;
    this.element4 = element4;
    this.element5 = element5;
  }

  checkFinished(event) {
    const parentElement = event.target.parentNode;
    const writtenText = parentElement.childNodes[1];
    writtenText.classList.toggle('item_checked');
  }

  deleteItem(event) {
    const todoDate = document.querySelector('.todo__date .this__date');
    const key = todoDate.innerText.replace(/\n/g, '');
    const parentElement = event.target.parentNode;
    const listContainer = parentElement.parentNode;
    listContainer.removeChild(parentElement);
    const newLists = Array.from(listContainer.childNodes).map(ele => ele.childNodes[1].innerText);
    localStorage.setItem(key, JSON.stringify(newLists));
  }

  makeUl() {
    const $ul = document.createElement(this.element1);
    $ul.classList.add(`todo__list__container`);
    return $ul;
  }

  getDate(event) {
    
  }

  listFormat() {
    const $li = document.createElement(this.element2);
    $li.classList.add('todo__container__contents');
    const $input = document.createElement(this.element3);
    $input.type = 'checkbox';
    $input.addEventListener('change', this.checkFinished);
    $input.classList.add('checkbox');
    const $p = document.createElement(this.element4);
    $p.classList.add('list__item');
    $p.textContent = `element type: ${this.element4}`;
    const $button = document.createElement(this.element5);
    $button.classList.add(`todo__container__${this.element5}`);
    $button.textContent = `element type: ${this.element5}`;
    $button.addEventListener('click', this.deleteItem);
    $li.appendChild($input);
    $li.appendChild($p);
    $li.appendChild($button);
    $ul.appendChild($li);
    return $ul;
  }
}

const testClass = new MakeList('ul', 'li', 'input', 'p', 'button');

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
  todoDate.textContent = `${varContainer.dateStandard.getFullYear()}.${varContainer.dateStandard.getMonth() + 1}.${varContainer.dateStandard.getDate()}`;
};

const defaultYearSelection = () => {
  const yearSelectors = document.querySelectorAll('.year-selection .selector');
  if (parseFloat(varContainer.dateStandard.getFullYear()) < parseFloat(yearSelectors[yearSelectors.length - 1].innerText)) {
    varContainer.startYear.innerText = yearSelectors[0].innerText;
    varContainer.endYear.innerText = yearSelectors[yearSelectors.length - 1].innerText;
  }
};

function openYearSelector() {
  varContainer.yearContainer.classList.add('active');
}

function openMonthSelector() {
  varContainer.monthContainer.classList.add('active');
}

function closeContainer() {
  varContainer.yearContainer.classList.remove('active');
  varContainer.monthContainer.classList.remove('active');
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

function deleteItem(event) {
  const todoDate = document.querySelector('.todo__date .this__date');
  const key = todoDate.innerText.replace(/\n/g, '');
  const parentElement = event.target.parentNode;
  const listContainer = parentElement.parentNode;
  listContainer.removeChild(parentElement);
  const newLists = Array.from(listContainer.childNodes).map(ele => ele.childNodes[1].innerText);
  localStorage.setItem(key, JSON.stringify(newLists));
}

function deleteAll() {
  const todoContainer = document.querySelector('.todo__container');
  const todoDate = document.querySelector('.todo__date .this__date');
  const key = todoDate.innerText.replace(/\n/g, '');
  localStorage.removeItem(key);
  todoContainer.innerHTML = '';
}

function checkFinished(event) {
  const parentElement = event.target.parentNode;
  const writtenText = parentElement.childNodes[1];
  writtenText.classList.toggle('item_checked');
}

function selectedDay(event) {
  const days = document.querySelectorAll('.day');
  days.forEach(dayBox => dayBox.classList.remove('highlight'));
  event.target.classList.add('highlight');
  if (event.target.classList.contains('today')) {
    days.forEach(dayBox => dayBox.classList.remove('highlight'));
  }
}

function showHasToDoLists() {
  const days = document.querySelectorAll('.day');
  const dateSets = Array.from(days).map(attribute => attribute.dataset.date);
  const havingLists = dateSets.filter(element => getLocalStorageKey().includes(element));
  days.forEach(dayBox => {
    if (havingLists.includes(dayBox.dataset.date)) {
      const $div = document.createElement('div');
      $div.classList.add('hasList');
      dayBox.appendChild($div);
    }
  });
}

function selectDecades() {
  const decadesArr = ['2000', '2010', '2020', '2030', '2040', '2050', '2060', '2070', '2080', '2090'];
  const yearSelectors = varContainer.yearContainer.querySelectorAll('.selector');
  varContainer.startYear.innerText = '2000';
  varContainer.endYear.innerText = '2099';
  yearSelectors.forEach((element, i) => {
    element.innerText = decadesArr[i];
  });
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
    $input.addEventListener('change', checkFinished);
    const $p = document.createElement('p');
    $p.classList.add('list__item');
    $p.textContent = selectedList[i];
    const $button = document.createElement('button');
    $button.classList.add('delete');
    $button.textContent = 'delete';
    $button.addEventListener('click', deleteItem);
    $li.appendChild($input);
    $li.appendChild($p);
    $li.appendChild($button);
    $ul.appendChild($li);
  }
  todoContainer.appendChild($ul);
}

function showPrevORNextList(dateValue) {
  const todoContainer = document.querySelector('.todo__container');
  const selectedDate = dateValue;
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
    $input.addEventListener('change', checkFinished);
    const $p = document.createElement('p');
    $p.classList.add('list__item');
    $p.textContent = selectedList[i];
    const $button = document.createElement('button');
    $button.classList.add('delete');
    $button.textContent = 'delete';
    $button.addEventListener('click', deleteItem);
    $li.appendChild($input);
    $li.appendChild($p);
    $li.appendChild($button);
    $ul.appendChild($li);
  }
  todoContainer.appendChild($ul);
}

const calendarGenerator = (year = derivedVarContainer.currentYear, month = derivedVarContainer.currentMonth) => {
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
      day.dataset.date = `${derivedVarContainer.currentYear}.${derivedVarContainer.currentMonth + 1}.${day.textContent}`;
      if (i - firstDay.getDay() + 1 === varContainer.dateStandard.getDate() &&
        year === varContainer.dateStandard.getFullYear() && month === varContainer.dateStandard.getMonth()) {
        day.classList.add('today');
      }
    }
    calendarDates.appendChild(day);
  }
  const days = document.querySelectorAll('.day');
  days.forEach(day => day.addEventListener('click', toDoCurrentDate));
  days.forEach(dayBox => dayBox.addEventListener('click', showSelectedList));
  days.forEach(dayBox => dayBox.addEventListener('click', selectedDay));
  showHasToDoLists();
};

function monthToPrev() {
  if (derivedVarContainer.currentMonth > 0) {
    varContainer.monthButton.textContent = parseFloat(varContainer.monthButton.textContent) - 1;
    --derivedVarContainer.currentMonth;
    calendarGenerator(derivedVarContainer.currentYear, derivedVarContainer.currentMonth);
  } else {
    varContainer.yearButton.textContent = parseFloat(varContainer.yearButton.textContent) - 1;
    varContainer.monthButton.textContent = 12;
    derivedVarContainer.currentMonth = 11;
    derivedVarContainer.currentYear = parseFloat(derivedVarContainer.currentYear) - 1;
    calendarGenerator(derivedVarContainer.currentYear, derivedVarContainer.currentMonth);
  }
}

function monthToNext() {
  if (derivedVarContainer.currentMonth < 11) {
    varContainer.monthButton.textContent = parseFloat(varContainer.monthButton.textContent) + 1;
    ++derivedVarContainer.currentMonth;
    calendarGenerator(derivedVarContainer.currentYear, derivedVarContainer.currentMonth);
  } else {
    varContainer.yearButton.textContent = parseFloat(varContainer.yearButton.textContent) + 1;
    varContainer.monthButton.textContent = 1;
    derivedVarContainer.currentMonth = 0;
    derivedVarContainer.currentYear = parseFloat(derivedVarContainer.currentYear) + 1;
    calendarGenerator(derivedVarContainer.currentYear, derivedVarContainer.currentMonth);
  }
}

const selectYear = () => {
  const selectors = varContainer.yearContainer.querySelectorAll('.selector');
  const decadesArr = ['2000', '2010', '2020', '2030', '2040', '2050', '2060', '2070', '2080', '2090'];
  function compareArrays(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  function yearChanger(event) {
    const selectorsTextArray = Array.from(selectors).map(element => element.innerText);
    if (compareArrays(selectorsTextArray, decadesArr)) return;
    derivedVarContainer.currentYear = parseFloat(event.target.textContent);
    calendarGenerator(derivedVarContainer.currentYear, derivedVarContainer.currentMonth);
    varContainer.yearButton.textContent = event.target.textContent;
    varContainer.yearContainer.classList.remove('active');
  }
  function decadeSelector(event) {
    if (decadesArr.includes(event.target.innerText)) {
      varContainer.startYear.innerText = event.target.innerText;
      varContainer.endYear.innerText = parseFloat(varContainer.startYear.innerText) + 9;
      selectors.forEach((element, i) => {element.innerText = parseFloat(event.target.innerText) + i});
    }
  }
  selectors.forEach(button => button.addEventListener('click', yearChanger));
  selectors.forEach(button => button.addEventListener('click', decadeSelector));
};

const selectMonth = () => {
  const selectors = varContainer.monthContainer.querySelectorAll('.selector');
  function monthChanger(event) {
    derivedVarContainer.currentMonth = parseFloat(event.target.textContent) - 1;
    calendarGenerator(derivedVarContainer.currentYear, derivedVarContainer.currentMonth);
    varContainer.monthButton.textContent = event.target.textContent;
    varContainer.monthContainer.classList.remove('active');
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
      $input.addEventListener('change', checkFinished);
      const $li = document.createElement('li');
      $li.classList.add('todo__list__contents');
      const $p = document.createElement('p');
      $p.classList.add('list__item');
      $p.textContent = defaultContents[i];
      const $button = document.createElement('button');
      $button.classList.add('delete');
      $button.textContent = 'delete';
      $button.addEventListener('click', deleteItem);
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
  $input.addEventListener('change', checkFinished);
  const $li = document.createElement('li');
  $li.classList.add('todo__list__contents');
  const $p = document.createElement('p');
  $p.classList.add('list__item');
  $p.textContent = textInput.value;
  const $button = document.createElement('button');
  $button.classList.add('delete');
  $button.textContent = 'delete';
  $button.addEventListener('click', deleteItem);
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

function toPrevDate() {
  const days = document.querySelectorAll('.day');
  const dateSets = Array.from(days).map(attribute => attribute.dataset.date);
  const todoDate = document.querySelector('.todo__date .this__date');
  const selectedDate = document.querySelector(`.day[data-date='${dateSets[dateSets.indexOf(todoDate.innerText) - 1]}']`);
  todoDate.innerText = dateSets[dateSets.indexOf(todoDate.innerText) - 1];
  showPrevORNextList(selectedDate.dataset.date);
  days.forEach(dayBox => dayBox.classList.remove('highlight'));
  selectedDate.classList.add('highlight');
  if (selectedDate.classList.contains('today')) {
    days.forEach(dayBox => dayBox.classList.remove('highlight'));
  }
}

function toNextDate() {
  const days = document.querySelectorAll('.day');
  const dateSets = Array.from(days).map(attribute => attribute.dataset.date);
  const todoDate = document.querySelector('.todo__date .this__date');
  const selectedDate = document.querySelector(`.day[data-date='${dateSets[dateSets.indexOf(todoDate.innerText) + 1]}']`);
  todoDate.innerText = dateSets[dateSets.indexOf(todoDate.innerText) + 1];
  showPrevORNextList(selectedDate.dataset.date);
  days.forEach(dayBox => dayBox.classList.remove('highlight'));
  selectedDate.classList.add('highlight');
  if (selectedDate.classList.contains('today')) {
    days.forEach(dayBox => dayBox.classList.remove('highlight'));
  }
}

function setToday() {
  const todayValue = `${varContainer.dateStandard.getFullYear()}.${varContainer.dateStandard.getMonth()}.${varContainer.dateStandard.getDate()}`;
  const yearSelectors = varContainer.yearContainer.querySelectorAll('.selector');
  derivedVarContainer.currentYear = varContainer.dateStandard.getFullYear();
  varContainer.yearButton.textContent = varContainer.dateStandard.getFullYear();
  varContainer.yearContainer.classList.remove('active');
  calendarGenerator(derivedVarContainer.currentYear, derivedVarContainer.currentMonth);
  showPrevORNextList(todayValue);
  varContainer.startYear.innerText = '2020';
  varContainer.endYear.innerText = '2029';
  yearSelectors.forEach((selectors, i) => {
    selectors.innerText = parseFloat(varContainer.startYear.innerText) + i;
  });
}

function toPrevDecade() {
  const yearSelectors = varContainer.yearContainer.querySelectorAll('.selector');
  varContainer.startYear.innerText = parseFloat(varContainer.startYear.innerText) - 10;
  varContainer.endYear.innerText = parseFloat(varContainer.endYear.innerText) - 10;
  yearSelectors.forEach(selectors => {
    selectors.innerText = parseFloat(selectors.innerText) - 10;
  });
}

function toNextDecade() {
  const yearSelectors = varContainer.yearContainer.querySelectorAll('.selector');
  varContainer.startYear.innerText = parseFloat(varContainer.startYear.innerText) + 10;
  varContainer.endYear.innerText = parseFloat(varContainer.endYear.innerText) + 10;
  yearSelectors.forEach(selectors => {
    selectors.innerText = parseFloat(selectors.innerText) + 10;
  });
}

/* 선언 모음 */

calendarGenerator();
selectYear();
selectMonth();
closeContainer();
defaultYearSelection();
varContainer.prevMonth.addEventListener('click', monthToPrev);
varContainer.nextMonth.addEventListener('click', monthToNext);
varContainer.yearButton.addEventListener('click', openYearSelector);
varContainer.monthButton.addEventListener('click', openMonthSelector);
varContainer.closeButton.forEach(button => button.addEventListener('click', closeContainer));
varContainer.textSubmit.addEventListener('click', addList);
window.onload = () => {
  defaultDate();
  defaultUI();
};
window.addEventListener('keydown', enterList);
varContainer.deleteAllBtn.addEventListener('click', deleteAll);
varContainer.todoPrevDate.addEventListener('click', toPrevDate);
varContainer.todoNextDate.addEventListener('click', toNextDate);
varContainer.decades.addEventListener('click', selectDecades);
varContainer.setTodayBtn.addEventListener('click', setToday);
derivedVarContainer.prevDecadeBtn.addEventListener('click', toPrevDecade);
derivedVarContainer.nextDecadeBtn.addEventListener('click', toNextDecade);
