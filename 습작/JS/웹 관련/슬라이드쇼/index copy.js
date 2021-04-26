/* eslint-disable spaced-comment */
/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
const body = document.querySelector('body');
let slideIndex = 0;
const slides = document.querySelectorAll('li');
const totalSlides = slides.length;
const bodyWidth = body.clientWidth;
slides.forEach(element => {
  element.style.width = `${bodyWidth}px`;
});
const slider = document.querySelector('ul');
slider.style.width = `${bodyWidth * totalSlides}px`;

// next, prev
var nextBtn = document.getElementsByClassName('next');
var prevBtn = document.getElementsByClassName('prev');
nextBtn.addEventListener('click', function () {
    plusSlides(1);
});
prevBtn.addEventListener('click', function () {
    plusSlides(-1);
});

// hover
body.addEventListener('mouseover', function () {
    this.classList.add('active');
    clearInterval(autoSlider);
});
body.addEventListener('mouseleave', function () {
    this.classList.remove('active');
    autoSlider = setInterval(function () {
        plusSlides(1);
    }, 3000);
});


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlides(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  slideIndex = n;
  if (slideIndex == -1) {
      slideIndex = totalSlides - 1;
  } else if (slideIndex === totalSlides) {
      slideIndex = 0;
  }

  slider.style.left = -(bodyWidth * slideIndex) + 'px';
  pagination();
}

//pagination
slides.forEach(function () {
  var li = document.createElement('li');
  document.querySelector('#slider-pagination-wrap ul').appendChild(li);
})

function pagination() {
  var dots = document.querySelectorAll('#slider-pagination-wrap ul li');
  dots.forEach(function (element) {
      element.classList.remove('active');
  });
  dots[slideIndex].classList.add('active');
}

pagination();
var autoSlider = setInterval(function () {
  plusSlides(1);
}, 3000);
