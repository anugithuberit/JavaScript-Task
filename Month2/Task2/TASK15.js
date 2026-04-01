const http = require("http");

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject("Invalid JSON");
      }
    });
  });
}

function validateOrder(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!order.item || !order.qty || !order.userId) {
        return reject("Missing required fields");
      }
      console.log("Order validated");
      resolve(order);
    }, 200);
  });
}

function checkInventory(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.qty > 5) {
        return reject("Out of stock");
      }
      console.log("Inventory available");
      resolve(true);
    }, 300);
  });
}

function chargePayment(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.userId === "fail") {
        return reject("Payment failed");
      }
      console.log("Payment successful");
      resolve(true);
    }, 300);
  });
}

function createShipment() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const trackingId = "TRK-" + Math.floor(Math.random() * 9000 + 1000);
      console.log("Shipment created");
      resolve(trackingId);
    }, 300);
  });
}

function sendConfirmation() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Email sent");
      resolve(true);
    }, 300);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/orders") {
    try {
      const order = await getRequestBody(req);

      // Step 1
      await validateOrder(order);

      // Step 2 (parallel)
      await Promise.all([
        checkInventory(order),
        chargePayment(order)
      ]);

      // Step 3 (parallel)
      const [trackingId, emailSent] = await Promise.all([
        createShipment(),
        sendConfirmation()
      ]);

      const response = {
        orderId: "ORD-" + Math.floor(Math.random() * 9000 + 1000),
        status: "confirmed",
        trackingId,
        emailSent
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response, null, 2));

    } catch (error) {
      // Handle different failures
      let statusCode = 400;

      if (error === "Payment failed") statusCode = 402;
      if (error === "Out of stock") statusCode = 409;

      res.writeHead(statusCode, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error }));
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(2000, () => {
  console.log("Server running at http://localhost:2000");
});