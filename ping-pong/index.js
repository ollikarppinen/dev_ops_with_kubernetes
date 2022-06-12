const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));

let pingPongCount = 0;

app.get("/pingpong", (request, response) => {
  const body = {
    pingPongs: pingPongCount,
  };
  pingPongCount++;
  response.json(body);
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
