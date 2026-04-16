// app24.js

const express = require('express');
const app = express();

const logger24 = require('./middleware/logger24');
const userRoutes24 = require('./routes/userRoutes24');

// middleware
app.use(logger24);

// routes
app.use('/', userRoutes24);

// server
app.listen(3000, () => {
    console.log("Application running successfully");
});