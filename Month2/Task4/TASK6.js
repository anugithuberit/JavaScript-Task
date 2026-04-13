const express = require('express');
const app = express();
const PORT = 3000;
app.use((req, res, next) => {
  const startTime = new Date();

  res.on('finish', () => {
    const endTime = new Date();
    const timeStamp = startTime.toISOString();

    console.log(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${timeStamp}`
    );
  });

  next(); 
});


app.get('/', (req, res) => {
  res.status(200).json({ message: "Home route" });
});

app.get('/api/products', (req, res) => {
  res.status(200).json({ message: "Products route" });
});

app.get('/about', (req, res) => {
  res.status(200).json({ message: "About route" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});