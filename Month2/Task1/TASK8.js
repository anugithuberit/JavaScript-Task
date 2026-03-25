const fs = require('fs');

// change filename if needed
const fileName = 'data.txt';

fs.stat(fileName, (err, stats) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }

  console.log(`File: ${fileName}, Size: ${stats.size} bytes`);
});