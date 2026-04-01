const http = require("http");
function authService(token) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === "secret123") {
        resolve({ userId: 1 });
      } else {
        reject("Unauthorized");
      }
    }, 300);
  });
}

function userService(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Arun",
        email: "arun@mail.com",
        plan: "pro"
      });
    }, 500);
  });
}

function billingService(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        due: 1200,
        nextDate: "2024-02-01"
      });
    }, 400);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/profile") {
    const token = req.headers["x-auth"];

    try {
      console.log("Authenticating...");
      const authResult = await authService(token);
      console.log("Auth success");
      const [user, billing] = await Promise.all([
        userService(authResult.userId),
        billingService(authResult.userId)
      ]);

      const response = { user, billing };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));

    } catch (err) {
      
      res.writeHead(401, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err }));
    }

  } else {
    
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(6000, () => {
  console.log("Server running at http://localhost:6000");
});
