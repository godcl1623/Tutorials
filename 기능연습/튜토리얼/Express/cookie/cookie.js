const express = require('express');
const cookie = require('cookie');

const app = express();
const port = 3001;

app.use((req, res) => {
  res.writeHead(200, {
    'Set-Cookie': [
      'tasty_cookie=choco',
      'yummy_cookie=strawberry',
      `foo=bar; Max-Age=${60*60*24*30*12}`,
      'app=le; Secure',
      'ban=ana; HttpOnly',
      'gra=pe; Path=/fruit',
      'ba=ka; Domain=localhost:3001'
    ]
  })
  if (req.headers.cookie) {
    const recook = cookie.parse(req.headers.cookie);
    console.log(recook);
  }
  res.end('cookie !');
});

app.listen(port, () => console.log(`server started at port${port}`));