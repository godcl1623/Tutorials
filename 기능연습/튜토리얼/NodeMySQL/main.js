const http = require('http');
const url = require('url');
const query = require('./custom_module/dbQueries');

const app = http.createServer((request, response) => {
  const _url = request.url;
  const { query: queryData, pathname } = url.parse(_url, true);
  if (pathname === '/') {
    if (queryData.id === undefined) {
      query.home(response, queryData);
    } else {
      query.specific(response, queryData);
    }
  } else if (pathname === '/create') {
    query.createForm(response, queryData);
  } else if (pathname === '/process_create') {
    query.createProcess(request, response);
  } else if (pathname === '/update') {
    query.updateForm(response, queryData);
  } else if (pathname === '/process_update') {
    query.updateProcess(request, response);
  } else if (pathname === '/process_delete') {
    query.erase(request, response);
  } else {
    query.notFound(response);
  }
  });
app.listen(3000);
