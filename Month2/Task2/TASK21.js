const http = require("http");

function getUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Arun", "Priya", "Kiran"]);
      
    }, 500);
  });
}

// Async function: getOrders
function getOrders() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([101, 102, 103, 104]);
    }, 500);
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/summary") {
    try {
     
      const [users, orders] = await Promise.all([
        getUsers(),
        getOrders()
      ]);

      const response = {
        users,
        orders,
        totalUsers: users.length,
        totalOrders: orders.length
      };

      res.writeHead(200);
      res.end(JSON.stringify(response));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(4800, () => {
  console.log("Server running at http://localhost:4800");
});