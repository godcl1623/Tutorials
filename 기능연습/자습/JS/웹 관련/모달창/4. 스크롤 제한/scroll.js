const button = document.querySelector('button');
const layer = document.querySelector('.modal-layer');

const openModal = () => {
  layer.classList.add('active');
  document.querySelector('.modal-window').classList.add('active');
};

const closeModal = () => {
  layer.classList.remove('active');
  document.querySelector('.modal-window').classList.remove('active');
};

button.addEventListener('click', openModal);
layer.addEventListener('click', closeModal);
