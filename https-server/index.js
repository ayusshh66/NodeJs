const http = require("http")


const server = http.createServer();

server.listen(8000, () => {
    console.log(`http server is up and running in port number 8000 `);
    
})
