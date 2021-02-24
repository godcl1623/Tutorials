const cssStatic = document.getElementById('static');
const cssSticky = document.getElementById('sticky');
const jscript = document.getElementById('js');

const sidebar = document.querySelector('aside');

cssStatic.addEventListener('click', () => {
  sidebar.style.position = 'static';
});

cssSticky.addEventListener('click', () => {
  sidebar.style.position = 'sticky';
});

jscript.addEventListener('click', () => {
  if(sidebar.style.position === 'static' || sidebar.style.position === 'sticky') {
    sidebar.style.position = 'static';
  }
});
