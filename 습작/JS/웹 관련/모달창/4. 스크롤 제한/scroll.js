const button = document.querySelector('button');
const layer = document.querySelector('.modal-layer');

const openModal = () => {
  layer.classList.add('active');
  document.querySelector('.modal-window').classList.add('active');
  document.querySelector('html').classList.add('hide-scroll');
  document.body.classList.add('hide-scroll');
};

const closeModal = () => {
  layer.classList.remove('active');
  document.querySelector('.modal-window').classList.remove('active');
  document.body.classList.remove('hide-scroll');
  document.querySelector('html').classList.remove('hide-scroll');
};

button.addEventListener('click', openModal);
layer.addEventListener('click', closeModal);

// document.getElementsByTagName('button')[0].addEventListener('click', function() {
// 	document.getElementById('popup').style.display = 'block';
// });
