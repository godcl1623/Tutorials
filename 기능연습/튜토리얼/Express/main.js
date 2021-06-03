const express = require('express');
const query = require('./custom_module/dbQueries');
const author = require('./custom_module/author');

const app = express();

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

app.listen(3000, () => console.log('Example app listening on port 3000 !'));

/*
    case '/process_add_author':
      author.addProcess(request, response);
      break;
    case '/author_update':
      author.updateForm(response, queryData);
      break;
    case '/process_author_update':
      author.updateProcess(request, response);
      break;
    case '/process_author_delete':
      author.erase(request, response);
      break;
    default:
      query.notFound(response);
      break;
  }
});
app.listen(3000);
*/
