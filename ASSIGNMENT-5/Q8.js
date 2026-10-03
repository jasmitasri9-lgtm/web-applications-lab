const express = require('express')

const app = express()

app.use(express.json())

let books = [
  {
    id: 1,
    title: 'The Alchemist',
    author: 'Paulo Coelho'
  },
  {
    id: 2,
    title: 'Wings of Fire',
    author: 'A.P.J. Abdul Kalam'
  }
]

app.get('/books', (req, res) => {
  res.json(books)
})

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const book = books.find(b => b.id === id)

  if (!book) {
    return res.status(404).json({
      message: 'Book not found'
    })
  }

  res.json(book)
})

app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  }

  books.push(newBook)

  res.status(201).json(newBook)
})

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const book = books.find(b => b.id === id)

  if (!book) {
    return res.status(404).json({
      message: 'Book not found'
    })
  }

  book.title = req.body.title
  book.author = req.body.author

  res.json(book)
})

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const index = books.findIndex(b => b.id === id)

  if (index === -1) {
    return res.status(404).json({
      message: 'Book not found'
    })
  }

  const deletedBook = books.splice(index, 1)

  res.json(deletedBook[0])
})

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000')
})
setInterval(() => {}, 1000)