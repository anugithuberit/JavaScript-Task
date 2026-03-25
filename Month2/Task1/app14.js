const fs = require('fs');
const { createGreeting } = require('./greeting');

fs.readFile('names.txt', 'utf8', (err, data) => {
  if (err) throw err;

  const names = data.split('\n');

  const greetings = names.map(name => createGreeting(name));

  fs.writeFile('greetings.txt', greetings.join('\n'), (err) => {
    if (err) throw err;

    console.log("Greetings saved successfully");
  });
});