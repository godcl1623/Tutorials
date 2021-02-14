const trigger = document.querySelector('.mobile-menu');
const hiddenOne = document.querySelector('.nav-menu');
const hiddenTwo = document.querySelector('.icon-container');

trigger.addEventListener('click', () => {
  hiddenOne.classList.toggle('active');
  hiddenTwo.classList.toggle('active');
})