const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("./cronJob"); // 🌀 Auto-updater

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Endpoint to serve stock picks
app.get("/api/stocks", (req, res) => {
  const dataPath = path.join(__dirname, "data", "stocks.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

app.get("/api/stocks", (req, res) => {
  const dataPath = path.join(__dirname, "data", "stocks.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  res.json(data);
});

