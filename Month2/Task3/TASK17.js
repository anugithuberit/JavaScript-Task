// serverHeaders.js
const http = require('http');

http.createServer((req, res) => {

    const startTime = Date.now(); // start time

    let message = "";

    if (req.url === '/') {
        message = "Home Page";
    } else if (req.url === '/api') {
        message = "API Route";
    }

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // set headers
    res.setHeader('X-Powered-By', 'Node.js');
    res.setHeader('X-Response-Time', responseTime + 'ms');
    res.setHeader('Content-Type', 'text/html');

    console.log("Response Headers Sent:");
    console.log(res.getHeaders());

    res.end(message);

}).listen(3800);

console.log("Server running at http://localhost:3800");