import React from 'react';
import ProductCard from './ProductCard';
import styles from '../styles/App.module.scss';

export default function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return <p>No products available. Add one above!</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          onAddToCart={() => onAddToCart(product.id)}
        />
      ))}
    </div>
  );
}