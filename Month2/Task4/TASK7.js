const express = require('express');
const app = express();
const PORT = 3000;
const products = [
  { id: 101, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 102, name: "Mobile", price: 20000, category: "Electronics" },
  { id: 103, name: "Chair", price: 3000, category: "Furniture" },
  { id: 104, name: "Book", price: 500, category: "Education" },
  { id: 105, name: "Headphones", price: 1500, category: "Electronics" }
];

app.use('/products/:id', (req, res, next) => {
  console.log(`Requested Product ID: ${req.params.id}`);
  next();
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      error: "Invalid product ID format",
      timestamp: new Date().toISOString()
    });
  }

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
      timestamp: new Date().toISOString()
    });
  }

  res.status(200).json({
    ...product,
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