const express = require('express');
const router = express.Router();

// sample route
router.get('/', (req, res) => {
  res.json({ message: "Orders API working" });
});

// ✅ export should be LAST LINE
module.exports = router;