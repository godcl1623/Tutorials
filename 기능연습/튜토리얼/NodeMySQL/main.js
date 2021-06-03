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
        return query.home(response, queryData);
      }
      return query.specific(response, queryData);
    case '/create':
      return query.createForm(response, queryData);
    case 'process_create':
      return query.createProcess(request, response);
    case '/update':
      return query.updateForm(response, queryData);
    case '/process_update':
      return query.updateProcess(request, response);
    case '/process_delete':
      return query.erase(request, response);
    case '/author':
      return author.list(response, queryData);
    case '/process_add_author':
      return author.addProcess(request, response);
    case '/author_update':
      return author.updateForm(response, queryData);
    case '/process_author_update':
      return author.updateProcess(request, response);
    case '/process_author_delete':
      return author.erase(request, response);
    default:
      return query.notFound(response);
  }
});
app.listen(3000);
