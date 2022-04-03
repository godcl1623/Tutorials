"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let cntFlag = false;
const ctn = document.querySelector('#container');
const connectBtn = ctn.querySelector('#connect');
let cntWs = null;
const ctn2 = document.querySelector('#container2');
const sendText = ctn2.querySelector('input[name=sendText]');
const textInput = ctn2.querySelector('input[name=textInput]');
const chatWindow = ctn2.querySelector('textarea[name=chatWindow]');
connectBtn.addEventListener('click', e => {
    const ws = new WebSocket('ws://localhost:3002');
    ws.onopen = function (event) {
        // alert('websocket comm connected !');
        chatWindow.value += 'websocket comm connected !\n';
        ws.send('comm start');
        cntWs = ws;
    };
    ws.onmessage = function (msg) {
        return __awaiter(this, void 0, void 0, function* () {
            chatWindow.value = `${msg.data}\n`;
            chatWindow.scrollTop = chatWindow.scrollHeight;
        });
    };
    ws.onerror = function (event) {
        alert(event.data);
    };
});
const sendBtn = ctn.querySelector('#sender');
sendBtn.addEventListener('click', e => {
    cntWs.send('test');
});
const closeBtn = ctn.querySelector('#close');
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
