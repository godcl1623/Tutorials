const openPopup = function () {
  const popup = 'popup.html';
  window.open(popup, 'window', 'width=400, height=400, left=600, top=50');
};

const button = document.querySelector('button');

button.addEventListener('click', openPopup);
