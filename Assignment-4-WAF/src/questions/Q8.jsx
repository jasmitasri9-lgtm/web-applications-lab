import { useState } from 'react'

function Product({ name, price, onAdd }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
      <button onClick={() => onAdd({ name, price })}>
        Add to Cart
      </button>
    </div>
  )
}

function Cart({ cart, onRemove }) {
  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index}>
            <p>
              {item.name} - ₹{item.price}
            </p>
            <button onClick={() => onRemove(index)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  )
}

function App() {
  const [cart, setCart] = useState([])

  const products = [
    { name: 'Coffee', price: 120 },
    { name: 'Sandwich', price: 150 },
    { name: 'Cake', price: 100 }
  ]

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      <h2>Products</h2>

      {products.map((product, index) => (
        <Product
          key={index}
          name={product.name}
          price={product.price}
          onAdd={addToCart}
        />
      ))}

      <Cart
        cart={cart}
        onRemove={removeFromCart}
      />
    </div>
  )
}

export default App