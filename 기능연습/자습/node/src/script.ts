const ctn = document.querySelector('#container');
const reqBtn = (ctn as HTMLElement).querySelector('#req-btn');
// (reqBtn as HTMLButtonElement).addEventListener('click', async e => {
//   const url = 'http://localhost:3001/test'
//   fetch(url)
//     .then(res => res.text())
//     .then(data => console.log(data))
// });
(reqBtn as HTMLButtonElement).addEventListener('click', e => {
  const ws = new WebSocket('ws://localhost:3002');
  ws.onopen = function(event) {
    ws.send('client message: Hi !');
  }

  ws.onmessage = function(event) {
    console.log('server message: ', event.data);
  }

  ws.onerror = function(event) {
    console.log('server error message: ', (event as any).data);
  }
});