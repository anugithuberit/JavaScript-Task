const http = require("http");

let totalRequests = 0;
let successCount = 0;
let errorCount = 0;
let totalResponseTime = 0;

const server = http.createServer((req, res) => {
  const startTime = Date.now();
  totalRequests++;

  if (req.method === "GET" && req.url === "/hello") {
    const delay = Math.floor(Math.random() * 400) + 100; // 100–500ms

    setTimeout(() => {
      const responseTime = Date.now() - startTime;

      successCount++;
      totalResponseTime += responseTime;

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello World");

      console.log(`Handled /hello in ${responseTime}ms`);
    }, delay);
  }

  else if (req.method === "GET" && req.url === "/fail") {
    const responseTime = Date.now() - startTime;

    errorCount++;
    totalResponseTime += responseTime;

    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");

    console.log(`Handled /fail in ${responseTime}ms`);
  }

  else if (req.method === "GET" && req.url === "/stats") {
    const avgResponseTime =
      totalRequests === 0
        ? 0
        : Math.round(totalResponseTime / totalRequests);

    const stats = {
      totalRequests,
      successCount,
      errorCount,
      avgResponseTime: `${avgResponseTime}ms`,
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(stats, null, 2));
  }

  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(9000, () => {
  console.log("Server running at http://localhost:9000");
});