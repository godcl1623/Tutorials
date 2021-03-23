/* eslint-disable strict */
/* eslint-disable prettier/prettier */

'use strict';

const calendar = document.querySelector('.calendar');

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const currDate = new Date();
const currMonth = {value: currDate.getMonth()};
const currYear = {value: currDate.getFullYear()};

const isLeapYear = year => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0);
};

const getFebDays = year => {
    return isLeapYear(year) ? 29 : 28;
};

const generateCalendar = (month = currDate.getMonth(), year = currDate.getFullYear()) => {

    const calendarDays = calendar.querySelector('.calendar-days');

    const daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    calendarDays.innerHTML = '';

    // get first day of month
    
    const firstDay = new Date(year, month, 1);

    for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
        const day = document.createElement('div');
        if (i >= firstDay.getDay()) {
            day.classList.add('calendar-day-hover');
            day.innerHTML = i - firstDay.getDay() + 1;
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`;
            if (i - firstDay.getDay() + 1 === currDate.getDate() && 
            year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date');
            }
        }
    calendarDays.appendChild(day);
    }
};

const monthList = calendar.querySelector('.month-list');

monthNames.forEach((e, index) => {
    const month = document.createElement('div');
    month.innerHTML = `<div data-month="${index}">${e}</div>`;
    month.querySelector('div').onclick = () => {
        monthList.classList.remove('show');
        currMonth.value = index;
        generateCalendar(index, currYear.value);
    };
    monthList.appendChild(month);
});

const openMPicker = (month, year) => {
    const calendarHeaderYear = calendar.querySelector('#year');
    const monthPicker = calendar.querySelector('#month-picker');
    const currMonth = `${monthNames[month]}`;
    monthPicker.innerHTML = currMonth;
    calendarHeaderYear.innerHTML = year;
    monthPicker.onclick = () => {
        monthList.classList.add('show');
    };
};

generateCalendar();
openMPicker(currMonth.value, currYear.value);

// 이벤트 리스너로 변경
document.querySelector('#prev-year').onclick = () => {
    --currYear.value;
    generateCalendar(currMonth.value, currYear.value);
    openMPicker(currMonth.value, currYear.value);
};
// 이벤트 리스너로 변경
document.querySelector('#next-year').onclick = () => {
    ++currYear.value;
    generateCalendar(currMonth.value, currYear.value);
    openMPicker(currMonth.value, currYear.value);
};

const darkModeToggle = document.querySelector('.dark-mode-switch');

darkModeToggle.onclick = () => {
    document.querySelector('body').classList.toggle('light');
    document.querySelector('body').classList.toggle('dark');
};
