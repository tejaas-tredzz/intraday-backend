const cron = require("node-cron");
const generateStockReport = require("./dailyPicker");

cron.schedule("15 9 * * 1-5", () => {
  console.log("⏰ Running daily stock update...");
  generateStockReport();
}, {
  timezone: "Asia/Kolkata"
});

console.log("🌀 Cron job scheduled to run daily at 9:15 AM IST");

