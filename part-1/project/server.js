var http = require("http");

const host = "localhost";
const port = process.env.PORT;

const requestListener = function (_req, res) {
  res.writeHead(200);
  res.end("Exercise 1.05: Project v0.3");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server started in port ${port}`);
});
