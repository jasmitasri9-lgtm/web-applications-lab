const express = require('express')

const app = express()

// Custom middleware
app.use((req, res, next) => {
  console.log('Method:', req.method)
  console.log('URL:', req.url)
  console.log('Date and Time:', new Date().toLocaleString())
  console.log('-------------------------')
  next()
})

// Route 1
app.get('/', (req, res) => {
  res.send('Welcome to Middleware')
})

// Route 2
app.get('/about', (req, res) => {
  res.send('This is the About Page')
})

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000')
})