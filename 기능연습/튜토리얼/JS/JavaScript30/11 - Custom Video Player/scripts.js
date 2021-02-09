// 1. 요소 받기
  const player = document.querySelector('.player');
  const video = document.querySelector('video');
  const progress = document.querySelector('.progress');
  const progressBar = document.querySelector('.progress__filled');
  const playButton = document.querySelector('.toggle');
  const ranges = document.querySelectorAll('input');
  const skips = document.querySelectorAll('[data-skip]');
// 2. 함수 만들기
function handlePlay() {
  const playHandler = video.paused ? 'play' : 'pause';
  video[playHandler]();
}

function updateButton() {
  playButton.textContent = this.paused ? '►' : '❚❚';
}

function videoSkip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
// 3. 이벤트 리스너
video.addEventListener('click', handlePlay);
playButton.addEventListener('click', handlePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skips.forEach(skip => skip.addEventListener('click', videoSkip));

ranges.forEach(input => input.addEventListener('change', handleRange));
ranges.forEach(input => input.addEventListener('mousemove', handleRange));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);