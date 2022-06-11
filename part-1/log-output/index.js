const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/logoutput", (request, response) => {
  const uuid = fs.readFileSync("/app/shared/uuid.txt", "utf8");
  const pingPongRequestCount = fs.readFileSync(
    "/app/shared-ping-pong/request-count.txt",
    "utf8"
  );
  const timestamp = new Date().toISOString();

  const body = {
    timestamp,
    uuid,
    pingPongRequestCount,
  };
  response.json(body);
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
