const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer((request, response) => {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let { pathname } = url.parse(_url, true);
  let title = queryData.id;

  if (pathname === '/') {
    if (queryData.id === undefined) {
      title = 'Welcome';
      const data = 'Hello, NodeJS !!';
      const template = `
        <!doctype html>
        <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>${data}
            </p>
          </body>
        </html>
      `;
      response.writeHead(200);
      response.end(template);
    } else {
      fs.readFile(`./src/${queryData.id}`, 'utf8', (err, data) => {
        const template = `
          <!doctype html>
          <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              <ol>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
              </ol>
              <h2>${title}</h2>
              <p>${data}
              </p>
            </body>
          </html>
        `;
        response.writeHead(200);
        response.end(template);
      });
    }
  } else {
    response.writeHead(404);
    response.end('404: Page Not Found');
  }
  // response.end(fs.readFileSync(__dirname + _url));
});
app.listen(3000);
