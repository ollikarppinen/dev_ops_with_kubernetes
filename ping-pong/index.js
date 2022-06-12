const fs = require("fs");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

fs.writeFile("/app/shared-ping-pong/request-count.txt", String(0), (err) => {
  if (err) {
    console.error("Initial ping pong request count write error", err);
  }
});

const getPingPongRequestCount = (() => {
  let pingPongRequestCount = 0;

  return () => {
    pingPongRequestCount++;
    fs.writeFile(
      "/app/shared-ping-pong/request-count.txt",
      String(pingPongRequestCount),
      (err) => {
        if (err) {
          console.error("Ping pong request count write error", err);
        }
      }
    );
    return pingPongRequestCount;
  };
})();

app.get("/pingpong", (request, response) => {
  response.json(`pong ${getPingPongRequestCount()}`);
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
