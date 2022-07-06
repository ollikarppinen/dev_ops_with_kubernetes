const express = require("express");
const fetch = require("node-fetch");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;
const UUID_URL = "http:localhost:3001/uuid";
const PING_PONG_URL = "http://ping-pong-svc/pingpong";
const LOG_MESSAGE = process.env.LOG_MESSAGE || "Default log message";

app.use(express.json());
app.use(morgan("tiny"));

const fetchUuid = async () => {
  const response = await fetch(UUID_URL);
  const jsonResponse = await response.json();
  return jsonResponse.uuid;
};

const fetchPingPongs = async () => {
  const response = await fetch(PING_PONG_URL);
  const jsonResponse = await response.json();
  return jsonResponse.count;
};

app.get("/", (request, response) => {
  response.status(200).send("Ok");
});

app.get("/logoutput", async (request, response) => {
  const uuid = await fetchUuid();
  const pingPongRequestCount = await fetchPingPongs();
  const timestamp = new Date().toISOString();

  const body = {
    timestamp,
    uuid,
    pingPongRequestCount,
  };
  response.json(body);
});

app.listen(PORT, () => {
  console.log(`Server is up and running @ http://localhost:${PORT}`);
  console.log(LOG_MESSAGE);
});
