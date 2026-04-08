// pipeExample.js
const fs = require('fs');

// create read stream
const readStream = fs.createReadStream('source.txt');

// create write stream
const writeStream = fs.createWriteStream('destination.txt');

console.log("Piping started...");
console.log("Data flowing from source.txt to destination.txt");

// connect both
readStream.pipe(writeStream);

// when writing is done
writeStream.on('finish', () => {
    console.log("Pipe complete — destination.txt written successfully");
});