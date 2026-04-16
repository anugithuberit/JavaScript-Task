const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

// Apply middleware ONLY to this router
router.use(auth);

// Route: /admin/dashboard
router.get('/dashboard', (req, res) => {
  console.log("Admin dashboard accessed");

  res.status(200).json({
    success: true,
    message: "Access granted to admin dashboard"
  });
});

module.exports = router;