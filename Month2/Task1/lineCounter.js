const fs = require('fs');

fs.readFile('story.txt', 'utf8', (err, data) => {
  if (err) throw err;

  const lines = data.split('\n');

  console.log("Total Lines:", lines.length);
});