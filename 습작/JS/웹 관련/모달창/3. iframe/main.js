const modalLayer = document.querySelector('div');
const iframe = document.querySelector('iframe');

document.querySelector('button').addEventListener('click', () => {
  modalLayer.style.display = 'block';
  iframe.style.display = 'block';
});

window.modalCloser = function () {
  modalLayer.style.display = 'none';
  iframe.style.display = 'none';
};

modalLayer.addEventListener('click', modalCloser);
