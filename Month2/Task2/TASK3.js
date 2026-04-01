const fs = require("fs");

function readFile(filename) {
  return new Promise((resolve, reject) => {
    console.log("Reading file...");
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function parseContent(content) {
  const lines = content.split("\n");
  const filtered = lines.filter(line => line.trim() !== "");

  console.log(`Parsing ${lines.length} lines, ${lines.length - filtered.length} empty removed`);

  return filtered;
}

function saveProcessed(lines) {
  return new Promise((resolve, reject) => {
    fs.writeFile("output.txt", lines.join("\n"), (err) => {
      if (err) return reject(err);
      console.log("Saved to output.txt");
      resolve();
    });
  });
}

function watchAndProcess(filename) {
  if (!fs.existsSync(filename)) {
    console.log(` File "${filename}" not found. Please create it first.`);
    return;
  }

  fs.watch(filename, (eventType) => {
    if (eventType === "change") {
      console.log(`File changed: ${filename}`);

      readFile(filename)
        .then(parseContent)
        .then(saveProcessed)
        .catch(err => console.error("Error:", err.message));
    }
  });

  console.log(`👀 Watching ${filename} for changes...`);
}

watchAndProcess("data.txt");
