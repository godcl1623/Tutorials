const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const query = require('./custom_modules/dbQueries');

const app = express();
const port = 3001;
app.use(cors(), bodyParser.json(), compression());

// app.get('/', (req, res) => res.json({ testData: 'Hello World !' }));
app.get('/', (req, res) => {
  query.template(res);
});
app.listen(port, () => console.log(`server is running at port ${port}`));
