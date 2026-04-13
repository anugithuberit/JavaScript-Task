const express = require('express');
const app = express();
const PORT = 3000;
app.use('/api', (req, res, next) => {
  console.log(`API Request: ${req.method} ${req.url}`);
  next();
});

let products = [
  { id: 101, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 102, name: "Mobile", price: 20000, category: "Electronics" },
  { id: 103, name: "Chair", price: 3000, category: "Furniture" },
  { id: 104, name: "Book", price: 500, category: "Education" },
  { id: 105, name: "Headphones", price: 1500, category: "Electronics" }
];

app.get('/api/products', (req, res) => {

  const sortedProducts = products
    .filter(p => typeof p.price === 'number')
    .sort((a, b) => a.name.localeCompare(b.name));

  res.status(200).json({
    totalProducts: sortedProducts.length,
    products: sortedProducts
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