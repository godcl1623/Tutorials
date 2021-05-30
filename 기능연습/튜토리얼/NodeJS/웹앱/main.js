const http = require('http');
const fs = require('fs');
const url = require('url');
const { testElement } = require('domutils');

const app = http.createServer((request, response) => {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let { pathname } = url.parse(_url, true);
  let title = queryData.id;
  fs.readdir('./src', (error, filelist) => {
    const list = filelist.map(element => {
      return `<li><a href="/?id=${element}">${element}</a></li>`;
    }).join(' ');
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
                  ${list}
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
                  ${list}
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
  });
});
app.listen(3000);
