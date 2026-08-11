import React, { useState } from 'react';
import styles from '../styles/App.module.scss';

export default function ProductForm({ onAddProduct }) {
  // Local form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
  });

  // Event Handler for Controlled Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Event Handler for Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill out all product fields.');
      return;
    }

    // Call parent handler passed via props
    onAddProduct({
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
    });

    // Reset form inputs
    setFormData({ name: '', price: '', category: '' });
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className={styles.productForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Wireless Headphones"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="e.g. 99.99"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g. Electronics"
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Add Product
        </button>
      </form>
    </div>
  );
}