import { productsAsArray } from '../../../data';
import { isError } from '../../../utils/isError';

export default (req, res) => {
  setTimeout(() => {
    if (isError()) {
      res.status(500).send({ error: 'Unexpected server error' });
    } else {
      res.send({ products: productsAsArray });
    }
  }, 500);
};
