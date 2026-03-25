const fs = require('fs');

fs.readFile('message.txt', 'utf8', (err, data) => {
  if (err) throw err;

  const upper = data.toUpperCase();

  fs.writeFile('uppercase.txt', upper, (err) => {
    if (err) throw err;
    console.log("File converted successfully");
  });
});
