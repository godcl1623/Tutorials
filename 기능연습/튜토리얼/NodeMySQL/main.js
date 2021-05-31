const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

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

    const control = title => {
      const create = `<a href="/create">create</a>`;
      const update = `<a href="/update?id=${title}">update</a>`;
      const deleteBtn = `
        <form
          action="/process_delete"
          method="post"
        >
          <input type="hidden" name="id" value="${title}">
          <input type="submit" name="delete" value="delete">
        </form>
      `;
      if (queryData.id === undefined) {
        return create;
      }
      return `${create} ${update} ${deleteBtn}`;
    };

    const template = (title, list, article, control) => {
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
            ${control}
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
        showResponse(200, template(title, list, article(title, data), control(title)));
      } else {
        const filteredId = path.parse(queryData.id).base;
        fs.readFile(`./src/${filteredId}`, 'utf8', (err, data) => {
          const sanitizedTitle = sanitizeHtml(title);
          const sanitizedData = sanitizeHtml(data);
          showResponse(200, template(sanitizedTitle, list, article(sanitizedTitle, sanitizedData), control(sanitizedTitle)));
        });
      }
    } else if (pathname === '/create') {
      showResponse(200, template('WEB - create', list, `
            <form
              action="/process_create"
              method="post"
            >
              <p><input type="text" name="title" placeholder="title"></p>
              <p><textarea name="description" placeholder="description"></textarea></p>
              <p><input type="submit"></p>
            </form>
          `,
          ''
        )
      );
    } else if (pathname === '/process_create') {
      let body = '';
      request.on('data', data => {
        body += data;
      });
      request.on('end', () => {
        const post = qs.parse(body);
        const { title, description: desc } = post;
        fs.writeFile(`./src/${title}`, desc, 'utf8', error => {
          if (error) throw error;
          response.writeHead(302, {
            Location: `/?id=${title}`
          });
          response.end();
        });
      });
    } else if (pathname === '/update') {
      const filteredId = path.parse(queryData.id).base;
      fs.readFile(`./src/${filteredId}`, 'utf8', (err, data) => {
        const sanitizedTitle = sanitizeHtml(title);
        const sanitizedData = sanitizeHtml(data);
        showResponse(200, template(title, list, `
              <form
                action="/process_update"
                method="post"
              >
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <p><input type="text" name="title" placeholder="title" value="${sanitizedTitle}"></p>
                <p><textarea name="description" placeholder="description">${sanitizedData}</textarea></p>
                <p><input type="submit"></p>
              </form>
            `,
            ''
          )
        );
      });
    } else if (pathname === '/process_update') {
      let body = '';
      request.on('data', data => {
        body += data;
      });
      request.on('end', () => {
        const post = qs.parse(body);
        const { title, description: desc, id } = post;
        fs.rename(`./src/${id}`, `./src/${title}`, error => {
          if (error) throw error;
          fs.writeFile(`./src/${title}`, desc, 'utf8', error => {
            if (error) throw error;
            response.writeHead(302, {
              Location: `/?id=${title}`
            });
            response.end();
          });
        });
      });
    } else if (pathname === '/process_delete') {
      let body = '';
      request.on('data', data => {
        body += data;
      });
      request.on('end', () => {
        const post = qs.parse(body);
        const { id } = post;
        const filteredId = path.parse(id).base;
        fs.unlink(`./src/${filteredId}`, error => {
          if (error) throw error;
          response.writeHead(302, {
            Location: `/`
          });
          response.end();
        });
      });
    } else {
      showResponse(404, '404: Page Not Found');
    }
  });
});
app.listen(3000);
