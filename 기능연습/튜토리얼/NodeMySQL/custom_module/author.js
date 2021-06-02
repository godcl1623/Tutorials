const qs = require('querystring');
const db = require('./db');
const tools = require('./customTools');
const query = require('./dbQueries');

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
    db.query(
      'insert into author (name, profile) values(?, ?)',
      [title, description],
      (error, table) => {
        if (error) throw error;
        response.writeHead(302, {
          Location: `/author`
        });
        response.end();
      }
    );
  });
};
