import React, { useReducer } from 'react';
import '../styles.css';

const initialState = [];

const reducer = (basket, action) => {
  console.log('reducer', basket, action);

  switch (action.type) {
    case 'ADD': {
      const existing = basket.find(
        (item) => item.product.id === action.product.id,
      );

      if (existing) {
        return basket.map((item) => {
          if (item.product.id === action.product.id) {
            return {
              product: action.product,
              count: item.count + 1,
            };
          }
          return item;
        });
      } else {
        return [...basket, { product: action.product, count: 1 }];
      }
    }

    case 'REMOVE': {
      return basket
        .map((item) => {
          if (item.product.id === action.product.id) {
            const count = item.count - 1;

            if (count === 0) {
              return undefined;
            }

            return {
              product: action.product,
              count,
            };
          }
          return item;
        })
        .filter((item) => item !== undefined);
    }

    default: {
      return basket;
    }
  }
};

const App = ({ Component, pageProps }) => {
  const [basket, dispatch] = useReducer(reducer, initialState);
  console.log('basket', basket);

  return <Component {...pageProps} basket={basket} dispatch={dispatch} />;
};

export default App;
