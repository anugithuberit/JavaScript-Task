const http = require("http");
const PORT = 8000;
const server = http.createServer((req, res) => {
  
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/users") {
    const users = ["Petchiammal", "Murugan", "Anu"];

    res.writeHead(200);
    res.end(JSON.stringify({ users }));

  }
  
  else if (req.method === "GET" && req.url === "/products") {
    const products = ["Laptop", "Phone", "Tablet"];

    res.writeHead(200);
    res.end(JSON.stringify({ products }));

  }
  
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
