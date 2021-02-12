// 1. 요소 받아옴
const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressBar = document.querySelector('.progress');
const progressFill = document.querySelector('.progress__filled');
const playButton = document.querySelector('.toggle');
const inputRange = document.querySelectorAll('.player__slider');
const skips = document.querySelectorAll('[data-skip]');
// 2. 함수 작성
function playVideo() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function buttonUpdate() {
  playButton.textContent = this.paused ? '►' : '❚❚';
}

function videoSkip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeInput() {
  video[this.name] = this.value;
}

function progressHandle() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFill.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
// 3. 이벤트 리스너 작성
video.addEventListener('click', playVideo);
playButton.addEventListener('click', playVideo);

video.addEventListener('play', buttonUpdate);
video.addEventListener('pause', buttonUpdate);

skips.forEach(skipButton => skipButton.addEventListener('click', videoSkip));

inputRange.forEach(range => range.addEventListener('change', rangeInput));
inputRange.forEach(range => range.addEventListener('mousemove', rangeInput));

video.addEventListener('timeupdate', progressHandle);

let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);