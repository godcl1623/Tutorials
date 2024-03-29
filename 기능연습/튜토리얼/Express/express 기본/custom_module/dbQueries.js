const sanitizeHTML = require('sanitize-html');
const db = require('./db');
const tools = require('./customTools');

exports.template = () => {
  db.query('select * from topic', (error, table) => {
    if (error) throw error;
    return table;
  });
};

exports.home = (res, queryData) => {
  db.query('select * from topic', (error, table) => {
    if (error) throw error;
    const title = 'Welcome';
    const data = `
      Hello, NodeJS !!
      <img src="/img/hello.jpg">
    `;
    res.send(
      tools.template(
        title,
        tools.list(table),
        tools.article(title, data),
        tools.control(title, queryData)
      )
    );
  });
};

exports.specific = (res, params) => {
  db.query('select * from topic', (error, table) => {
    if (error) throw error;
    db.query(
      'select * from topic left join author on topic.author_id=author.id where topic.id=?',
      [params.id],
      (error2, tabledata) => {
        if (error2) throw error;
        if (tabledata[0] === undefined) {
          this.notFound(res);
        }
        const { title, description: desc, name } = tabledata[0];
        res.send(
          tools.template(
            title,
            tools.list(table),
            tools.article(sanitizeHTML(title), sanitizeHTML(desc), sanitizeHTML(name)),
            tools.control(params.id, params)
          )
        );
      }
    );
  });
};

exports.createForm = (response, queryData) => {
  db.query('select * from topic', (error, table) => {
    if (error) throw error;
    db.query('select * from author', (error2, authors) => {
      if (error2) throw error2;
      response.send(
        tools.template(
          'create',
          tools.list(table),
          tools.form('create', '', '', '', tools.option(authors)),
          tools.control(queryData.id, queryData)
        )
      );
    });
  });
};

exports.createProcess = (request, response) => {
  const post = request.body;
  const { title, description: desc, author } = post;
  db.query(
    'insert into topic (title, description, created, author_id) values(?, ?, NOW(), ?)',
    [title, desc, author],
    (error, table) => {
      if (error) throw error;
      response.writeHead(302, {
        Location: `/topic/${table.insertId}`
      });
      response.end();
    }
  );
};

exports.updateForm = (response, queryData) => {
  db.query('select * from topic', (error, table) => {
    if (error) throw error;
    db.query('select * from topic where id=?', [queryData.id], (error2, tabledata) => {
      if (error2) throw error2;
      db.query('select * from author', (error3, authors) => {
        if (error3) throw error3;
        if (tabledata[0] === undefined) {
          this.notFound(response);
        }
        const { id, title, description: desc, author_id: authorId } = tabledata[0];
        response.writeHead(200);
        response.end(
          tools.template(
            'update',
            tools.list(table),
            tools.form(
              'update',
              id,
              sanitizeHTML(title),
              sanitizeHTML(desc),
              tools.option(authors, authorId)
            ),
            ''
          )
        );
      });
    });
  });
};

exports.updateProcess = (request, response) => {
  const post = request.body;
  const { title, description: desc, id, author } = post;
  db.query(
    'UPDATE topic SET title=?, description=?, author_id=? WHERE id=?',
    [title, desc, author, id],
    error => {
      if (error) throw error;
      response.writeHead(302, {
        Location: `/topic/${id}`
      });
      response.end();
    }
  );
};

exports.erase = (request, response) => {
  const post = request.body;
  const { id } = post;
  db.query(`DELETE FROM topic WHERE id=?`, [id], error => {
    if (error) throw error;
    response.writeHead(302, {
      Location: '/'
    });
    response.end();
  });
};

exports.notFound = response => {
  response.writeHead(404);
  response.end('404: Page Not Found');
};
