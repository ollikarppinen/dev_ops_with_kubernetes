const express = require("express");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const DUMMY_SITE_URL = process.env.DUMMY_SITE_URL || "https://example.com";
const DUMMY_SITE_PATH =
  process.env.DUMMY_SITE_PATH || path.join(__dirname, "/dummy.html");

const downloadDummySite = async () => {
  console.log(`Fetching "${DUMMY_SITE_URL}"...`);
  const res = await fetch(DUMMY_SITE_URL);
  const fileStream = fs.createWriteStream(DUMMY_SITE_PATH);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
};

downloadDummySite();

app.get("/", (req, res) => {
  if (!fs.existsSync(DUMMY_SITE_PATH))
    return response.status(400).send("Dummy site not fetched!");
  res.sendFile(DUMMY_SITE_PATH);
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
