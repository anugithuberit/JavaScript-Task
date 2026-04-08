const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === '/image') {

        fs.createReadStream('image.png');
res.writeHead(200, { 'Content-Type': 'image/png' });

        stream.pipe(res);

        stream.on('error', (err) => {
            if (!res.headersSent) {
                res.writeHead(500);
                res.end("Error loading image");
            }
        });

    } else {
        res.writeHead(404);
        res.end("Page not found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});