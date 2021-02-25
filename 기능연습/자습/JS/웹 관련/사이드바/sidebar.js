const cssStatic = document.getElementById('static');
const cssSticky = document.getElementById('sticky');
const jscript = document.getElementById('js');
const body = document.querySelector('body');

const sidebar = document.querySelector('aside');

cssStatic.addEventListener('click', () => {
  sidebar.style.position = 'absolute';
});

cssSticky.addEventListener('click', () => {
  sidebar.style.position = 'sticky';
});

window.onscroll = function () {
  function sidebarMove() {
    if (window.pageYOffset > 1.5*sidebar.scrollHeight) {
      const top = window.pageYOffset;
      sidebar.style.top = top + 'px';
    } else {
      sidebar.style.top = '100px';
    }
  }

  sidebarMove();

  window.scroll(() => {sidebarMove()});
};

// jscript.addEventListener('click', onscroll);
sidebar.addEventListener('scroll', onscroll);
