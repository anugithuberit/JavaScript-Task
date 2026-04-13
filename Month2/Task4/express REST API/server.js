const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Main App: ${req.method} ${req.url}`);
  next();
});

const userRoutes = require('./routes/users');

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({
    message: "Server is running"
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