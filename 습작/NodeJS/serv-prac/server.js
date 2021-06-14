const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const query = require('./custom_modules/dbQueries');

const app = express();
const port = 3001;
app.use(cors(), compression(), helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  res.send(query.menu());
});
// app.post('/test', (req, res) => console.log(req.body));
app.get('/test', (req, res) => console.log(res));

app.get('/member', (req, res) => {
  query.memberList(req, res);
});

app.get('/member/get', (req, res, next) => {
  query.sendMemberList(req, res, next);
});

app.post('/member/update/:id', (req, res, next) => {
  query.updateMember(req, res, next);
});

app.get('/member/:id', (req, res) => {
  query.individual(req.params, res);
});

app.get('/member/get/:id', (req, res, next) => {
  query.sendIndividual(req.params, res, next);
});

app.post('/member/add', (req, res, next) => {
  query.addMember(req, res, next);
});

app.post('/member/delete', (req, res, next) => {
  query.deleteMember(req, res, next);
});

app.get('/news', (req, res) => {
  query.newsList(req, res);
});

app.get('/news/get', (req, res, next) => {
  query.sendNewsList(req, res, next);
});

app.get('/news/:id', (req, res) => {
  query.eachNews(req.params, res);
});

app.get('/news/get/:id', (req, res, next) => {
  query.sendEachNews(req, res, next);
});

app.post('/news/add', (req, res, next) => {
  query.addNews(req, res, next);
});

app.post('/news/delete', (req, res, next) => {
  query.deleteNews(req, res, next);
});

app.post('/news/update/:id', (req, res, next) => {
  query.updateNews(req, res, next);
});

app.use((req, res) => {
  res.status(404).send('Page Not Found !');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Broke !');
});

app.listen(port, () => console.log(`server is running at port ${port}`));
