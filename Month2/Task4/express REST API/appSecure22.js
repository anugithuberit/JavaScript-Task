const express = require('express');
const app = express();

const adminSecure22 = require('./routes/adminSecure22');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: "Public route working"
  });
});

app.use('/admin', adminSecure22);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});