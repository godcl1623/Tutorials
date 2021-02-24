const cssStatic = document.getElementById('static');
const cssSticky = document.getElementById('sticky');
const jscript = document.getElementById('js');

const sidebar = document.querySelector('aside');

cssStatic.addEventListener('click', () => {
  sidebar.style.position = 'absolute';
});

cssSticky.addEventListener('click', () => {
  sidebar.style.position = 'sticky';
});

window.onscroll = function () {
  console.log(window.offsetTop);
};

jscript.addEventListener('click', onscroll);
sidebar.addEventListener('scroll', onscroll);
