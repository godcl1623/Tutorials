let cntFlag: boolean = false;
const ctn = document.querySelector('#container') as HTMLElement;
const connectBtn = ctn.querySelector('#connect') as HTMLElement;
let cntWs: any = null;
const ctn2 = document.querySelector('#container2') as HTMLElement;
const sendText = ctn2.querySelector('input[name=sendText]') as HTMLElement;
const textInput = ctn2.querySelector('input[name=textInput]') as HTMLInputElement;
const chatWindow = ctn2.querySelector('textarea[name=chatWindow]') as HTMLTextAreaElement;
connectBtn.addEventListener('click', e => {
  const ws = new WebSocket('ws://localhost:3002');
  ws.onopen = function (event) {
    // alert('websocket comm connected !');
    chatWindow.value += 'websocket comm connected !\n';
    ws.send('comm start');
    cntWs = ws;
  };
  ws.onmessage = async function (msg: any) {
    chatWindow.value = `${msg.data}\n`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };
  ws.onerror = function (event) {
    alert((event as any).data);
  };
});
const sendBtn = ctn.querySelector('#sender') as HTMLElement;
sendBtn.addEventListener('click', e => {
  cntWs.send('test');
});
const closeBtn = ctn.querySelector('#close') as HTMLElement;
closeBtn.addEventListener('click', e => {
  cntWs.close();
});
// sendText.addEventListener('click', e => {
//   cntWs.send(textInput.value)
//   cntWs.onmessage = async function(msg: any) {
//     console.log(JSON.parse(msg.data))
//     chatWindow.value += `user: ${msg.data}\n`
//   }
// });
chatWindow.style.width = '500px';
chatWindow.style.height = '500px';
chatWindow.value = '';
