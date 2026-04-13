const express = require('express');
const app = express();
const PORT = 3000;
const products = [
  { id: 101, name: "Laptop", price: 50000, category: "electronics" },
  { id: 102, name: "Mobile", price: 20000, category: "electronics" },
  { id: 103, name: "Chair", price: 3000, category: "furniture" },
  { id: 104, name: "Book", price: 500, category: "education" },
  { id: 105, name: "Headphones", price: 1500, category: "electronics" }
];

app.get('/search', (req, res) => {
  const { name, category } = req.query;

  console.log(`Search Query -> name: ${name}, category: ${category}`);
  let filteredProducts = products;

  if (name) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (!name && !category) {
    return res.status(400).json({
      error: "Please provide at least one search parameter (name or category)"
    });
  }

  res.status(200).json({
    resultCount: filteredProducts.length,
    results: filteredProducts
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