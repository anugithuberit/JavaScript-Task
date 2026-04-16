const express = require('express');
const app = express();

const logger = require('./middleware/logger25');
const auth = require('./middleware/auth25');

const userRoutes = require('./routes/userRoutes25');
const productRoutes = require('./routes/productRoutes25');

app.use(express.json());

app.use(logger);

app.use('/api/users', auth, userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "API running successfully"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});