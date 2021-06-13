const db = require('./db');

module.exports = {
  menu() {
    return `
      <!doctype html>
      <html>
        <head>
          <title>My Server</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1>서버 연결 성공 !</h1>
          <p>
            <a href="/member">회원 목록</a>
          </p>
          <p>
            <a href="/news">작성 뉴스 목록</a>
          </p>
        </body>
      </html>
    `;
  },

  memberList(req, res) {
    db.query('select * from memberform', (error, table) => {
      if (error) throw error;
      if (table.length === 0) this.notFound(req, res);
      const newTable = [...table];
      const arrangedData = newTable
        .map(member => {
          return `
          <p>
            <a href="/member/${member.id}">[${member.id}] ${member.family_name}${member.name}</a>
          </p>
        `;
        })
        .join(' ');
      res.send(arrangedData);
    });
  },

  sendMemberList(req, res, next) {
    db.query('select * from memberform', (error, table) => {
      if (error) next(error);
      if (table.length === 0) this.notFound(req, res);
      res.json(table);
    });
  },

  individual(req, res) {
    db.query('select * from memberform where id=?', [req.id], (error, member) => {
      if (error) throw error;
      if (member.length === 0) this.notFound(req, res);
      const newMember = [...member];
      const columns = [
        'id',
        'name',
        'family_name',
        'gender',
        'email',
        'source',
        'interests',
        'favorite_time'
      ];
      const arrangedData = newMember
        .map(data => {
          return columns
            .map(column => {
              return `
            <p>
              ${column}: ${data[column]}
            </p>
          `;
            })
            .join(' ');
        })
        .join(' ');
      res.send(arrangedData);
    });
  },

  sendIndividual(req, res, next) {
    db.query('select * from memberform where id=?', [req.id], (error, member) => {
      if (error) next(error);
      if (member.length === 0) this.notFound(req, res);
      res.json(member);
    });
  },

  newsList(req, res) {
    db.query('select * from newslist', (error, table) => {
      if (error) throw error;
      if (table.length === 0) this.notFound(req, res);
      const newTable = [...table];
      const arrangedData = newTable
        .map(news => {
          return `
          <p>
            <a href="/news/${news.id}">[${news.id}] ${news.title}</a>
          </p>
        `;
        })
        .join(' ');
      res.send(arrangedData);
    });
  },

  sendNewsList(req, res, next) {
    db.query('select * from newslist', (error, table) => {
      if (error) next(error);
      if (table.length === 0) this.notFound(req, res);
      res.json(table);
    });
  },

  eachNews(req, res, next) {
    db.query('select * from newslist where id=?', [req.id], (error, news) => {
      if (error) next(error);
      if (news.length === 0) this.notFound(req, res);
      const newNews = [...news];
      const columns = ['id', 'title', 'contents'];
      const arrangedData = newNews
        .map(data => {
          return columns
            .map(column => {
              return `
            <p>
              ${column}: ${data[column]}
            </p>
          `;
            })
            .join(' ');
        })
        .join(' ');
      res.send(arrangedData);
    });
  },

  sendEachNews(req, res, next) {
    db.query('select * from newslist where id=?', [req.id], (error, news) => {
      if (error) next(error);
      if (news.length === 0) this.notFound(req, res);
      res.json(news);
    });
  },

  addMember(req, res, next) {
    const post = req.body;
    const { name, family, gender, email, source, interest, favorite } = post;
    db.query(
      'insert into memberform (name, family, gender, email, source, interests, favorite_time) values(?, ?, ?, ?, ?, ?, ?)',
      [name, family, gender, email, source, interest, favorite],
      (error, table) => {
        if (error) next(error);
      }
    );
  },

  addNews(req, res, next) {
    const post = req.body;
    const { headline, contents } = post;
    db.query(
      'insert into newslist (title, contents) values(?, ?)',
      [headline, contents],
      (error, table) => {
        if (error) next(error);
      }
    );
  },

  deleteMember(req, res, next) {
    const post = req.body;
    const { id } = post;
    db.query('delete from memberform where id=?', [id], (error, data) => {
      if (error) next(error);
    });
  },

  updateMember(req, res, next) {
    const post = req.body;
    console.log(post);
  },

  notFound(req, res) {
    res.status(404).send('Page Not Found !');
  }
};
