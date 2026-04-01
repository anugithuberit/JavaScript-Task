const http = require("http");

const PORT = 9000;

function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Arun", "Priya", "Kiran"]);
    }, 500);
  });
}

function getOrders() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([101, 102, 103, 104]);
    }, 400);
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
      res.end(JSON.stringify({ error: "Failed to fetch data" }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
