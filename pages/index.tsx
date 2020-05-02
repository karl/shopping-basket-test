import React from 'react';
import { ProductListing } from '../components/ProductListing';
import { productsAsArray } from '../data';

const Index = ({ products, basket, dispatch }) => {
  return (
    <ProductListing products={products} basket={basket} dispatch={dispatch} />
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      products: productsAsArray,
    },
  };
};

export default Index;
