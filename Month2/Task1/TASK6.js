const fs = require('fs');

fs.readdir('documents', (err, files) => {
  if (err) throw err;

  console.log("Total Files:", files.length);
});