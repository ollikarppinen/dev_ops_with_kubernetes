const express = require("express");
const morgan = require("morgan");
const fetch = require("node-fetch");

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
const NATS_TODO_TOPIC = "todos";
const NATS_QUEUE = "todo-publisher";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const { connect, StringCodec } = nats;

const publishChatMessage = (message) => {
  const urlEncodedMessage = encodeURIComponent(message);
  fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${urlEncodedMessage}`,
    { method: "POST" }
  )
    .then((_res) => console.log("Message was successfully sent to Telegram"))
    .catch((err) =>
      console.log(console.log("Telegram message publish error: " + err))
    );
};

const setupSubscriptions = async () => {
  try {
    const nc = await connect({ servers: NATS_URL });
    const sc = StringCodec();
    const sub = nc.subscribe(NATS_TODO_TOPIC, { queue: NATS_QUEUE });
    for await (const m of sub) {
      const messageData = sc.decode(m.data);
      publishChatMessage(messageData);
      console.log(`[${sub.getProcessed()}]: ${messageData}`);
    }
  } catch (err) {
    console.error("There was an uncaught error", err);
  }
};

app.listen(PORT, () => {
  setupSubscriptions();
  console.log(`Server is up and running @ http://localhost:${PORT}`);
});
