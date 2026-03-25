const fs = require('fs');

fs.readdir('assets', (err, files) => {
  if (err) throw err;

  fs.writeFile('fileList.txt', files.join('\n'), (err) => {
    if (err) throw err;

    console.log("File list saved successfully");
  });
});