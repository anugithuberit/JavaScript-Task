const http = require('http');

const server = http.createServer((req, res) => {

    console.log("Headers Received:");

    for (let key in req.headers) {
        console.log(`${key}: ${req.headers[key]}`);
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Headers logged in console");

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});