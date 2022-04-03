import express, { Request, Response } from 'express';
const cors = require('cors');
const WebSocketS = require('ws').Server;

const app = express();
const port = process.env.PORT || 3001;
const wss = new WebSocketS({ port: 3002 });

app.set('port', port);
app.use(cors());

app.get('/', (req: Request, res: Response) => {
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
  `)
})

app.get('/test', (req: Request, res: Response) => {
  console.log(req)
  res.send('foo from server');
})

wss.on('connection', function(ws: any) {
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
  let count: number = 1;
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
  ws.on('close', (ss: any) => {
    console.log('closed')
    clearInterval(sendMsg);
  })
})

wss.on('close', (ws: any) => {
  console.log('close')
})

app.listen(app.get('port'), () => console.log(`server is running at port ${app.get('port')}`));
