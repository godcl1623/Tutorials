const menuButton = document.querySelector('button');

function showRestMenu(e) {
  const ul = document.querySelector('ul');
  menuButton.classList.toggle('move');
  ul.classList.toggle('active');
  console.log(e);
}

menuButton.addEventListener('click', showRestMenu);

const litest = document.querySelectorAll('ul.test li');

function testfunction(e) {
  this.classList.add('active');
  console.log(e);
}

litest.forEach(li => li.addEventListener('click', testfunction));