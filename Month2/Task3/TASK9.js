const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.url === '/') {

        fs.readFile('home.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading Home page");
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });

    } else if (req.url === '/about') {

        fs.readFile('about.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading About page");
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });

    } else if (req.url === '/contact') {

        fs.readFile('contact.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading Contact page");
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });

    } else {
        res.writeHead(404);
        res.end("Page not found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});