const mysql = require('mysql');
const pwd = require('./pwd');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: pwd,
  database: 'formPractice'
});
db.connect();

module.exports = db;
