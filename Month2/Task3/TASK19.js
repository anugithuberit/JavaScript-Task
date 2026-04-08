const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === '/csv') {

        const stream = fs.createReadStream('data1.csv');

        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=data.csv'
        });

        stream.pipe(res);

        stream.on('error', () => {
            res.writeHead(500);
            res.end("Error loading CSV file");
        });

    } else {
        res.writeHead(404);
        res.end("Page not found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});