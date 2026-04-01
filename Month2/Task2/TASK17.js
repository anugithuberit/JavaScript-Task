const http = require("http");
const fs = require("fs");
const path = require("path");
function receiveChunks(req) {
  return new Promise((resolve, reject) => {
    let data = Buffer.alloc(0);

    req.on("data", chunk => {
      data = Buffer.concat([data, chunk]);
    });

    req.on("end", () => {
      console.log("Chunks received");
      resolve(data);
    });

    req.on("error", reject);
  });
}

function validateFile(buffer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sizeInMB = buffer.length / (1024 * 1024);

      if (sizeInMB > 1) {
        return reject("File too large (>1MB)");
      }

      console.log("File validated");
      resolve(buffer);
    }, 200);
  });
}

function scanFile(buffer) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("File scanned (no virus)");
      resolve(buffer);
    }, 500);
  });
}

function saveFile(buffer, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, filename);

    fs.writeFile(filePath, buffer, err => {
      if (err) return reject(err);

      console.log("File saved");
      resolve(filename);
    });
  });
}

function generateThumbnail(filename) {
  return new Promise(resolve => {
    setTimeout(() => {
      const thumbName = "thumb_" + filename;
      console.log("Thumbnail generated");
      resolve(thumbName);
    }, 300);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
    try {
      
      const buffer = await receiveChunks(req);
      await validateFile(buffer);
      await scanFile(buffer);
      const filename = "photo.jpg";
    
      const [savedFile, thumbnail] = await Promise.all([
        saveFile(buffer, filename),
        generateThumbnail(filename)
      ]);

      const sizeKB = Math.round(buffer.length / 1024);

      const response = {
        success: true,
        filename: savedFile,
        size: `${sizeKB}KB`,
        thumbnail: thumbnail
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response, null, 2));

    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.toString() }));
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(12000, () => {
  console.log("Server running at http://localhost:12000");
});