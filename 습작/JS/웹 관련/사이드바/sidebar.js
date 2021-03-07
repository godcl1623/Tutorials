const cssStatic = document.getElementById('static');
const cssSticky = document.getElementById('sticky');

const sidebar = document.querySelector('aside');

cssStatic.addEventListener('click', () => {
  sidebar.style.position = 'absolute';
});

cssSticky.addEventListener('click', () => {
  sidebar.style.position = 'sticky';
});

window.onscroll = function () {
  function sidebarMove() {
    if (window.pageYOffset < 189) {
      sidebar.style.top = '189px';
    } else if (window.pageYOffset >= 189 && window.pageYOffset < sidebar.offsetTop) {
      sidebar.style.top = window.pageYOffset + 'px';
    } else if ((window.pageYOffset + window.innerHeight) > (sidebar.offsetTop + sidebar.scrollHeight)) {
      const top = window.pageYOffset + window.innerHeight - sidebar.scrollHeight - 2;
      sidebar.style.top = top + 'px';
    }
  }
  sidebarMove();
  window.scroll(() => {
    sidebarMove();
  });
};

// jscript.addEventListener('click', onscroll);
sidebar.addEventListener('scroll', onscroll);
