const ctn = document.querySelector('#container');
const reqBtn = (ctn as HTMLElement).querySelector('#req-btn');
(reqBtn as HTMLButtonElement).addEventListener('click', async e => {
  const url = 'http://localhost:3001/test'
  fetch(url)
    .then(res => res.text())
    .then(data => console.log(data))
});