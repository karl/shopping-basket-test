import React from 'react';
import Link from 'next/link';

export const Basket = ({ basket }) => {
  return (
    <div>
      <h3>Your basket</h3>
      <div>{basket.length === 0 && <span>Your basket is empty</span>}</div>
      <div>
        {basket.length > 0 &&
          basket.map(({ product, count }) => (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>{count}</div>
            </div>
          ))}
      </div>
      <Link href="/checkout">
        <a>Checkout</a>
      </Link>
    </div>
  );
};
