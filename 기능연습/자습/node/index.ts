import express, { Request, Response } from 'express';
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

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

app.listen(app.get('port'), () => console.log(`server is running at port ${app.get('port')}`));
