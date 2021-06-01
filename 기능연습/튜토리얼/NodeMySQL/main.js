const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const mysql = require('mysql');
const sanitizeHtml = require('sanitize-html');
const tools = require('./custom_module/customTools');
const pwd = require('./custom_module/pwd');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: pwd,
  database: 'sqltutorial'
});
db.connect();

const app = http.createServer((request, response) => {
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  const { pathname } = url.parse(_url, true);
  let title = queryData.id;
  fs.readdir('./src', (error, filelist) => {
    const showResponse = (code, result) => {
      response.writeHead(code);
      response.end(result);
    };

    if (pathname === '/') {
      if (queryData.id === undefined) {
        title = 'Welcome';
        const data = 'Hello, NodeJS !!';
        db.query('select * from topic', (error, table) => {
          if (error) throw error;
          showResponse(
            200,
            tools.template(
              title,
              tools.list(table),
              tools.article(title, data),
              tools.control(title, queryData)
            )
          );
        });
      } else {
        db.query('select * from topic', (error, table) => {
          if (error) throw error;
          db.query('select * from topic where id=?', [queryData.id], (error2, tabledata) => {
            if (error2) throw error;
            title = tabledata[0].title;
            const { id, description: desc } = tabledata[0];
            showResponse(
              200,
              tools.template(
                title,
                tools.list(table),
                tools.article(title, desc),
                tools.control(id, queryData)
              )
            );
          });
        });
      }
    } else if (pathname === '/create') {
      db.query('select * from topic', (error, table) => {
        if (error) throw error;
        showResponse(
          200,
          tools.template(
            'create',
            tools.list(table),
            tools.form('create', ''),
            tools.control(title, queryData)
          )
        );
      });
    } else if (pathname === '/process_create') {
      let body = '';
      request.on('data', data => {
        body += data;
      });
      request.on('end', () => {
        const post = qs.parse(body);
        const { title, description: desc } = post;
        db.query(
          'insert into topic (title, description, created, author_id) values(?, ?, NOW(), ?)',
          [title, desc, 1],
          (error, table) => {
            if (error) throw error;
            response.writeHead(302, {
              Location: `/?id=${table.insertId}`
            });
            response.end();
          }
        );
      });
    } else if (pathname === '/update') {
      const filteredId = path.parse(queryData.id).base;
      fs.readFile(`./src/${filteredId}`, 'utf8', (err, data) => {
        const sanitizedTitle = sanitizeHtml(title);
        const sanitizedData = sanitizeHtml(data);
        showResponse(
          200,
          tools.template(
            title,
            tools.list(filelist),
            `
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
