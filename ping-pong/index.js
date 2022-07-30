const express = require("express");
const morgan = require("morgan");
const { Client } = require("pg");

const app = express();
const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));

const client = new Client();
client.connect();

const createPingPongQuery = {
  name: "create-pingpong",
  text: "INSERT INTO pingpongs (created_at) VALUES (current_timestamp)",
};

const pingPongCountQuery = {
  name: "fetch-pingpong-count",
  text: "SELECT COUNT(*) FROM pingpongs",
};

app.get("/", (request, response) => {
  response.status(200).send("Ok");
});

app.get("/healthz", (request, response) => {
  client.query("SELECT NOW()", (err, res) => {
    if (err) {
      console.log("healthz failed", err.stack);
      return response.status(500).send("Not ok");
    } else {
      console.log("HEALTHZ SUCCESS", res.rows);
      response.status(200).send("Ok");
    }
  });
});

app.get("/pingpong", (request, response) => {
  client.query(createPingPongQuery, (err, res) => {
    if (err) {
      console.log("fetchPingPongCount failed", err.stack);
      return response.json({ error: "Failed to create ping pong" });
    } else {
      client.query(pingPongCountQuery, (err, res) => {
        if (err) {
          console.log("Failed to fetch ping pong count", err.stack);
          return response.json({ error: "Failed to fetch ping pong count" });
        } else {
          response.json(res.rows[0]);
        }
      });
    }
  });
});

app.listen(EXPRESS_PORT, () =>
  console.log(`Express server currently running on port ${EXPRESS_PORT}`)
);
