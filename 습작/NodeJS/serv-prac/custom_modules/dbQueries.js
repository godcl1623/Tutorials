const db = require('./db');

module.exports = {
  template: () => {
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
  }
};
