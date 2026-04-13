const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

let products = [
  { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 2, name: "Phone", price: 20000, category: "Electronics" },
  { id: 3, name: "Shirt", price: 1000, category: "Clothing" },
  { id: 4, name: "Shoes", price: 3000, category: "Footwear" },
  { id: 5, name: "Watch", price: 2500, category: "Accessories" }
];

function getTimestamp() {
  return new Date().toISOString();
}

app.get('/products', (req, res) => {
  res.status(200).json({
    message: "All products fetched",
    totalProducts: products.length,
    timestamp: getTimestamp(),
    data: products
  });
});

app.post('/products', (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    console.log("Validation failed");
    return res.status(400).json({
      error: "Name, price and category are required"
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price: Number(price),
    category
  };

  products.push(newProduct);

  console.log("Product created");

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct
  });
});

app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log("Updating product ID:", id);

  const { name, price, category } = req.body;

  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found"
    });
  }

  if (!name || !price || !category) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  product.name = name;
  product.price = Number(price);
  product.category = category;

  res.status(200).json({
    message: "Product updated successfully",
    product
  });
});

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log("Deleting product ID:", id);

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Product not found"
    });
  }

  const deletedProduct = products.splice(index, 1);

  res.status(200).json({
    message: "Product deleted successfully",
    product: deletedProduct[0]
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
  console.log(`Server running at http://localhost:${PORT}`);
});