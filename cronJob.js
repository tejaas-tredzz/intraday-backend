const cron = require("node-cron");
const generateStockReport = require("./dailyPicker");

// Schedule: Every day at 9:15 AM IST (adjust as needed)
cron.schedule("15 3 * * 1-5", () => {
  console.log("⏰ Running daily stock update...");
  generateStockReport();
}, {
  timezone: "Asia/Kolkata"
});

console.log("🌀 Cron job scheduled to run daily at 9:15 AM IST");
