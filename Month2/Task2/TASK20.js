const http = require("http");

const server = http.createServer((req, res) => {
  
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/users") {
    const data = {
      users: ["Anu", "Petchiammal", "Murugan"]
    };
    res.writeHead(200);
    res.end(JSON.stringify(data));
  }

  else if (req.method === "GET" && req.url === "/products") {
    const data = {
      products: ["Laptop", "Phone", "Tablet"]
    };
    res.writeHead(200);
    res.end(JSON.stringify(data));
  }

  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(5880, () => {
  console.log("Server running at http://localhost:5880");
});