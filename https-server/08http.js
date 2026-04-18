const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log(`incoming request at time [${Date.now()}]`);
  console.log(req.method);

  res.writeHead(200);
//   res.end(`youu can accept ${req.headers['accept-language']}`);

  switch(req.url){
    case '/':
        return res.end("you are at home page");
    case '/contact':
        return res.end("you are at contact page")

    default:
        res.writeHead(404)
        return res.end("the end")
  }
});

server.listen(5000, () => {
  console.log("server is running on port : 5000");
});