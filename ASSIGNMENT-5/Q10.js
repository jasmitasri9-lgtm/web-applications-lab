const express = require('express')

const app = express()

app.use(express.json())

let products = [
  { id: 1, name: 'Laptop', price: 55000 },
  { id: 2, name: 'Smartphone', price: 25000 }
]

// GET all products
app.get('/products', (req, res) => {
  res.status(200).json(products)
})

// GET product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const product = products.find((product) => product.id === id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

// POST a new product
app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  }

  products.push(newProduct)

  res.status(201).json(newProduct)
})

// PUT - update a product
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const product = products.find((product) => product.id === id)

  if (product) {
    product.name = req.body.name
    product.price = req.body.price

    res.status(200).json(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

// DELETE a product
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const index = products.findIndex((product) => product.id === id)

  if (index !== -1) {
    const deletedProduct = products.splice(index, 1)

    res.status(200).json(deletedProduct[0])
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000')
})

setInterval(() => {}, 1000)