const http = require('http');
const url = require('url');
const query = require('./custom_module/dbQueries');
const author = require('./custom_module/author');

const app = http.createServer((request, response) => {
  const _url = request.url;
  const { query: queryData, pathname } = url.parse(_url, true);
  switch (pathname) {
    case '/':
      if (queryData.id === undefined) {
        query.home(response, queryData);
        break;
      }
      query.specific(response, queryData);
      break;
    case '/create':
      query.createForm(response, queryData);
      break;
    case '/process_create':
      query.createProcess(request, response);
      break;
    case '/update':
      query.updateForm(response, queryData);
      break;
    case '/process_update':
      query.updateProcess(request, response);
      break;
    case '/process_delete':
      query.erase(request, response);
      break;
    case '/author':
      author.list(response, queryData);
      break;
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
