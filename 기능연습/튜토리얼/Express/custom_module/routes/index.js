const express = require('express');
const query = require('../dbQueries');

const router = express.Router();

router.get('/', (req, res) => {
  query.home(res, req.params);
});

module.exports = router;
