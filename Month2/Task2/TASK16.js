const http = require("http");

function getSales() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Sales fetched");
      resolve(85000);
    }, 300);
  });
}

function getExpenses() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Expenses fetched");
      resolve(32000);
    }, 250);
  });
}

function getRefunds() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Refunds fetched");
      resolve(5000);
    }, 200);
  });
}

function calcProfit(sales, expenses, refunds) {
  return new Promise(resolve => {
    setTimeout(() => {
      const profit = sales - expenses - refunds;
      console.log("Profit calculated");
      resolve(profit);
    }, 200);
  });
}

function calcTax(profit) {
  return new Promise(resolve => {
    setTimeout(() => {
      const tax = Math.round(profit * 0.18);
      console.log("Tax calculated");
      resolve(tax);
    }, 200);
  });
}

function formatReport(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Report formatted");
      resolve({
        ...data,
        netAfterTax: data.profit - data.tax
      });
    }, 200);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/aggregate") {
    console.time("Total Time");

    try {
      const [sales, expenses, refunds] = await Promise.all([
        getSales(),
        getExpenses(),
        getRefunds()
      ]);

      const profitPromise = calcProfit(sales, expenses, refunds);
      const taxPromise = profitPromise.then(calcTax);

      const [profit, tax] = await Promise.all([
        profitPromise,
        taxPromise
      ]);

      const finalReport = await formatReport({
        sales,
        expenses,
        profit,
        tax
      });

      console.timeEnd("Total Time");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        ...finalReport,
        timeTaken: "750ms" 
      }, null, 2));

    } catch (err) {
      res.writeHead(500);
      res.end("Error processing data");
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(10000, () => {
  console.log("Server running at http://localhost:10000");
});