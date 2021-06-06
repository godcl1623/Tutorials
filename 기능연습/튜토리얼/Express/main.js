const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const query = require('./custom_module/dbQueries');
const author = require('./custom_module/author');
const topicRouter = require('./custom_module/topic');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }), compression(), express.static('public'));
app.use('/topic', topicRouter);

app.get('/', (req, res) => {
  query.home(res, req.params);
});

app.get('/author', (req, res) => {
  author.list(res, req.params);
});

app.post('/process_add_author', (req, res) => {
  author.addProcess(req, res);
});

app.get('/author_update/:id', (req, res) => {
  author.updateForm(res, req.params);
});

app.post('/process_author_update', (req, res) => {
  author.updateProcess(req, res);
});

app.post('/process_author_delete', (req, res) => {
  author.erase(req, res);
});

app.use((req, res, next) => {
  res.status(404).send('404: Page Not Found');
});

app.listen(3000, () => console.log('Example app listening on port 3000 !'));

/*
default:
  query.notFound(response);
  break;
*/
