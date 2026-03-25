const fs = require('fs');

fs.readFile('paragraph.txt', 'utf8', (err, data) => {
  if (err) throw err;

  const words = data.trim().split(/\s+/);
  console.log("Total Words:", words.length);
});
