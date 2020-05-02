import React from 'react';
import Link from 'next/link';
import styles from './Basket.module.css';
import { formatPrice } from '../utils/formatPrice';

export const Basket = ({ basket }) => {
  const total = basket.reduce(
    (acc, item) => acc + item.product.price * item.count,
    0,
  );

  const totalCount = basket.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className={styles.basket}>
      <h3>Your basket</h3>
      <div className={styles.content}>
        <div className={styles.total}>{formatPrice(total)}</div>
        <div>{totalCount === 1 ? '1 item' : `${totalCount} items`}</div>
      </div>
      <div className={styles.actions}>
        <Link href="/checkout">
          <a>Checkout</a>
        </Link>
      </div>
    </div>
  );
};
