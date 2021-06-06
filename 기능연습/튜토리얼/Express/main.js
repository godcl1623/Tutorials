const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const topicRouter = require('./custom_module/routes/topic');
const indexRouter = require('./custom_module/routes/index');
const authorRouter = require('./custom_module/routes/author_routes');

const app = express();
app.use(
  bodyParser.urlencoded({ extended: false }),
  compression(),
  express.static('public'),
  helmet()
);

app.use('/topic', topicRouter);

app.use('/', indexRouter, authorRouter);

app.use((req, res, next) => {
  res.status(404).send('404: Page Not Found');
});

app.listen(3000, () => console.log('Example app listening on port 3000 !'));

/*
default:
  query.notFound(response);
  break;
*/
