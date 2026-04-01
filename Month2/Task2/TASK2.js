const http = require("http");

let activeRequests = 0;       
const queue = [];             
let requestId = 1;            

function fakeDBCall(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Request ${id}: done`);
    }, 1000);
  });
}
async function handleRequest(req, res, id) {
  activeRequests++;
  console.log(`Request ${id}: processing`);

  const start = Date.now();

  await fakeDBCall(id);

  const timeTaken = Date.now() - start;
  console.log(`Request ${id}: done in ${timeTaken}ms`);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`Request ${id} done`);
  activeRequests--;
  if (queue.length > 0) {
    const next = queue.shift();
    next();
  }
}
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    const currentId = requestId++;

    if (activeRequests < 2) {
      handleRequest(req, res, currentId);
    } else {
      console.log(`Request ${currentId}: queued (waiting)`);

      queue.push(() => {
        handleRequest(req, res, currentId);
      });
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});
server.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});