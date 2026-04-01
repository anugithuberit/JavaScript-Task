const http = require("http");
async function parseJSON(data) {
  return JSON.parse(data);
}

async function validateSchema(obj) {
  if (!obj.name || !obj.age || !obj.email) {
    throw new Error("Validation failed");
  }
  return obj;
}

async function transformData(obj) {
  return {
    name: obj.name.toUpperCase(),
    age: obj.age,
    email: "xyz@gmail.com" 
  };
}

async function buildResponse(obj) {
  return {
    success: true,
    data: obj
  };
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/process") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const parsed = await parseJSON(body);
        const valid = await validateSchema(parsed);
        const transformed = await transformData(valid);
        const response = await buildResponse(transformed);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(response));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Invalid data" }));
      }
    });

  } else {
    res.writeHead(404);
    res.end("Route not found");
  }
});

server.listen(7000, () => {
  console.log("Server running on http://localhost:7000");
});