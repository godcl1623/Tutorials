// 상수 모음
const orders = document.querySelectorAll('.order');
const images = document.querySelectorAll('img');
const imgArray = Array.from(images);
const buttons = document.querySelectorAll('button');
let orderIndex = 0;
// 함수 모음
const hideContainer = () => {
  const containers = document.querySelectorAll('.container');
  Array.from(containers).forEach(container => {
    if (container.dataset.index === String(orderIndex + 1)) {
      container.classList.remove('hide');
    } else {
      container.classList.add('hide');
    }
  });
};

const orderIndexer = () => {
  Array.from(orders).forEach((order, i) => {
    order.innerText = `${i + 1} / ${orders.length}`;
  });
};

function minusIndex() {
  if (orderIndex === 0) {
    orderIndex = imgArray.length;
  }
  orderIndex--;
}

function plusIndex() {
  if (orderIndex === imgArray.length - 1) {
    orderIndex = -1;
  }
  orderIndex++;
}

function moveImage() {
  if (this.className === 'prev') {
    minusIndex();
    hideContainer();
  } else {
    plusIndex();
    hideContainer();
  }
}
// 이벤트 리스너 모음
hideContainer();
orderIndexer();
buttons.forEach(button => button.addEventListener('click', moveImage));
