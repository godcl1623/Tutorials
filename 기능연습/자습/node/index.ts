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
  ws.send('hello! this message sent from server !')
  ws.on('message', function(message: any) {
    console.log('received: %s', message);
  })
})

app.listen(app.get('port'), () => console.log(`server is running at port ${app.get('port')}`));
