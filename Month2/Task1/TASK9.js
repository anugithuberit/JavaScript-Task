const fs = require('fs');

fs.readFile('article.txt', 'utf8', (err, data) => {
  if (err) throw err;

  // search for "Node.js"
  const matches = data.match(/Node\.js/g);

  const count = matches ? matches.length : 0;

  console.log(`Word "Node.js" found ${count} times`);
});