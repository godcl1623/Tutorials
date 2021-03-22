const calBody = document.querySelector('.calendar__weeks');
const span = calBody.querySelectorAll('span');
const currentDate = new Date();
const dateStandard = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let pageFirst = dateStandard;
let pageYear;
if (dateStandard.getFullYear() % 4 === 0) {
  pageYear = leapYear;
} else {
  pageYear = notLeapYear;
}
const test = () => {
  span.forEach(html => {html.innerText = '1'});
};

const displayCalendar = () => {
  let cnt = 1;
  for (let i = 0; i < 31; i++) {
    for (let j = 0; j < 31; j++) {
      span.forEach(html => {html.innerText = j});
      j++;
    }
  }
};

displayCalendar();
