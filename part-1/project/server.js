var http = require("http");

const port = process.env.PORT || 3000;

const requestListener = function (_req, res) {
  res.writeHead(200);
  res.end("Exercise 1.05: Project v0.3");
};

const server = http.createServer(requestListener);
server.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
