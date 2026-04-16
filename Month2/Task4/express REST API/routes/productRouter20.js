const express = require('express');
const router = express.Router();
const requestLogger20 = require('../middleware/requestLogger20');

router.use(requestLogger20);

router.get('/', (req, res) => {
    res.json({
        message: "Products API (Task 20) working"
    });
});

module.exports = router;