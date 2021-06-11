const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const query = require('./custom_modules/dbQueries');

const app = express();
const port = 3001;
app.use(cors(), bodyParser.json(), compression(), helmet());

app.get('/', (req, res) => res.send(query.menu()));

app.get('/member', (req, res) => {
  query.memberList(req, res);
});

app.get('/member/:id', (req, res) => {
  query.individual(req.params, res);
});

app.get('/news', (req, res) => {
  query.newsList(req, res);
});

app.get('/news/:id', (req, res) => {
  query.eachNews(req.params, res);
});

app.use((req, res) => {
  res.status(404).send('Page Not Found !');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Broke !');
});

app.listen(port, () => console.log(`server is running at port ${port}`));
