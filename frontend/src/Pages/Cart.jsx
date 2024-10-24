// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import "../Styles/Cart.css";
import Navbar from '../Components/Navbar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`http://localhost:4000/cart`);
      if (!response.ok) throw new Error('Failed to fetch cart items');

      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/cart/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');

      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from being less than 1
    const updatedItem = { quantity: newQuantity };

    try {
      const response = await fetch(`http://localhost:4000/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) throw new Error('Failed to update quantity');

      setCartItems(cartItems.map(item => 
        item._id === id ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePlaceOrder = async () => {
    if (!window.confirm('Are you sure you want to place the order?')) return;
    try {
      const response = await fetch(`http://localhost:4000/cart`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to place order');

      alert('Order placed successfully');
      setCartItems([]); // Clear the cart
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (loading) {
    return <div className="loading-indicator">Loading...</div>; // Enhanced loading indicator
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Display error message
  }

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map(item => (
                <li key={item._id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p>Price: ₹{item.price.toFixed(2)}</p>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item._id, Number(e.target.value))}
                    />
                    <button className="btn btn-danger" onClick={() => handleDeleteItem(item._id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="total-price">
              <h3>Total Price: ₹{calculateTotalPrice()}</h3>
            </div>

            <button className="btn btn-success place-order" onClick={handlePlaceOrder}>Place Order</button>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
