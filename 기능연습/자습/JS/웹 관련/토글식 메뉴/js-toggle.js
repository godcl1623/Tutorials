const trigger = document.querySelector('.mobile-menu');

function toggleMenu(e) {
  const hiddenOne = document.querySelector('.nav-menu');
  if (hiddenOne.classList.contains('hidden')) {
    hiddenOne.classList.remove('hidden');
  } else {
    hiddenOne.classList.add('hidden');
  }
}

trigger.addEventListener('click', toggleMenu);