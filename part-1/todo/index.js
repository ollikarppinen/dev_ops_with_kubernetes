const express = require("express");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const IMAGE_URL = "https://picsum.photos/1200";
const PERSISTED_IMAGE_PATH =
  process.env.PERSISTED_IMAGE_PATH ||
  path.join(__dirname, "/downloadedImage.jpg");

const downloadImage = async () => {
  const res = await fetch(IMAGE_URL);
  const fileStream = fs.createWriteStream(PERSISTED_IMAGE_PATH);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/image.jpg", async (req, res) => {
  try {
    if (!fs.existsSync(PERSISTED_IMAGE_PATH)) await downloadImage();
    res.sendFile(PERSISTED_IMAGE_PATH);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);
