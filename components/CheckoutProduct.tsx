import React from 'react';
import style from './CheckoutProduct.module.css';

export const CheckoutProduct = ({ product, count }) => (
  <div className={style.product}>
    <img className={style.image} src={product.image} alt={product.name} />
    <div className={style.info}>
      <h4 className={style.name}>{product.name}</h4>
    </div>
    <div className={style.price}>£{product.price}</div>
    <div className={style.count}>
      {count === 1 ? '1 item' : `${count} items`}
    </div>
    <div className={style.total}>£{product.price * count}</div>
  </div>
);
