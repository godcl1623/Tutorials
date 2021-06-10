const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
const port = 3001;
app.use(cors(), bodyParser.json(), compression());

app.get('/', (req, res) => res.json({ testData: 'Hello World !' }));
app.listen(port, () => console.log(`server is running at port ${port}`));
