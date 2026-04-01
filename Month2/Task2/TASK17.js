const http = require("http");
const fs = require("fs");
const path = require("path");


function receiveChunks(req) {
  return new Promise((resolve, reject) => {
    let data = [];

    req.on("data", chunk => {
      data.push(chunk);
    });

    req.on("end", () => {
      const buffer = Buffer.concat(data);
      resolve(buffer);
    });

    req.on("error", reject);
  });
}

function validateFile(buffer) {
  const size = buffer.length;

  if (size > 1024 * 1024) {
    throw new Error("File too large (max 1MB)");
  }

  return size;
}

function scanFile() {
  return new Promise(resolve => {
    console.log("Scanning file...");
    setTimeout(() => {
      console.log(" Scan complete");
      resolve();
    }, 500);
  });
}

function saveFile(buffer, filename) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, buffer, err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function generateThumbnail(filename) {
  return new Promise(resolve => {
    const thumbName = "thumb_" + filename;

    setTimeout(() => {
      fs.writeFileSync(thumbName, "thumbnail content"); 
      resolve(thumbName);
    }, 300);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
    try {
      console.log("Receiving file...");

      const buffer = await receiveChunks(req);
      const size = validateFile(buffer);

      await scanFile();

      const filename = "photo.jpg";

      const [_, thumbnail] = await Promise.all([
        saveFile(buffer, filename),
        generateThumbnail(filename)
      ]);

      const response = {
        success: true,
        filename: filename,
        size: Math.round(size / 1024) + "KB",
        thumbnail: thumbnail
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));

    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});
server.listen(7000, () => {
  console.log(" Server running at http://localhost:7000");
});
