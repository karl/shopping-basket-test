import React from 'react';
import style from './Product.module.css';

export const Product = ({ product, onAdd, onRemove }) => (
  <div className={style.product}>
    <img className={style.image} src={product.image} alt={product.name} />
    <div className={style.info}>
      <h4 className={style.name}>{product.name}</h4>
      <div className={style.description}>{product.description}</div>
      <div className={style.color}>{product.color}</div>
    </div>
    <div className={style.price}>£{product.price}</div>
    <div className={style.actions}>
      <button onClick={() => onAdd(product)}>Add</button>
      <button onClick={() => onRemove(product)}>Remove</button>
    </div>
  </div>
);
