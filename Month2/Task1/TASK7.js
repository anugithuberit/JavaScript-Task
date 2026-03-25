const fs = require('fs');

function saveNote(noteText) {
  fs.appendFileSync('notes.txt', noteText + '\n');
}

module.exports = { saveNote };