const http = require("http")


const server = http.createServer((req,res) => {
    console.log("i got an incoming request");
    res.writeHead(200);
    res.end('thanks for visiting')
    


});



server.listen(8000, () => {
    console.log(`http server is up and running in port number 8000 `);
    
})
