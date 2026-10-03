const express = require('express')

const app = express()

// Authentication middleware
const checkAdmin = (req, res, next) => {
  if (req.query.role === 'admin') {
    next()
  } else {
    res.status(403).send('Access Denied')
  }
}

// Home route - accessible without authentication
app.get('/home', (req, res) => {
  res.send('Welcome to Home Page')
})

// Dashboard route - requires admin role
app.get('/dashboard', checkAdmin, (req, res) => {
  res.send('Welcome to Admin Dashboard')
})

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000')
})