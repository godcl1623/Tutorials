const list1 = document.querySelector('.menu1');
const list2 = document.querySelector('.menu2');
const list3 = document.querySelector('.menu3');

const sub1 = document.querySelector('.sub1');
const sub2 = document.querySelector('.sub2');
const sub3 = document.querySelector('.sub3');

const modalOpen = document.getElementById('modal-opener');
const modalLayer = document.querySelector('.modal-layer');
const modalContents = document.querySelector('.modal-contents');
const modalIframe = document.querySelector('.modal-iframe');
const modalClose = document.getElementById('modal-close');

const popup = 'iframe-review.html';
const popupOpen = document.getElementById('popup-opener');
const iframeOpen = document.getElementById('iframe-opener');

const opener1 = function () {
  sub1.classList.toggle('active');
};

const opener2 = function () {
  sub2.classList.toggle('active');
};

const opener3 = function () {
  sub3.classList.toggle('active');
};

const modalActive = function () {
  modalLayer.style.display = 'block';
  modalContents.style.display = 'block';
};

window.modalCloser = function () {
  modalLayer.style.display = 'none';
  modalContents.style.display = 'none';
  modalIframe.style.display = 'none';
};

const popupOpener = function () {
  window.open(popup, 'popup', 'width=300, height=400, left=2000');
};

const iframeOpener = function () {
  modalLayer.style.display = 'block';
  modalIframe.style.display = 'block';
};

list1.addEventListener('click', opener1);
list2.addEventListener('click', opener2);
list3.addEventListener('click', opener3);
modalOpen.addEventListener('click', modalActive);
modalLayer.addEventListener('click', window.modalCloser);
modalClose.addEventListener('click', window.modalCloser);
popupOpen.addEventListener('click', popupOpener);
iframeOpen.addEventListener('click', iframeOpener);
