const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const query = require('./custom_module/dbQueries');
const author = require('./custom_module/author');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }), compression(), express.static('public'));

app.get('/', (req, res) => {
  query.home(res, req.params);
});

app.get('/page/:id', (req, res) => {
  query.specific(res, req.params);
});

app.get('/create', (req, res) => {
  query.createForm(res, req.params);
});

app.post('/process_create', (req, res) => {
  query.createProcess(req, res);
});

app.get('/update/:id', (req, res) => {
  query.updateForm(res, req.params);
});

app.post('/process_update', (req, res) => {
  query.updateProcess(req, res);
});

app.post('/process_delete', (req, res) => {
  query.erase(req, res);
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

app.listen(3000, () => console.log('Example app listening on port 3000 !'));

/*
default:
  query.notFound(response);
  break;
*/
