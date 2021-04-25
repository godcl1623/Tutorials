// 상수 모음
const orders = document.querySelectorAll('.order');
const images = document.querySelectorAll('img');
const imgArray = Array.from(images);
const buttons = document.querySelectorAll('button');
const containers = document.querySelectorAll('.container');
let orderIndex = 0;
// 함수 모음
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
    const $span = document.createElement('span');
    $span.classList.add('imgOrder');
    $div.appendChild($span);
  }
  body.appendChild($div);
  const radios = Array.from($div.childNodes);
  dataIndexer(radios);
};

const putProgress = () => {
  containers.forEach(element => {
    const $progress = document.createElement('progress');
    $progress.value = 0;
    $progress.max = 40;
    $progress.classList.add('progress-bar');
    // const $filler = document.createElement('div');
    // $filler.classList.add('progress-filler');
    // $progress.appendChild($filler);
    element.appendChild($progress);
  });
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

const fillProgress = () => {
  // const date = new Date();
  const progress = document.querySelector('progress');
  let cnt = 0;
  setInterval(() => {
    progress.value = cnt;
    cnt++;
  }, 100);
};

const autoImgChanger = () => {
  setInterval(() => {
    plusIndex();
    hideContainer();
    showCurrentOrder();
  }, 5000);
};

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
// putProgress();
hideContainer();
orderIndexer();
showCurrentOrder();
buttons.forEach(button => button.addEventListener('click', moveImage));
// autoImgChanger();
// fillProgress();
