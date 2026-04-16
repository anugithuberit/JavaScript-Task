const express = require('express');
const router = express.Router();

const { getUsers } = require('../controllers/userController24');

router.get('/users', getUsers);

module.exports = router;