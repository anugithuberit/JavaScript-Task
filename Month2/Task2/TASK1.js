
const http = require("http");
const rateStore = {};
const LIMIT = 5;
const WINDOW = 60 * 1000; 

// Logger
function logger(req, res, next) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
}

// Auth
function auth(req, res, next) {
  const token = req.headers["x-auth"];

  if (token !== "secret123") {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Unauthorized" }));
  }

  console.log("Auth passed");
  next();
}

//Rate Limit
function rateLimit(req, res, next) {
  const ip = req.socket.remoteAddress;
  const now = Date.now();

  if (!rateStore[ip]) {
    rateStore[ip] = [];
  }
  rateStore[ip] = rateStore[ip].filter(time => now - time < WINDOW);

  if (rateStore[ip].length >= LIMIT) {
    res.writeHead(429, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Too many requests" }));
  }

  rateStore[ip].push(now);
  console.log(`Rate limit: ${rateStore[ip].length}/${LIMIT}`);
  next();
}
//middleware
function runMiddlewares(req, res, middlewares) {
  let index = 0;

  function next() {
    if (index < middlewares.length) {
      const middleware = middlewares[index++];
      middleware(req, res, next);
    }
  }

  next();
}
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/secure") {
    runMiddlewares(req, res, [
      logger,
      auth,
      rateLimit,
      (req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Secure data accessed" }));
        console.log("Response sent");
      }
    ]);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
