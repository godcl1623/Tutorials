"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const WebSocketS = require('ws').Server;
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const wss = new WebSocketS({ port: 3002 });
app.set('port', port);
app.use(cors());
app.get('/', (req, res) => {
    res.send(`
    <html>
      <head>
        <meta charset="utf-8" />
        <title>WS Test</title>
      </head>
      <body>
        <h1>foo</h1>
      </body>
    </html>
  `);
});
app.get('/test', (req, res) => {
    console.log(req);
    res.send('foo from server');
});
wss.on('connection', function (ws) {
    console.log('websocket comm connected');
    // ws.on('message', function(message: any) {
    //   console.log('received: ', message.toString())
    //   // ws.send(message.toString());
    //   let count: number = 0;
    //   setInterval(() => {
    //     // console.log('test')
    //     ws.send('test')
    //   }, 100);
    // })
    // setInterval(() => {
    //   // console.log('test')
    //   ws.send('test');
    // }, 500);
    let count = 1;
    const sendMsg = setInterval(() => {
        console.log(`${count}/100`);
        ws.send(`${count}/100`);
        count++;
        if (count > 100) {
            ws.send('process completed !');
            ws.close();
            clearInterval(sendMsg);
        }
    }, 250);
    ws.on('close', (ss) => {
        console.log('closed');
        clearInterval(sendMsg);
    });
});
wss.on('close', (ws) => {
    console.log('close');
});
app.listen(app.get('port'), () => console.log(`server is running at port ${app.get('port')}`));
