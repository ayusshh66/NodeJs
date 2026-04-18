const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log(`incoming request at time [${Date.now()}]`);
  console.log(req.method);

  res.writeHead(200);
  res.end(`youu can accept ${req.headers['accept-language']}`);
});

server.listen(5000, () => {
  console.log("server is running on port : 5000");
});