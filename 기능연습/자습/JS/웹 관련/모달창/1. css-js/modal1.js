const opener = document.querySelector('.modal-open');
const layer = document.querySelector('.modal-layer');
const modal = document.querySelector('.modal-window');
const close = document.querySelector('.modal-close');

const openModal = function () {
  modal.classList.toggle('active');
  layer.classList.toggle('active');
}

const closeModal = function () {
  if (modal.classList.contains('active') && layer.classList.contains('active')) {
    modal.classList.remove('active');
    layer.classList.remove('active');
  } else {
    modal.classList.add('active');
    layer.classList.add('active');
  }
}

opener.addEventListener('click', openModal);

layer.addEventListener('click', closeModal);
close.addEventListener('click', closeModal);