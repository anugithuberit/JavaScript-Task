const fs = require('fs');

function saveStudent(name, age) {
  fs.appendFileSync('students.txt', `${name} - ${age}\n`);
}

module.exports = { saveStudent };