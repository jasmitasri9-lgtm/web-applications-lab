
const express = require('express')

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send(`
    <h1>Home Page</h1>
    <p>Welcome to our website!</p>
    <a href="/about">About</a> |
    <a href="/contact">Contact</a>
  `)
})

app.get('/about', (req, res) => {
  res.send(`
    <h1>About Page</h1>
    <p>This website is created using Node.js and Express.js.</p>
    <a href="/">Home</a> |
    <a href="/contact">Contact</a>
  `)
})

app.get('/contact', (req, res) => {
  res.send(`
    <h1>Contact Page</h1>
    <p>Email: contact@example.com</p>
    <a href="/">Home</a> |
    <a href="/about">About</a>
  `)
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
