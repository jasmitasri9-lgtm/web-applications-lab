const express = require('express')

const app = express()

const students = [
  { id: 1, name: 'Jasmita', course: 'CSE Core' },
  { id: 2, name: 'Rahul', course: 'CSE' },
  { id: 3, name: 'Ananya', course: 'ECE' }
]

app.get('/students', (req, res) => {
  res.json(students)
})

app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const student = students.find((student) => student.id === id)

  if (student) {
    res.json(student)
  } else {
    res.status(404).send('Student not found')
  }
})

app.get('/faculty', (req, res) => {
  res.json({
    name: 'Dr. Priya Sharma',
    department: 'Computer Science and Engineering'
  })
})

app.use((req, res) => {
  res.status(404).send('404 Page Not Found')
})

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000')
})