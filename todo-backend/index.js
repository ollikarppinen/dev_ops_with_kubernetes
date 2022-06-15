const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));

let todos = [];

app.get("/api/todos", async (request, response) => {
  response.json(todos);
});

app.post("/api/todos", async (request, response) => {
  response.json({});
});

app.listen(PORT, () =>
  console.log(`Server is up and running @ http://localhost:${PORT}`)
);
