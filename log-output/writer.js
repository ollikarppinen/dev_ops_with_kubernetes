const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

let UUID = uuidv4();

setInterval(() => (UUID = uuidv4()), 5000);

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (request, response) => {
  response.status(200).send("Ok");
});

app.get("/uuid", (request, response) => {
  const body = {
    uuid: UUID,
  };
  response.json(body);
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
