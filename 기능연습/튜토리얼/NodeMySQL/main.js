const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
// const path = require('path');
const mysql = require('mysql');
// const sanitizeHtml = require('sanitize-html');
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
    if (error) throw error;
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
          db.query(
            'select * from topic left join author on topic.author_id=author.id where topic.id=?',
            [queryData.id],
            (error2, tabledata) => {
              if (error2) throw error;
              title = tabledata[0].title;
              const { id, description: desc, name } = tabledata[0];
              showResponse(
                200,
                tools.template(
                  title,
                  tools.list(table),
                  tools.article(title, desc, name),
                  tools.control(id, queryData)
                )
              );
            }
          );
        });
      }
    } else if (pathname === '/create') {
      db.query('select * from topic', (error, table) => {
        db.query('select * from author', (error, authors) => {
          console.log(authors[0].id)
          if (error) throw error;
          showResponse(
            200,
            tools.template(
              'create',
              tools.list(table),
              tools.form('create', '', '', '', tools.option(authors)),
              tools.control(title, queryData)
            )
          );
        });
      });
    } else if (pathname === '/process_create') {
      let body = '';
      request.on('data', data => {
        body += data;
      });
      request.on('end', () => {
        const post = qs.parse(body);
        const { title, description: desc, author } = post;
        // console.log(id);
        db.query(
          'insert into topic (title, description, created, author_id) values(?, ?, NOW(), ?)',
          [title, desc, author],
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
      db.query('select * from topic', (error, table) => {
        if (error) throw error;
        db.query('select * from topic where id=?', [queryData.id], (error2, tabledata) => {
          if (error2) throw error;
          const { id, title, description: desc } = tabledata[0];
          showResponse(
            200,
            tools.template(
              'update',
              tools.list(table),
              tools.form('update', id, title, desc),
              tools.control(title, queryData)
            )
          );
        });
      });
    } else if (pathname === '/process_update') {
      let body = '';
      request.on('data', data => {
        body += data;
      });
      request.on('end', () => {
        const post = qs.parse(body);
        const { title, description: desc, id } = post;
        db.query(
          'UPDATE topic SET title=?, description=? WHERE id=?',
          [title, desc, id],
          (error, modifiedData) => {
            if (error) throw error;
            response.writeHead(302, {
              Location: `/?id=${id}`
            });
            response.end();
          }
        );
      });
    } else if (pathname === '/process_delete') {
      let body = '';
      request.on('data', data => {
        body += data;
      });
      request.on('end', () => {
        const post = qs.parse(body);
        const { id } = post;
        db.query(`DELETE FROM topic WHERE id=?`, [id], (error, updatedTable) => {
          if (error) throw error;
          response.writeHead(302, {
            Location: '/'
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
