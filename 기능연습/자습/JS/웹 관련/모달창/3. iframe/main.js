const modalLayer = document.querySelector('div');
const iframe = document.querySelector('iframe');

document.querySelector('button').addEventListener('click', () => {
  modalLayer.style.display = 'block';
  iframe.style.display = 'block';
});

window.modalCloser = function (e) {
  modalLayer.style.display = 'none';
  iframe.style.display = 'none';
  console.log(e);
};

modalLayer.addEventListener('click', modalCloser);
