const fs = require('fs');

fs.readFile('../node실행/helloworld.js', 'utf8', (err, data) => {
  console.log(data);
});
