const src = '../웹앱/src';
const fs = require('fs');

fs.readdir(src, (err, filelist) => {
  console.log(filelist);
});
