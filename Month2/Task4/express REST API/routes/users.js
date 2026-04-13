const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: "Sai", email: "sai@mail.com" },
  { id: 2, name: "Anu", email: "anu@mail.com" }
];

router.use((req, res, next) => {
  console.log(`User Route Hit: ${req.method} ${req.originalUrl}`);
  next();
});

router.get('/', (req, res) => {
  res.status(200).json({
    message: "User routes working",
    data: users
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  res.json(user);
});

router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

module.exports = router;