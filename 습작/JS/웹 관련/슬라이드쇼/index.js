// 상수 모음
function generatedElem() {
  const radios = document.querySelectorAll('.imgOrder');
  return radios;
}

const body = document.querySelector('body');
const orders = document.querySelectorAll('.order');
const images = document.querySelectorAll('.display');
const imgArray = Array.from(images);
const buttons = document.querySelectorAll('button');
const containers = document.querySelectorAll('.container');
const thumbnails = document.querySelectorAll('.thumb-nail img');
const thumbContainer = document.querySelector('.thumb-container');
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
  dataIndexer(thumbnails);
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

const showCurrentOrder = iterable => {
  iterable.forEach(element => {
    element.dataset.index === String(orderIndex + 1)
      ? element.classList.add('current')
      : element.classList.remove('current');
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
    // showCurrentOrder(generatedElem());
    showCurrentOrder(thumbnails);
  }, 3000);
};

function moveImage() {
  if (this.className === 'prev') {
    minusIndex();
    hideContainer();
    // showCurrentOrder(generatedElem());
    showCurrentOrder(thumbnails);
  } else {
    plusIndex();
    hideContainer();
    // showCurrentOrder(generatedElem());
    showCurrentOrder(thumbnails);
  }
}

function makeCurrent(event, iterable) {
  iterable.forEach(elem => {
    elem === event.target
      ? elem.classList.add('current')
      : elem.classList.remove('current');
  });
}

function displayByBtns(event) {
  if (
    event.target.tagName !== 'SPAN' &&
    !event.target.parentNode.classList.contains('thumb-nail')
  )
    return;
  containers.forEach(container => {
    event.target.dataset.index === container.dataset.index
      ? container.classList.remove('hide')
      : container.classList.add('hide');
  });
  makeCurrent(event, generatedElem());
  makeCurrent(event, thumbnails);
}

// 이벤트 리스너 모음
dataIndexer(containers);
putRadioBtns();
// putProgress();
hideContainer();
orderIndexer();
// showCurrentOrder(generatedElem());
showCurrentOrder(thumbnails);
buttons.forEach(button => button.addEventListener('click', moveImage));
// autoImgChanger();
// fillProgress();
body.addEventListener('click', displayByBtns);
thumbContainer.addEventListener('click', displayByBtns);
