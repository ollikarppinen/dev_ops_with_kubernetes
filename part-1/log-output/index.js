const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/logoutput", (request, response) => {
  var uuid = fs.readFileSync("/app/shared/uuid.txt", "utf8");
  const body = {
    timestamp: new Date().toISOString(),
    uuid: uuid,
  };
  response.json(body);
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
