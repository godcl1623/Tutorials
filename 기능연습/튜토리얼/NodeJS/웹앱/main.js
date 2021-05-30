const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer((request, response) => {
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  const { pathname } = url.parse(_url, true);
  let title = queryData.id;
  fs.readdir('./src', (error, filelist) => {
    const list = filelist
      .map(element => {
        return `<li><a href="/?id=${element}">${element}</a></li>`;
      })
      .join(' ');

    const template = (title, list, article) => {
      return `
        <!doctype html>
        <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              ${list}
            </ol>
            ${article}
          </body>
        </html>
      `;
    };

    const article = (title, data) => {
      return `
        <h2>${title}</h2>
        <p>${data}</p>
      `;
    };

    const showResponse = (code, result) => {
      response.writeHead(code);
      response.end(result);
    };

    if (pathname === '/') {
      if (queryData.id === undefined) {
        title = 'Welcome';
        const data = 'Hello, NodeJS !!';
        showResponse(200, template(title, list, article(title, data)));
      } else {
        fs.readFile(`./src/${queryData.id}`, 'utf8', (err, data) => {
          showResponse(200, template(title, list, article(title, data)));
        });
      }
    } else {
      showResponse(404, '404: Page Not Found');
    }
  });
});
app.listen(3000);
