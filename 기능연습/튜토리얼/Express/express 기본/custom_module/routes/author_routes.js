const express = require('express');
const author = require('../author');

const router = express.Router();

router.get('/author', (req, res) => {
  author.list(res, req.params);
});

router.post('/process_add_author', (req, res) => {
  author.addProcess(req, res);
});

router.get('/author_update/:id', (req, res) => {
  author.updateForm(res, req.params);
});

router.post('/process_author_update', (req, res) => {
  author.updateProcess(req, res);
});

router.post('/process_author_delete', (req, res) => {
  author.erase(req, res);
});

module.exports = router;
