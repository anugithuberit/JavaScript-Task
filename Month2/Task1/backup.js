const fs = require('fs');

fs.copyFile('important.txt', 'important_backup.txt', (err) => {
  if (err) throw err;

  console.log("Backup created successfully");
});