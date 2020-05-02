import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Checkout.module.css';
import { CheckoutProduct } from './CheckoutProduct';
import Router from 'next/router';
import { formatPrice } from '../utils/formatPrice';

export const Checkout = ({ basket, dispatch }) => {
  const [state, setState] = useState('READY');

  const total = basket.reduce(
    (acc, item) => acc + item.product.price * item.count,
    0,
  );

  const pay = async () => {
    setState('LOADING');

    const body = {
      basket: basket.map((item) => {
        return {
          id: item.product.id,
          count: item.count,
        };
      }),
    };

    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(body, null, 2),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!res.ok) {
      setState('ERROR');
      return;
    }

    const { orderNumber } = await res.json();
    console.log('orderNumber', orderNumber);
    dispatch({ type: 'CLEAR' });
    Router.push(`/success/${orderNumber}`);
  };

  return (
    <div className={styles.page}>
      <h1>Checkout</h1>

      <div className={styles.basketListing}>
        {basket.length === 0 && <span>Your basket is empty</span>}
        {basket.length > 0 &&
          basket.map(({ product, count }) => (
            <CheckoutProduct key={product.id} product={product} count={count} />
          ))}
      </div>

      <div className={styles.totalWrapper}>
        Total to pay <span className={styles.total}>{formatPrice(total)}</span>
      </div>

      <div className={styles.actions}>
        <Link href="/">
          <a className={styles.action}>Continue shopping</a>
        </Link>

        <button
          className={styles.action}
          onClick={() => pay()}
          disabled={state === 'LOADING' || basket.length === 0}
        >
          Pay
        </button>
      </div>

      {state === 'ERROR' && (
        <div className={styles.error}>
          Error checking out. Please try again.
        </div>
      )}
    </div>
  );
};
