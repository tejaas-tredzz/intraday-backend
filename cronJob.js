const cron = require("node-cron");
const { NseIndia } = require("stock-nse-india");
const fs = require("fs");
const path = require("path");
const generateStockReport = require("./dailyPicker");

async function fetchStocks() {
  console.log("📡 Fetching real-time stock data...");
  const nse = new NseIndia();
  const symbols = ["TCS", "INFY", "RELIANCE"]; // Modify as needed
  const data = await Promise.all(symbols.map(sym => nse.getEquityDetails(sym)));

  fs.writeFileSync(path.join(__dirname, "data", "rawStocks.json"), JSON.stringify(data, null, 2));
  console.log("✅ Raw stocks saved.");
}

async function runDailyTask() {
  console.log("⏰ Running daily real-time stock task...");
  await fetchStocks();
  generateStockReport();
  console.log("🏁 Daily task complete.");
}

if (require.main === module) runDailyTask();

cron.schedule("15 9 * * 1-5", () => {
  runDailyTask();
}, { timezone: "Asia/Kolkata" });

console.log("🌀 Real-time cron scheduled at 9:15 AM IST (Mon–Fri)");
