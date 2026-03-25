const fs = require('fs');

fs.readFile('Numbers.txt', 'utf8', (err, data) => {
  if (err) throw err;

  const numbers = data.split('\n').map(Number);

  const evenNumbers = numbers.filter(num => num % 2 === 0);

  fs.writeFile('evenNumbers.txt', evenNumbers.join('\n'), (err) => {
    if (err) throw err;

    console.log("Even numbers saved");
  });
});