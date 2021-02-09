const menuButton = document.querySelector('.represent');

function showRestMenu() {
  const restMenu = document.querySelectorAll('.hide');
  if (menuButton.clicked) {
    menuButton.style.display = 'none';
    restMenu.style.display = 'block';
  }
}

menuButton.addEventListener('click', showRestMenu);
