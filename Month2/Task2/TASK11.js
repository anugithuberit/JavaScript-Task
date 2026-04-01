const http = require("http");

function parseJSON(body) {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(body);
      resolve(data);
    } catch (err) {
      reject("Invalid JSON");
    }
  });
}

function validateSchema(data) {
  return new Promise((resolve, reject) => {
    if (!data.name || !data.age || !data.email) {
      reject("Missing required fields");
    } else {
      resolve(data);
    }
  });
}

function transformData(data) {
  return new Promise((resolve) => {
    const transformed = {
      name: data.name.toUpperCase(),
      age: data.age,
      email: "xyz@gmail.com"
    };
    resolve(transformed);
  });
}

function buildResponse(data) {
  return {
    success: true,
    data: data
  };
}

const server = http.createServer((req, res) => {

  if (req.method === "POST" && req.url === "/process") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {

      parseJSON(body)
        .then(validateSchema)
        .then(transformData)
        .then(result => {
          const response = buildResponse(result);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(response));
        })
        .catch(err => {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: err }));
        });

    });

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }

});

server.listen(5880, () => {
  console.log("Server running at http://localhost:5880");
});
