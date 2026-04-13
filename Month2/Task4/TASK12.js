const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
function validateUser(req, res, next) {
  const { name, email } = req.body;

  if (!name || !email) {
    console.log("Validation Failed: Missing name or email");

    return res.status(400).json({
      error: "Name and email are required",
      status: "failed"
    });
  }

  next();
}
app.post('/register', validateUser, (req, res) => {
  res.status(201).json({
    message: "User registered successfully",
    data: req.body
  });
});

app.post('/subscribe', validateUser, (req, res) => {
  res.status(201).json({
    message: "Subscription successful",
    data: req.body
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