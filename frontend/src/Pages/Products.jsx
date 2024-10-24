/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import "../Styles/Products.css";



const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getProducts = async () => {
    try {
      const response = await fetch(`https://e-commerce-1erh.onrender.com/products`);  // Use the environment variable
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading products...</p>
        {/* You can replace this with a spinner or loading animation */}
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list">
      
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product) => (
          
          <ProductCard key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export default Products;
