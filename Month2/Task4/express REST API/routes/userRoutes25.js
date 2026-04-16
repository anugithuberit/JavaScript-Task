const express = require('express');
const router = express.Router();

const { getUsers, addUser } = require('../controllers/userController25');

router.get('/', getUsers);
router.post('/', addUser);

module.exports = router;