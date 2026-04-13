const express = require('express');
const app = express();

const PORT = 3000;

const users = [
  { username: "sai", email: "sai@mail.com", role: "student" },
  { username: "anu", email: "anu@mail.com", role: "admin" },
  { username: "rahul", email: "rahul@mail.com", role: "student" },
  { username: "priya", email: "priya@mail.com", role: "mentor" },
  { username: "karthik", email: "karthik@mail.com", role: "student" }
];

app.use('/users/:username', (req, res, next) => {
  console.log(`Requested Username: ${req.params.username}`);
  next();
});

app.get('/users/:username', (req, res) => {
  const username = req.params.username.toLowerCase();

  const user = users.find(u => u.username.toLowerCase() === username);
  if (!user) {
    return res.status(404).json({
      error: "User not found",
      timestamp: new Date().toISOString()
    });
  }

  res.status(200).json({
    ...user,
    requestTime: new Date().toISOString()
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