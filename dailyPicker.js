const fs = require("fs");
const path = require("path");

function categorizeStocks(stocks) {
  const highRisk = [];
  const moderateRisk = [];
  const lowRisk = [];

  stocks.forEach(stock => {
    if (stock.changePercent > 7) {
      highRisk.push(stock);
    } else if (stock.changePercent >= 2.5) {
      moderateRisk.push(stock);
    } else {
      lowRisk.push(stock);
    }
  });

  return {
    date: new Date().toISOString().split("T")[0],
    highRisk,
    moderateRisk,
    lowRisk,
    specialPick: highRisk[0] || moderateRisk[0] || lowRisk[0] || {}
  };
}

function generateStockReport() {
  const inputPath = path.join(__dirname, "data", "rawStocks.json");
  const outputPath = path.join(__dirname, "data", "stocks.json");

  const rawStocks = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  const categorized = categorizeStocks(rawStocks);

  fs.writeFileSync(outputPath, JSON.stringify(categorized, null, 2));
  console.log("✅ Stocks updated successfully!");
}

// Run it if this file is directly executed
if (require.main === module) {
  generateStockReport();
}

module.exports = generateStockReport;
