import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import styles from './styles/App.module.scss';

export default function App() {
  // Part (a): State Management using useState
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999.00, category: 'Electronics' },
    { id: 2, name: 'Mouse', price: 29.00, category: 'Accessories' },
    { id: 3, name: 'Keyboard', price: 79.00, category: 'Accessories' },
  ]);

  const [cartCount, setCartCount] = useState(0);

  // Part (c): Event Handler to Add a New Product to State
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Part (c): Event Handler to Increment Cart Counter
  const handleAddToCart = (productId) => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <div className={styles.appContainer}>
      {/* Header showing global Cart State */}
      <header className={styles.header}>
        <h1>Product Store</h1>
        <div className={styles.cartBadge}>
          Cart Items: {cartCount}
        </div>
      </header>

      {/* Product Entry Form (State Updater) */}
      <ProductForm onAddProduct={handleAddProduct} />

      {/* Product Display List (State Consumer) */}
      <section>
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </section>
    </div>
  );
}