
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 55000 },
    { id: 2, name: 'Smartphone', price: 25000 },
    { id: 3, name: 'Headphones', price: 3000 }
  ])

  const [message, setMessage] = useState('')

  useEffect(() => {
    console.log('Product list updated:', products)
  }, [products])

  function addProduct() {
    const newProduct = {
      id: Date.now(),
      name: 'Keyboard',
      price: 1500
    }

    setProducts([...products, newProduct])
    setMessage('Product added successfully!')
  }

  function removeProduct(id) {
    setProducts(products.filter(product => product.id !== id))
    setMessage('Product removed successfully!')
  }

  return (
    <div className="app">
      <h1>Product List</h1>

      <p className="message">
        {message || 'Welcome! Manage your products below.'}
      </p>

      <button onClick={addProduct}>Add Product</button>

      <div className="products">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => removeProduct(product.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
