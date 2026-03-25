const fs = require('fs');
const { generateNumber } = require('./TASK11');

for (let i = 0; i < 5; i++) {
  fs.appendFileSync('randomNumbers.txt', generateNumber() + '\n');
}