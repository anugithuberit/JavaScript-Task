const express = require('express');
const app = express();
const PORT = 3000;
const items = [];
for (let i = 1; i <= 20; i++) {
  items.push({ id: i, name: `Item ${i}` });
}
app.get('/items', (req, res) => {
  let { page, limit } = req.query;

  console.log(`Pagination Request -> page: ${page}, limit: ${limit}`);
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  if (page < 1 || limit < 1) {
    return res.status(400).json({
      error: "Page and limit must be positive numbers"
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedItems = items.slice(startIndex, endIndex);

  if (startIndex >= items.length) {
    return res.status(404).json({
      error: "Page not found"
    });
  }

  res.status(200).json({
    page,
    limit,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / limit),
    data: paginatedItems
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