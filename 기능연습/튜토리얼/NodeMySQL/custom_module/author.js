const qs = require('querystring');
const db = require('./db');
const tools = require('./customTools');

exports.list = (response, queryData) => {
  db.query('select * from topic', (error, topics) => {
    if (error) throw error;
    db.query('select * from author', (error2, table) => {
      if (error2) throw error2;
      const title = 'Author List';
      response.writeHead(200);
      response.end(
        tools.template(
          title,
          tools.list(topics),
          tools.article(title, tools.table(table), '', tools.form('add_author', '', '', '', '')),
          tools.control(title, queryData)
        )
      );
    });
  });
};

exports.addProcess = (request, response) => {
  let body = '';
  request.on('data', data => {
    body += data;
  });
  request.on('end', () => {
    const post = qs.parse(body);
    const { title, description } = post;
    db.query('insert into author (name, profile) values(?, ?)', [title, description], error => {
      if (error) throw error;
      response.writeHead(302, {
        Location: `/author`
      });
      response.end();
    });
  });
};

exports.updateForm = (response, queryData) => {
  db.query('select * from topic', (error, table) => {
    if (error) throw error;
    db.query('select * from author where id=?', [queryData.id], (error2, tabledata) => {
      if (error2) throw error2;
      const { id, name: title, profile: desc } = tabledata[0];
      response.writeHead(200);
      response.end(
        tools.template(
          'Author Update',
          tools.list(table),
          tools.form('author_update', id, title, desc),
          tools.control('Author Update', queryData)
        )
      );
    });
  });
};

exports.updateProcess = (request, response) => {
  let body = '';
  request.on('data', data => {
    body += data;
  });
  request.on('end', () => {
    const post = qs.parse(body);
    const { id, title, description: desc } = post;
    db.query('UPDATE author SET name=?, profile=? where id=?', [title, desc, id], error => {
      if (error) throw error;
      response.writeHead(302, {
        Location: `/author`
      });
      response.end();
    });
  });
};

exports.erase = (request, response) => {
  let body = '';
  request.on('data', data => {
    body += data;
  });
  request.on('end', () => {
    const post = qs.parse(body);
    const { id } = post;
    db.query(`DELETE FROM author WHERE id=?`, [id], error => {
      if (error) throw error;
      response.writeHead(302, {
        Location: '/author'
      });
      response.end();
    });
  });
};
