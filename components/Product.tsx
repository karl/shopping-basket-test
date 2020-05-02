import React from 'react';
import style from './Product.module.css';

export const Product = ({ product }) => (
  <div className={style.product}>
    <img className={style.image} src={product.image} alt={product.name} />
    <div className={style.info}>
      <h4 className={style.name}>{product.name}</h4>
      <div className={style.description}>{product.description}</div>
      <div className={style.color}>{product.color}</div>
    </div>
    <div className={style.price}>£{product.price}</div>
    <div className={style.actions}>
      <button>Add</button>
      <button>Remove</button>
    </div>
  </div>
);
