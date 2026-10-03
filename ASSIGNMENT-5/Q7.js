const express = require('express')

const app = express()

app.use(express.json())

let students = [
  { id: 1, name: 'Jasmita', course: 'CSE Core' },
  { id: 2, name: 'Rahul', course: 'CSE' }
]

// GET all students
app.get('/students', (req, res) => {
  res.json(students)
})

// GET student by ID
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const student = students.find((student) => student.id === id)

  if (student) {
    res.json(student)
  } else {
    res.status(404).json({ message: 'Student not found' })
  }
})

// POST new student
app.post('/students', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    course: req.body.course
  }

  students.push(newStudent)

  res.status(201).json(newStudent)
})

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000')
})