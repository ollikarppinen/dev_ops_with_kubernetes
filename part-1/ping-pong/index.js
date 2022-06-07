const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let requestCounter = 0;

app.get("/pingpong", (request, response) => {
  response.json(`pong ${requestCounter}`);
  requestCounter += 1;
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
