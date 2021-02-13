const trigger = document.querySelector('.mobile-menu');

function toggleMenu(e) {
  const hiddenOne = document.querySelector('.nav-menu');
  if (hiddenOne.classList.contains('active')) {
    hiddenOne.classList.remove('active');
  } else {
    hiddenOne.classList.add('active');
  }
}

function toggleMenu2(e) {
  const hiddenTwo = document.querySelector('.icon-container');
  if (hiddenTwo.classList.contains('active')) {
    hiddenTwo.classList.remove('active');
  } else {
    hiddenTwo.classList.add('active');
  }
}

trigger.addEventListener('click', toggleMenu);
trigger.addEventListener('click', toggleMenu2);