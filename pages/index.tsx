import React from 'react';
import { ProductListing } from '../components/ProductListing';
import { productsAsArray } from '../data';

const Index = ({ products }) => {
  return <ProductListing products={products} />;
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      products: productsAsArray,
    },
  };
};

export default Index;
