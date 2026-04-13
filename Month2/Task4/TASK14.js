const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
let users = [
  { id: 1, name: "Sai", email: "sai@mail.com" },
  { id: 2, name: "Anu", email: "anu@mail.com" }
];

function isValidUser(user) {
  return user.name && user.email;
}

app.get('/users', (req, res) => {
  console.log("GET /users");
  res.status(200).json(users);
});

app.post('/users', (req, res) => {
  console.log("POST /users");

  const newUser = req.body;

  if (!isValidUser(newUser)) {
    return res.status(400).json({
      error: "Name and email are required"
    });
  }

  newUser.id = users.length + 1;
  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

app.put('/users/:id', (req, res) => {
  console.log(`PUT /users/${req.params.id}`);

  const id = parseInt(req.params.id);
  const updatedData = req.body;

  if (!isValidUser(updatedData)) {
    return res.status(400).json({
      error: "Name and email are required"
    });
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  user.name = updatedData.name;
  user.email = updatedData.email;

  res.status(200).json({
    message: "User updated successfully",
    user
  });
});

app.delete('/users/:id', (req, res) => {
  console.log(`DELETE /users/${req.params.id}`);

  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully"
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});