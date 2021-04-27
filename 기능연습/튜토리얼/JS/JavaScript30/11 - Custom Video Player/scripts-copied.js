// 1. 요소 받기
const player = document.querySelector('.player');
const video = document.querySelector('video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playBtn = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const buttons = document.querySelectorAll('.player__button');
let isClicked = false;
// 2. 함수 만들기
function playVid(event) {
  if (event.target !== video && event.target !== playBtn) return;
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function btnChanger() {
  video.paused ? playBtn.textContent = '►' : playBtn.textContent = '❚ ❚';
}

function skipVid() {
  if (this.classList.contains('full') || this.classList.contains('toggle')) return;
  video.currentTime += parseFloat(this.dataset.skip);
}

function changeValue() {
  video[this.name] = this.value;
}

function showProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function changeProgress(event) {
  // if (!isClicked) return;
  const changedTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = changedTime;
}
// 3. 이벤트 리스너
player.addEventListener('click', playVid);
player.addEventListener('click', btnChanger);
buttons.forEach(button => button.addEventListener('click', skipVid));
ranges.forEach(range => range.addEventListener('change', changeValue));
ranges.forEach(range => range.addEventListener('mousemove', changeValue));
video.addEventListener('timeupdate', showProgress);
progress.addEventListener('click', changeProgress);
progress.addEventListener('mousemove', event => {isClicked && changeProgress(event)});
progress.addEventListener('mousedown', () => isClicked = true);
progress.addEventListener('mouseup', () => isClicked = false);
