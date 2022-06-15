const express = require("express");
const morgan = require("morgan");
const { matchedData, body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));

let todos = [];

app.post(
  "/api/todos",
  body("description").notEmpty().isString(),
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const bodyData = matchedData(request, { locations: ["body"] });
    const newTodo = { uuid: uuidv4(), ...bodyData };
    todos.push(newTodo);

    response.json(newTodo);
  }
);

app.get("/api/todos", async (request, response) => {
  response.json({ todos });
});

app.listen(PORT, () =>
  console.log(`Server is up and running @ http://localhost:${PORT}`)
);
