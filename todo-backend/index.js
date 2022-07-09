const express = require("express");
const morgan = require("morgan");
const { matchedData, body, validationResult } = require("express-validator");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.options("*", cors());

const client = new Client();
client.connect();

const createTodoQuery = (description) => ({
  name: "create-todo",
  text: "INSERT INTO todos (created_at, description) VALUES(current_timestamp, $1)",
  values: [description],
});

const fetchTodosQuery = {
  name: "fetch-todos",
  text: "SELECT * FROM todos",
};

app.get("/", (request, response) => {
  response.status(200).send("Ok");
});

app.post(
  "/api/todos",
  body("description").notEmpty().isString().isLength({ min: 1, max: 140 }),
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const description = matchedData(request, {
      locations: ["body"],
    }).description;
    client.query(createTodoQuery(description), (err, res) => {
      if (err) {
        console.log("create todo failed", err.stack);
        return response.status(400).json({ error: "Failed to create todo" });
      } else {
        return response.json({ description });
      }
    });
  }
);

app.get("/api/todos", async (request, response) => {
  client.query(fetchTodosQuery, (err, res) => {
    if (err) {
      console.log("fetch todos failed", err.stack);
      return response.status(400).json({ error: "Failed to fetch todos" });
    } else {
      return response.json(res.rows);
    }
  });
});

app.listen(PORT, () =>
  console.log(`Server is up and running @ http://localhost:${PORT}`)
);
