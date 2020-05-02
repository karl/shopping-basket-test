import React from 'react';
import { Checkout } from '../components/Checkout';

const CheckoutPage = ({ basket, dispatch }) => {
  return <Checkout basket={basket} dispatch={dispatch} />;
};

export default CheckoutPage;
