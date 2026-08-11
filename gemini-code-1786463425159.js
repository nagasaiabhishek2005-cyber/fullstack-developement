import React, { useState } from 'react';
import styles from '../styles/App.module.scss';

export default function ProductCard({ name, price, category, onAddToCart }) {
  // Local state for hover feedback styling
  const [isHovered, setIsHovered] = useState(false);

  // Event Handlers for Mouse Hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={`${styles.productCard} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.category}>{category}</span>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.price}>${parseFloat(price).toFixed(2)}</p>

      <div className={styles.cardFooter}>
        <span className={styles.hoverStatus}>
          {isHovered ? 'Active Card' : ''}
        </span>
        {/* Event Handler for Button Click */}
        <button className={styles.cartBtn} onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}