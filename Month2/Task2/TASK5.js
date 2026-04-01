const http = require("http");
function unstableDB() {
  return new Promise((resolve, reject) => {
    const fail = Math.random() < 0.7;

    setTimeout(() => {
      if (fail) {
        reject("DB Error");
      } else {
        resolve(["data1", "data2", "data3"]);
      }
    }, 300);
  });
}
function fallbackData() {
  return ["cached1", "cached2"];
}
async function fetchWithRetry() {
  const delays = [500, 1000, 2000];

  for (let i = 0; i < delays.length; i++) {
    try {
      const data = await unstableDB();
      return { source: "db", data };
    } catch (err) {
      if (i < delays.length - 1) {
        console.log(`Attempt ${i + 1} failed — retrying in ${delays[i]}ms`);
        await new Promise(res => setTimeout(res, delays[i]));
      } else {
        console.log(`Attempt ${i + 1} failed — using fallback`);
        return { source: "cache", data: fallbackData() };
      }
    }
  }
}
const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/data") {
    const result = await fetchWithRetry();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});
server.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});