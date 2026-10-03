const express = require('express')

const app = express()

app.use(express.json())

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`)
  next()
})

let employees = [
  { id: 1, name: 'Rahul', department: 'HR' },
  { id: 2, name: 'Ananya', department: 'IT' }
]

// GET all employees
app.get('/employees', (req, res) => {
  res.status(200).json(employees)
})

// GET employee by ID
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const employee = employees.find((employee) => employee.id === id)

  if (employee) {
    res.status(200).json(employee)
  } else {
    res.status(404).json({ message: 'Employee not found' })
  }
})

// POST a new employee
app.post('/employees', (req, res) => {
  const newEmployee = {
    id: employees.length + 1,
    name: req.body.name,
    department: req.body.department
  }

  employees.push(newEmployee)

  res.status(201).json(newEmployee)
})

app.use((req, res) => {
  res.status(404).json({ message: 'Employee not found' })
})

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000')
})

setInterval(() => {}, 1000)