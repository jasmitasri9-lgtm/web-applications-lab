
const express = require('express')

const app = express()
const PORT = 3001

// Middleware to read JSON data
app.use(express.json())

// Sample student records
let students = [
  { id: 1, name: 'Jasmita', branch: 'CSE' },
  { id: 2, name: 'Rahul', branch: 'ECE' }
]

// Home route to check whether the server is working
app.get('/', (req, res) => {
  res.send('Student Management API is running!')
})

// GET: Retrieve all students
app.get('/students', (req, res) => {
  res.status(200).json(students)
})

// GET: Retrieve a student by ID
app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id)
  const student = students.find(student => student.id === id)

  if (!student) {
    return res.status(404).json({ message: 'Student not found' })
  }

  res.status(200).json(student)
})

// POST: Add a new student
app.post('/students', (req, res) => {
  const { name, branch } = req.body

  if (!name || !branch) {
    return res.status(400).json({
      message: 'Please provide both name and branch'
    })
  }

  const newStudent = {
    id: students.length
      ? Math.max(...students.map(student => student.id)) + 1
      : 1,
    name,
    branch
  }

  students.push(newStudent)

  res.status(201).json({
    message: 'Student added successfully',
    student: newStudent
  })
})

// PUT: Update a student by ID
app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id)
  const student = students.find(student => student.id === id)

  if (!student) {
    return res.status(404).json({ message: 'Student not found' })
  }

  const { name, branch } = req.body

  if (!name || !branch) {
    return res.status(400).json({
      message: 'Please provide both name and branch'
    })
  }

  student.name = name
  student.branch = branch

  res.status(200).json({
    message: 'Student updated successfully',
    student
  })
})

// DELETE: Delete a student by ID
app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = students.findIndex(student => student.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' })
  }

  const deletedStudent = students.splice(index, 1)[0]

  res.status(200).json({
    message: 'Student deleted successfully',
    student: deletedStudent
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Student API running at http://localhost:${PORT}`)
})
