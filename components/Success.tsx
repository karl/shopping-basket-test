import React from 'react';
import Link from 'next/link';
import styles from './Success.module.css';

export const Success = ({ orderNumber }) => {
  return (
    <div>
      <h1>Checkout</h1>
      <div className={styles.message}>
        You have checked out order number {orderNumber}
      </div>
      <Link href="/">
        <a>Shop again</a>
      </Link>
    </div>
  );
};
