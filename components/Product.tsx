import React from 'react';

export const Product = ({ product }) => (
  <div>
    <div>{product.id}</div>
    <img src={product.image} alt={product.name} />
    <div>{product.name}</div>
    <div>{product.description}</div>
    <div>{product.color}</div>
    <div>{product.price}</div>
  </div>
);
