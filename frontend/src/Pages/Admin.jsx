// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import '../Styles/Admin.css';
import Navbar from '../Components/Navbar';

const Admin = () => {
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '', 
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
      setImagePreview(reader.result); // Set the image preview
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for price
    if (newProduct.price <= 0) {
      alert('Price must be a positive number.');
      return;
    }

    const response = await fetch('https://e-commerce-1erh.onrender.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      alert('Product added successfully!');
      setNewProduct({ title: '', description: '', price: '', image: '' });
      setImagePreview(''); // Reset the image preview
    } else {
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div>
      <Navbar/>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newProduct.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
          min="0" // Ensures the price cannot be negative
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        
        {imagePreview && (
          <div className="image-preview">
            <h3>Image Preview:</h3>
            <img src={imagePreview} alt="Product Preview" style={{ width: '100px', height: '100px' }} />
          </div>
        )}
        
        <button type="submit" className='add'>Add Product</button>
      </form>
    </div>
  );
};

export default Admin;
