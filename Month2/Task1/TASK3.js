const fs = require('fs');

function logNumber(number) {
  fs.appendFileSync('numbers.txt', number + '\n');
}

module.exports = { logNumber };
