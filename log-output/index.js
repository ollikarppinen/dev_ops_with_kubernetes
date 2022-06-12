const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;
const UUID_URL = "http:localhost:3001/uuid";

app.use(express.json());
app.use(morgan("tiny"));

const fetchUuid = async () => {
  const response = await fetch(UUID_URL);
  const jsonResponse = await response.json();
  return jsonResponse.uuid;
};

app.get("/logoutput", async (request, response) => {
  const uuid = await fetchUuid();
  console.log("UUID", uuid);
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
  console.log(`Server is up and running @ http://localhost:${PORT}`)
);
