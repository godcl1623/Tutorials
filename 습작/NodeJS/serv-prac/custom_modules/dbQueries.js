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

  eachNews(req, res) {
    db.query('select * from newslist where id=?', [req.id], (error, news, next) => {
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

  notFound(req, res) {
    res.status(404).send('Page Not Found !');
  }
};
