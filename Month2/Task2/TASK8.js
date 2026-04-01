const http = require("http");

let jobs = {};        
let jobId = 1;        
function processJob(job) {
  const delay = Math.floor(Math.random() * 3000) + 1000; 
  setTimeout(() => {
    job.status = "running";
    console.log(`Job ${job.id} → running`);
  }, 100);

  setTimeout(() => {
    job.status = "done";
    console.log(`Job ${job.id} → done`);
  }, delay);
}
const server = http.createServer((req, res) => {
  // 🔹 POST /jobs → create job
  if (req.method === "POST" && req.url === "/jobs") {
    const id = jobId++;

    const job = {
      id,
      type: "default",
      status: "queued"
    };

    jobs[id] = job;

    console.log(`Job ${id} → queued`);
    processJob(job);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ id, status: "queued" }));
  }
  else if (req.method === "GET" && req.url.startsWith("/jobs/")) {
    const id = req.url.split("/")[2];
    const job = jobs[id];

    if (!job) {
      res.writeHead(404);
      return res.end("Job not found");
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(job));
  }

  else if (req.method === "GET" && req.url === "/jobs") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(Object.values(jobs)));
  }

  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(6000, () => {
  console.log("Server running at http://localhost:6000");
});