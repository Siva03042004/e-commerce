/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './ProductCard.css'; 

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const handleAddToCart = async () => {
    setLoading(true); // Start loading
    const cartItem = {
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    try {
      const response = await fetch(`http://localhost:4000/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        alert(`${product.title} added to cart!`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error adding product to cart.');
      }
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
        loading="lazy" // Lazy load the image
      />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <div className="product-price-add">
        <span className="product-price">₹{product.price}</span>
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={loading} // Disable button while loading
          aria-label={`Add ${product.title} to cart`} // Accessibility
        >
          {loading ? 'Adding...' : 'Add to Cart'} {/* Button text changes based on loading state */}
        </button>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </div>
    </div>
  );
};

export default ProductCard;
