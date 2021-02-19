const opener = function () {
  const popup = 'popup.html';
  window.open(popup, '팝업창', 'width=300,height=200,left=1000,top=500');
};

const button = document.querySelector('button');
button.addEventListener('click', opener);
