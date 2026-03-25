const fs = require('fs');

fs.readFile('sentence.txt', 'utf8', (err, data) => {
  if (err) throw err;

  const reversed = data.split('').reverse().join('');

  fs.writeFile('reverse.txt', reversed, (err) => {
    if (err) throw err;

    console.log("Reversed saved");
  });
});