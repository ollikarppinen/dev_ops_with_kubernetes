const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (request, response) => {
  response.json("FOOBAR");
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
