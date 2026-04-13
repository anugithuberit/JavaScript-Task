const express = require('express');
const app = express();
const PORT = 3000;
const VALID_TOKEN = "secret123";
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  console.log(`Auth Attempt -> Token: ${token}`);
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access - Token missing"
    });
  }

  if (token !== VALID_TOKEN) {
    return res.status(403).json({
      message: "Forbidden - Invalid token"
    });
  }
  next();
}

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Public route accessible"
  });
});

app.get('/dashboard', authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to Dashboard"
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});