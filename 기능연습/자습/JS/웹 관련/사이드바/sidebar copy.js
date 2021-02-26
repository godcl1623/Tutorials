const sidebar = document.querySelector('aside');

window.onscroll = function () {
  function move() {
    if (window.pageYOffset <= 155) {
      sidebar.style.top = '155px';
    } else if ((window.pageYOffset + window.innerHeight) >= (sidebar.offsetTop + sidebar.scrollHeight)) {
      const top = window.pageYOffset + window.innerHeight - sidebar.scrollHeight;
      sidebar.style.top = `${top}px`;
    } else if (window.pageYOffset > 155 && window.pageYOffset < sidebar.offsetTop) {
      sidebar.style.top = `${window.pageYOffset}px`;
    }
  }
  move();
};

sidebar.addEventListener('scroll', onscroll);
