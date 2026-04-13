const express = require('express');
const app = express();

const PORT = 3000;
app.use(express.json());
app.use('/students', (req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});
let students = [
  { id: 1, name: "Sai", course: "CSE", age: 21 },
  { id: 2, name: "Anu", course: "IT", age: 20 },
  { id: 3, name: "Rahul", course: "ECE", age: 22 },
  { id: 4, name: "Priya", course: "EEE", age: 21 },
  { id: 5, name: "Karthik", course: "MECH", age: 23 }
];

function isValidStudent(student) {
  if (!student.id || !student.name || !student.course || !student.age) {
    return false;
  }
  return true;
}

app.get('/students', (req, res) => {
  res.status(200).json(students);
});

app.get('/students/count', (req, res) => {
  res.status(200).json({
    count: students.length
  });
});

app.get('/students/names', (req, res) => {
  const names = students.map(student => student.name);
  res.status(200).json(names);
});

app.post('/students', (req, res) => {
  const newStudent = req.body;

  if (!isValidStudent(newStudent)) {
    return res.status(400).json({
      error: "All fields (id, name, course, age) are required"
    });
  }

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    data: newStudent
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});