// 상수 모음
const orders = document.querySelectorAll('.order');
const images = document.querySelectorAll('img');
const imgArray = Array.from(images);
const buttons = document.querySelectorAll('button');
const containers = document.querySelectorAll('.container');
let orderIndex = 0;
// 함수 모음
const dataIndexer = target => {
  Array.from(target).forEach((element, i) => {
    element.dataset.index = i + 1;
  });
};

const putRadioBtns = () => {
  const body = document.querySelector('body');
  const $div = document.createElement('div');
  for (let i = 0; i < images.length; i++) {
    $div.classList.add('radioContainer');
    const $input = document.createElement('input');
    $input.type = 'radio';
    $input.classList.add('imgOrder');
    $div.appendChild($input);
  }
  body.appendChild($div);
  const radios = Array.from($div.childNodes);
  dataIndexer(radios);
};

const hideContainer = () => {
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

const showCurrentOrder = () => {
  const radios = document.querySelectorAll('input');
  radios.forEach(element => {
    element.dataset.index === String(orderIndex + 1)
      ? (element.checked = true)
      : (element.checked = false);
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
    showCurrentOrder();
  } else {
    plusIndex();
    hideContainer();
    showCurrentOrder();
  }
}
// 이벤트 리스너 모음
dataIndexer(containers);
putRadioBtns();
hideContainer();
orderIndexer();
showCurrentOrder();
buttons.forEach(button => button.addEventListener('click', moveImage));
