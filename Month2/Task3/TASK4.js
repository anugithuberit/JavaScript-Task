const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === '/readfile') {

        fs.readFile('bigfilee.txt', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error reading file");
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

    } else if (req.url === '/streamfile') {

        const stream = fs.createReadStream('bigfile.txt', 'utf8');

        res.writeHead(200, { 'Content-Type': 'text/plain' });

        stream.pipe(res);

        stream.on('error', (err) => {
            res.writeHead(500);
            res.end("Error reading file");
        });

    } else {
        res.writeHead(404);
        res.end("Route not found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});