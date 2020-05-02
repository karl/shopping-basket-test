import React from 'react';
import { Product } from './Product';
import { Basket } from './Basket';
import styles from './ProductListing.module.css';

export const ProductListing = ({ products }) => {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1>Product Listing</h1>

        <div className={styles.products}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className={styles.sidebar}>
        <Basket />
      </div>
    </div>
  );
};
