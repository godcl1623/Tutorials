let countdown;
const timeDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function displayTimeLeft(time) {
  const minuteLeft = Math.floor(time / 60);
  const minuteDisplay = minuteLeft < 10 ? `0${minuteLeft}` : minuteLeft;
  const secondsLeft = time % 60;
  const secondsDisplay = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
  const timeLeft = `${minuteDisplay}:${secondsDisplay}`;
  document.title = timeLeft;
  timeDisplay.textContent = timeLeft;
}

function displayEndTime(timestamp) {
  const endPoint = new Date(timestamp);
  const endHour = endPoint.getHours();
  const hourDisplay = endHour < 10 ? `0${endHour}` : endHour;
  const endMin = endPoint.getMinutes();
  // const endHourTwelve = endHour > 12 ? endHour - 12 : endHour;
  // const twelveDisplay = endHourTwelve < 10 ? `0${endHourTwelve}` : endHourTwelve;
  const minDisplay = endMin < 10 ? `0${endMin}` : endMin;
  endDisplay.textContent = `Timer Ends At ${hourDisplay}:${minDisplay}`;
}

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function startsTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startsTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
