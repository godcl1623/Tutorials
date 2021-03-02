const progressFilled = document.querySelector('.progressive-filled');
const html = document.querySelector('html');
const htmlHeight = html.scrollHeight - html.clientHeight;

const progress = () => {
  const scrollPercent = (html.scrollTop / htmlHeight) * 100;
  progressFilled.style.width = `${scrollPercent}%`;
};

window.addEventListener('scroll', progress);
