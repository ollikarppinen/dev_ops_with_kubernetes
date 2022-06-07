const express = require("express");
const { v4: uuidv4 } = require("uuid");

const UUID = uuidv4();
setInterval(() => console.log(`${new Date().toISOString()}: ${UUID}`), 5000);

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
