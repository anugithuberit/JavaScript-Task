const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({ message: "Server is working" });
});

app.get('/error', (req, res, next) => {
  const err = new Error("Something went wrong");
  err.status = 500;
  next(err);
});

app.get('/user', (req, res, next) => {
  try {
    const user = null;

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    error: err.message || "Something went wrong",
    statusCode: err.status || 500
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});