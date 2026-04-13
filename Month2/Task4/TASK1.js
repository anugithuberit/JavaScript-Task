const express = require('express');
const app = express();

const PORT = 3000;

// Middleware: Log all incoming requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Route: Home
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the Express Server"
  });
});

// Route: Status
app.get('/status', (req, res) => {
  res.status(200).json({
    message: "Server is running",
    status: "OK"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});