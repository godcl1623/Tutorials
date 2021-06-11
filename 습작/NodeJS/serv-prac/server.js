const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const query = require('./custom_modules/dbQueries');
const db = require('./custom_modules/db');

const app = express();
const port = 3001;
app.use(cors(), bodyParser.json(), compression(), helmet());

app.get('/', (req, res) => res.send(query.template()));

app.get('/member', (req, res) => {
  db.query('select * from memberform', (error, table) => {
    if (error) throw error;
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
});

app.get('/member/:id', (req, res) => {
  db.query('select * from memberform where id=?', [req.params.id], (error, member) => {
    if (error) throw error;
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
});

app.get('/news', (req, res) => {
  db.query('select * from newslist', (error, table) => {
    if (error) throw error;
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
});

app.get('/news/:id', (req, res) => {
  db.query('select * from newslist where id=?', [req.params.id], (error, news) => {
    if (error) throw error;
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
});

app.listen(port, () => console.log(`server is running at port ${port}`));
