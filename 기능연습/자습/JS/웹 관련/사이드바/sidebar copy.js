const sidebar = document.querySelector('aside');

window.onscroll = function () {
  function sidebarMove() {
    if(window.pageYOffset <= 150) {
      sidebar.style.top = '150px';
    } else if ((window.pageYOffset + window.innerHeight) >= (sidebar.offsetTop + sidebar.scrollHeight)) {
      const top = window.pageYOffset + window.innerHeight - sidebar.scrollHeight;
      sidebar.style.top = `${top}px`;
    } else if (window.pageYOffset > 150 && window.pageYOffset <= sidebar.offsetTop) {
      sidebar.style.top = `${window.pageYOffset}px`;
    }
  }
  sidebarMove();
};

sidebar.addEventListener('scroll', onscroll);