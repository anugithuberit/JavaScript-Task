const fs = require("fs");
// Read File
function readFileAsync(filename) {
  return new Promise((resolve, reject) => {
    console.log("Reading file...");
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
//Parse Content
function parseContent(data) {
  const lines = data.split("\n");
  const filtered = lines.filter(line => line.trim() !== "");

  const removed = lines.length - filtered.length;

  console.log(`Parsing ${lines.length} lines, ${removed} empty removed`);
  return filtered;
}
// Save Processed Data
function saveProcessed(lines) {
  return new Promise((resolve, reject) => {
    fs.writeFile("output.txt", lines.join("\n"), (err) => {
      if (err) return reject(err);
      console.log("Saved to output.txt");
      resolve();
    });
  });
}

// Main Function
function watchAndProcess(filename) {
  fs.watch(filename, async () => {
    console.log(`File changed: ${filename}`);

    try {
      const data = await readFileAsync(filename);
      const parsed = parseContent(data);
      await saveProcessed(parsed);
    } catch (err) {
      console.error("Error:", err.message);
    }
  });
}
watchAndProcess("data.txt");