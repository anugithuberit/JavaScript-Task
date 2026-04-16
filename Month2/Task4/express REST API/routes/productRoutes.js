const express = require('express');
const router = express.Router();

const products = require('../data/products');
router.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
    });
    next();
});

router.get('/products', (req, res) => {
    res.status(200).json(products);
});

module.exports = router;