const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});