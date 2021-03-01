const progressFilled = document.querySelector('.progressive-filled');
const progressMargin = parseFloat(window.getComputedStyle(progressFilled).marginRight.split('p').find(item => item.includes('1092')));
const htmlHeight = document.querySelector('html').scrollHeight;

const progress = () => {
  const scrollDiff = htmlHeight - (window.pageYOffset + window.innerHeight);
  const scrollPercent = (scrollDiff / htmlHeight) * 100;
  if (window.pageYOffset < window.innerHeight) {
    progressFilled.style.display = 'none';
  } else {
    progressFilled.style.display = 'block';
    progressFilled.style.marginRight = `${scrollPercent}%`;
  }
  // console.log(scrollPercent + 7.73);
};

window.addEventListener('scroll', progress);
