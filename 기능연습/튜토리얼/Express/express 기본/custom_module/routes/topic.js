const express = require('express');
const query = require('../dbQueries');

const router = express.Router();

router.get('/create', (req, res) => {
  query.createForm(res, req.params);
});

router.post('/process_create', (req, res) => {
  query.createProcess(req, res);
});

router.get('/update/:id', (req, res) => {
  query.updateForm(res, req.params);
});

router.post('/process_update', (req, res) => {
  query.updateProcess(req, res);
});

router.post('/process_delete', (req, res) => {
  query.erase(req, res);
});

router.get('/:id', (req, res) => {
  query.specific(res, req.params);
});

module.exports = router;
