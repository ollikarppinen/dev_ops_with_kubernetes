const express = require("express");
const { v4: uuidv4 } = require("uuid");

const UUID = uuidv4();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/status", (request, response) => {
  const body = {
    timestamp: new Date().toISOString(),
    uuid: UUID,
  };
  response.json(JSON.stringify(body));
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
