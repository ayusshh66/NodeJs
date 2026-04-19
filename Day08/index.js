const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer(function (req, res) {
    const methods = req.method;
    const path = req.url;

    const log = `[${Date.now()}] : ${methods} ${path}\n`;
    fs.appendFileSync('log.txt', log, 'utf-8');

    switch (methods) {
        case 'GET': {
            switch (path) {
                case '/':
                    res.writeHead(200);
                    return res.end('hello from the server');

                case '/tweet':
                    res.writeHead(200);
                    return res.end('tweet1 \n tweet-2');

                case '/contact-us':
                    res.writeHead(200);
                    return res.end('contact me on 4868353546846');
            }
            break;
        }

        case 'POST': {
            switch (path) {
                case '/tweet':
                    res.writeHead(201);
                    return res.end('tweet has been posted');
            }
            break;
        }
    }

    res.writeHead(404);
    return res.end("you are lost");
});

server.listen(8000, () => {
    console.log('server is running on port 8000');
});