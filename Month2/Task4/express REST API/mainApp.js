const express = require('express');
const app = express();

const userRoutes = require('./routes/userRouter20');
const productRoutes = require('./routes/productRouter20');
const orderRoutes = require('./routes/orderRouter20');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: "API working" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});