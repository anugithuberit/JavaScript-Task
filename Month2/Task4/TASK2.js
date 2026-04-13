const express = require('express');
const app = express();

const PORT = 3000;

app.use((req, res, next) => {
  console.log(`Route accessed: ${req.method} ${req.url}`);
  next();
});
const getTimestamp = () => {
  return new Date().toISOString();
};

app.get('/home', (req, res) => {
  res.status(200).json({
    route: "home",
    message: "Welcome to Home Page",
    timestamp: getTimestamp()
  });
});

app.get('/about', (req, res) => {
  res.status(200).json({
    route: "about",
    message: "Welcome to About Page",
    timestamp: getTimestamp()
  });
});

app.get('/contact', (req, res) => {
  res.status(200).json({
    route: "contact",
    message: "Welcome to Contact Page",
    timestamp: getTimestamp()
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    status: 404,
    timestamp: getTimestamp()
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});