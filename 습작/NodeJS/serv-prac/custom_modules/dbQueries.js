const db = require('./db');

exports.template = (req, res) => {
  db.query('select * from memberform', (error, table) => {
    if (error) throw error;
    res.send(table);
  });
};
