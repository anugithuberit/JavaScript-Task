const fs = require('fs');

function logTime(message) {
  const time = new Date()
    .toISOString()
    .replace('T', ' ')
    .split('.')[0];

  fs.appendFileSync('timeLog.txt', `${time} - ${message}\n`);
}

module.exports = { logTime };  