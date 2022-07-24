const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("combined"));

app.get("/", (request, response) => {
  response.status(200).send("Ok");
});

app.get("/healthz", (request, response) => {
  response.status(200).send("Ok");
});

const nats = require("nats");

const NATS_URL =
  process.env.NATS_URL || "nats://my-nats.default.svc.cluster.local:4222";
const TODO_TOPIC = "todos";

const { connect, StringCodec } = nats;

const setupSubscriptions = async () => {
  try {
    const nc = await connect({ servers: NATS_URL });
    const sc = StringCodec();
    const sub = nc.subscribe(TODO_TOPIC);
    for await (const m of sub) {
      console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    }
  } catch (err) {
    console.error("There was an uncaught error", err);
  }
};

app.listen(PORT, () => {
  setupSubscriptions();
  console.log(`Server is up and running @ http://localhost:${PORT}`);
});
