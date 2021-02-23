// ==========html 요소 상수 정의==========
const mainLists = document.querySelectorAll('.menu-contents');
  // ===== modal 요소 정의 =====
const modalLayer = document.querySelector('.modal-layer');
const modalContents = document.querySelector('.modal-contents');
const popup = 'iframe-review.html';
const modalIframe = document.querySelector('.modal-iframe');
  // ===== modal 기능 정의 =====
const modalOpen = document.getElementById('modal-opener');
const modalClose = document.getElementById('modal-close');
const popupOpen = document.getElementById('popup-opener');
const iframeOpen = document.getElementById('iframe-opener');

// ========== 함수 모음 ==========
const menuOpener = function () {
  const sub = document.querySelector(`.sub${this.dataset.code}`);
  sub.classList.toggle('active');
};
  // =====모달 열기=====
const modalActive = function () {
  modalLayer.style.display = 'block';
  modalContents.style.display = 'block';
};
  // =====팝업 열기=====
const popupOpener = function () {
  window.open(popup, 'popup', 'width=300, height=400, left=2000');
};
  // =====iframe 열기=====
const iframeOpener = function () {
  modalLayer.style.display = 'block';
  modalIframe.style.display = 'block';
};
  // =====항목 닫기=====
window.modalCloser = function () {
  modalLayer.style.display = 'none';
  modalContents.style.display = 'none';
  modalIframe.style.display = 'none';
};

// ========== 이벤트 리스너 모음 ==========
mainLists.forEach(menu => menu.addEventListener('click', menuOpener));
modalOpen.addEventListener('click', modalActive);
modalLayer.addEventListener('click', window.modalCloser);
modalClose.addEventListener('click', window.modalCloser);
popupOpen.addEventListener('click', popupOpener);
iframeOpen.addEventListener('click', iframeOpener);
